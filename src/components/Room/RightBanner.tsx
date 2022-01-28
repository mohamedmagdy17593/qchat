import React from 'react';
import { MdOutlineClose } from 'react-icons/md';
import ChatBanner from './ChatBanner';
import PeopleBanner from './PeopleBanner';
import { useRoomDispatch, useRoomState } from './RoomState';

function RightBanner() {
  let dispatch = useRoomDispatch();
  let roomState = useRoomState();

  return (
    <div className="absolute top-4 right-4 grid h-[calc(100%-16px)] w-[350px] grid-rows-[auto,1fr] rounded bg-white text-neutral-900">
      <div className="flex h-16 items-center justify-between pl-4 pr-2">
        <div className="text-lg">
          {roomState.rightBannerState === 'chat'
            ? 'In-call messages'
            : roomState.rightBannerState === 'people'
            ? 'People'
            : null}
        </div>
        <button
          className="flex h-12 w-12 items-center justify-center rounded-full hover:bg-neutral-100"
          onClick={() => {
            dispatch({
              type: 'SET_RIGHT_BANNER_STATE',
              payload: { rightBannerState: null },
            });
          }}
        >
          <MdOutlineClose className="text-2xl text-neutral-500" />
        </button>
      </div>

      {roomState.rightBannerState === 'chat' ? (
        <ChatBanner />
      ) : roomState.rightBannerState === 'people' ? (
        <PeopleBanner />
      ) : null}
    </div>
  );
}

export default RightBanner;
