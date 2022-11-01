import Auth from '@/components/Auth/Auth'
import { theme } from '@/constants/theme'
import { wrapper } from '@/store/store'
import { GlobalStyle } from '@/styles'
import { AppComponentProps } from '@/types'
import { appWithTranslation } from 'next-i18next'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { NextComponentType } from 'next/types'
import { Provider, useStore } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from 'styled-components'

type CustomAppProps = AppProps & {
  Component: NextComponentType & AppComponentProps
}

function MyApp({ Component, pageProps }: CustomAppProps) {
  const store = useStore()

  const getLayout = Component.getLayout || (page => page)

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no"
        ></meta>
      </Head>
      <Provider store={store}>
        <PersistGate loading={null} persistor={store.__persistor}>
          <ThemeProvider theme={theme}>
            <GlobalStyle />
            {Component.auth ? (
              <Auth {...Component.auth}>
                {getLayout(<Component {...pageProps} />)}
              </Auth>
            ) : (
              getLayout(<Component {...pageProps} />)
            )}
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </>
  )
}

export default wrapper.withRedux(appWithTranslation(MyApp))
