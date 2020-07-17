import React from 'react';
import NextNprogress from 'nextjs-progressbar';
import { AppProps } from 'next/app';
import {Provider} from "react-redux";
import {store, wrapper} from '../redux/store';

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <Provider store={store}>
            <NextNprogress color="green" startPosition="0.3" stopDelayMs="200" height="3" />
            <Component {...pageProps} />
        </Provider>
    );
};

export default wrapper.withRedux(MyApp);
