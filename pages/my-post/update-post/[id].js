import Footer from "@/component/footer/footer";
import Header from "@/component/header/header";
import UpdatedPost from "@/component/updatePost/updatePost";
import axios from "axios";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const UpdatePost = () => {
  const router = useRouter();
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(false);

  async function posts(id) {
    try {
      const response = await axios.get(
        `https://api3.adbacklist.com/api/products/${id}`,
        {
          method: "GET",
        }
      );
      const newPost = response.data.data.product?.[0];
      setPost(newPost);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  useEffect(() => {
    setLoading(true);
    if (router.query.id) {
      posts(router.query.id);
    }
  }, [router?.query]);

  return (
    <div>
      <Head>
        <title>Post Ads</title>

        <link rel="icon" href="/logo.png" />
      </Head>
      <Header></Header>
      <div className="py-10 bg-gray-200">
        <div className="flex justify-between items-center w-10/12 sm:w-[1050px] m-auto">
          <h1 className="text-3xl text-green-500 font-bold my-2">
            Update Post
          </h1>
          <h1
            onClick={() => router.back()}
            className="text-xl cursor-pointer text-white rounded-lg bg-red-600 px-2 py-1 font-bold my-2"
          >
            Cancel Edit
          </h1>
        </div>
        {loading ? "Loading" : <UpdatedPost post={post} />}
      </div>
      <Footer />
    </div>
  );
};

export default UpdatePost;
