import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import Head from "next/head";
import Cookies from "js-cookie";
import axios from "axios";
import style from "../../styles/postPage.module.css";
const Footer = dynamic(() => import("@/component/footer/footer"));
const Header = dynamic(() => import("@/component/header/header"));
import Image from "next/image";
import { Pagination } from "antd";

const initialState = {
  day1: [],
  day2: [],
  day3: [],
  day4: [],
  day5: [],
  day6: [],
  day7: [],
  lastWeek: [],
  day1time: "",
  day2time: "",
  day3time: "",
  day4time: "",
  day5time: "",
  day6time: "",
  day7time: "",
  lastWeekTime: "",
};

const Post = () => {
  const router = useRouter();
  const [state, setState] = useState(initialState);
  const [ads, setAds] = useState([]);
  const [post, setPost] = useState();
  const [error, setError] = useState("no error");
  const [freeCityPost, setFreeCityPost] = useState();
  const [premiumCityPost, setPremiumCityPost] = useState();
  const [reload, setReload] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [age, setAge] = useState("");
  const [pages, setPages] = useState(1);

  const [page, setPage] = useState(1);

  console.log(freeCityPost , "Asdfa")


  async function getPosts() {
    try {
      const response = await axios.get(`https://api-adbacklist.vercel.app/api/products/all?page=${page}&category=${router?.query?.names?.[2]}&state=${router?.query?.names[0]}`
      );



      setPages(response.data.pages);
 


      const cityPost = response.data.data.products
      const day1time = new Date().toDateString();
      const day1 = cityPost.filter(
        (a) => new Date(a.updatedAt).toDateString() == day1time
      );

      const day2time = new Date(
        new Date().getTime() - 24 * 60 * 60 * 1000
      ).toDateString();
      const day2 = cityPost.filter(
        (a) => new Date(a.updatedAt).toDateString() == day2time
      );

      const day3time = new Date(
        new Date().getTime() - 24 * 60 * 60 * 1000 * 2
      ).toDateString();
      const day3 = cityPost.filter(
        (a) => new Date(a.updatedAt).toDateString() == day3time
      );

      const day4time = new Date(
        new Date().getTime() - 24 * 60 * 60 * 1000 * 3
      ).toDateString();
      const day4 = cityPost.filter(
        (a) => new Date(a.updatedAt).toDateString() == day4time
      );

      const day5time = new Date(
        new Date().getTime() - 24 * 60 * 60 * 1000 * 4
      ).toDateString();
      const day5 = cityPost.filter(
        (a) => new Date(a.updatedAt).toDateString() == day5time
      );

      const day6time = new Date(
        new Date().getTime() - 24 * 60 * 60 * 1000 * 5
      ).toDateString();
      const day6 = cityPost.filter(
        (a) => new Date(a.updatedAt).toDateString() == day6time
      );

      const day7time = new Date(
        new Date().getTime() - 24 * 60 * 60 * 1000 * 6
      ).toDateString();
      const day7 = cityPost.filter(
        (a) => new Date(a.updatedAt).toDateString() == day7time
      );

      const lastWeek = cityPost.filter(
        (a) =>
          new Date(a.updatedAt).toDateString() !== day7time &&
          new Date(a.updatedAt).toDateString() !== day1time &&
          new Date(a.updatedAt).toDateString() !== day2time &&
          new Date(a.updatedAt).toDateString() !== day3time &&
          new Date(a.updatedAt).toDateString() !== day4time &&
          new Date(a.updatedAt).toDateString() !== day5time &&
          new Date(a.updatedAt).toDateString() !== day6time
      );

      setState({
        ...state,
        day1: day1,
        day1time: day1time,
        day2: day2,
        day2time: day2time,
        day3: day3,
        day3time: day3time,
        day4: day4,
        day4time: day4time,
        day5: day5,
        day5time: day5time,
        day6: day6,
        day6time: day6time,
        day7: day7,
        day7time: day7time,
        lastWeek: lastWeek,
      });
 

      setPost(cityPost);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
  }



  async function getAds() {
    try {
      const response = await axios.get(`https://api-adbacklist.vercel.app/api/sideads`);
      const data = response.data.ads;
      const category = data
        .filter((a) => a?.category == router?.query?.names?.[1])
        .slice(0, 4);
      setAds(category);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    setIsLoading(true);
    if (!router?.query?.names) {
      return;
    } else {
      getPosts();
      getAds();
    }
  }, [router?.query, page]);

  useEffect(() => {
    if (router?.query?.names) {
      const premiumPost = post?.filter((a) => a.isPremium == true);
      setPremiumCityPost(premiumPost);
      const freePost = post?.filter((a) => a.isPremium == false);

      setFreeCityPost(freePost);
    }
  }, [post, router?.query?.names, reload,page ]);

  const onChange = (pageNumber) => {
    setPage(pageNumber);
  };

  const setAdult = (e) => {
    Cookies.set("age", e);
    setReload(!reload);
  };

  useEffect(() => {
    const useOld = Cookies.get("age");
    setAge(useOld);
  }, [reload]);




  return (
    <div className={style.container}>
      <Head>
        <title> Posts</title>

        <link rel="icon" href="/logo.png" />
      </Head>
      <Header data={router?.query?.names} />

      {isLoading ? (
        <div
          style={{ height: "700px" }}
          className="flex justify-center items-center"
        >
          <img className="" width={100} src="/loader.gif" />
        </div>
      ) : (
        <>
          {router?.query?.names?.[1] == "Adult" && age == undefined ? (
            <div className={style.warning}>
              <h1 className={style.warningTitle}>Disclaimer</h1>
              <p className={style.warningText}>
                This section contains sexual containt.including pictorial nudity
                adult language. It is to be accessed only by persons who are 21
                years of age or older (and is not considered to be a minor in
                his/her state of residence) and who live in a community or local
                jurisdiction where nude pictures and explicit adult materials
                are not prohibited by law. By accessing this website, you are
                representing to us that you meet the above qualifications.
              </p>
              <div>
                <button
                  className={style.adultAgreedButton}
                  onClick={() => setAdult("Adult")}
                >
                  I am over 21
                </button>
                <Link href={"/"}>
                  <button className={style.adultDisgreedButton}>Exit</button>
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <div className={style.mainContainer}>
                <div className={style.postContainer}>
                  <ul className={style.breadcrumbs}>
                    <li>
                      <Link href={`/`}>Home</Link>
                    </li>
                    &#62;
                    {router?.query?.names ? (
                      <>
                        <li>
                          <Link href={`/${router?.query?.names[0]}`}>
                            {router?.query?.names[0]}
                          </Link>
                        </li>
                        &#62;
                        <li>
                          <Link href={`/${router?.query?.names[1]}`}>
                            {router?.query?.names[1]}
                          </Link>
                        </li>
                        &#62;
                        <li>{router?.query?.names[2]}</li>
                      </>
                    ) : (
                      "Loading"
                    )}
                  </ul>


                  {error == "no error" ? (
                    <>

                    <div>
                       {!premiumCityPost?.length == 0 && (
                          <h1 className={style.premiumpostTitle2}>
                           Premium Ads
                          </h1>
                        )}
                          {
                            freeCityPost?.map(a=>  
                              <Link
                                href={`/post/details/${router?.query?.names?.[1]}/${a._id}`}
                                key={a._id}
                              >
                                <div className={style.productContainer}>
                                  <p className="text-sm text-blue-600 sm:text-base hover:underline">
                                    {a?.name}--
                                    <span className="text-black">
                                      {a?.age}
                                    </span>
                                  </p>
                                </div>
                              </Link>
                       
                          )}
                    </div>

                      <div>
                        {!premiumCityPost?.length == 0 && (
                          <h1 className={style.freepostTitle}>
                            Ads
                          </h1>
                        )}
                        <>
                          {!state.day1?.length == 0  & !premiumCityPost?.length == 0 ? (
                            <h1 className={style.premiumpostTitle}>
                              {state.day1time} 
                            </h1>
                          ) : (
                            ""
                          )}

                          {state.day1?.map((p) => (
                            <div>
                              {p.isPremium == true ? (
                                <Link
                                  href={`/post/details/${router?.query?.names?.[1]}/${p._id}`}
                                  key={p._id}
                                >
                                  <div className={style.productContainer}>
                                    <p className="text-sm text-blue-600 sm:text-base hover:underline">
                                      {p?.name}--
                                      <span className="text-black">
                                        {p?.age}
                                      </span>
                                    </p>
                                  </div>
                                </Link>
                              ) : (
                                ""
                              )}
                            </div>
                          ))}
                        </>
                        <>
                          {!state.day2?.length == 0  & !premiumCityPost?.length == 0 ?  (
                            <h1 className={style.premiumpostTitle}>
                              {state.day2time}
                            </h1>
                          ):""}

                          {state.day2?.map((p) => (
                            <div>
                              {p.isPremium == true ? (
                                <Link
                                  href={`/post/details/${router?.query?.names?.[1]}/${p._id}`}
                                  key={p._id}
                                >
                                  <div className={style.productContainer}>
                                    <p className="text-sm text-blue-600 sm:text-base hover:underline">
                                      {p?.name}-
                                      <span className="text-black">
                                        {p?.age}
                                      </span>
                                    </p>
                                  </div>
                                </Link>
                              ) : (
                                ""
                              )}
                            </div>
                          ))}
                        </>
                        <>
                          {!state.day3?.length == 0  & !premiumCityPost?.length == 0 ? (
                            <h1 className={style.premiumpostTitle}>
                              {state.day3time} 
                            </h1>
                          ):""}

                          {state.day3?.map((p) => (
                            <div>
                              {p.isPremium == true ? (
                                <Link
                                  href={`/post/details/${router?.query?.names?.[1]}/${p._id}`}
                                  key={p._id}
                                >
                                  <div className={style.productContainer}>
                                    <p className="text-sm text-blue-600 sm:text-base hover:underline">
                                      {p?.name}-
                                      <span className="text-black">
                                        {p?.age}
                                      </span>
                                    </p>
                                  </div>
                                </Link>
                              ) : (
                                ""
                              )}
                            </div>
                          ))}
                        </>
                        <>
                          {!state.day4?.length == 0  & !premiumCityPost?.length == 0 ? (
                            <h1 className={style.premiumpostTitle}>
                              {state.day4time}
                            </h1>
                          ):""}

                          {state.day4?.map((p) => (
                            <div>
                              {p.isPremium == true ? (
                                <Link
                                  href={`/post/details/${router?.query?.names?.[1]}/${p._id}`}
                                  key={p._id}
                                >
                                  <div className={style.productContainer}>
                                    <p className="text-sm text-blue-600 sm:text-base hover:underline">
                                      {p?.name}-
                                      <span className="text-black">
                                        {p?.age}
                                      </span>
                                    </p>
                                  </div>
                                </Link>
                              ) : (
                                ""
                              )}
                            </div>
                          ))}
                        </>
                        <>
                          {!state.day5?.length == 0  & !premiumCityPost?.length == 0 ? (
                            <h1 className={style.premiumpostTitle}>
                              {state.day5time}
                            </h1>
                          ):""}

                          {state.day5?.map((p) => (
                            <div>
                              {p.isPremium == true ? (
                                <Link
                                  href={`/post/details/${router?.query?.names?.[1]}/${p._id}`}
                                  key={p._id}
                                >
                                  <div className={style.productContainer}>
                                    <p className="text-sm text-blue-600 sm:text-base hover:underline">
                                      {p?.name}-
                                      <span className="text-black">
                                        {p?.age}
                                      </span>
                                    </p>
                                  </div>
                                </Link>
                              ) : (
                                ""
                              )}
                            </div>
                          ))}
                        </>
                        <>
                          {!state.day6?.length == 0  & !premiumCityPost?.length == 0 ? (
                            <h1 className={style.premiumpostTitle}>
                              {state.day6time}
                            </h1>
                          ) : ""}

                          {state.day6?.map((p) => (
                            <div>
                              {p.isPremium == true ? (
                                <Link
                                  href={`/post/details/${router?.query?.names?.[1]}/${p._id}`}
                                  key={p._id}
                                >
                                  <div className={style.productContainer}>
                                    <p className="text-sm text-blue-600 sm:text-base hover:underline">
                                      {p?.name}-
                                      <span className="text-black">
                                        {p?.age}
                                      </span>
                                    </p>
                                  </div>
                                </Link>
                              ) : (
                                ""
                              )}
                            </div>
                          ))}
                        </>
                        <>
                          {!state.day7?.length == 0  & !premiumCityPost?.length == 0 ? (
                            <h1 className={style.premiumpostTitle}>
                              {state.day7time}
                            </h1>
                          ) : ''}

                          {state.day7?.map((p) => (
                            <div>
                              {p.isPremium == true ? (
                                <Link
                                  href={`/post/details/${router?.query?.names?.[1]}/${p._id}`}
                                  key={p._id}
                                >
                                  <div className={style.productContainer}>
                                    <p className="text-sm text-blue-600 sm:text-base hover:underline">
                                      {p?.name}-
                                      <span className="text-black">
                                        {p?.age}
                                      </span>
                                    </p>
                                  </div>
                                </Link>
                              ) : (
                                ""
                              )}
                            </div>
                          ))}
                        </>
                        <>
                          {!state.lastWeek?.length == 0  & !premiumCityPost?.length == 0 ?(
                            <h1 className={style.premiumpostTitle}>
                              Last Week
                            </h1>
                          ):""}

                          {state.lastWeek?.map((p) => (
                            <div>
                              {p.isPremium == true ? (
                                <Link
                                  href={`/post/details/${router?.query?.names?.[1]}/${p._id}`}
                                  key={p._id}
                                >
                                  <div className={style.productContainer}>
                                    <p className="text-sm text-blue-600 sm:text-base hover:underline">
                                      {p?.name}-
                                      <span className="text-black">
                                        {p?.age}
                                      </span>
                                    </p>
                                  </div>
                                </Link>
                              ) : (
                                ""
                              )}
                            </div>
                          ))}
                        </>
                      </div>

        {/* Free post  */}



                      {/* <div>
                        {!freeCityPost?.length == 0 && (
                          <h1 className={style.freepostTitle}>Free Post</h1>
                        )}

                        <>
                        {!freeCityPost?.length == 0 & !state.day1?.length == 0 ? (
                            <h1 className={style.freepostTitle2}>
                              {state.day1time} 
                            </h1>
                          ): ""}

                          {state.day1?.map((p) => (
                            <div>
                              {p.isPremium == false ? (
                                <Link
                                  href={`/post/details/${router?.query?.names?.[1]}/${p._id}`}
                                  key={p._id}
                                >
                                  <div className={style.productContainer}>
                                    <p className="text-sm text-blue-600 sm:text-base hover:underline">
                                      {p?.name}-
                                      <span className="text-black">
                                        {p?.age}
                                      </span>
                                    </p>
                                  </div>
                                </Link>
                              ) : (
                                ""
                              )}
                            </div>
                          ))}
                        </>
                        <>
                          {!freeCityPost?.length == 0 & !state.day2?.length == 0 ? (
                            <h1 className={style.freepostTitle2}>
                              {state.day2time} {freeCityPost?.length}
                            </h1>
                          ): ""}

                          {state.day2?.map((p) => (
                            <div>
                              {p.isPremium == false ? (
                                <Link
                                  href={`/post/details/${router?.query?.names?.[1]}/${p._id}`}
                                  key={p._id}
                                >
                                  <div className={style.productContainer}>
                                    <p className="text-sm text-blue-600 sm:text-base hover:underline">
                                      {p?.name}-
                                      <span className="text-black">
                                        {p?.age}
                                      </span>
                                    </p>
                                  </div>
                                </Link>
                              ) : (
                                ""
                              )}
                            </div>
                          ))}
                        </>
                        <>
                          {!state.day3?.length == 0 & !freeCityPost?.length == 0 ?  (
                            <h1 className={style.freepostTitle2}>
                              {state.day3time}
                            </h1>
                          ): ""}

                          {state.day3?.map((p) => (
                            <div>
                              {p.isPremium == false ? (
                                <Link
                                  href={`/post/details/${router?.query?.names?.[1]}/${p._id}`}
                                  key={p._id}
                                >
                                  <div className={style.productContainer}>
                                    <p className="text-sm text-blue-600 sm:text-base hover:underline">
                                      {p?.name}-
                                      <span className="text-black">
                                        {p?.age}
                                      </span>
                                    </p>
                                  </div>
                                </Link>
                              ) : (
                                ""
                              )}
                            </div>
                          ))}
                        </>
                        <>
                          {!state.day4?.length == 0 & !freeCityPost?.length == 0 ? (
                            <h1 className={style.freepostTitle2}>
                              {state.day4time}
                            </h1>
                          ): ""}

                          {state.day4?.map((p) => (
                            <div>
                              {p.isPremium == false ? (
                                <Link
                                  href={`/post/details/${router?.query?.names?.[1]}/${p._id}`}
                                  key={p._id}
                                >
                                  <div className={style.productContainer}>
                                    <p className="text-sm text-blue-600 sm:text-base hover:underline">
                                      {p?.name}-
                                      <span className="text-black">
                                        {p?.age}
                                      </span>
                                    </p>
                                  </div>
                                </Link>
                              ) : (
                                ""
                              )}
                            </div>
                          ))}
                        </>
                        <>
                          {!state.day5?.length == 0 & !freeCityPost?.length == 0 ? (
                            <h1 className={style.freepostTitle2}>
                              {state.day5time}
                            </h1>
                          ):""}

                          {state.day5?.map((p) => (
                            <div>
                              {p.isPremium == false ? (
                                <Link
                                  href={`/post/details/${router?.query?.names?.[1]}/${p._id}`}
                                  key={p._id}
                                >
                                  <div className={style.productContainer}>
                                    <p className="text-sm text-blue-600 sm:text-base hover:underline">
                                      {p?.name}-
                                      <span className="text-black">
                                        {p?.age}
                                      </span>
                                    </p>
                                  </div>
                                </Link>
                              ) : (
                                ""
                              )}
                            </div>
                          ))}
                        </>
                        <>
                          {!state.day6?.length == 0 & !freeCityPost?.length == 0 ? (
                            <h1 className={style.freepostTitle2}>
                              {state.day6time}
                            </h1>
                          ): ""}

                          {state.day6?.map((p) => (
                            <div>
                              {p.isPremium == false ? (
                                <Link
                                  href={`/post/details/${router?.query?.names?.[1]}/${p._id}`}
                                  key={p._id}
                                >
                                  <div className={style.productContainer}>
                                    <p className="text-sm text-blue-600 sm:text-base hover:underline">
                                      {p?.name}-
                                      <span className="text-black">
                                        {p?.age}
                                      </span>
                                    </p>
                                  </div>
                                </Link>
                              ) : (
                                ""
                              )}
                            </div>
                          ))}
                        </>
                        <>
                          {!state.day7?.length == 0 & !freeCityPost?.length == 0 ? (
                            <h1 className={style.freepostTitle2}>
                              {state.day7time}
                            </h1>
                          ) : ""}

                          {state.day7?.map((p) => (
                            <div>
                              {p.isPremium == false ? (
                                <Link
                                  href={`/post/details/${router?.query?.names?.[1]}/${p._id}`}
                                  key={p._id}
                                >
                                  <div className={style.productContainer}>
                                    <p className="text-sm text-blue-600 sm:text-base hover:underline">
                                      {p?.name}-
                                      <span className="text-black">
                                        {p?.age}
                                      </span>
                                    </p>
                                  </div>
                                </Link>
                              ) : (
                                ""
                              )}
                            </div>
                          ))}
                        </>
                        <>
                          {state.lastWeek?.length == 0 & !freeCityPost?.length == 0  ? (
                            <h1 className={style.freepostTitle2}>Last Week</h1>
                          ) : ""}

                          {state.lastWeek?.map((p) => (
                            <div>
                              {p.isPremium == false ? (
                                <Link
                                  href={`/post/details/${router?.query?.names?.[1]}/${p._id}`}
                                  key={p._id}
                                >
                                  <div className={style.productContainer}>
                                    <p className="text-sm text-blue-600 sm:text-base hover:underline">
                                      {p?.name}-
                                      <span className="text-black">
                                        {p?.age}
                                      </span>
                                    </p>
                                  </div>
                                </Link>
                              ) : (
                                ""
                              )}
                            </div>
                          ))}
                        </>
                      </div> */}
                    </>
                  ) : (
                    "No Post Found"
                  )}
                  <hr className={style.hr} />

                  <div className={style.paginate}>
                    <Pagination
                      showSizeChanger={false}
                      pageSize={50}
                      defaultCurrent={page}
                      onChange={onChange}
                      total={pages}
                    />
                  </div>
                </div>

                <div className={style.othersLink}>
                  {/* {ads.map((a) => (
                    <div className={style.othersLinkContainer} key={a._id}>
                      <a href={`${a.link}`} target="_blank" rel="noreferrer">
                        <Image
                          className={style.othersLinkImage}
                          src={`${a.image}`}
                          width={1000}
                          height={800}
                          alt="image"
                        />
                        <p className="text-blue-400">{a.title}</p>
                      </a>
                    </div>
                  ))} */}
                </div>
              </div>
            </div>
          )}
        </>
      )}
      <Footer></Footer>
    </div>
  );
};

export default Post;
