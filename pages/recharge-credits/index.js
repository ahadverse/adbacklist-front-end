import Cookies from "js-cookie";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
const Header = dynamic(() => import("@/component/header/header"));
const Footer = dynamic(() => import("@/component/footer/footer2"));
import { useSession } from "next-auth/react";
import Link from "next/link";
import Deposit from "@/component/diposit/deposit";

const Credits = () => {
  const { data: session } = useSession();

  return (
    <div className="bg-gray-200 h-screen">
      <Header></Header>
      <div>
        <div className="bg-black mx-auto text-white sm:w-4/5 mt-10 p-2 rounded  shadow-lg shadow-blue-500/50 flex justify-between">
          <span className="m-auto">
            <li className="hover:text-blue-400 text-gray-300 font-bold hover:underline list-none inline">
              Buy Credits
            </li>

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
            <Link
              href={"/verify"}
              className="ml-5 sm:ml-16  hover:text-blue-400  font-bold hover:underline"
            >
              Verify
            </Link>
          </span>
        </div>

        <div className="w-4/5 mx-auto mt-5">
          <h1 className="text-2xl font-bold">
            Your Current Account Balance : $ {session?.user?.credit?.toFixed(2)}
          </h1>
          <p>
            Add Credits in your Adbacklist account to post & upgrade your Ad.{" "}
            <br />
            After one ads promotion, remaining credits will be still available
            in your account for feature ads promotions!
          </p>
        </div>
        <Deposit />
        <div className="sm:w-6/12 mx-5 sm:m-auto bg-white p-5">
          <div className="flex items-center">
            <p className="text-green-500 text-2xl font-bold">Bonus Offers</p>
            <img className="w-[40px]" src="/rose.gif" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <button className="border  border-2 font-bold text-lg text-black border-sky-500 border-dotted  text-normal px-1 rounded flex items-center gap-2">
              <p>Diposit $100 to get $120</p>
            </button>
            <button
              onClick={() => setAmount(200)}
              className="border  border-2 font-bold text-lg text-black border-sky-500 border-dotted  text-normal px-1 rounded flex items-center gap-2"
            >
              <p>Diposit $200 to get $250 </p>
            </button>
            <button className="border  border-2 font-bold text-lg text-black border-sky-500 border-dotted  text-normal px-1 rounded flex items-center gap-2">
              <p>Diposit $500 to get $650</p>
            </button>
            <button className="border  border-2 font-bold text-lg text-black border-sky-500 border-dotted  text-normal px-1 rounded flex items-center gap-2">
              <p>Diposit $1000 to get $1500</p>
            </button>
          </div>
        </div>
      </div>
      <div className="border-4 rounded border-dashed border-green-600 sm:mt-10 mt-10  mx-auto sm:w-3/5 p-5">
        <h1 className="text-xl font-bold">How do I buy Bitcoin ?</h1>
        <p>You can buy Bitcon from several place:</p>
        <div>
          <button className="bg-cyan-500 shadow-lg shadow-cyan-500/50 text-white text-normal py-1 px-3 rounded">
            <a
              href="https://www.youtube.com/watch?v=HK57o2JQDeI"
              target="_blank"
            >
              Cashapp
            </a>
          </button>
          <button className="bg-cyan-500 shadow-lg shadow-cyan-500/50 text-white text-normal py-1 px-3 rounded ml-5">
            <a href="https://www.coinbase.com/signin" target="_blank">
              Coinbase
            </a>
          </button>
          <button className="bg-cyan-500 shadow-lg shadow-cyan-500/50 text-white text-normal py-1 px-3 rounded ml-5">
            <a href="https://abra.com/" target="_blank">
              abra.com
            </a>
          </button>
          <button className="bg-cyan-500 shadow-lg shadow-cyan-500/50 text-white text-normal py-1 px-3 rounded ml-5">
            <a href="https://bitcoin.com/" target="_blank">
              bitcoin.com
            </a>
          </button>
          <button className="bg-cyan-500 shadow-lg shadow-cyan-500/50 text-white text-normal py-1 px-3 rounded ml-5">
            <a href="https://bitcoin.com/" target="_blank">
              binance.com
            </a>
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Credits;
