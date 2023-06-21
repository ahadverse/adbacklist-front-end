import User from "@/component/user";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import style from "../../styles/moduleCss/blog.module.css";
import Head from "next/head";
import Header from "@/component/header/header";
import Footer from "@/component/footer/footer";
import { Pagination } from "antd";

const Dashboards = () => {
  const { users, usersStringfy } = User();

  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);

  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);

  async function posts(users) {
    if (users?._id) {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/products/posterid/${users?._id}?page=${pages}`,
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
          const post = response.data.data.posts;
          setPage(response.data.pages);
          setAds(post);
        }
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    }
  }

  useEffect(() => {
    setLoading(true);
    if (users) {
      posts(users);
    } else {
      return;
    }
  }, [users, pages]);

  const deletePost = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:5000/api/products/${id}`, {})
          .then((response) => {
            if (response.data.status == "success") {
              Swal.fire("Deleted!", "Your file has been deleted.", "success");
            }

            const newPost = ads?.filter((a) => a._id !== id);

            setAds(newPost);
          });
      }
    });
  };

  const onChange = (page) => {
    setPages(page);
  };

  return (
    <div className="bg-gray-100">
      <Head>
        <title>My Profile</title>
      </Head>
      <Header />
      <div className="bg-white m-1 sm:m-5">
        <div className="p-2 flex justify-between ">
          <div>
            <button className="btn bg-white text-info btn-info hover:text-white">
              Credits : {users?.credit?.toFixed(2)}
            </button>
            <button className="btn btn-outline btn-info">
              Ads : {ads?.length ? page : 0}
            </button>
          </div>
          <div>
            <p className="text-lg sm:text-3xl text-black">{users?.email}</p>
            <Link className="text-blue-400" href={`/user/edit/${users._id}`}>
              Edit Profile
            </Link>
          </div>
        </div>
        <div className="m-0 sm:m-10">
          <div className="bg-black text-white my-5 p-2 flex justify-between rounded  shadow-lg shadow-blue-500/50">
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
              </Link>
            </span>
            <Link
              className="text-sm sm:text-xl p-1 bg-red-600 font-bold text-white"
              href={`/recharge-credits/${users?._id}`}
            >
              Buy Credit
            </Link>
          </div>
          {loading ? (
            <button className="btn w-full m-auto  bg-transparent  text-red-400 btn-wide border-0 loading">
              loading....
            </button>
          ) : (
            <>
              {" "}
              {ads?.length == 0 ? (
                <p className="text-3xl text-center ">No Data Found</p>
              ) : (
                <div className="overflow-x-auto text-black">
                  <table className="table table-compact w-full">
                    <thead>
                      <tr>
                        <th className="bg-black text-white"></th>
                        <th className="bg-black text-white">Date</th>
                        <th className="bg-black text-white">Title</th>
                        <th className="bg-black text-white">Category</th>
                        <th className="bg-black text-white">Premium</th>
                        <th className="w-2/12 bg-black text-white">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {ads?.map((a, index) => (
                        <tr>
                          <th>{index + 1}</th>
                          <td>{a?.createdAt?.split("T")[0]}</td>
                          <td>{a.name.slice(0, 50)}</td>
                          <td>
                            {a.category} &#62; {a.subCategory}
                          </td>
                          <td className="text-center">
                            {a.isPremium ? (
                              <p className="bg-green-600 sm:w-2/12 w-6/12 rounded text-white">
                                No
                              </p>
                            ) : (
                              <p className="bg-red-600 sm:w-2/12 w-6/12 rounded text-white">
                                Yes
                              </p>
                            )}
                          </td>
                          <td className="flex justify-between">
                            {" "}
                            <Link href={`/my-post/update/${a._id}`}>
                              <button className="btn btn-xs btn-info">
                                Edit
                              </button>
                            </Link>{" "}
                            <Link href={`/my-post/${a._id}`}>
                              <button className="btn btn-xs btn-warning">
                                View
                              </button>
                            </Link>
                            <button
                              className="btn btn-xs btn-error"
                              onClick={() => deletePost(a._id)}
                            >
                              Delete
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
        <Pagination
          className="flex justify-center"
          defaultCurrent={pages}
          pageSize={10}
          onChange={onChange}
          showSizeChanger={false}
          total={page}
        />
      </div>
      <Footer />
    </div>
  );
};

export default Dashboards;
