import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { wss } from '../../api/socket';
import { useAppState } from '../AppContext/AppContext';
import { useRoomId } from './hooks';
import RoomCanvas from './RoomCanvas';
import RoomFooter from './RoomFooter';
import { RoomStateProvider, useRoomDispatch, useRoomState } from './RoomState';

function Room() {
  let router = useRouter();
  let roomId = useRoomId();

  let dispatch = useRoomDispatch();
  let roomState = useRoomState();
  let { user } = useAppState();

  console.log({ roomId, users: roomState.users, user });

  useEffect(() => {
    if (roomId) {
      wss.onJoiningRoom(roomId);
    }
  }, [roomId]);

  useEffect(() => {
    return wss.getRoomUsers((users) => {
      dispatch({ type: 'SET_USERS', payload: { users } });
    });
  }, [dispatch]);

  if (!user) {
    router.push(`/join?roomId=${roomId}`);
    return null;
  }

  return (
    <div className="grid h-screen select-none grid-rows-[1fr,auto]">
      <RoomCanvas />
      <RoomFooter roomId={roomId} />
    </div>
  );
}

export default function RoomWrapper() {
  return (
    <RoomStateProvider>
      <Room />
    </RoomStateProvider>
  );
}
