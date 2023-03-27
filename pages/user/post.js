import dynamic from 'next/dynamic';
import Head from 'next/head';
import Link from 'next/link';
import React, { useState } from 'react';
const Footer = dynamic(() => import("@/component/footer/footer2"));
const Header = dynamic(() => import("@/component/header/header"));

const Post = () => {
    return (
        <div>
            <Head>
            <link rel="icon" href="/logo.png" />
            <title>Select Location</title>
            </Head>
            <Header></Header>
            <div className='w-3/4 m-auto mt-10 bg-gray-100 p-10 sm:w-2/4'>
                
                <h1 className='text-medium underline mb-5 sm:text-2xl'><Link href={`/user/free-ads/`} >1. Post Free Ads</Link></h1>
              <h1 className='text-medium underline mb-5 sm:text-2xl'>  <Link  href={`/user/local-ads/`} >2. Post Local Ads</Link></h1>
               <h1 className='text-medium underline mb-5 sm:text-2xl'> <Link  href={`/user/multiple-city-ads/`} >3. Post Ads in Multiple Cities</Link></h1>
            </div>
            <Footer/>
        </div>
    );
};

export default Post;