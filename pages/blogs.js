import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";
import React, { useContext, useEffect, useState } from "react";
const Footer = dynamic(() => import("@/component/footer/footer2"));
const Header = dynamic(() => import("@/component/header/header"));
import style from "../styles/moduleCss/blog.module.css";
import { Input, Pagination } from "antd";
import category from "../public/category.json";
import { MyContext } from "./_app";

const { Search } = Input;

const Blogs = () => {
  const { blogcurrent, setBlogCurrent, catKey, setCatKey } =
    useContext(MyContext);
  const [blogs, setBlogs] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  // const [catKey, setCatKey] = useState("");
  const [pages, setPage] = useState(1);

  async function getBlogs() {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/blogs?page=${blogcurrent}&q=${keyword}&cat=${catKey}`
      );
      const data = response.data;

      setBlogs(data);
      setPage(data.page);
      console.log(data);
      setIsLoading(false);
    } catch (error) {
      setBlogs([]);
      setIsLoading(false);
      console.error(error);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    getBlogs();
  }, [catKey, keyword, blogcurrent]);

  const onSearch = (e) => {
    setKeyword(e);
    setBlogCurrent(1);
  };

  const onChange = (page) => {
    setBlogCurrent(page);
  };

  const changeCategory = (e) => {
    setCatKey(e.target.value);
    setBlogCurrent(1);
  };

  return (
    <div className="bg-gray-100">
      <Head>
        <link rel="icon" href="/logo.png" />
        <title>Blogs</title>
      </Head>
      <Header />
      <div className="w-11/12 m-auto mt-10 sm:w-12/12">
        <p className="text-xs  p-2 sm:text-base w-full bg-white block sm:hidden">
          Showing {blogs?.data?.blogs?.length} post of {blogs?.page}
        </p>
        <div className="w-full flex flex-col items-center  p-2 bg-white sm:flex-row sm:justify-between ">
          <p className="text-xs sm:text-base hidden sm:block">
            Showing {blogs?.data?.blogs?.length} post of {blogs?.page}
          </p>

          <div className="flex">
            <select
              className="p-1 sm:w-8/12 w-6/12 rounded bg-white border mr-2 border-sky-300 select-info  max-w-xs"
              onChange={(e) => changeCategory(e)}
              defaultValue={catKey}
            >
              {catKey && <option value={catKey}>{catKey}</option>}
              <option value={""}>Select Category</option>
              <option value={""}>All</option>

              {category.map((a) => (
                <option value={a.name}>{a.name}</option>
              ))}
            </select>

            <Search
              className=" sm:w-8/12 w-6/12"
              placeholder="title or writer name"
              onSearch={(e) => onSearch(e)}
              enterButton
            />
          </div>
        </div>
        <hr />
        {isloading ? (
          <img className="block m-auto" width={100} src="/loader.gif" />
        ) : (
          <>
            <div className={style.blogContainer}>
              <>
                {blogs?.data?.blogs?.length == 0 ? (
                  <p className="text-2xl text-red-500">No Blog Found</p>
                ) : (
                  ""
                )}
                {blogs?.length == 0 ? (
                  <p className="text-2xl text-red-500">No Blog Found</p>
                ) : (
                  ""
                )}
                {blogs?.data?.blogs.map((a) => (
                  <Link href={`/blog/${a.permalink}`} key={a._id}>
                    <div className={style.card}>
                      <img className={style.blogImage} src={a?.image} />

                      <div className="p-2">
                        <div className="flex items-center">
                          {a?.category == "Adult" ? (
                            <span className={style.category}>
                              {" "}
                              {a?.category}{" "}
                            </span>
                          ) : (
                            ""
                          )}

                          {a?.category == "Dating" ||
                          a?.category == "Jobs" ||
                          a?.category == "Services" ? (
                            <span className={style.category1}>
                              {" "}
                              {a?.category}{" "}
                            </span>
                          ) : (
                            ""
                          )}

                          {a?.category == "For Sell" ||
                          a?.category == "Community" ||
                          a?.category == "Sport and Fitness" ? (
                            <span className={style.category2}>
                              {" "}
                              {a?.category}{" "}
                            </span>
                          ) : (
                            ""
                          )}

                          {a?.category == "Real Estate" ||
                          a?.category == "Housing" ||
                          a?.category == "Pets" ||
                          a?.category == "Electronics and Computer" ? (
                            <span className={style.category3}>
                              {" "}
                              {a?.category}{" "}
                            </span>
                          ) : (
                            ""
                          )}
                        </div>
                        <h1 className="sm:text-xl font-bold text-black">
                          {a?.title}
                        </h1>
                      </div>
                    </div>
                  </Link>
                ))}
              </>
            </div>

            <Pagination
              className="mt-10 flex justify-center"
              defaultCurrent={blogcurrent}
              pageSize={6}
              onChange={onChange}
              showSizeChanger={false}
              total={pages}
            />
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Blogs;
