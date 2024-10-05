import { useEffect as e, useState as r } from "react";

import o from "../styles/moduleCss/sign.module.css";
import m from "axios";
import { useRouter as d } from "next/router";
import dynamic from "next/dynamic";
import Link from "next/link";
import Head from "next/head";
const Footer = dynamic(() => import("@/component/footer/footer2"));
let initialState = {
    firstName: "",
    lastName: "",
    email: "",
    month: "",
    password: "",
    isDelete: !1,
    address: { country: "", regionName: "", zipCode: "", city: "" },
    confirmPass: "",
    passError: "",
    emailError: "",
  },
  Register = () => {
    let t = d(),
      [a, i] = r(initialState),
      [s, n] = r(!1),
      l = (t) => {
        i({ ...a, [t.type]: t.payload });
      };
    e(() => {
      a.password !== a.confirmPass
        ? i({ ...a, passError: "Password didnt matched" })
        : i({ ...a, passError: "" });
    }, [a.confirmPass, a.password]);
    let u = async () => {
      n(!0);
      let e = { ...a },
        r = new Date(),
        o = r.toLocaleString("default", { month: "short" });
      (e.month = o),
        await m
          .post("https://back-hue-backend.vercel.app/api/users", e)
          .then((e) => {
            "success" == e.data.message
              ? (n(!1), t.push("/login"))
              : i({ ...a, emailError: "Something went wrong" });
          })
          .catch((t) => {
            i({ ...a, emailError: t.response.data.error });
          });
    };
    return (
      <div>
        <Head>
          <link rel="icon" href="/logo.png" />

          <title>Register</title>
        </Head>

        <div className={o.container}>
          <h1 className={o.title}>ADBACKLIST</h1>

          <h1 className="flex justify-center text-3xl font-bold mb-5">
            Registration
          </h1>

          <div className={o.inputBox}>
            <span>
              <s />
            </span>

            <input
              type="text"
              placeholder="First Name"
              className={o.input}
              onChange={(t) =>
                l({ type: "firstName", payload: t.target.value })
              }
            />
          </div>

          <div className={o.inputBox}>
            <span>
              <s />
            </span>

            <input
              type="text"
              placeholder="Last Name"
              className={o.input}
              onChange={(t) => l({ type: "lastName", payload: t.target.value })}
            />
          </div>

          <div className={o.inputBox}>
            <span>
              <a />
            </span>

            <input
              type="text"
              placeholder="Email"
              className={o.input}
              onChange={(t) => l({ type: "email", payload: t.target.value })}
            />
          </div>
          <p className={o.inputBox2}>
            You'll get all notifications at this Email
          </p>
          <div className={o.inputBox}>
            <span>
              <i />
            </span>

            <input
              type="password"
              placeholder="Password"
              className={o.input}
              onChange={(t) => l({ type: "password", payload: t.target.value })}
            />
          </div>

          <div className={o.inputBox}>
            <span>
              <i />
            </span>

            <input
              type="password"
              placeholder="Confirm Password"
              className={o.input}
              onChange={(t) =>
                l({ type: "confirmPass", payload: t.target.value })
              }
            />
          </div>

          <p className="text-xs text-red-600 text-center">{a.passError}</p>

          <p className="text-xs text-red-600 text-center">{a.emailError}</p>

          <div className={o.inputBox}>
            {!0 == s ? (
              <button className="btn btn-outline btn-success  hover:text-white btn-wide loading"></button>
            ) : (
              <button
                className="btn btn-outline btn-error text-2xl hover:text-green-200 btn-wide "
                onClick={() => u()}
              >
                Register
              </button>
            )}
          </div>

          <p className="text-2xl flex justify-center mt-5">
            Already Registered ?{" "}
            <Link className="text-blue-600 underline" href={"/login"}>
              Login
            </Link>{" "}
          </p>
        </div>

        <l></l>
        <Footer />
      </div>
    );
  };
export default Register;

//https://api3.adbacklist.com
