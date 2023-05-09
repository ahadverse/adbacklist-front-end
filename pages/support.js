import Footer from "@/component/footer/footer2";
import Header2 from "@/component/header/header";
import User from "@/component/user";
import Link from "next/link";
import React from "react";

const Support = () => {
    const { users } = User();
  return (
    <div className="bg-gray-200 h-screen">
      <Header2></Header2>
      <div className="bg-black mx-auto text-white w-4/5 mt-10 p-2 rounded  shadow-lg shadow-blue-500/50 flex justify-between">
        <span className="m-auto">
        <Link
            href={`/recharge-credits/${users?._id}`}
            className="hover:text-blue-400 font-bold hover:underline"
          >
            Buy Credits
          </Link>
          <Link
            href={"/dashboard/profile"}
            className="ml-5 sm:ml-16 hover:text-blue-400 font-bold hover:underline"
          >
            My Account
          </Link>
          <li className="ml-5 sm:ml-16 text-gray-300  hover:text-blue-400  font-bold hover:underline list-none inline">
            Support
          </li>
          <Link
        href={"/verify"}
            className="ml-5 sm:ml-16  hover:text-blue-400  font-bold hover:underline"
          >
            Verify
          </Link>
        </span>
      </div>
      <p className="mx-auto w-4/5 font-bold text-3xl mt-10">Send your mail here: <a href="mailto:adbacklist@gmail.com" className="text-red-400">adbacklist@gmail.com</a></p>
      <Footer></Footer>
    </div>
  );
};

export default Support;
