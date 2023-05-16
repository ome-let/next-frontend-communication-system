import "../styles/globals.css";
import Head from "next/head";


export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Ome-lete</title>
        <link rel="icon" href="/omelet_logo.png"></link>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div>
        <Component {...pageProps} />
      </div>
    </>
  );
}
