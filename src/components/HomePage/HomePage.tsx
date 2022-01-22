import dynamic from 'next/dynamic';
import React from 'react';

const Connection = dynamic(() => import('./Connection'), { ssr: false });

function HomePage() {
  return (
    <div>
      <Connection />
    </div>
  );
}

export default HomePage;
