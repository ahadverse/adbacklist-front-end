import dynamic from "next/dynamic";
import Head from "next/head";
import Link from "next/link";
import React from "react";
const Footer = dynamic(() => import("@/component/footer/footer"));
const Header = dynamic(() => import("@/component/header/header"));

const AboutUs = () => {
  return (
    <>
      <Head>
        <title>About Us</title>
   
      <link rel="icon" href="/logo.png" />
     
      </Head>
      <Header />
      <div className="w-11/12 m-auto pt-10 sm:w-5/6">
        <div>
          <h1 className="text-xl font-bold sm:text-3xl">About Us</h1>
            <hr />
          <p className="mt-5">
             Ad Back List is the most extensive Backpage Alternative currently!
            Do you want to find the most accessible backpage replacement
            websites? You are not the only one! Ad Back List will make you happy like
            Backpages. Backpage was once the best online place to post personal
            or classified ads. It had everything, electronics, events and
            vacancy alerts. The land was also available.
          </p>
          <br />
          <p>
            Unfortunately, the location became a hub for adult content. The feds
            were not thrilled. The feds weren't thrilled! The US is the best
            place to settle your business or to make a significant investment.
            This journey began as a backpage replacement and has now become a
            pioneering force in the dynamic field of categorized records. We
            strive for excellence and make every effort to improve our services.
            The satisfaction of our clients is what keeps the US going. It also
            helps the US achieve brilliance, excellence and success. We offer
            free listing services and promise to deliver the best possible
            knowledge. We are not concerned about any illegitimate ad listing
            actions. Our goal is to make your company an absolute success by
            providing real-life and value-driven companies that meet your needs.
            Every approach we take contributes to customer delight. We enjoy
            taking pleasure in innovative add-on opportunities for customers and
            group actions that increase US trust and respect. We believe
            innovation and transparency make the US different from other
            countries.
          </p>
          <br />
          <br />
          <h1 className="text-xl font-bold sm:text-3xl">Backpage alternative websites</h1>
          <hr />
          <p className="mt-5">
            Ad Back List has an inclination to ease to show your business in an
            efficient manner. Many service providers have seen substantial
            growth in their company with the aid of free classified site. If
            you've got been sorting out partner level option to backpage, you've
            got discovered the finest backpage alternative and{" "}
            <strong>craigslist personals</strong> alternative site, Ad Back List
            categorized.
          </p>
          <br />
          <br />
          <h2 className="text-xl font-bold sm:text-3xl">Why should you select Ad Back List?</h2>
          <hr />
          <p  className="mt-5">
            Best location in brand awareness Getting individuals to understand
            concerning your company might be worn the most efficient way through
            classified advertisements on Ad Back List. We have a propensity to aid
            you to be successful in your potential customers. You will be able
            to create leads for your organization by posting free classified
            advertisements here. Once your profile is created you'll be able to
            just bear your business page' and thereby simply update photographs,
            company data, contact details, services offered, map place etc.. In
            our <strong>Craigslist Personals</strong> alternative within the
            world, it will be possible for you to attach with the verified
            clients UN agency will quickly react and thereby facilitate inside
            the rapid development of your business.
          </p>        <br />
          <p>
            Sadly, United States close up backpage classified website within the
            early 2019 for SESTA/FOSTA laws & allegation of sex trafficking
            advertisements in its adult classified part. When the ending of the
            majority of well-liked US classified website backpage.com, Ad Back List
            categorized launched to interchange backpage as a categorized
            internet site.
            <strong>Free classified advertisements</strong> sites are an
            excellent thanks to take the business to succeeding level and a
            crucial part of their digital selling strategy of the many
            companies. Thousands of free classified advertisements are being
            denoted on Ad Back List categorized regularly as a{" "}
            <strong>backpage personals classified site</strong>.{" "}
          </p>  <br />
          <p>
            Whatever you're trying to find, you may realize many classified ads
            in your city, in Ad Back List advertisements. All you have got to attempt
            to do would be to pick your location category/sub-category to search
            out the best deals offered by Ad Back List classified advertisers.
            Ad Back List supplies you with one perfect platform for reaching intent
            on many shoppers online. We tend to assist in displaying your system
            in a great way. Several service providers have been manipulation our{" "}
            <strong>free classified site</strong> for managing and growing their
            enterprise. If you are a global service provider, then this is the
            most <strong>Free Classified Sites</strong> within the world. you
            are at the proper location. For growing your business and taking it
            into a complete new degree, set up for sale on the
            <strong>
              <Link href="/" className="text-blue-400">Ad Back List</Link>
            </strong>
            . This fashion you'll have the ability to connect with your target
            market and just get business online.Collect more leads from
            Ad Back List.com is the replacement for backpage wherever you'll post
            free classified advertisements to drive your companies or providers
            on the internet.
          </p>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default AboutUs;
