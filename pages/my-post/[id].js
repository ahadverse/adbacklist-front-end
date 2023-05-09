import axios from "axios";
import dynamic from "next/dynamic";
import Head from "next/head";
import Link from "next/link";
import { Image } from "antd";
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
        `http://localhost:5000/api/products/${id}`,
        {
          method: "GET",
        }
      );

      const newPost = response.data.data.product?.[0];
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
            <div
              className={style.desc}
              dangerouslySetInnerHTML={{
                __html: post?.description,
              }}
            ></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">



          <Image.PreviewGroup
                    preview={{
                      onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
                    }}
                  >
                           {!post?.imgOne ||
                      post?.imgOne == "empty" ? (
                        ""
                      ) : (
                    
                        <Image
                        className={style.fImg}
                        width={200}
                        height={250}
                        src={post?.imgOne}
                      />
                      
                      )}
                      {!post?.imgTwo ||
                      post?.imgTwo == "empty" ? (
                        ""
                      ) : (
                        <Image
                          className={style.fImg}
                          width={200}
                          height={250}
                          src={post?.imgTwo}
                        />
                      )}
                      
                      {!post?.imgThree ||
                      post?.imgThree == "empty" ? (
                        ""
                      ) : (
                        <Image
                          className={style.fImg}
                          width={200}
                          height={250}
                          src={post?.imgThree}
                        />
                      )}
                      {!post?.imgFour ||
                      post?.imgFour == "empty" ? (
                        ""
                      ) : (
                        <Image
                          className={style.fImg}
                          width={200}
                          height={250}
                          src={post?.imgFour}
                        />
                      )}
                  </Image.PreviewGroup>



            </div>
          </div>
          <div>
            <ul className="m-10 text-black">
              <li className="list-disc">
                age : <span className="text-red-600">{post?.age}</span>
              </li>
              <li className="list-disc">
                Mobile : <span className="text-red-600">{post?.phone}</span>{" "}
              </li>
              <li className="list-disc">
                Email : <span className="text-red-600">{post?.email}</span>
              </li>
            </ul>
          </div>
          <Link
            className="p-2 bg-red-600 text-white"
            href={`/my-post/update/${id}`}
          >
            Edit This post
          </Link>
        </div>
      )}

      <Footer></Footer>
    </div>
  );
};

export default Details;
