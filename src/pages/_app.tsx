import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <div>칵테일 서비스</div>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
