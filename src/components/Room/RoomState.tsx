import React, { useContext, useMemo, useReducer } from 'react';

interface RoomState {
  chatIsOpen: boolean;
}

type Action = { type: 'SET_CHAT_IS_OPEN'; payload: { chatIsOpen: boolean } };

interface RoomContext {
  state: RoomState;
  dispatch: React.Dispatch<Action>;
}

const roomContext = React.createContext<RoomContext | null>(null);

function roomReducer(state: RoomState, action: Action): RoomState {
  switch (action.type) {
    case 'SET_CHAT_IS_OPEN': {
      let { chatIsOpen } = action.payload;
      return {
        ...state,
        chatIsOpen,
      };
    }
  }
}

type RoomStateProviderProps = React.PropsWithChildren<{}>;
export function RoomStateProvider({ children }: RoomStateProviderProps) {
  let [state, dispatch] = useReducer(roomReducer, { chatIsOpen: false });
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
