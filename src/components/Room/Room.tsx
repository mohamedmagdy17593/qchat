import React from 'react';
import RoomCanvas from './RoomCanvas';
import RoomFooter from './RoomFooter';
import { RoomStateProvider } from './RoomState';

function Room() {
  return (
    <RoomStateProvider>
      <div className="grid h-screen select-none grid-rows-[1fr,auto]">
        <RoomCanvas />
        <RoomFooter />
      </div>
    </RoomStateProvider>
  );
}

export default Room;
