import App from 'next/app'
import { Grommet, grommet as grommetTheme } from 'grommet'
import { DefaultLayout } from "../layouts/DefaultLayout";

export default class MyApp extends App {
    render() {
        const {Component, pageProps} = this.props
        return (
            <Grommet theme={grommetTheme} full>
                <DefaultLayout>
                  <Component {...pageProps} />
                </DefaultLayout>
            </Grommet>
        )
    }
}
