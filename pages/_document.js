import { Box } from '@chakra-ui/react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel='preconnect' href='https://fonts.googleapis.com' />
          <link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='true' />
          <link
            href='https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400;500;600;700;800&display=swap'
            rel='stylesheet'
          />
          <link rel='icon' href='/favicon.ico' />
          <title>Koleksi Resepi Khairulaming</title>
        </Head>
        <Box as='body' bgColor='#EDF2F7'>
          <Main />
          <NextScript />
        </Box>
      </Html>
    )
  }
}

export default MyDocument
