import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { errorToast } from '../../utils/toast';
import { wss } from '../api/socket';
import { wrtc } from '../api/wrtc';
import { useAppState } from '../components/AppContext/AppContext';

function Join() {
  let { setUser } = useAppState();
  let router = useRouter();
  let roomId = router.query.roomId;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    let form = new FormData(e.target as HTMLFormElement);
    let roomId = form.get('roomId') as string;
    let name = form.get('name') as string;
    let onlyAudio = form.get('onlyAudio') === 'on';
    wss.joinRoom({ name, roomId }, (data) => {
      if ('error' in data) {
        let { error } = data;
        errorToast(error);
      } else {
        let { roomId, user, roomUsers } = data;
        wrtc.peerConnection(roomUsers);
        setUser(user);
        router.push(`/${roomId}`);
      }
    });
  }

  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex w-full max-w-sm flex-col items-center justify-center p-4">
        <h2 className="text-center text-2xl font-bold text-white">Join Room</h2>

        <form onSubmit={handleSubmit} className="w-full">
          <div className="mt-8 flex w-full flex-col items-center gap-5">
            <div className="group relative h-16 w-full">
              <label
                htmlFor="roomId"
                className="absolute top-3 left-4 text-xs font-medium text-neutral-500 group-focus-within:text-green-600"
              >
                Room ID
              </label>

              <input
                required
                name="roomId"
                id="roomId"
                type="text"
                placeholder="Enter room ID"
                defaultValue={roomId}
                className="absolute inset-0 w-full rounded-lg border border-neutral-600 bg-transparent px-4 pb-4 pt-10 text-white placeholder:text-neutral-700 focus:border-green-600 focus:outline-none focus:ring-green-600 sm:text-sm"
              />
            </div>

            <div className="group relative h-16 w-full">
              <label
                htmlFor="name"
                className="absolute top-3 left-4 text-xs font-medium text-neutral-500 group-focus-within:text-green-600"
              >
                Your name
              </label>

              <input
                required
                name="name"
                id="name"
                type="text"
                placeholder="Enter your name"
                className="absolute inset-0 w-full rounded-lg border border-neutral-600 bg-transparent px-4 pb-4 pt-10 text-white placeholder:text-neutral-700 focus:border-green-600 focus:outline-none focus:ring-green-600 sm:text-sm"
              />
            </div>

            <div className="flex w-full items-center">
              <label className="inline-flex items-center">
                <input
                  name="onlyAudio"
                  type="checkbox"
                  className="form-checkbox h-5 w-5 rounded !border-neutral-600 bg-transparent text-green-600 focus:ring-green-600 "
                />
                <span className="ml-2 text-neutral-500">Only audio</span>
              </label>
            </div>

            <button
              type="submit"
              className="inline-block w-full rounded-lg bg-green-700 px-5 py-3 font-medium text-white transition hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2"
            >
              Join
            </button>

            <Link href={'/new'}>
              <a className="inline-block text-sm text-white hover:underline focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2">
                Host a Room
              </a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Join;
