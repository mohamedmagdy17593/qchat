import '../../api/wrtc';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { wss } from '../../api/socket';
import { useAppState } from '../AppContext/AppContext';
import { useKeyboardShortcuts, useRoomId } from './hooks';
import RoomCanvas from './RoomCanvas';
import RoomFooter from './RoomFooter';
import { RoomStateProvider, useRoomDispatch } from './RoomState';
import { errorToast } from '../../../utils/toast';
import { wrtc } from '../../api/wrtc';

function Room() {
  let router = useRouter();
  let roomId = useRoomId();
  let dispatch = useRoomDispatch();
  let { user } = useAppState();

  let [loading, setLoading] = useState(true);

  useEffect(() => {
    if (roomId) {
      wss.onJoiningRoom(roomId, (e) => {
        if (e) {
          errorToast(e.error);
          router.push(`/new`);
        } else {
          if (user) {
            setLoading(false);
          } else {
            router.push(`/join?roomId=${roomId}`);
          }
        }
      });
    }
  }, [roomId, router, user]);

  useEffect(() => {
    return wss.getRoomUsers((users) => {
      dispatch({ type: 'SET_USERS', payload: { users } });
    });
  }, [dispatch]);

  useEffect(() => {
    return () => {
      wss.disconnect();
      wrtc.disconnect();
    };
  }, []);

  if (loading) {
    return null;
  }

  return (
    <div className="grid h-screen select-none grid-rows-[1fr,auto]">
      <RoomLoad />

      <RoomCanvas />
      <RoomFooter roomId={roomId} />
    </div>
  );
}

function RoomLoad() {
  useKeyboardShortcuts();

  return null;
}

export default function RoomWrapper() {
  return (
    <RoomStateProvider>
      <Room />
    </RoomStateProvider>
  );
}
