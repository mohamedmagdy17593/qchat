import React from 'react';
import { useRoomState } from './RoomState';
import { useAppState } from '../AppContext/AppContext';
import AudioViz from './AudioViz';
import { BsCameraVideoOffFill, BsMicMuteFill } from 'react-icons/bs';

function PeopleBanner() {
  let { user: me } = useAppState();
  let roomState = useRoomState();

  return (
    <div className="">
      <div className="p-4">
        <ul>
          {roomState.users.map((user) => {
            return (
              <li
                key={user.id}
                className="flex items-center justify-between py-2"
              >
                <span>
                  {user.name}{' '}
                  {user.id === me?.id ? (
                    <span className="ml-2 text-neutral-500">(You)</span>
                  ) : null}
                </span>

                <div className="flex gap-2 text-neutral-400">
                  {!user.camera && <BsCameraVideoOffFill />}
                  {!user.audio && <BsMicMuteFill />}
                  {user.audio && <AudioViz user={user} />}
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default PeopleBanner;
