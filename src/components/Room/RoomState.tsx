import React, { useContext, useMemo, useReducer } from 'react';

export interface User {
  id: string;
  name: string;
  roomId: string;
  stream?: MediaStream;
  audio: boolean;
  camera: boolean;
}

type RightBannerState = 'chat' | 'people' | null;

export interface Message {
  userId: string;
  message: string;
  timestamp: number;
}

export interface RoomState {
  rightBannerState: RightBannerState;
  users: User[];
  chat: Message[];
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
    }
  | {
      type: 'NEW_MESSAGE';
      payload: { userId: string; message: string };
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
        users: users.map((user) => {
          let oldUser = state.users.find((u) => u.id === user.id);
          return { ...oldUser, ...user };
        }),
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
    case 'NEW_MESSAGE': {
      let { userId, message } = action.payload;
      let timestamp = Date.now();
      return {
        ...state,
        chat: [...state.chat, { userId, message, timestamp }],
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
    chat: [],
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
