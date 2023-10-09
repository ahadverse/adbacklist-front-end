import Head from "next/head";
import dynamic from "next/dynamic";
const Footer = dynamic(() => import("@/component/footer/footer"));
import styles from "../styles/moduleCss/home.module.css";
import { Inter } from "next/font/google";
import Script from "next/script";
const Index = dynamic(() => import("@/component/countries"));
const Header2 = dynamic(() => import("@/component/header/header2"));
const Search = dynamic(() => import("@/component/search/search"));

const inter = Inter({ subsets: ["vietnamese"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>
          Adbacklist Alternatives for Ebackpage| abq Backpages| queens Backpahe|
          Reno Backpage OC
        </title>
        <meta name="google" content="notranslate"></meta>
        <meta
          name="title"
          content="Adbacklist Alternatives for Ebackpage| abq Backpages| queens Backpahe| Reno Backpage OC"
        />
        <meta
          name="description"
          content="Find the top alternatives to Reno Backpage OC with Ebackpage, ABQ Backpages, and Queens Backpahe.
          Adbacklist is a worldwide website that is similar to Backpage, Everett Backpage and ebackpage. 
          Everyone like a shemale Backpage tranny or an alternative to adbacklist.com"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="keywords"
          content="abq backpages, queens Backpahe, sites similar to backpage,alternative to backpage, 
          sites like craigslist, backpage replacement, backpage escort, jobs, hole house, abq backpage,
          backpage oc,everett backpage,pgh backpage,sac backpages,asian backpage,shemale backpage,
          backpage tranny,gold country backpage,tranny backpage,reno backpages,
          backpage hook up"
        />
        <meta
          name="google-site-verification"
          content="TYiSHLlk3Y-BJ095SPo4lMOG4hSRTUyxfIKdLR-_sfs"
        />
        <meta
          name="p:domain_verify"
          content="0730451c9c8761c27a8bae02652c5f38"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-7RT66NCYS6"
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
           window.dataLayer = window.dataLayer || [];
           function gtag(){dataLayer.push(arguments);}
           gtag('js', new Date());
        
           gtag('config', 'G-7RT66NCYS6');
        `}
      </Script>

      {/* <Script type="text/javascript">
        {`
        var uid = '460554';
        var wid = '693103';
        var pop_tag = document.createElement('script');pop_tag.src='//cdn.popcash.net/show.js';document.body.appendChild(pop_tag);
        pop_tag.onerror = function() {pop_tag = document.createElement('script');pop_tag.src='//cdn2.popcash.net/show.js';document.body.appendChild(pop_tag)};
        `}
      </Script> */}

      <main className={styles.main}>
        <Header2 />
        <div className={styles.container}>
          <Search />
          <Index />
        </div>

        <Footer />
      </main>
    </>
  );
}
