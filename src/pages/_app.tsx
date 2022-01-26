import '../styles/globals.scss';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <div className="min-h-screen w-full bg-neutral-900">
      <Component {...pageProps} />;
    </div>
  );
}

export default MyApp;
