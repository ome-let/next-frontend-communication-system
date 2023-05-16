import { useState } from "react";
import "../styles/globals.css";
import Head from "next/head";
import Loading from "../components/Loading";

export default function App({ Component, pageProps }) {
  const [loading, setLoading] = useState(false)
  return (
    <>
      <Head>
        <title>Ome-lete</title>
        <link rel="icon" href="/omelet_logo.png"></link>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div>
        {
          loading && <Loading />
        }
        <Component {...pageProps} setLoading={setLoading} />
      </div>
    </>
  );
}
