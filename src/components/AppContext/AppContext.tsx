import React, { createContext, useContext, useMemo, useState } from 'react';

import { User } from '../Room/RoomState';

interface AppContext {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const appContext = createContext<AppContext | null>(null);

export let globalAppContext: AppContext;

export function AppContext({ children }: React.PropsWithChildren<{}>) {
  let [user, setUser] = useState<User | null>(null);

  let value = useMemo(() => ({ user, setUser }), [user]);
  globalAppContext = value;

  return <appContext.Provider value={value}>{children}</appContext.Provider>;
}

export function useAppState() {
  let value = useContext(appContext);
  if (!value) {
    throw Error(`app state provider is not provided`);
  }
  return value;
}
