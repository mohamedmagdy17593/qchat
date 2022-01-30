import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useRoomState, useRoomDispatch, User } from './RoomState';
import { useEffect } from 'react';
import RightBanner from './RightBanner';
import { wrtc } from '../../api/wrtc';
import { useAppState } from '../AppContext/AppContext';
import clsx from 'clsx';
import { useForceUpdate, useMyRoomUser } from './hooks';
import {
  BsCameraVideoOff,
  BsCameraVideoOffFill,
  BsMicMute,
  BsMicMuteFill,
} from 'react-icons/bs';

function RoomCanvas() {
  let dispatch = useRoomDispatch();
  let { user: me } = useAppState();
  let roomState = useRoomState();

  let forceUpdate = useForceUpdate();
  let myRoomUser = useMyRoomUser();

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

        // @ts-ignore
        window.stream = stream;

        wrtc.setStream(stream);
      });
  }, [dispatch, me]);

  useLayoutEffect(() => {
    if (myRoomUser?.stream) {
      let stream = myRoomUser.stream;

      /**
       * Note:
       * using force update to validate any stream checks in children components
       */

      if (stream.getAudioTracks()[0].enabled !== myRoomUser.audio) {
        stream.getAudioTracks()[0].enabled = myRoomUser.audio;
        forceUpdate();
      }
      if (stream.getVideoTracks()[0].enabled !== myRoomUser.camera) {
        stream.getVideoTracks()[0].enabled = myRoomUser.camera;
        forceUpdate();
      }
    }
  }, [forceUpdate, myRoomUser?.audio, myRoomUser?.camera, myRoomUser?.stream]);

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

  let hasVideo = user.stream?.getVideoTracks()[0].enabled && user.camera;
  let hasAudio = user.audio;
  let userCharLogo = useMemo(
    () => user.name.trim()[0]?.toUpperCase(),
    [user.name],
  );

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
  }, [isMe, user.stream, hasVideo]);

  return (
    <div
      className={clsx(
        'relative aspect-video max-h-full w-full max-w-full rounded p-4',
        {
          'border border-green-500': isMe,
        },
      )}
    >
      <video
        className={clsx('h-full w-full', { 'sr-only': !hasVideo })}
        ref={videoRef}
      />

      {/* right icons */}
      <div className="absolute top-5 right-5 flex gap-2 text-neutral-500">
        {!user.camera && <BsCameraVideoOffFill />}
        {!user.audio && <BsMicMuteFill />}
      </div>

      {/* audio only logo */}
      {!hasVideo && (
        <div className="absolute top-1/2 left-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full bg-green-500 text-4xl text-white">
          {userCharLogo}
        </div>
      )}

      {/* user name */}
      <span className="absolute left-4 bottom-4 text-white">
        {isMe ? 'You' : user.name}
      </span>
    </div>
  );
}
