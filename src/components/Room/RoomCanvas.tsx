import React, { useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useRoomState, useRoomDispatch, User } from './RoomState';
import { useEffect } from 'react';
import RightBanner from './RightBanner';
import { wrtc } from '../../api/wrtc';
import { useAppState } from '../AppContext/AppContext';
import clsx from 'clsx';
import { useForceUpdate, useMyRoomUser } from './hooks';
import { BsCameraVideoOffFill, BsMicMuteFill } from 'react-icons/bs';
import AudioViz from './AudioViz';
import { useAudioViz } from './AudioViz';
import { useMediaQuery } from 'react-responsive';
import { breakpoints } from '../common/Media/Media';

function RoomCanvas() {
  let dispatch = useRoomDispatch();
  let { user: me } = useAppState();
  let roomState = useRoomState();

  let forceUpdate = useForceUpdate();
  let myRoomUser = useMyRoomUser();
  let isMd = useMediaQuery({ minWidth: breakpoints.md });

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
      {isMd ? (
        // Desktop
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
      ) : (
        // Mobile
        roomState.rightBannerState == null && (
          <div
            className={clsx(
              'grid h-full w-full place-items-center items-center justify-center gap-4',
            )}
          >
            {roomState.users.map((user) => {
              return <Video key={user.id} user={user} />;
            })}
          </div>
        )
      )}
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
        {user.audio && <AudioViz user={user} />}
      </div>

      {/* audio only logo */}
      {!hasVideo && <UserLogo user={user} />}

      {/* user name */}
      <span className="absolute left-4 bottom-4 text-white">
        {isMe ? 'You' : user.name}
      </span>
    </div>
  );
}

interface UserLogoProps {
  user: User;
}

function UserLogo({ user }: UserLogoProps) {
  let userCharLogo = useMemo(
    () => user.name.trim()[0]?.toUpperCase(),
    [user.name],
  );

  let scaleValue = useAudioViz({ user, scale: 3 });

  return (
    <div className="absolute top-1/2 left-1/2 flex h-24 w-24 -translate-x-1/2 -translate-y-1/2 transform items-center justify-center rounded-full bg-green-500 text-4xl text-white">
      {userCharLogo}

      <div
        className="absolute inset-0 h-full w-full rounded-full bg-green-600/10"
        style={{ transform: `scale(${scaleValue})` }}
      ></div>
    </div>
  );
}
