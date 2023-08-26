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
        </Head>
        <body>
          {/* <Script type="text/javascript">
            {`
        var uid = '460554';
        var wid = '693103';
        var pop_tag = document.createElement('script');pop_tag.src='//cdn.popcash.net/show.js';document.body.appendChild(pop_tag);
        pop_tag.onerror = function() {pop_tag = document.createElement('script');pop_tag.src='//cdn2.popcash.net/show.js';document.body.appendChild(pop_tag)};
        `}
          </Script> */}

          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
export default WebDocument;
