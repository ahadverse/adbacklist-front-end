import Cookies from "js-cookie";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
const Header = dynamic(() => import("@/component/header/header"));
const Footer = dynamic(() => import("@/component/footer/footer2"));
import style from "../../styles/moduleCss/credit.module.css";
import axios from "axios";
import User from "@/component/user";
import Link from "next/link";

const Credits = () => {
  const [amount, setAmount] = useState(10);
  const [loading, setLoading] = useState(false);
  const usersStringfy = Cookies.get("token");
  const { users } = User();
  const router = useRouter();
  const id = router?.query?.id;
  console.log(id, users?._id);

  useEffect(() => {
    if (!id) {
      return;
    }
    if (!users?._id) {
      return;
    }
    if (users?._id !== id) {
      Cookies.remove("token");
      router.push("/login");
    }
  }, [id]);

  let requested = false;
  const date = new Date().toDateString();

  var randomnum =
    Math.floor(Math.random() * 500) * 10 +
    users?._id +
    Math.floor(Math.random() * 500) * 10;

  async function recharge() {
    if (requested) return;
    requested = true;
    try {
      const response = await axios.post(
        `https://api-adbacklist.vercel.app/api/recharge/${id}`,
        { amount },
        {
          headers: {
            authorization: `Bearer ${usersStringfy}`,
          },
        }
      );
      const data = response.data;

     setLoading(false)
      if (data?.redirectURI) {
        location.href = data.redirectURI;
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function addCredit(event) {
    setLoading(true)
    event.preventDefault();
    const data = {
      date,
      amount,
      userId: users?._id,
      email: users?.email,
      invoice: randomnum,
    };
    await axios
      .post("https://api-adbacklist.vercel.app/api/transaction", data)

      .then((response) => {
        if (response.data.status == "success") {
          recharge();
        } else {
          console.log(response);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }

  return (
    <div className="bg-gray-100 h-screen">
      <Header></Header>
      <div>
        <form onSubmit={addCredit}>
          <div className={style.container}>
            <h1 className="text-2xl text-black font-bold mb-5">
              Recharge Credits -
            </h1>
            <div>
              <h1 className="text-lg text-black">Select Amount</h1>
              <input
                className="p-1 bg-gray-50 border rounded select-info w-full"
                placeholder="Input Amount"
                required
                type="number"
                min={10}
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
              />
            </div>

            <div>
              <label className="cursor-pointer label flex justify-start items-center ">
                <input
                  type="checkbox"
                  className="checkbox checkbox-info"
                  required
                />
                <Link  href="/terms" className="sm:text-lg  text-sm hover:underline hover:text-blue-600">
                  I agree to Terms and Conditions
                </Link>
              </label>
            </div>
            {
              loading ?    <button className="px-10 bg-red-600 p-2 text-white font-bold rounded hover:bg-blue-400">
              Submitting...
            </button> :    <button className="px-10 bg-red-600 p-2 text-white font-bold rounded hover:bg-blue-400">
              Submit
            </button>
            }
           
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Credits;
