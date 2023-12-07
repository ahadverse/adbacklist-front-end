import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { Image } from "antd";
import dynamic from "next/dynamic";
const Footer = dynamic(() => import("@/component/footer/footer2"));
import style from "../../../styles/moduleCss/postDetails.module.css";

import { AiOutlineMail } from "react-icons/ai";
import { BsTelephone } from "react-icons/bs";
import { ImBlocked } from "react-icons/im";
import { findPostMeta } from "@/component/postmeta";

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
      getAds();
    } else {
      return;
    }
  }, [id]);

  async function getUser(id) {
    try {
      const response = await axios.get(
        `https://api3.adbacklist.com/api/products/${id?.[1]}`
      );
      setPost(response.data.data.product[0]);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  }

  async function getAds() {
    try {
      const response = await axios.get(
        `https://api3.adbacklist.com/api/sideads`
      );
      const data = response.data.ads;

      const category = data.filter((a) => a?.category == id?.[0]).slice(0, 6);
      setAds(category);
    } catch (error) {
      console.error(error);
    }
  }

  const meta = findPostMeta(router.query);

  return (
    <div>
      <Head>
        <link rel="icon" href="/logo.png" />
        <title>{postDetails?.name?.slice(0, 65)}</title>

        <meta name="title" content={`${postDetails?.name?.slice(0, 65)}`} />
        <meta
          name="description"
          content={`${postDetails?.description?.slice(0, 318)}`}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content={`${meta?.keywords}`} />
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
                <img className="block m-auto" width={100} src="/loader.gif" />
              ) : (
                <>
                  <h1 className="text-lg text-black font-bold sm:text-2xl ">
                    {postDetails?.name}
                  </h1>
                  <div className="flex flex-col mt-5 mb-5 sm:flex-row">
                    {postDetails?.email ? (
                      <a
                        href={`mailto:${postDetails?.email}`}
                        className="flex items-center justify-center bg-green-500 text-white px-2 font-bold border rounded"
                      >
                        {" "}
                        <AiOutlineMail className="text-3xl mr-2 cursor-pointer" />{" "}
                        {postDetails?.email}
                      </a>
                    ) : (
                      ""
                    )}
                    {postDetails?.phone ? (
                      <a
                        href={`tel:${postDetails?.phone}`}
                        className="flex items-center justify-center bg-orange-500 text-white px-2 font-bold border rounded"
                      >
                        {" "}
                        <BsTelephone className="text-2xl mr-2 p-1 cursor-pointer" />{" "}
                        {postDetails?.phone}
                      </a>
                    ) : (
                      ""
                    )}{" "}
                  </div>

                  <div className="border-4 rounded border-dashed border-green-600 mt-10 w-full m-auto sm:w-3/5">
                    <h1 className="text-red-600 font-bold text-center sm:text-3xl text-base ">
                      SCAM Alert !!!!!
                    </h1>
                    <p className="font-bold text-center sm:text-base text-xs">
                      If ad poster asks for money, credit card info, cashapp,
                      gift card or tell you to verify in another website,
                      consider its a SCAM !
                      <br />
                      Don't pay anything before meet the Provider!
                    </p>
                  </div>
                  <div className="bg-blue-200 mt-2 text-center py-2 mb-5  w-full m-auto sm:w-3/5 sm:text-base text-xs ">
                    When you call, tell me that you saw my ad on Adbacklist
                  </div>

                  <hr />

                  <div className={style.contentContainer}>
                    <div
                      className={style.desc}
                      dangerouslySetInnerHTML={{
                        __html: postDetails?.description,
                      }}
                    ></div>

                    <div className={style.postImages}>
                      <Image.PreviewGroup
                        preview={{
                          onChange: (current, prev) =>
                            console.log(
                              `current index: ${current}, prev index: ${prev}`
                            ),
                        }}
                      >
                        {!postDetails?.imgTwo ||
                        postDetails?.imgTwo == "empty" ? (
                          ""
                        ) : (
                          <Image
                            className={style.fImg}
                            width={200}
                            height={250}
                            src={postDetails?.imgTwo}
                          />
                        )}

                        {!postDetails?.imgThree ||
                        postDetails?.imgThree == "empty" ? (
                          ""
                        ) : (
                          <Image
                            className={style.fImg}
                            width={200}
                            height={250}
                            src={postDetails?.imgThree}
                          />
                        )}

                        {!postDetails?.imgOne ||
                        postDetails?.imgOne == "empty" ? (
                          ""
                        ) : (
                          <Image
                            className={style.fImg}
                            width={200}
                            height={250}
                            src={postDetails?.imgOne}
                          />
                        )}
                        {!postDetails?.imgFour ||
                        postDetails?.imgFour == "empty" ? (
                          ""
                        ) : (
                          <Image
                            className={style.fImg}
                            width={200}
                            height={250}
                            src={postDetails?.imgFour}
                          />
                        )}
                      </Image.PreviewGroup>
                    </div>
                  </div>

                  <Link
                    href={`/reports/${id?.[1]}__${postDetails?.owner?.[0]?._id}`}
                  >
                    <button className="flex items-center justify-center bg-red-500 text-white px-2 font-bold border rounded">
                      <ImBlocked className="text-xl mr-2 cursor-pointer" /> Ad
                      Report
                    </button>
                  </Link>

                  <br />
                  <hr />
                  <br />
                </>
              )}

              {newAds?.length ? (
                <h1 className="text-black text-2xl">Most Popular Ads </h1>
              ) : (
                ""
              )}

              <div className="grid sm:grid-cols-4 m-auto grid-cols-2">
                {newAds?.map((a) => (
                  <div className="m-2 text-blue-600" key={a._id}>
                    <a
                      href={`${a?.link}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600"
                    >
                      <img src={a?.image} width={250} />
                      <p className="text-blue-400 underline sm:w-[250px] w-full text-sm sm:text-base">
                        {a?.title?.slice(0, 50)}
                      </p>
                    </a>
                  </div>
                ))}
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
