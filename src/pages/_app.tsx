import '../styles/globals.scss';
import type { AppProps } from 'next/app';
import SEO from '../components/common/SEO/SEO';
import * as RadixTooltip from '@radix-ui/react-tooltip';
import { AppContext } from '../components/AppContext/AppContext';
import { Toaster } from 'react-hot-toast';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppContext>
      <RadixTooltip.Provider>
        <SEO />
        <div className="min-h-screen w-full bg-neutral-900 selection:bg-green-600 selection:text-white">
          <Component {...pageProps} />
        </div>
        <Toaster />
      </RadixTooltip.Provider>
    </AppContext>
  );
}

export default MyApp;
