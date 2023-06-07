import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

class WebDocument extends Document {
  render() {
    return (
      <Html lang="en" class="notranslate" translate="no">
        <Head></Head>
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
