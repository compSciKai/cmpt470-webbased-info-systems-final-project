import '../assets/main.css'

import App from 'next/app'
import {Box, Footer, Grommet, grommet as grommetTheme, Main, Text} from 'grommet'
import Head from "next/head"

import dynamic from "next/dynamic";
const DefaultLayout = dynamic(() => import("../layouts/DefaultLayout"), {
  ssr: false,
});

export default class MyApp extends App {
    render() {
        const {Component, pageProps} = this.props

        return (
            <Grommet theme={grommetTheme} full>
              <Head>
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
                <meta name="theme-color" content="#ffffff" />
              </Head>

              <DefaultLayout>
                <Component {...pageProps} />
              </DefaultLayout>
              <Footer pad="small" id={'footer'} width="100%" background={{"color":"accent-1"}}>
                <Text>Made with ❤ by Adam, Alex, Daniel, Joergen, and Kainoa</Text>
              </Footer>
            </Grommet>
        )
    }
}
