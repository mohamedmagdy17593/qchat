import React from 'react';
import { useCurrentTime } from './utils';
import { MdCallEnd, MdPresentToAll } from 'react-icons/md';
import {
  BsCameraVideo,
  BsChatRightText,
  BsChatRightTextFill,
  BsMic,
} from 'react-icons/bs';
import { FiMoreVertical, FiSettings, FiUsers } from 'react-icons/fi';
import Tooltip from '../common/Tooltip/Tooltip';
import { useRoomDispatch, useRoomState } from './RoomState';

function RoomFooter() {
  let roomState = useRoomState();
  let dispatch = useRoomDispatch();

  return (
    <div className="grid h-20 select-none grid-cols-[1fr,auto,1fr] items-center px-5 text-white">
      <div className="flex items-center gap-4 ">
        <Time />
        <span className="h-4 w-px bg-white"></span>
        <span>{'asdcf-asd1'}</span>
      </div>

      <div className="flex gap-3">
        <Tooltip content="Turn off microphone (⌘ + d)">
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-700 text-xl text-white hover:bg-neutral-600 hover:shadow-sm hover:shadow-neutral-600">
            <BsMic />
            {/* <BsMicMute /> */}
          </button>
        </Tooltip>
        <Tooltip content="Turn off camera (⌘ + e)">
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-700 text-xl text-white hover:bg-neutral-600 hover:shadow-sm hover:shadow-neutral-600">
            <BsCameraVideo />
            {/* <BsCameraVideoOff /> */}
          </button>
        </Tooltip>
        <Tooltip content="Present now">
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-700 text-xl text-white hover:bg-neutral-600 hover:shadow-sm hover:shadow-neutral-600">
            <MdPresentToAll />
          </button>
        </Tooltip>
        <Tooltip content="More options">
          <button className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-700 text-xl text-white hover:bg-neutral-600 hover:shadow-sm hover:shadow-neutral-600">
            <FiMoreVertical />
          </button>
        </Tooltip>
        <Tooltip content="Leave call">
          <button className="rounded-full bg-red-500 px-4 py-2 text-2xl text-white hover:shadow-sm hover:shadow-red-500">
            <MdCallEnd />
          </button>
        </Tooltip>
      </div>

      <div className="flex justify-self-end">
        <Tooltip content="Show everyone">
          <button className="flex h-12 w-12 items-center justify-center rounded-full text-2xl text-white hover:bg-neutral-800">
            <FiUsers />
          </button>
        </Tooltip>
        <Tooltip content="Chat with everyone">
          <button
            className="flex h-12 w-12 items-center justify-center rounded-full text-2xl text-white hover:bg-neutral-800"
            onClick={() => {
              dispatch({
                type: 'SET_CHAT_IS_OPEN',
                payload: { chatIsOpen: !roomState.chatIsOpen },
              });
            }}
          >
            {roomState.chatIsOpen ? (
              <BsChatRightTextFill className="text-green-600" />
            ) : (
              <BsChatRightText />
            )}
          </button>
        </Tooltip>
        <Tooltip content="Setting">
          <button className="flex h-12 w-12 items-center justify-center rounded-full text-2xl text-white hover:bg-neutral-800">
            <FiSettings />
          </button>
        </Tooltip>
      </div>
    </div>
  );
}

export default RoomFooter;

function Time() {
  let time = useCurrentTime();
  return <span>{time}</span>;
}
