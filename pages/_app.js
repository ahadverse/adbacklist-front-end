import "@/styles/globals.css";
import Head from "next/head";
import Script from "next/script";


export default function App({ Component, pageProps }) {

  return (
    <>
    <Head>
    <Script
        src="https://www.googletagmanager.com/gtag/js?id=UA-156492667-1"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'UA-156492667-1');
        `}
      </Script>
    </Head>




      <Component {...pageProps} />
    </>
  );
}
