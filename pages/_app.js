import "@/styles/globals.css";
import Script from "next/script";

export default function App({ Component, pageProps }) {
  return  <>
     <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=UA-156492667-1"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
       window.dataLayer = window.dataLayer || [];
       function gtag(){dataLayer.push(arguments)}
       gtag('js', new Date());
     
       gtag('config', 'UA-156492667-1');
        `}
        </Script>
        <Component {...pageProps} />
  </>

  
}
