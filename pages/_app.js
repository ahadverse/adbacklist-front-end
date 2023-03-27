import "@/styles/globals.css";
import Script from "next/script";


export default function App({ Component, pageProps }) {

  return (
    <>
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

      <Component {...pageProps} />
    </>
  );
}
