import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import SEO from '../components/common/SEO/SEO';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <SEO />

      <div className="min-h-screen w-full bg-neutral-900 selection:bg-green-600 selection:text-white">
        <Component {...pageProps} />;
      </div>
    </>
  );
}

export default MyApp;
