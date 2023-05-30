import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";
class WebDocument extends Document {
  render() {
    return (
      <Html lang="en" class="notranslate" translate="no">
        <Head>
          {/* <Script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-M31GFLRX0Q"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments)}
          gtag('js', new Date());
        
          gtag('config', 'G-M31GFLRX0Q');
        `}
          </Script> */}

          {/* <Script
            strategy="afterInteractive"
            dangerouslySetInnerHTML={{
              __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-5DTNFG5');`,
            }}
          ></Script> */}
                <Script
            async
            src="https://www.googletagmanager.com/gtag/js?id=G-F98PNY7PQR"
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
           window.dataLayer = window.dataLayer || [];
           function gtag(){dataLayer.push(arguments);}
           gtag('js', new Date());
        
           gtag('config', 'G-F98PNY7PQR');
        `}
          </Script>
        </Head>
        <body>
          {/* <noscript
            dangerouslySetInnerHTML={{
              __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-5DTNFG5"
            height="0" width="0" style="display:none;visibility:hidden"></iframe>`,
            }}
          ></noscript> */}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default WebDocument;
