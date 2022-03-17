import '../styles/globals.css';
import type { AppProps } from 'next/app';
import styled from 'styled-components';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <App>
      <Component {...pageProps} />
    </App>
  );
}

const App = styled.div`
  position: relative;
  display: block;
`;

export default MyApp;
