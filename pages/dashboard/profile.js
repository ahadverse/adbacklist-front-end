import User from "@/component/user";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ReactPaginate from "react-paginate";
import Swal from "sweetalert2";
import style from "../../styles/moduleCss/blog.module.css";
import Head from "next/head";
import Header from "@/component/header/header";
import Footer from "@/component/footer/footer";

const Dashboards = () => {
  const { users, usersStringfy } = User();

  const [ads, setAds] = useState([]);
  const [loading, setLoading] = useState(false);
  const itemsPerPage2 = 10;

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
        `https://api-adbacklist.vercel.app/api/products/posterid/${users?._id}`,
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
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    setLoading(true);
    if (users) {
      posts(users);
    } else {
      return;
    }
  }, [users]);

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
            const newPost = ads.filter((a) => a._id !== id);
            setAds(newPost);
          });
      }
    });
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
            Ads : {ads.length}
          </button>
        </div>
        <div>
        <p className="text-lg sm:text-3xl text-black">{users?.email}</p>
        <Link className="text-blue-400" href={`/user/edit/${users._id}`}>Edit Profile</Link>
        </div>
      </div>
      <div className="m-0 sm:m-10" >
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
                    {ad?.map((a, index) => (
                      <tr>
                        <th>{index + 1}</th>
                        <td>{a?.createdAt?.split("T")[0]}</td>
                        <td>{a.name.slice(0, 50)}</td>
                        <td>
                          {a.category} &#62; {a.subCategory}
                        </td>
                        <td className="text-center">
                        {a.isPremium ?    <p className="bg-green-600 sm:w-2/12 w-6/12 rounded text-white">
                          Yes
                          </p> : <p className="bg-red-600 sm:w-2/12 w-6/12 rounded text-white">
                          No
                          </p>}
                       
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
    <Footer/>
    </div>
  );
};

export default Dashboards;
