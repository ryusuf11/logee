import type { AppProps } from 'next/app';
import Head from 'next/head';
import { QueryCache, QueryClient, QueryClientProvider } from 'react-query';
import { Inter } from '@next/font/google';

import '@/styles/global.scss';
import { ReactElement, ReactNode } from 'react';
import { NextPage } from 'next';

const queryCache = new QueryCache();
const queryClient = new QueryClient({
  queryCache,
  defaultOptions: {
    queries: {
      staleTime: 3 * 60 * 1000, // 3 menit
      refetchOnWindowFocus: false,
      cacheTime: 5 * 60 * 1000, // 5 menit
      retry: false,
    },
  },
});

const inter = Inter({
  subsets: ['latin'],
});

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(
    <>
      <Head>
        <title>Telkom</title>
        <link rel="icon" href="/favicon.ico" />
        <meta
          name="viewport"
          content="width=device-width, minimum-scale=1, initial-scale=1"
        />
        <meta name="description" content="Telkom" />

        <style jsx global>{`
          html {
            font-family: ${inter.style.fontFamily};
          }
        `}</style>
      </Head>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </>,
  );
}
