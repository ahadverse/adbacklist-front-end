import Link from "next/link";
import { useRouter } from "next/router";
import React, { use, useEffect, useState } from "react";
import style from "../styles/moduleCss/services.module.css";
import Head from "next/head";
import category from "../public/withoutadult.json";
import axios from "axios";
import dynamic from "next/dynamic";
import Drawer from "../component/drawer/drawer";
const Footer = dynamic(() => import("@/component/footer/footer2"));

const Name = () => {
  const router = useRouter();
  const { city, Headers } = Drawer(router.query);
  //  const [links, setLinks] = useState([]);
  //
  //  async function getUser() {
  //    try {
  //      const response = await axios.get(
  //        `https://api3.adbacklist.com/api/links`,
  //        {
  //          method: "GET",
  //        }
  //      );
  //      const data = response.data.links[0];
  //
  //      setLinks(data);
  //    } catch (error) {
  //      console.error(error);
  //    }
  //  }
  //  useEffect(() => {
  //    getUser();
  //  }, []);

  let content;
  if (router.query.category == undefined) {
    content = (
      <div>
        <div className="btn  bg-transparent border-0 loading flex m-auto">
          loading
        </div>
      </div>
    );
  }

  if (router.query.category) {
    if (router.query?.category?.[0] == undefined) {
      router.push("/");
    } else {
      content = (
        <>
          <div className="bg-white text-black flex flex-wrap pt-10 items-center px-0 sm:px-32 ">
            <p className="text-red-600 font-bold">Nearest Cities : </p>
            {city?.map((a) => (
              <p className=" ml-2 underline" key={a._id}>
                <Link href={`/${a}`}>{a}</Link>
              </p>
            ))}
          </div>
          <div className={style.container}>
            <div className="flex  flex-col">
              {category?.slice(0, 2).map((a) => (
                <div key={a.name}>
                  <h2 className={style.cateTitlte}> {a.name} </h2>

                  <div className={style.categoryParent}>
                    {a.children?.map((b) => (
                      <ul className={style.subCategoryList} key={b.name}>
                        <li>
                          <Link
                            href={`/post/${router?.query?.category}/${a.name}/${b.name}`}
                          >
                            {b.name}
                          </Link>
                        </li>
                      </ul>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex  flex-col">
              {category?.slice(3, 5).map((a) => (
                <div key={a.name}>
                  <h2 className={style.cateTitlte}> {a.name} </h2>

                  <div className={style.categoryParent}>
                    {a.children?.map((b) => (
                      <ul className={style.subCategoryList} key={b.name}>
                        <li>
                          <Link
                            href={`/post/${router?.query?.category}/${a.name}/${b.name}`}
                          >
                            {b.name}
                          </Link>
                        </li>
                      </ul>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex  flex-col">
              {category?.slice(5, 7).map((a) => (
                <div key={a.name}>
                  <h2 className={style.cateTitlte}> {a.name} </h2>

                  <div className={style.categoryParent}>
                    {a.children?.map((b) => (
                      <ul className={style.subCategoryList} key={b.name}>
                        <li>
                          <Link
                            href={`/post/${router?.query?.category}/${a.name}/${b.name}`}
                          >
                            {b.name}
                          </Link>
                        </li>
                      </ul>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex  flex-col">
              {category?.slice(7, 10).map((a) => (
                <div key={a.name}>
                  <h2 className={style.cateTitlte}> {a.name} </h2>

                  <div className={style.categoryParent}>
                    {a.children?.map((b) => (
                      <ul className={style.subCategoryList} key={b.name}>
                        <li>
                          <Link
                            href={`/post/${router?.query?.category}/${a.name}/${b.name}`}
                          >
                            {b.name}
                          </Link>
                        </li>
                      </ul>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      );
    }
  }

  return (
    <div className="bg-gray-200 text-black">
      <Head>
        <link rel="icon" href="/logo.png" />
        <title>
          {router?.query?.category &&
            `Adbacklist: free ad posting ${router?.query?.category}, Pets, Housing, For Sell, Jobs, Services, fitness`}
        </title>
        <meta
          name="description"
          content={
            router?.query?.category &&
            `${router?.query?.category} free ad posting sites | Adbacklist Top free classified ads posting sites for different categories for ${router?.query?.category}. Measuring the success of your free ads campaigns.`
          }
        />
        <meta
          name="keywords"
          content={
            router?.query?.category &&
            `best online pet store, az classifieds pets, room to rent near me, cheaphomes, community market weekly ad, community helpers, all in one service, all pro services, jobs hiring teens near me, pct jobs, sale n buy, bunnies for sell, fitness connection, advertisement for sports`
          }
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link
          name="canonical"
          rel="canonical"
          href={`https://adbacklist.com/${router?.query?.category}`}
        />{" "}
      </Head>
      <Headers />
      {/*{links ? (
        <div className="flex justify-around text-xl p-2 text-blue-600">
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href={`${links?.shemale}`}
          >
            Shemale Escorts
          </Link>{" "}
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href={`${links?.meet}`}
          >
            Meet & Fuck
          </Link>{" "}
          <Link
            target="_blank"
            rel="noopener noreferrer"
            href={`${links?.live}`}
          >
            Live Escorts
          </Link>{" "}
        </div>
      ) : (
        <div className="flex justify-around text-xl p-2 text-blue-600">
          <Link href={`#`}>Shemale Escorts</Link>{" "}
          <Link href={`#`}>Meet & Fuck</Link>{" "}
          <Link href={`#`}>Live Escorts</Link>{" "}
        </div>
      )}*/}

      {content}

      <Footer></Footer>
    </div>
  );
};

export default Name;
