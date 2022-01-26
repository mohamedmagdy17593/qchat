import React from 'react';
import ChatBanner from './ChatBanner';
import { useRoomState } from './RoomState';

function RoomCanvas() {
  let roomState = useRoomState();

  return (
    <div className="relative">
      <div></div>
      {roomState.chatIsOpen && <ChatBanner />}
    </div>
  );
}

export default RoomCanvas;
