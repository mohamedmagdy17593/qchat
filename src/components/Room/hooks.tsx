import { useRouter } from 'next/router';
import { useMemo, useReducer } from 'react';
import { useAppState } from '../AppContext/AppContext';
import { useRoomState } from './RoomState';

export function useRoomId() {
  let router = useRouter();
  let roomId = (router.query.roomId || router.query.roomID) as string;
  return roomId;
}

export function useMyRoomUser() {
  let { user: me } = useAppState();
  let roomState = useRoomState();

  let myRoomUser = useMemo(
    () => roomState.users.find((u) => u.id === me!.id),
    [me, roomState.users],
  );

  return myRoomUser;
}

export function useForceUpdate() {
  let [, forceUpdate] = useReducer(() => ({}), {});
  return forceUpdate;
}
