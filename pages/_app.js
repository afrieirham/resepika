import { Analytics } from "@vercel/analytics/react";
import { ChakraProvider } from "@chakra-ui/react";
import Head from "next/head";
import React from "react";

import { customTheme } from "../styles/theme";

function MyApp({ Component, pageProps }) {
  const meta = {
    title: "Koleksi Resepi Khairulaming",
    description: "Koleksi resepi daripada account @khairulaming di Instagram.",
    image: "https://resepi-khairulaming.vercel.app/og.png",
    type: "website",
  };

  return (
    <React.Fragment>
      <Head>
        <title>{meta.title}</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="follow, index" />
        <meta name="description" content={meta.description} />
        <meta property="og:type" content={meta.type} />
        <meta property="og:site_name" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:title" content={meta.title} />
        <meta property="og:image" content={meta.image} />
        <meta name="twitter:title" content={meta.title} />
        <meta name="twitter:description" content={meta.description} />
        <meta name="twitter:image" content={meta.image} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="google-site-verification"
          content="YexpalzwPHCjqpTSfxLWrBTKGCI4wyFmhjhTHWFFHN4"
        />
      </Head>
      <ChakraProvider theme={customTheme}>
        <Component {...pageProps} />
      </ChakraProvider>
      <Analytics />
    </React.Fragment>
  );
}

export default MyApp;
