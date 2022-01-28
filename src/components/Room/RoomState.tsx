import React, { useContext, useMemo, useReducer } from 'react';

export interface User {
  id: string;
  name: string;
  roomId: string;
  stream?: MediaStream;
}

type RightBannerState = 'chat' | 'people' | null;

interface RoomState {
  rightBannerState: RightBannerState;
  users: User[];
}

type Action =
  | {
      type: 'SET_RIGHT_BANNER_STATE';
      payload: { rightBannerState: RightBannerState };
    }
  | { type: 'SET_USERS'; payload: { users: User[] } }
  | {
      type: 'SET_STREAM_FOR_USER';
      payload: { userId: string; stream: MediaStream };
    };

interface RoomContext {
  state: RoomState;
  dispatch: React.Dispatch<Action>;
}

const roomContext = React.createContext<RoomContext | null>(null);

function roomReducer(state: RoomState, action: Action): RoomState {
  switch (action.type) {
    case 'SET_RIGHT_BANNER_STATE': {
      let { rightBannerState } = action.payload;
      return {
        ...state,
        rightBannerState,
      };
    }
    case 'SET_USERS': {
      let { users } = action.payload;
      return {
        ...state,
        users,
      };
    }
    case 'SET_STREAM_FOR_USER': {
      let { userId, stream } = action.payload;
      let users = state.users.map((user) => {
        if (user.id === userId) {
          return { ...user, stream };
        }
        return user;
      });
      return {
        ...state,
        users,
      };
    }
  }
}

export let globalRoomContextValue: RoomContext;

type RoomStateProviderProps = React.PropsWithChildren<{}>;
export function RoomStateProvider({ children }: RoomStateProviderProps) {
  let [state, dispatch] = useReducer(roomReducer, {
    rightBannerState: null,
    users: [],
  } as RoomState);
  let value = useMemo(() => ({ state, dispatch }), [state]);
  globalRoomContextValue = value;
  return (
    <roomContext.Provider value={globalRoomContextValue}>
      {children}
    </roomContext.Provider>
  );
}

export function useRoomState() {
  let value = useContext(roomContext);
  if (!value) {
    throw Error(`room state provider is not provided`);
  }
  return value.state;
}

export function useRoomDispatch() {
  let value = useContext(roomContext);
  if (!value) {
    throw Error(`room state provider is not provided`);
  }
  return value.dispatch;
}
