import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <h1>안녕하세요</h1>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
