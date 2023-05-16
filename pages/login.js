import React, { useEffect, useState } from "react";
import { AiOutlineMail, AiFillLock } from "react-icons/ai";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import dynamic from "next/dynamic";

import Cookies from "js-cookie";
const Footer = dynamic(() => import("@/component/footer/footer2"));
import style from "../styles/moduleCss/sign.module.css";
import axios from "axios";

const initialState = {
  email: "",
  password: "",
  passError: "",
  emailError: "",
};

const Login = () => {
  const router = useRouter();
  const [state, setState] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);

  const dispatch = (e) => {
    setState({ ...state, [e.type]: e.payload });
  };

  const usersStringfy = Cookies.get("token");

  useEffect(() => {
    if (usersStringfy) {
      router.push(router.asPath);
    }
  }, []);


  
  const login = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const data = { ...state, isLoading: true };

    await axios
      .post("https://api-adbacklist.vercel.app/api/users/login", data)

      .then((response) => {
        if (response.data.message == "success") {
          Cookies.set("token", response.data.token);
          setState({ ...state, emailError: "" });

          if (router?.asPath == "/login") {
            router.push(`/`);
          } else {
            setTimeout(() => {
              router.reload(router?.asPath);
            }, 500);
          }
          setIsLoading(false);
        } else {
          setState({ ...state, emailError: "Something went wrong" });
        }
      })
      .catch((error) => {
        setIsLoading(false);
        console.log(error);
        setState({ ...state, emailError: error?.response?.data?.message });
      });
  };

  return (
    <div>
      <Head>
        <link rel="icon" href="/logo.png" />
        <title>Login</title>
      </Head>
      <div className={style.container}>
        <h1 className={style.title}>ADBACKLIST</h1>
        <h1 className="flex justify-center text-3xl font-bold mb-5">Login</h1>
        <form onSubmit={login}>
          <div className={style.inputBox}>
            <span>
              <AiOutlineMail />
            </span>
            <input
              type="text"
              placeholder="Email"
              className={style.input}
              onChange={(e) =>
                dispatch({ type: "email", payload: e.target.value })
              }
            />
          </div>
          <div className={style.inputBox}>
            <span>
              <AiFillLock />
            </span>
            <input
              type="password"
              placeholder="Password"
              className={style.input}
              onChange={(e) =>
                dispatch({ type: "password", payload: e.target.value })
              }
            />
          </div>
          <p className="text-xs text-red-600 text-center">{state.emailError}</p>
          <div className={style.inputBox}>
            {isLoading == true ? (
              <button className="btn btn-outline btn-success  hover:text-white btn-wide loading"></button>
            ) : (
              <button
                className="btn btn-outline btn-success text-2xl hover:text-white btn-wide "
                type="submit"
              >
                login
              </button>
            )}
          </div>
        </form>
        {/* <Image src="/upload.gif" /> */}
        <p className="text-2xl flex justify-center mt-5">
          New here ?{" "}
          <Link className="text-blue-600 underline" href={`/register`}>
            Register
          </Link>{" "}
        </p>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Login;
