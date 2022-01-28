import React from 'react';
import { useRoomState } from './RoomState';
import { useEffect } from 'react';
import { getUserMedia } from './utils';
import RightBanner from './RightBanner';

function RoomCanvas() {
  let roomState = useRoomState();

  useEffect(() => {
    getUserMedia();
  }, []);

  return (
    <div className="relative">
      <div></div>
      {roomState.rightBannerState != null && <RightBanner />}
    </div>
  );
}

export default RoomCanvas;
