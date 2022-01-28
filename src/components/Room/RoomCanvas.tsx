import React, { useRef, useState } from 'react';
import { useRoomState, useRoomDispatch, User } from './RoomState';
import { useEffect } from 'react';
import RightBanner from './RightBanner';
import { wrtc } from '../../api/wrtc';
import { useAppState } from '../AppContext/AppContext';

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
    <div className="relative">
      <div className="flex flex-wrap gap-4">
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
    <video
      style={{
        width: 300,
        height: 160,
        border: isMe ? '1px solid red' : '1px solid black',
      }}
      ref={videoRef}
    />
  );
}
