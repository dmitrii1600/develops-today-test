import React from 'react';
import NextNprogress from 'nextjs-progressbar';
import { AppProps } from 'next/app';

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <div>
            <NextNprogress color="green" startPosition="0.3" stopDelayMs="200" height="3" />
            <Component {...pageProps} />
        </div>
    );
};

export default MyApp;
