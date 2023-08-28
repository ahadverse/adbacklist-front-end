import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

class WebDocument extends Document {
  render() {
    return (
      <Html lang="en" class="notranslate" translate="no">
        <Head>
          <Script
            dangerouslySetInnerHTML={{
              __html: `
                !function(e){if(!window.pintrk){window.pintrk = function () {
                  window.pintrk.queue.push(Array.prototype.slice.call(arguments))};var
                  n=window.pintrk;n.queue=[],n.version="3.0";var
                  t=document.createElement("script");t.async=!0,t.src=e;var
                  r=document.getElementsByTagName("script")[0];
                  r.parentNode.insertBefore(t,r)}}("https://s.pinimg.com/ct/core.js");
                pintrk('load', '2612823137013', { em: 'adbacklist@gmail.com' });
                pintrk('page');
              `,
            }}
          />

          <Script>
            {` pintrk('track', 'checkout', {
              value: 100,
              order_quantity: 1,
              currency: 'USD',
            });`}
          </Script>
          <Script>
            {`
             (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "im4ln2ragj");`}
          </Script>
        </Head>

        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default WebDocument;
