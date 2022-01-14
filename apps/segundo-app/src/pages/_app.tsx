import {useEffect} from "react";
import { AppProps } from 'next/app';

import '../../styles/app.scss';

function CustomApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
      document.querySelector('body')?.classList.remove('main')
  })
  return (
      <Component {...pageProps} />
  );
}

export default CustomApp;
