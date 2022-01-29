import React, { useRef, useState } from 'react';
import { useRoomState, useRoomDispatch, User } from './RoomState';
import { useEffect } from 'react';
import RightBanner from './RightBanner';
import { wrtc } from '../../api/wrtc';
import { useAppState } from '../AppContext/AppContext';
import clsx from 'clsx';

function RoomCanvas() {
  let dispatch = useRoomDispatch();
  let { user: me } = useAppState();
  let roomState = useRoomState();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({
        video: true,
        audio: true,
      })
      .then((stream) => {
        // set local stream
        dispatch({
          type: 'SET_STREAM_FOR_USER',
          payload: { userId: me!.id, stream },
        });
        wrtc.setStream(stream);
      });
  }, [dispatch, me]);

  return (
    <div className="relative h-[calc(100vh-80px)] w-full">
      <div
        className={clsx(
          'grid h-full w-full grid-cols-[repeat(auto-fit,minmax(450px,1fr))] grid-rows-[repeat(auto-fit,minmax(300px,1fr))] place-items-center items-center justify-center gap-4',
          {
            'pr-[366px]': roomState.rightBannerState != null,
          },
        )}
      >
        {roomState.users.map((user) => {
          return <Video key={user.id} user={user} />;
        })}
      </div>
      {roomState.rightBannerState != null && <RightBanner />}
    </div>
  );
}

export default RoomCanvas;

interface VideoProps {
  user: User;
}

function Video({ user }: VideoProps) {
  let { user: me } = useAppState();
  let videoRef = useRef<HTMLVideoElement>(null);
  let isMe = me!.id === user.id;

  useEffect(() => {
    if (!user.stream) {
      return;
    }

    let video = videoRef.current!;

    if ('srcObject' in video) {
      video.srcObject = user.stream;
    } else {
      // @ts-ignore
      video.src = window.URL.createObjectURL(user.stream); // for older browsers
    }

    if (isMe) {
      video.muted = true;
    }
    video.play();
  }, [isMe, user.stream]);

  return (
    <div
      className={clsx(
        'relative aspect-video max-h-full w-full max-w-full rounded p-4',
        {
          'border border-green-500': isMe,
        },
      )}
    >
      <video className="h-full w-full" ref={videoRef} />

      <span className="absolute left-4 bottom-4 text-white">
        {isMe ? 'You' : user.name}
      </span>
    </div>
  );
}
