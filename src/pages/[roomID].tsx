import dynamic from 'next/dynamic';
import React from 'react';
const Room = dynamic(() => import('../components/Room/Room'), { ssr: false });

function RoomPage() {
  return <Room />;
}

export default RoomPage;
