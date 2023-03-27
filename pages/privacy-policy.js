import dynamic from "next/dynamic";
import Head from "next/head";
import React from "react";
const Footer = dynamic(() => import("@/component/footer/footer2"));
const Header = dynamic(() => import("@/component/header/header"));

const PrivacyPolicy = () => {
  return (
    <div>
      <Head>
      <link rel="icon" href="/logo.png" />
      <title>Privacy Policy</title>
      </Head>
        <Header />
      <div className="w-11/12 m-auto pt-10 sm:w-5/6">
        <h1  className="text-xl font-bold sm:text-3xl text-white">Privacy Policy</h1>
        <hr />
        <br />
        <strong>
          Ad Back List is a legal Classified Site to promote affiliates. You can put
          up anything on the Site and find jobs. Below is our online Privacy
          Policy on this website:
        </strong>
        <br />
        <br />

        <h1 className="text-xl font-bold sm:text-3xl text-white">Post & Protection:</h1>
        <hr />

        <p className="mt-2">
          We'd like to inform you that Ad Back List will not accept any fraud or
          scams and much more. Ad Back List is a place open for all anyone is welcome
          to post any information here. However, we have a particular rule to
          protect our customers and everyone else. It is not allowed to use
          scams on Ad Back List. If anyone uploads any photos and there is a
          complaint regarding the photo or other personal concerns, We will
          remove the image and take it down. Ad Back List will always be your legal
          protection. You can use Ad Back List however you like and worry about
          privacy!
        </p>
        <br />
        <br />
        <h2  className="text-xl font-bold sm:text-3xl text-white">Acceptance of online privacy policies</h2>
        <hr />

        <p className="mt-2">
          When you access, use the article, write an article, answer or browse
          the Site by using the Site, you acknowledge your acceptance of the
          current online privacy policy. If you disagree with the Privacy Policy
          If you don't, then you're not authorized to use the Site and should
          end your use of the Site immediately.
        </p>
        <br />
        <br />
        <h2  className="text-xl font-bold sm:text-3xl text-white">Group and the application of private information </h2>
        <hr />
        <p className="mt-2">
          We gather private information on you whenever you participate in trade
          transactions through the Site, utilize the products and services
          offered by the Site, request information or materials and upgrade or
          make changes to your account information, place orders, make purchases
          and even browse the website. For example, the information we gather
          and save on you could include your first and last name, your current
          email address for debit or credit card number, contact information
          billing and sending information, and command records, with any other
          pertinent information about your personal.
        </p>
        <br />
        <br />
        <h2  className="text-xl font-bold sm:text-3xl text-white">We can make use of the information we gather to:</h2>
        <hr />
        <li className="mt-2">present remarkable providers;</li>
        <li>
          Get ready for a variety of news and other information that you might
          be interested in;
        </li>
        <li>
          urge you to make use of brand new characteristics, articles, and
          provisions as well as products and services suppliers;
        </li>
        <li>
          Get in touch with a representative regarding your article, questions,
          or advice on accounts;
        </li>
        <li>procedure and address your own questions;</li>

        <li> Enhance the Website</li>
        <li>
          {" "}
          Monitor and oversee the usage of the website, For example, articles,
          answers, or accounting advice.
        </li>
        <li> Implement the Terms of Use (together with the"Tasks").</li>
        <br />
        <p>
          You have given the website permission to send emails for users to
          reply to their messages and manage Actions. However, if you opt to
          receive notifications, you need to accept and agree that the Site
          sends text messages to phones on mobiles, and it could also lead to
          some text or data costs that will be used.
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
