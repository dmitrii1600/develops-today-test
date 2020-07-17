import React from 'react';
import NextNprogress from 'nextjs-progressbar';
import { AppProps } from 'next/app';
import { wrapper } from '../redux/store';

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <>
            <NextNprogress color="white" startPosition="0.3" stopDelayMs="200" height="3" />
            <Component {...pageProps} />
        </>
    );
};

export default wrapper.withRedux(MyApp);
