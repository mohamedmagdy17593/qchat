import { useRouter } from 'next/router';
import { useEffect, useMemo, useReducer } from 'react';
import { useAppState } from '../AppContext/AppContext';
import tinykeys from 'tinykeys';
import { useRoomState } from './RoomState';
import { wss } from '../../api/socket';

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

export function useKeyboardShortcuts() {
  let myRoomUser = useMyRoomUser();

  useEffect(() => {
    let unsubscribe = tinykeys(window, {
      // toggle audio
      '$mod+KeyD'(e) {
        e.preventDefault();
        wss.changeUserState({ audio: !myRoomUser?.audio });
      },
      // toggle camera
      '$mod+KeyE'(e) {
        e.preventDefault();
        wss.changeUserState({ camera: !myRoomUser?.camera });
      },
    });
    return () => {
      unsubscribe();
    };
  });
}
