import React, { useMemo } from 'react';
import { useCurrentTime } from './utils';
import { MdCallEnd, MdPresentToAll } from 'react-icons/md';
import {
  BsCameraVideo,
  BsCameraVideoOff,
  BsChatRightText,
  BsChatRightTextFill,
  BsFillPeopleFill,
  BsMic,
  BsMicMute,
  BsPeople,
} from 'react-icons/bs';
import { FiMoreVertical, FiSettings } from 'react-icons/fi';
import Tooltip from '../common/Tooltip/Tooltip';
import { useRoomDispatch, useRoomState } from './RoomState';
import { useRouter } from 'next/router';
import { wss } from '../../api/socket';
import clsx from 'clsx';
import { useMyRoomUser } from './hooks';

interface RoomFooterProps {
  roomId: string;
}

function RoomFooter({ roomId }: RoomFooterProps) {
  let router = useRouter();
  let dispatch = useRoomDispatch();
  let roomState = useRoomState();
  let myRoomUser = useMyRoomUser();

  return (
    <div className="grid h-20 select-none grid-cols-[1fr,auto,1fr] items-center px-5 text-white">
      <div className="flex items-center gap-4 ">
        <Time />
        <span className="h-4 w-px bg-white"></span>
        <span>{roomId}</span>
      </div>

      <div className="flex gap-3">
        <Tooltip content="Turn off microphone (⌘ + d)">
          <button
            className={clsx(
              'flex h-10 w-10 items-center justify-center rounded-full text-xl text-white hover:shadow-sm',
              {
                'bg-neutral-700 hover:bg-neutral-600 hover:shadow-neutral-600':
                  myRoomUser?.audio,
                'bg-red-500 hover:bg-red-500 hover:shadow-red-500':
                  !myRoomUser?.audio,
              },
            )}
            onClick={() => {
              wss.changeUserState({ audio: !myRoomUser?.audio });
            }}
          >
            {myRoomUser?.audio ? <BsMic /> : <BsMicMute />}
          </button>
        </Tooltip>
        <Tooltip content="Turn off camera (⌘ + e)">
          <button
            className={clsx(
              'flex h-10 w-10 items-center justify-center rounded-full text-xl text-white hover:shadow-sm',
              {
                'bg-neutral-700 hover:bg-neutral-600 hover:shadow-neutral-600':
                  myRoomUser?.camera,
                'bg-red-500 hover:bg-red-500 hover:shadow-red-500':
                  !myRoomUser?.camera,
              },
            )}
            onClick={() => {
              wss.changeUserState({ camera: !myRoomUser?.camera });
            }}
          >
            {myRoomUser?.camera ? <BsCameraVideo /> : <BsCameraVideoOff />}
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
          <button
            className="rounded-full bg-red-500 px-4 py-2 text-2xl text-white hover:shadow-sm hover:shadow-red-500"
            onClick={() => {
              router.push('/');
            }}
          >
            <MdCallEnd />
          </button>
        </Tooltip>
      </div>

      <div className="flex justify-self-end">
        <Tooltip content="Show everyone">
          <button
            className="relative flex h-12 w-12 items-center justify-center rounded-full text-2xl text-white hover:bg-neutral-800"
            onClick={() => {
              dispatch({
                type: 'SET_RIGHT_BANNER_STATE',
                payload: {
                  rightBannerState:
                    roomState.rightBannerState === 'people' ? null : 'people',
                },
              });
            }}
          >
            {roomState.rightBannerState === 'people' ? (
              <BsFillPeopleFill className="text-green-600" />
            ) : (
              <BsPeople />
            )}

            <span className="absolute top-0 right-0  flex h-4 w-4 items-center justify-center rounded-full bg-neutral-600 text-[10px]">
              {roomState.users.length}
            </span>
          </button>
        </Tooltip>
        <Tooltip content="Chat with everyone">
          <button
            className="flex h-12 w-12 items-center justify-center rounded-full text-2xl text-white hover:bg-neutral-800"
            onClick={() => {
              dispatch({
                type: 'SET_RIGHT_BANNER_STATE',
                payload: {
                  rightBannerState:
                    roomState.rightBannerState === 'chat' ? null : 'chat',
                },
              });
            }}
          >
            {roomState.rightBannerState === 'chat' ? (
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
