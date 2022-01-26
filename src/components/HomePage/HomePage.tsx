import Link from 'next/link';
import React from 'react';

function HomePage() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="p-20 flex flex-col items-center justify-center border border-green-900 rounded-lg">
        <h1 className="text-3xl font-extrabold text-transparent sm:text-6xl bg-clip-text bg-gradient-to-r from-yellow-600 to-green-700">
          QChat
        </h1>

        <div className="mt-9 flex items-center space-x-6">
          <Link href={'/new'}>
            <a className="px-5 py-3 font-medium text-white bg-green-700 rounded-lg transition transform hover:bg-green-600 hover:shadow-xl">
              Host Room
            </a>
          </Link>
          <Link href={'/join'}>
            <a
              href=""
              className="inline-block text-sm font-medium text-green-700 hover:text-green-600"
            >
              Join Room
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
