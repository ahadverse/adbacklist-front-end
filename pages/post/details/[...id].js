import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";

import dynamic from "next/dynamic";
const Footer = dynamic(() => import("@/component/footer/footer2"));
import style from "../../../styles/moduleCss/postDetails.module.css";

import { AiOutlineMail } from "react-icons/ai";
import { BsTelephone } from "react-icons/bs";
import { ImBlocked } from "react-icons/im";
import Image from "next/image";

const Details = () => {
  const router = useRouter();
  const id = router?.query?.id;



  const [postDetails, setPost] = useState();
  const [newAds, setAds] = useState();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (id) {
      getUser(id);
      getAds()
    } else {
      return;
    }
  }, [id]);

  async function getUser(id) {
    try {
      const response = await axios.get(
        `https://api-adbacklist.vercel.app/api/products/${id?.[1]}`
      );
      setPost(response.data.data.product);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  }


  async function getAds() {
    try {
      const response = await axios.get(`https://api-adbacklist.vercel.app/api/sideads`);
      const data = response.data.ads;
      const category = data
        .filter((a) => a?.category == id?.[0])
        .slice(0, 6);
      setAds(category);
    } catch (error) {
      console.error(error);
    }
  }



  return (
    <div>
      <Head>
        <link rel="icon" href="/logo.png" />
        <title>Post Details</title>
      </Head>
      <div className="drawer">
        <input id="my-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          <div className={style.top}>
            <div className="flex justify-center items-center">
              <Link href="/" className="brand-link d-inline-block">
                <h1 className={style.title}>ADBACKLIST</h1>
              </Link>
              <div>
                <div className={style.postMenu}>
                  <Link
                    href=" /user/post/"
                    className="post-profile__btn flex items-center flex-shrink-0 p-l-5 p-r-10"
                  >
                    <div className="icon d-inline-flex align-items-center justify-content-center m-r-5">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 13"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <title>plus</title>
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M7.0799 0.0908203C6.57155 0.0908203 6.15945 0.502921 6.15945 1.01127V5.30673H1.86399C1.35564 5.30673 0.943537 5.71883 0.943537 6.22718C0.943537 6.73554 1.35564 7.14764 1.86399 7.14764H6.15945V11.4431C6.15945 11.9514 6.57155 12.3635 7.0799 12.3635C7.58825 12.3635 8.00036 11.9514 8.00036 11.4431V7.14764H12.2958C12.8042 7.14764 13.2163 6.73554 13.2163 6.22718C13.2163 5.71883 12.8042 5.30673 12.2958 5.30673H8.00036V1.01127C8.00036 0.502922 7.58825 0.0908203 7.0799 0.0908203Z"
                          fill="currentColor"
                        />
                      </svg>
                    </div>
                    <span className="color-white lh-normal">Post Ad</span>
                  </Link>
                </div>
              </div>
            </div>
            <div className={style.locationMenu}></div>
          </div>
          {/* content  */}
          <div className="bg-gray-100 pb-5 pt-5">
            <div className="m-5 p-3 bg-white">
              {loading ? (
                <div className="btn  bg-transparent border-0 loading flex m-auto">
                  loading
                </div>
              ) : (
                <>
                  <h1 className="text-lg text-black font-bold sm:text-2xl">
                    {postDetails?.name}
                  </h1>
                  <div className="flex flex-col mt-5 mb-5 sm:flex-row">
                    <button className="flex items-center justify-center bg-green-500 text-white px-2 font-bold border rounded">
                      {" "}
                      <AiOutlineMail className="text-3xl mr-2 cursor-pointer" />{" "}
                      {postDetails?.email}
                    </button>
                    <button className="flex items-center justify-center bg-orange-500 text-white px-2 font-bold border rounded">
                      {" "}
                      <BsTelephone className="text-2xl mr-2 p-1 cursor-pointer" />{" "}
                      {postDetails?.phone}
                    </button>{" "}
                  </div>
                  <hr />

                  <div className={style.contentContainer}>
                    <div className="w-full text-black text-sm mt-5 sm:text-base">
                      {postDetails?.description}
                      {postDetails?.link ? (
                        <Link
                          href={postDetails?.link}
                          target={"_blank"}
                          className="block p-2 text-blue-600 underline w-2/12"
                        >
                          Visit Now
                        </Link>
                      ) : (
                        ""
                      )}
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {postDetails?.imgOne ? (
                        <Image
                          className={style.fImg}
                          width={200}
                          height={200}
                          src={postDetails?.imgOne}
                        />
                      ) : (
                        ""
                      )}
                      {postDetails?.imgTwo ? (
                        <Image
                          className={style.fImg}
                          width={200}
                          height={200}
                          src={postDetails?.imgTwo}
                        />
                      ) : (
                        ""
                      )}
                      {postDetails?.imgThree ? (
                        <Image
                          className={style.fImg}
                          width={200}
                          height={200}
                          src={postDetails?.imgThree}
                        />
                      ) : (
                        ""
                      )}
                      {postDetails?.imgFour ? (
                        <Image
                          className={style.fImg}
                          width={200}
                          height={200}
                          src={postDetails?.imgFour}
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                  <div>
                    <ul className="m-10 text-black">
                   
                      <li className="list-disc">
                        age :{" "}
                        <span className="text-red-600">{postDetails?.age}</span>
                      </li>
                      <li className="list-disc">
                        Mobile :{" "}
                        <span className="text-red-600">
                          {postDetails?.phone}
                        </span>{" "}
                      </li>
                      <li className="list-disc">
                        Email :{" "}
                        <span className="text-red-600">
                          {postDetails?.email}
                        </span>
                      </li>
                    </ul>
                  </div>

                  <Link
                    href={`/reports/${id}__${postDetails?.owner?.[0]?._id}`}
                  >
                    <button className="flex items-center justify-center bg-red-500 text-white px-2 font-bold border rounded">
                      <ImBlocked className="text-xl mr-2 cursor-pointer" />{" "}
                      Report
                    </button>
                  </Link>

                  <br />
                  <hr />
                  <br />
            
                </>
              )}
            <h1 className="text-black text-2xl">Most Popular Ads</h1>
              <div  className="flex justify-center">
                
                {
                  newAds?.map(a => 
                  <div className="m-2">
                      <a href={`${a?.link}`} target="_blank" rel="noreferrer">
                      <img className="w-full h-36" src={a?.image} />
                      <p className="text-blue-400 underline">{a?.title}</p>
                      </a>
                  </div>)
                }

              </div>
              <div className="bg-yellow-100 p-5">
                    <h1 className="text-red-600 font-bold">Warning!!!!</h1>
                    <p className="font-bold">
                      Use your unusual feel earlier than making any pre-payment,
                      We will not be responsible for any financial loss!
                    </p>
                  </div>
            </div>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Details;
