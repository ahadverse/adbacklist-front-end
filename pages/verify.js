import Footer from "@/component/footer/footer2";
import Header2 from "@/component/header/header";
import User from "@/component/user";
import Link from "next/link";
import React from "react";

const Verify = () => {
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
          <Link
            href={"/support"}
            className="ml-5 sm:ml-16  hover:text-blue-400  font-bold hover:underline"
          >
            Support
          </Link>
          <li className="ml-5 sm:ml-16 text-gray-300  hover:text-blue-400  font-bold hover:underline list-none inline">
            Verify
          </li>
        </span>
      </div>
      <div className="mx-auto  w-4/5 text-xl mt-10">
        Step 1: take a photo of your government ID on a flat surface.
        <br />
        <img
          width={200}
          src="https://ik.imagekit.io/6p4lsoibt/Selfie-removebg-preview__1_.png?updatedAt=1683553064703"
        ></img>
        <br />
        Step 2: take a selfie of your government ID close to your face.
        <br />
        <br />
        Step 3: Submit Your SSN Details.
        <br />
        <br />
        Step 4: Your All Data Email : adbacklist@gmail.com
      </div>
      <Footer></Footer>
    </div>
  );
};

export default Verify;
