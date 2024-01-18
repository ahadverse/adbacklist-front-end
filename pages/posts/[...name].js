import Footer from "@/component/footer/footer";
import Header from "@/component/header/header";
import PostForm from "@/component/postForm/postForm";
import React from "react";

const PostsAhad = () => {
  return (
    <div>
      <Header />
      <div className="my-10 mx-10 p-5 bg-white">
        <PostForm />
      </div>
      <Footer />
    </div>
  );
};

export default PostsAhad;
