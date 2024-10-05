import BuiltBy from "@/components/BuiltBy";
import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <script
          src="https://beamanalytics.b-cdn.net/beam.min.js"
          data-token={process.env.NEXT_PUBLIC_BEAM_ANALYTICS_DATA_TOKEN}
          async
        />
        <script
          defer
          src="https://analytics.afrieirham.com/script.js"
          data-website-id={process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}
        />
      </Head>
      <body className="bg-gray-50">
        <Main />
        <NextScript />
        <BuiltBy />
      </body>
    </Html>
  );
}
