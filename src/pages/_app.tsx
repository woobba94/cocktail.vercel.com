import type { AppProps } from 'next/app';
import styled from 'styled-components';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <App>
      <div>칵테일 서비스</div>
      <Component {...pageProps} />
    </App>
  );
}

const App = styled.div`
  position: relative;
  display: block;
`;

export default MyApp;
