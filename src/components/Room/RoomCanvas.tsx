import React from 'react';
import ChatBanner from './ChatBanner';
import { useRoomState } from './RoomState';
import { useEffect } from 'react';
import { getUserMedia } from './utils';

function RoomCanvas() {
  let roomState = useRoomState();

  useEffect(() => {
    getUserMedia();
  }, []);

  return (
    <div className="relative">
      <div></div>
      {roomState.chatIsOpen && <ChatBanner />}
    </div>
  );
}

export default RoomCanvas;
