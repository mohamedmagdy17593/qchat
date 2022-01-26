import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import SEO from '../components/common/SEO/SEO';
import * as RadixTooltip from '@radix-ui/react-tooltip';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <RadixTooltip.Provider>
      <SEO />

      <div className="min-h-screen w-full bg-neutral-900 selection:bg-green-600 selection:text-white">
        <Component {...pageProps} />;
      </div>
    </RadixTooltip.Provider>
  );
}

export default MyApp;
