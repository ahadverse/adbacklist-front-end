import Head from "next/head";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const Footer = dynamic(() => import("@/component/footer/footer"));
const Header = dynamic(() => import("@/component/header/header"));
import style from "../../styles/moduleCss/blogDetails.module.css";
import axios from "axios";
import { useRouter } from "next/router";
import Image from "next/image";


const BlogDetails = () => {
  const router = useRouter();
  const id = router.query.id;
  const [blogs, setBlogs] = useState([]);
  const [isloading, setIsLoading] = useState(false);

  async function getUser() {
    try {
      const response = await axios.get( `https://api-adbacklist.vercel.app/api/blogs?q=${id}`);
      const data = response.data.data.blogs;
      setBlogs(data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    getUser();
  }, []);

  // const single = blogs?.find((a) => a._id == id);

  console.log(blogs)

  return (
    <div className="bg-gray-100">
      <Head>
        <title>{single ? `${single?.title}` : "loading"}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      {isloading ? (
    <div className="btn  bg-transparent border-0 loading flex m-auto">
    loading...
  </div>
      ) : (
        <div className="bg-white p-3 m-4 sm:m-10">
          <Image className={style.blogImages} width={500} height={100} src={single?.image} alt="blog image" />
          <br />
          {single?.category == "Adult" ? (
            <span className={style.category}> {single?.category} </span>
          ) : (
            ""
          )}

          {single?.category == "Dating" ||
          single?.category == "Community" ||
          single?.category == "Services" ? (
            <span className={style.category1}> {single?.category} </span>
          ) : (
            ""
          )}

          {single?.category == "Buy-Sell-Trade" ||
          single?.category == "Jobs" ||
          single?.category == "Automotive" ? (
            <span className={style.category2}> {single?.category} </span>
          ) : (
            ""
          )}

          {single?.category == "Real Estate" ||
          single?.category == "Rentals" ||
          single?.category == "Local Places" ? (
            <span className={style.category3}> {single?.category} </span>
          ) : (
            ""
          )}
          <br />
          <h1 className="text-2xl text-black font-bold">
            {single?.title}
            <br className="block sm:hidden " />
            <span className="text-sm font-normal">
              
              - {single?.updatedAt?.split("T")[0]?.split(".")[0]} 
            </span>
          </h1>
          <br />

          <div
            className="mb-5 text-black"
            dangerouslySetInnerHTML={{
              __html: single?.desc,
            }}
          ></div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default BlogDetails;
