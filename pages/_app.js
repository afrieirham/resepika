import { ChakraProvider } from '@chakra-ui/react'
import Head from 'next/head'
import React from 'react'

import { customTheme } from '../styles/theme'

function MyApp({ Component, pageProps }) {
  return (
    <React.Fragment>
      <Head>
        <title>Koleksi Resepi Khairulaming</title>
      </Head>
      <ChakraProvider theme={customTheme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </React.Fragment>
  )
}

export default MyApp
