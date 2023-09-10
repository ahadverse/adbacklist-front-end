import User from "@/component/user";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import style from "../../styles/moduleCss/blog.module.css";
import Head from "next/head";
import Header from "@/component/header/header";
import Footer from "@/component/footer/footer";
import { Input, Pagination, Select } from "antd";
import cate from "../../public/category.json";
import { useSession } from "next-auth/react";
const { Search } = Input;

const Dashboards = () => {
  const { users, usersStringfy } = User();
  console.log(users);
  const { data: session } = useSession();
  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);
  // searchText=&status=&category=Pets
  const [pages, setPages] = useState(1);
  const [page, setPage] = useState(1);
  const [searchText, setSearchText] = useState("");
  const [status, setStatus] = useState("");
  const [category, setCategory] = useState("");
  const [startIndex, setStartIndex] = useState(0);

  async function posts() {
    if (session) {
      try {
        const response = await axios.get(
          `https://api-adbacklist.vercel.app/api/products/posterid/${session?.user?.id}?page=${pages}&searchText=${searchText}&status=${status}&category=${category}`,
          {
            method: "GET",
          }
        );
        setLoading(false);
        if (response?.code == 404) {
          setAds([]);
        } else {
          const post = response.data.data.posts;
          setPage(response.data.pages);
          setAds(post);
          setStartIndex(response?.data?.startIndex);
        }
      } catch (error) {
        setLoading(false);
        console.error(error);
      }
    }
  }

  useEffect(() => {
    setLoading(true);
    if (session) {
      posts();
    } else {
      return;
    }
  }, [session?.user?.email, pages, category, status, searchText]);

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
          .delete(`https://api-adbacklist.vercel.app/api/products/${id}`, {})
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

  const onChangeCategory = (value) => {
    if (value == undefined) {
      setCategory("");
    } else {
      setCategory(value);
    }
  };
  const onChangeStatus = (value) => {
    if (value == undefined) {
      setStatus("");
    } else {
      setStatus(value);
    }
  };

  const onSearch = (value) => {
    if (value == undefined) {
      setSearchText("");
    } else {
      setSearchText(value);
    }
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
            <p className="text-lg sm:text-3xl text-black">
              {session?.user?.email}
            </p>
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
          <div className="flex justify-between items-center">
            <div>
              <Select
                showSearch
                className="w-36"
                allowClear
                placeholder="Select a Category"
                optionFilterProp="children"
                onChange={onChangeCategory}
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={cate.map((a) => ({
                  label: a.name,
                  value: a.name,
                }))}
              />
              <Select
                placeholder="Select a Status"
                className="w-36"
                optionFilterProp="children"
                onChange={onChangeStatus}
                allowClear
                filterOption={(input, option) =>
                  (option?.label ?? "")
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={[
                  {
                    value: "true",
                    label: "Not Premium",
                  },
                  {
                    value: "false",
                    label: "Premium",
                  },
                ]}
              />
            </div>
            <Search
              className="w-72"
              placeholder="Post Name"
              onSearch={onSearch}
              allowClear
              enterButton
            />
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
                          <th>{startIndex + index}</th>
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
