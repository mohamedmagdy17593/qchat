import React from 'react';
import { MdOutlineClose, MdSend } from 'react-icons/md';
import { useRoomDispatch } from './RoomState';

function ChatBanner() {
  let dispatch = useRoomDispatch();

  return (
    <div className="absolute top-4 right-4 grid h-[calc(100%-16px)] w-[350px] grid-rows-[auto,1fr,auto] rounded bg-white">
      <div className="flex h-16 items-center justify-between pl-4 pr-2">
        <div className="text-lg">In-call messages</div>
        <button
          className="flex h-12 w-12 items-center justify-center rounded-full hover:bg-neutral-100"
          onClick={() => {
            dispatch({
              type: 'SET_CHAT_IS_OPEN',
              payload: { chatIsOpen: false },
            });
          }}
        >
          <MdOutlineClose />
        </button>
      </div>

      <div></div>

      <div className="p-4">
        <div className="relative">
          <label htmlFor="message" className="sr-only">
            Send a message to everyone
          </label>
          <input
            type="text"
            id="message"
            placeholder="Send a message to everyone"
            className="block h-12 w-full rounded-xl border-2 border-neutral-200 pl-4 pr-16 focus:border-green-600 focus:outline-none focus:ring-green-600  sm:text-sm"
          />
          <button
            type="button"
            className="absolute right-2 top-1/2 -translate-y-1/2 transform rounded-full bg-green-600 p-2 text-white hover:bg-green-500"
          >
            <MdSend />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatBanner;
