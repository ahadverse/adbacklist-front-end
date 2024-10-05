import Cookies from "js-cookie";
import Head from "next/head";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
const Header = dynamic(() => import("@/component/header/header"));
const Footer = dynamic(() => import("@/component/footer/footer2"));
import style from "../../styles/moduleCss/reports.module.css";
import jwt_decode from "jwt-decode";
import axios from "axios";
import Swal from "sweetalert2";

const initialState = {
  subject: "",
  reportDesc: "",
  isRead: false,
  userData: [],
};

const Reposts = () => {
  const [state, setState] = useState(initialState);
  const router = useRouter();
  const id = router.query.id;
  const usersStringfy = Cookies.get("token");

  useEffect(() => {
    if (usersStringfy) {
      const users = jwt_decode(usersStringfy);

      setState({ ...state, userData: users });
    }
  }, []);

  const dispatch = (e) => {
    setState({ ...state, [e.type]: e.payload });
  };

  const handleReport = async () => {
    const subject = state.subject;
    const isRead = state.isRead;
    const reportDesc = state.reportDesc;
    const posterId = id.split("__")[1];
    const postId = id.split("__")[0];
    const reporterId = state.userData?._id;
    const data = { subject, isRead, reporterId, reportDesc, postId, posterId };

    await axios
      .post("https://back-hue-backend.vercel.app/api/reports", data, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then((response) => {
        setState({ ...state, subject: "", reportDesc: "" });
        if (response.data.status == "success") {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Your work has been saved",
            showConfirmButton: false,
            timer: 1500,
          }).then(
            setTimeout(() => {
              router.reload(window.location.pathname);
            }, 2000)
          );
        }
        router.reload(window.location.pathname);
      });
  };

  return (
    <div className="bg-gray-100">
      <Head>
        <title>Report</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <Header />

      <div className="mt-5">
        <div className={style.reportContainer}>
          <div className="w-full flex items-center justify-between">
            <label className="w-full mr-1 text-black">
              Subject : <br />
              <input
                type="text"
                placeholder="Subject"
                className="input bg-gray-100 input-bordered input-accent w-full"
                onChange={(e) =>
                  dispatch({ type: "subject", payload: e.target.value })
                }
              />
            </label>
          </div>
          <br />
          <div>
            <label className="text-black">
              Write in details : <br />
              <textarea
                className="textarea textarea-accent bg-gray-100 w-full h-full"
                style={{ height: "190px" }}
                placeholder="Write your report"
                onChange={(e) =>
                  dispatch({ type: "reportDesc", payload: e.target.value })
                }
              ></textarea>
            </label>
          </div>
          <button
            onClick={() => handleReport()}
            className="btn btn-outline bg-green-400  text-white hover:bg-red-400 hover:text-white"
          >
            Button
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Reposts;
