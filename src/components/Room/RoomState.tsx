import React, { useContext, useMemo, useReducer } from 'react';

export interface User {
  id: string;
  name: string;
  roomId: string;
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
  | { type: 'SET_USERS'; payload: { users: User[] } };

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
  }
}

type RoomStateProviderProps = React.PropsWithChildren<{}>;
export function RoomStateProvider({ children }: RoomStateProviderProps) {
  let [state, dispatch] = useReducer(roomReducer, {
    rightBannerState: null,
    users: [],
  } as RoomState);
  return (
    <roomContext.Provider value={useMemo(() => ({ state, dispatch }), [state])}>
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
