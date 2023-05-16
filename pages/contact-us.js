
import dynamic from "next/dynamic";
import Head from "next/head";
import Link from "next/link";
import React from "react";
const Footer = dynamic(() => import("@/component/footer/footer"));
const Header = dynamic(() => import("@/component/header/header"));
//https://api-adbacklist.vercel.app
const ContactUs = () => {
  return (
    <div>
        <Head>
            <title>
            <link rel="icon" href="/logo.png" />
                Contact Us
            </title>
        </Head>
        <Header />
      <div className="w-11/12 m-auto pt-10 sm:w-5/6">
        <h1  className="text-xl font-bold sm:text-3xl text-white">Contact Us</h1>
        <hr />
        <br />
        <p>
          We are here to provide your assistance only. Our customer support team
          is available to answer promptly. If you're facing any minor problem,
          contact us anytime to get assistance and solutions. We provide the
          best assistance and responsiveness. Our customers are happy with our
          support and work in addition. We're always eager to help you. Tell us
          about your problem and how we can assist you! Ad Back List Customer support
          is offered at no cost. We are available all day, so you don't have to
          worry about response times. Contact us anytime, and you will receive
          the best service. Live support agents are available 24/7 to help with
          any questions you might need! So chat with us and find the best
          solution!
        </p>
        <br />
        <strong>Live Chat</strong>
        <p>
          Our live representatives are available 24/7 to assist you with any and
          all questions you may have.{" "}
        </p>
        <strong>Contact Us : </strong>
        <strong>Email - adbacklist@gmail.com</strong>
     
        <br />
        <br />
        <br />
        <h1  className="text-xl font-bold sm:text-3xl text-white">Contact Best Website similar to Backpage [Ad Back List] </h1>
        <hr />
        <br />
        <p>
          Ad Back List is the most popular{" "}
          <Link href="/" target="_self" className="text-blue-400">
            backpage replacement
          </Link>{" "}
          currently! It is the most reliable website,{" "}
          <Link href="/" target="_self" className="text-blue-400">
            similar to Backpage
          </Link>
          . Are you looking for the most straightforward alternative sites to
          Backpage? It's not all alone! Ad Back List will ensure that you are
          satisfied with Backpages. The site was once the best online site for
          personal or commercial ads; Backpage was a one-stop shop for
          everything from electronics to events, alerts for vacant land, and
          more. However, later on, it became the center of questionable adult
          content. Evidently, the federal authorities were not thrilled! After
          more revelations surfaced based on the digital seams, the government
          eventually pulled the connection this fall and enlisted the FBI to
          permanently remove the location.
        </p>
        <p>
          Wait a minute, do you think the age of backpages and similar websites
          finally means that they are over and entirely over?
        </p>
        <br />
        <h2 className="text-xl font-bold sm:text-3xl text-white">Similar to Backpage Websites [Ad Back List]</h2>
        <hr />
        <br />
        <p>
          When Backpage.com was shut down entirely, all web users gathered and
          went to search for the next. Legally classified ad sites on the
          internet. In this the spirit of this article, we review the 10 most
          trusted and highly reliable similar to backpage sites that we think
          will offer the most simple experience - free of deceit, serious fraud,
          or untrustworthy. Before you endorse adding to the list, look at the
          newest backpage alternative websites
        </p>
      </div>
      <Footer />
    </div>
  );
};

export default ContactUs;
