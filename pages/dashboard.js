import User from "@/component/user";
import { Tabs } from "antd";
import axios from "axios";
import dynamic from "next/dynamic";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import ReactPaginate from "react-paginate";
import React, { useEffect, useState } from "react";
const Header = dynamic(() => import("@/component/header/header2"));
const Footer = dynamic(() => import("@/component/footer/footer2"));
import { BiUserCircle } from "react-icons/bi";
import style from "../styles/moduleCss/blog.module.css";

const Dashboard = () => {
  const { users, usersStringfy } = User();
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const [rechargeHistory, setRechargeHistory] = useState([]);

  const itemsPerPage = 10;
  const itemsPerPage2 = 10;

  const [itemOffset, setItemOffset] = useState(0);
  const endOffset = itemOffset + itemsPerPage;
  const recharge = rechargeHistory?.slice(itemOffset, endOffset);
  const pageCount = Math?.ceil(rechargeHistory?.length / itemsPerPage);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % rechargeHistory.length;
    setItemOffset(newOffset);
  };

  const [itemOffset2, setItemOffset2] = useState(0);
  const endOffset2 = itemOffset2 + itemsPerPage2;
  const ad = ads?.slice(itemOffset2, endOffset2);
  const pageCount2 = Math?.ceil(ads?.length / itemsPerPage2);

  const handlePageClick2 = (event) => {
    const newOffset = (event.selected * itemsPerPage2) % ads.length;
    setItemOffset2(newOffset);
  };

  async function posts(users) {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/products/posterid/${users?._id}`,
        {
          method: "GET",
          headers: {
            authorization: `Bearer ${usersStringfy}`,
          },
        }
      );
      setLoading(false);
      if (response?.code == 404) {
        setAds([]);
      } else {
        const post = response.data.data.product;
        setAds(post);
      }
      transactions(users);
    } catch (error) {
      console.error(error);
    }
  }

  async function transactions(users) {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/transaction?q=${users?.email}`,
        {
          method: "GET",
        }
      );

      if (response?.code == 404) {
        setRechargeHistory([]);
      } else {
        const trans = response.data?.data?.transactions;
        setRechargeHistory(trans);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    setLoading(true);
    if (users) {
      posts(users);
    }
  }, [users]);

  console.log(ads, rechargeHistory);

  const items = [
    {
      key: "1",
      label: `My Profile`,
      children: (
        <div className="m-10">
          {users?.avater == "avater" ? (
            <BiUserCircle className="text-6xl" />
          ) : (
            <Image src={users?.avater} width={400} height={300} alt="image" />
          )}
          <div className="flex justify-between">
            {" "}
            <p className="text-red-600 text-sm sm:text-3xl font-bold border p-2 border-green-400 w-10/12 sm:w-4/12">
              Your Credits : ${users?.credit?.toFixed(2)}
            </p>{" "}
            <Link
              className="text-sm sm:text-3xl p-2 bg-red-500 font-bold text-white"
              href={`/recharge-credits/${users?._id}`}
            >
              Add Credit
            </Link>
          </div>
          <p className="text-sm sm:text-3xl">
            Name : {users?.firstName} {users?.lastName}{" "}
          </p>
          <br />
          <p className="text-sm sm:text-3xl">Email : {users?.email} </p>
          <br />
          {users.address?.city == "" ? (
            <p className="text-sm sm:text-3xl">No Address Found</p>
          ) : (
            <p className="text-sm sm:text-3xl">
              Address : {users?.address?.city}, {users?.address?.zipCode},{" "}
              {users?.address?.regionName}, {users?.address?.country},
            </p>
          )}
        </div>
      ),
    },
    {
      key: "2",
      label: `Ads List`,
      children: (
        <div className="m-10">
          {ads?.length == 0 ? (
            <p className="text-3xl text-center ">No Data Found</p>
          ) : (
            <div className="overflow-x-auto text-black">
              <table className="table table-compact w-10/12">
                <thead>
                  <tr>
                    <th></th>
                    <th>Title</th>
                    <th>Category</th>
                    <th>Posted Time</th>
                    <th>location</th>
                  </tr>
                </thead>
                <tbody>
                  {ad?.map((a, index) => (
                    <tr>
                      <th>{index + 1}</th>
                      <td>
                        <Link href={`/my-post/${a._id}`}>
                          {a.name.slice(0, 50)}
                        </Link>
                      </td>
                      <td>{a.category}</td>
                      <td>{a?.createdAt?.split("T")[0]}</td>
                      {a?.city ? (
                        <td>{a?.city}</td>
                      ) : (
                        <td className="flex">
                          {a?.cities.map((a) => (
                            <li className="list-decimal mr-1">{a}</li>
                          ))}
                        </td>
                      )}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className={`${style.pagination}`}>
            <ReactPaginate
              breakLabel="..."
              nextLabel="Next >"
              onPageChange={handlePageClick2}
              pageRangeDisplayed={5}
              activeClassName="active"
              pageCount={pageCount2}
              previousLabel="< Previous"
              renderOnZeroPageCount={null}
            />
          </div>
          <div className={`${style.pagination2}`}>
            <ReactPaginate
              breakLabel="..."
              nextLabel=">"
              onPageChange={handlePageClick2}
              pageRangeDisplayed={5}
              activeClassName="active"
              pageCount={pageCount2}
              previousLabel="<"
              renderOnZeroPageCount={null}
            />
          </div>
        </div>
      ),
    },
    {
      key: "3",
      label: `Recharge History`,
      children: (
        <div className="m-10">
          {rechargeHistory?.length == 0 ? (
            <p className="text-3xl text-center ">No Data Found</p>
          ) : (
            <div className="overflow-x-auto text-black">
              <table className="table table-compact w-10/12 m-auto">
                <thead>
                  <tr>
                    <th></th>
                    <th>Invoice</th>
                    <th>Status</th>
                    <th>Date of Recharge</th>
                    <th>Time of Recharge</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {recharge?.map((a, index) => (
                    <tr>
                      <th>{index + 1}</th>
                      <td>{a?.invoice}</td>
                      <td>{a?.isCompleted}</td>
                      <td>{a?.createdAt?.split("T")[0]}</td>
                      <td>{new Date(a?.createdAt).toLocaleTimeString()}</td>
                      <td>${a?.amount}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <div className={`${style.pagination}`}>
            <ReactPaginate
              breakLabel="..."
              nextLabel="Next >"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              activeClassName="active"
              pageCount={pageCount}
              previousLabel="< Previous"
              renderOnZeroPageCount={null}
            />
          </div>
          <div className={`${style.pagination2}`}>
            <ReactPaginate
              breakLabel="..."
              nextLabel=">"
              onPageChange={handlePageClick}
              pageRangeDisplayed={5}
              activeClassName="active"
              pageCount={pageCount}
              previousLabel="<"
              renderOnZeroPageCount={null}
            />
          </div>
        </div>
      ),
    },
  ];

  return (
    <>
      {" "}
      <Head>
        <title>Dashboard</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <Header />
      {loading ? (
        <button className="btn bg-transparent border-0 loading lowercase w-full m-auto">
          loading
        </button>
      ) : (
        <div className="bg-white text-6xl">
          {users ? (
            <Tabs size={"large"} defaultActiveKey="1" centered items={items} />
          ) : (
            <button className="btn bg-white border-0 text-xl loading ">
              Loading...
            </button>
          )}
        </div>
      )}
      <Footer />
    </>
  );
};

export default Dashboard;
