import Link from "next/link";
import { BsList } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import style from "../../styles/moduleCss/services.module.css";
import { useRouter } from "next/router";
import Image from "next/image";
import cities from "../../public/country.json";
import axios from "axios";

const Drawer = (data) => {
  const router = useRouter();
  const [city, setCity] = useState();
  const [user, setUser] = useState();

  async function getUser() {
    try {
      const response = await axios.get(
        `https://back-hue-backend.vercel.app/api/countries/search?q=${data?.category}`
      );
      const cityName = response.data;
      const usa = cities.find((a) => a.name == "United States");

      const state = usa?.children?.find(
        (a) => a._id == cityName?.[0]?.parentId
      );

      if (state == undefined) {
        const canada = cities.find((a) => a.name == "Canada");

        const state = canada?.children?.find(
          (a) => a._id == cityName?.[0]?.parentId
        );
        const city = state?.children?.map((a) => a.name);
        setCity(city);
        return;
      }

      const city = state?.children?.map((a) => a.name);
      setCity(city);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    if (!data) {
      return;
    } else {
      getUser();
    }
  }, [data]);

  const usersStringfy = Cookies.get("token");
  useEffect(() => {
    if (usersStringfy) {
      const user = jwt_decode(usersStringfy);
      setUser(user);
      return;
    }
  }, []);

  const Headers = () => {
    return (
      <div className={style.top}>
        <div className="flex justify-center items-center">
          <Link href="/" className="brand-link d-inline-block">
            <h1 className={style.title}>ADBACKLIST</h1>
          </Link>
          <div>
            <div className={style.postMenu}>
              <Link
                href="/user/post/"
                className="post-profile__btn flex items-center flex-shrink-0 p-l-5 p-r-10"
              >
                <div className="icon d-inline-flex align-items-center justify-content-center m-r-5">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <title>plus</title>
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7.0799 0.0908203C6.57155 0.0908203 6.15945 0.502921 6.15945 1.01127V5.30673H1.86399C1.35564 5.30673 0.943537 5.71883 0.943537 6.22718C0.943537 6.73554 1.35564 7.14764 1.86399 7.14764H6.15945V11.4431C6.15945 11.9514 6.57155 12.3635 7.0799 12.3635C7.58825 12.3635 8.00036 11.9514 8.00036 11.4431V7.14764H12.2958C12.8042 7.14764 13.2163 6.73554 13.2163 6.22718C13.2163 5.71883 12.8042 5.30673 12.2958 5.30673H8.00036V1.01127C8.00036 0.502922 7.58825 0.0908203 7.0799 0.0908203Z"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <span className="color-white lh-normal">Post Ad</span>
              </Link>
            </div>
          </div>
        </div>
        <div className={style.locationMenu}>
          {data?.name?.[0] ? (
            <p>
              {data?.name?.[2]}, {data?.name?.[1]} ,{data?.name?.[0]}
            </p>
          ) : (
            " "
          )}
          {router.asPath.includes("/dashboard") && (
            <>
              {" "}
              {data.avater == "avater" ? (
                <Image className={style.avater} src="user.png" />
              ) : (
                <Image className={style.avater} src={data.avater} />
              )}
            </>
          )}
        </div>
      </div>
    );
  };

  return {
    city,
    Headers,
  };
};

export default Drawer;
