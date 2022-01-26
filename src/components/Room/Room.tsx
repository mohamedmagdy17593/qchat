import React from 'react';
import RoomFooter from './RoomFooter';

function Room() {
  return (
    <div className=" grid h-screen grid-rows-[1fr,auto]">
      <div className="flex-1">{/* video Chat */}</div>

      <RoomFooter />
    </div>
  );
}

export default Room;
