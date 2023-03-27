import User from "@/component/user";
import dynamic from "next/dynamic";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
const Footer = dynamic(() => import("@/component/footer/footer"));
const Header = dynamic(() => import("@/component/header/header"));
import style from "../../styles/moduleCss/postDetails.module.css";

const Details = () => {
  const router = useRouter();
  const id = router?.query?.id;
  const { users, usersStringfy } = User();
  const [posts, setPost] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!users) {
      return;
    }
    if (users) {
      setLoading(true);
      fetch(
        `https://api-adbacklist.vercel.app/api/products/posterid/${users?._id}`,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${usersStringfy}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          setLoading(false);
          setPost(data?.data?.product);
        });
    }
  }, [users]);

  const postDetails = posts?.find((a) => a._id == id);

  return (
    <div className="bg-white">
      <Head>
        <title>{postDetails ? `${postDetails?.title}` : "loading"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header></Header>
      {loading ? (
        <div className="btn  bg-transparent border-0 loading flex m-auto">
          loading
        </div>
      ) : (
        <div className="m-10">
          <h1 className="text-lg text-black font-bold sm:text-2xl">
            {postDetails?.name}
          </h1>

          <hr />

          <div className={style.contentContainer}>
            <div className="w-full text-black text-sm mt-5 sm:text-base">
              {postDetails?.description}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {postDetails?.imgOne ? (
                <img
                  className={style.fImg}
                  width={200}
                  height={200}
                  src={postDetails?.imgOne}
                />
              ) : (
                ""
              )}
              {postDetails?.imgTwo ? (
                <img
                  className={style.fImg}
                  width={200}
                  height={200}
                  src={postDetails?.imgTwo}
                />
              ) : (
                ""
              )}
              {postDetails?.imgThree ? (
                <img
                  className={style.fImg}
                  width={200}
                  height={200}
                  src={postDetails?.imgThree}
                />
              ) : (
                ""
              )}
              {postDetails?.imgFour ? (
                <img
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
              {/* <li className="list-disc">
                Poster Name :{" "}
                <span>
                  {postDetails?.owner?.[0]?.firstName +
                    " " +
                    postDetails?.owner?.[0]?.lastName}
                </span>
              </li> */}
              <li className="list-disc">
                Poster age :{" "}
                <span className="text-red-600">{postDetails?.age}</span>
              </li>
              <li className="list-disc">
                Poster Mobile :{" "}
                <span className="text-red-600">{postDetails?.phone}</span>{" "}
              </li>
              <li className="list-disc">
                Poster Email :{" "}
                <span className="text-red-600">{postDetails?.email}</span>
              </li>
            </ul>
          </div>
        </div>
      )}
      <Footer></Footer>
    </div>
  );
};

export default Details;
