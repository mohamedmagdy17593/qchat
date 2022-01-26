import type { NextPage } from 'next';
import Link from 'next/link';

const Home: NextPage = () => {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <div className="flex flex-col items-center justify-center p-4">
        <h1 className="bg-gradient-to-r from-yellow-600 to-green-700 bg-clip-text text-5xl font-extrabold text-transparent sm:text-7xl">
          QChat
        </h1>

        <div className="mt-10 flex items-center space-x-6">
          <Link href={'/new'}>
            <a className="inline-block rounded-lg bg-green-700 px-5 py-3 font-medium text-white transition hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2">
              Host a Room
            </a>
          </Link>
          <Link href={'/join'}>
            <a className="inline-block text-sm text-white hover:underline focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-offset-2">
              Join a Room
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
