import axios from "axios";
import dynamic from "next/dynamic";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
const Footer = dynamic(() => import("@/component/footer/footer2"));
const Header = dynamic(() => import("@/component/header/header"));
import style from "../../styles/moduleCss/postDetails.module.css";

const Details = () => {
  const router = useRouter();
  const id = router?.query?.id;
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);

  async function posts(id) {
    try {
      const response = await axios.get(
        `https://api-adbacklist.vercel.app/api/products/${id}`,
        {
          method: "GET",
        }
      );

      const newPost = response.data.data.product;
      setPost(newPost);
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    setLoading(true);
    if (id) {
      posts(id);
    }
  }, [router?.query]);

  return (
    <div className="bg-white">
      <Head>
        <title>{post?.name == undefined ? "loading" : `${post?.name}`}</title>
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
            {post?.name}
          </h1>

          <hr />

          <div className={style.contentContainer}>
            <div className="w-full text-black text-sm mt-5 sm:text-base">
              {post?.description}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {post?.imgOne ? (
                <img
                  className={style.fImg}
                  width={200}
                  height={200}
                  src={post?.imgOne}
                />
              ) : (
                ""
              )}
              {post?.imgTwo ? (
                <img
                  className={style.fImg}
                  width={200}
                  height={200}
                  src={post?.imgTwo}
                />
              ) : (
                ""
              )}
              {post?.imgThree ? (
                <img
                  className={style.fImg}
                  width={200}
                  height={200}
                  src={post?.imgThree}
                />
              ) : (
                ""
              )}
              {post?.imgFour ? (
                <img
                  className={style.fImg}
                  width={200}
                  height={200}
                  src={post?.imgFour}
                />
              ) : (
                ""
              )}
            </div>
          </div>
          <div>
            <ul className="m-10 text-black">
              <li className="list-disc">
                Poster age : <span className="text-red-600">{post?.age}</span>
              </li>
              <li className="list-disc">
                Poster Mobile :{" "}
                <span className="text-red-600">{post?.phone}</span>{" "}
              </li>
              <li className="list-disc">
                Poster Email :{" "}
                <span className="text-red-600">{post?.email}</span>
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
