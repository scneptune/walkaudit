import Head from "next/head";
import "../styles/globals.css";
import React from "react";
import SymbolDefSvg from "public/symbol-defs.svg";
import { AppProps } from "next/app";
import { OverlayProvider } from "react-aria";

export default function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="Description" />
        <meta name="keywords" content="Keywords" />
        <title>WalkAudit</title>
        <link rel="manifest" href="/manifest.json" />
        <link
          href="/icons/favicon-16x16.png"
          rel="icon"
          type="image/png"
          sizes="16x16"
        />
        <link
          href="/icons/favicon-32x32.png"
          rel="icon"
          type="image/png"
          sizes="32x32"
        />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#317EFB" />
      </Head>
      <SymbolDefSvg />
      <OverlayProvider>
        {/* <React.StrictMode> disabling due some issues with react-aria */}
        <Component {...pageProps} />
        {/* </React.StrictMode> */}
      </OverlayProvider>
    </>
  );
}
