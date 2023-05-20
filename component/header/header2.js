import Link from "next/link";
import React from "react";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import styles from "../../styles/moduleCss/home.module.css";
import { useRouter } from "next/router";

const Header2 = () => {
  const router = useRouter();
  const [user, setUser] = useState();
  const usersStringfy = Cookies.get("token");
  useEffect(() => {
    if (usersStringfy) {
      const user = jwt_decode(usersStringfy);
      setUser(user);
    }
  }, []);

  const logout = () => {
    Cookies.remove("token");
    router.push("/login")
  };

  return (
    <div>
      <div className="navbar bg-gray-50 w-full  sm:w-4/6 sm:m-auto" >
        <div className="navbar-start">
          <div className="dropdown">
            <label tabIndex={0} className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              {user ? (
                <>
                  {router.asPath == "/dashboard/profile" ? (
                    <li>
                      <Link href="/">Home</Link>
                    </li>
                  ) : (
                    <li>
                      <Link href="/dashboard/profile">Dashboard</Link>
                    </li>
                  )}
                  <li>
                    <Link href="/blogs?page=1">Blogs</Link>
                  </li>
                  <li
                    onClick={() => logout()}
                    className="bg-red-600 p-2 text-white font-bold rounded"
                  >
                    <span
                      className="bg-red-600 p-2 text-white font-bold"
                    >
                      Logout
                    </span>
                  </li>
                </>
              ) : (
                <>
                  <li className="">
                    <Link href="/blogs?page=1">Blogs</Link>
                  </li>
                  <li>
                    <Link href="/login">Login</Link>
                  </li>
                  <li>
                    <Link href="/register">Registration</Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          <h1 className={styles.title}>
            {" "}
            <Link href="/">ADBACKLIST</Link>{" "}
          </h1>
          <Link href={"/user/post"}>
            <button className={styles.postButton}> + Post Ad </button>
          </Link>
        </div>

        <div className="navbar-end">
          <ul className={styles.menu}>
            {user ? (
              <>
                {router.asPath == "/dashboard/profile" ? (
                  <li>
                    <Link href="/">Home</Link>
                  </li>
                ) : (
                  <li className="mr-2">
                    <Link href="/dashboard/profile">My Account</Link>
                  </li>
                )}
                <li className="mr-2">
                  <Link href="/blogs?page=1">Blogs</Link>
                </li>
                <li onClick={() => logout()}>
                  <a
                    href="/login"
                    className="bg-red-600 p-2 text-white font-bold"
                  >
                    Logout
                  </a>
                </li>{" "}
              </>
            ) : (
              <>
                <li>
                  <Link href="/blogs?page=1">Blogs</Link>
                </li>
                <li>
                  <Link href="/login">Login</Link>
                </li>
                <li>
                  <Link href="/register">Registration</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header2;
