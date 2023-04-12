import User from "@/component/user";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";
import style from "../../styles/moduleCss/blog.module.css";
import Head from "next/head";
import Footer from "@/component/footer/footer";
import Header from "@/component/header/header";

const Dashboards = () => {
  const { users, usersStringfy } = User();

  const [loading, setLoading] = useState(false);
  const [rechargeHistory, setRechargeHistory] = useState([]);
  const itemsPerPage2 = 10;

  const [itemOffset2, setItemOffset2] = useState(0);
  const endOffset2 = itemOffset2 + itemsPerPage2;
  const recharge = rechargeHistory?.slice(itemOffset2, endOffset2);
  const pageCount2 = Math?.ceil(rechargeHistory?.length / itemsPerPage2);

  const handlePageClick2 = (event) => {
    const newOffset = (event.selected * itemsPerPage2) % rechargeHistory.length;
    setItemOffset2(newOffset);
  };

  async function transactions(users) {
    try {
      const response = await axios.get(
        `https://api-adbacklist.vercel.app/api/transaction?q=${users?.email}`,
        {
          method: "GET",
        }
      );

      if (response?.code == 404) {
        setRechargeHistory([]);
      } else {
        const trans = response.data?.data?.transactions;
        setRechargeHistory(trans);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    setLoading(true);
    if (users) {
      transactions(users);
    } else {
      return;
    }
  }, [users]);

console.log(rechargeHistory)

  return (
    <div className="bg-gray-100">
      <Head>
        <title>My Recharge</title>
      </Head>
      <Header />
      <div className="bg-white  m-1 sm:m-5">
        <div className="p-2 flex justify-between">
          <div>
            <button className="btn bg-white text-info btn-info hover:text-white">
              Credits : {users?.credit?.toFixed(2)}
            </button>
          </div>
          <p className="text-lg sm:text-3xl text-black">{users?.email}</p>
        </div>
        <div className="m-0 sm:m-10">
        <div className="bg-black text-white my-5 p-2 flex justify-between">
            <span>
            <Link
            href={"/dashboard/profile"}
            className="hover:text-blue-400 hover:underline"
          >
            My Profile
          </Link>
          <Link
            href={"/dashboard/recharge"}
            className="ml-5 hover:text-blue-400 hover:underline"
          >
            My Recharge
          </Link></span>
          <Link
              className="text-sm sm:text-xl p-1 bg-red-600 font-bold text-white"
              href={`/recharge-credits/${users?._id}`}
            >
              Add Credit
            </Link>
        </div>
          {loading ? (
            <button className="btn w-full m-auto  bg-transparent  text-red-400 btn-wide border-0 loading">
              loading....
            </button>
          ) : (
            <>
              {" "}
              {rechargeHistory?.length == 0 ? (
                <p className="text-3xl text-center ">No Data Found</p>
              ) : (
                <div className="overflow-x-auto text-black">
                  <table className="table table-compact w-full">
                    <thead>
                      <tr>
                        <th className="bg-black text-white"></th>
                        <th className="bg-black text-white">Date</th>
                        <th className="bg-black text-white">Invoice</th>
                        <th className="bg-black text-white">Status</th>
                        <th className="bg-black text-white">Amount</th>
                        <th className="bg-black text-white">User</th>
                        {/* <th className="w-2/12 bg-black text-white">Action</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {recharge?.map((a, index) => (
                        <tr>
                          <th>{index + 1}</th>
                          <td>{a?.date}</td>
                          <td>{a?.invoice}</td>
                          <td className="text-center">
                            <p className="bg-red-400 w-full sm:w-6/12 rounded text-white">
                              {a?.isCompleted == "Done" ? "Success" : "Pending"}
                            </p>
                          </td>
                          <td className="font-bold text-red-600">
                            ${a?.amount}
                          </td>
                          <td className="">
                            {a?.userId?.email ? a?.userId?.email : users?.email}
                          </td>

                          {/* <td className="flex justify-between">
                          {" "}
                          <Link href={`/my-post/update/${a?._id}`}>
                            <button className="btn btn-xs btn-info">
                              Edit
                            </button>
                          </Link>{" "}
                          <Link href={`/my-post/${a?._id}`}>
                            <button className="btn btn-xs btn-warning">
                              View
                            </button>
                          </Link>
                          <button
                            className="btn btn-xs btn-error"
                            onClick={() => deletePost(a?._id)}
                          >
                            Delete
                          </button>
                        </td> */}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
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
      </div>
      <Footer />
    </div>
  );
};

export default Dashboards;
