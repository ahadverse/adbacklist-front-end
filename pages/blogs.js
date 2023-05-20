import axios from "axios";
import Head from "next/head";
import Link from "next/link";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
const Footer = dynamic(() => import("@/component/footer/footer2"));
const Header = dynamic(() => import("@/component/header/header"));
import style from "../styles/moduleCss/blog.module.css";
import { Input, Pagination, Select, Space } from "antd";
import category from "../public/category.json";
import { useRouter } from "next/router";

const { Search } = Input;

const Blogs = () => {
  const router = useRouter()
  const [blogs, setBlogs] = useState([]);
  const [isloading, setIsLoading] = useState(false);
  const [keyword, setKeyword] = useState("");
  const [catKey, setCatKey] = useState("");
  const [pages, setPage] = useState(router?.query?.page);

  async function getBlogs() {
    try {
      const response = await axios.get(
        `https://api-adbacklist.vercel.app/api/blogs?page=${router?.query?.page}&q=${
          catKey ? catKey : keyword
        }`
      );
      const data = response.data;

      setBlogs(data);
      setIsLoading(false);
    } catch (error) {
      setBlogs([]);
      setIsLoading(false);
      console.error(error);
    }
  }

  console.log(router?.query?.page)



  useEffect(() => {
    setIsLoading(true);

    getBlogs();
  }, [router?.query?.page, catKey, keyword]);

  // const newBlogs = blogs?.data?.blogs?.filter(a => catKey ? a.category == catKey : a.category).filter(a=> keyword ? a.title.toLowerCase().includes(keyword.toLowerCase()) : a.title)

  // const newBlogs = blogs?.data?.blogs?.filter(a => catKey ? a.category == catKey : a.category)

  const onSearch = (e) => {
    setKeyword(e);
    setCatKey("");
    setPage(1);
  };

  const onChange = (page) => {
    router.push(`/blogs?page=${page}`)
    // setPage(page);
  };



  return (
    <div className="bg-gray-100">
      <Head>
        <link rel="icon" href="/logo.png" />
        <title>Blogs</title>
      </Head>
      <Header />
      <div className="w-11/12 m-auto mt-10 sm:w-12/12">
        <div className="w-full flex items-center justify-between p-2 bg-white">
          <div>
            <p className="text-xs sm:text-base">
              Showing {blogs?.data?.blogs?.length} post of {blogs?.page}
            </p>
          </div>

          <div className="flex">
            <select
              className="p-1 rounded bg-white border mr-2 border-sky-300 select-info  max-w-xs"
              onChange={(e) => {
                setCatKey(e.target.value), setPage(1);
              }}
            >
              <option value={""}>Select Category</option>

              {category.map((a) => (
                <option value={a.name}>{a.name}</option>
              ))}
            </select>

            <Search
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
                  <Link href={`/blog/${a.permalink}?pages=${router?.query?.page}`} key={a._id}>
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
              className="flex justify-center mt-10"
              defaultCurrent={router?.query?.page}
              pageSize={6}
              onChange={onChange}
              showSizeChanger={false}
              total={blogs?.page}
            />
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Blogs;
