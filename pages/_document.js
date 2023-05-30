import Document, { Html, Head, Main, NextScript } from "next/document";
import Script from "next/script";

class WebDocument extends Document {
  render() {
    return (
      <Html lang="en" class="notranslate" translate="no">
        <Head>
  
      
      
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
