import Link from 'next/link';
import React from 'react';

function Join() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex w-full max-w-sm flex-col items-center justify-center p-4">
        <h2 className="text-center text-2xl font-bold text-white">Join Room</h2>

        <div className="mt-8 flex w-full flex-col items-center gap-5">
          <div className="group relative h-16 w-full">
            <label
              htmlFor="name"
              className="absolute top-3 left-4 text-xs font-medium text-neutral-500 group-focus-within:text-green-600"
            >
              Room ID
            </label>

            <input
              type="text"
              placeholder="Enter room ID"
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
              type="text"
              placeholder="Enter your name"
              className="absolute inset-0 w-full rounded-lg border border-neutral-600 bg-transparent px-4 pb-4 pt-10 text-white placeholder:text-neutral-700 focus:border-green-600 focus:outline-none focus:ring-green-600 sm:text-sm"
            />
          </div>

          <div className="flex w-full items-center">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5 rounded bg-transparent text-green-600 focus:ring-green-600 "
              />
              <span className="ml-2 text-neutral-500">Only audio</span>
            </label>
          </div>

          <button className="inline-block w-full rounded-lg bg-green-700 px-5 py-3 font-medium text-white transition hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2">
            Join
          </button>

          <Link href={'/new'}>
            <a className="inline-block text-sm text-white hover:underline focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2">
              Host a Room
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Join;
