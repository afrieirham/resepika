import { Box } from "@chakra-ui/react";
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="true"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Nunito:wght@200;300;400;500;600;700;800&display=swap"
            rel="stylesheet"
          />
          <link rel="icon" href="/favicon.ico" />
          <script
            async
            src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5654598090665312"
            crossOrigin="anonymous"
          ></script>
          <script
            src="https://beamanalytics.b-cdn.net/beam.min.js"
            data-token="52a61c07-85f9-440d-b47b-e9d0764e3c43"
            async
          ></script>
        </Head>
        <Box bgColor="#fafaf9" as="body">
          <Main />
          <NextScript />
        </Box>
      </Html>
    );
  }
}

export default MyDocument;
