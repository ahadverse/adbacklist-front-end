import e from "next/head";
import t from "next/dynamic";
import { useRouter as o } from "next/router";
import a, { useEffect as r, useRef as l, useState as i } from "react";
let Footer = t(() => import("@/component/footer/footer")),
  Header = t(() => import("@/component/header/header"));
import n from "../../styles/moduleCss/addPost.module.css";
import m from "sweetalert2";
import s from "js-cookie";
import u from "jwt-decode";
import { message as d, Upload, Modal } from "antd";
import y from "../../public/category.json";
import { AiFillPlusCircle } from "react-icons/ai";
import x from "@/component/user";
import axios from "axios";
import Link from "next/link";
let initialState = {
    name: "",
    phone: "",
    email: "",
    link: "",
    category: "",
    subCategory: "",
    imgOne: "",
    imgTwo: "",
    imgThree: "",
    imgFour: "",
    city: "",
    month: "",
    cities: "",
    age: "",
    posterId: "",
    isPremium: !1,
    isApproved: !1,
    error: "",
  },
  beforeUpload = (e) => {
  
    let t = "image/jpeg" === e.type || "image/png" === e.type;
    if (!t) {
      d.error("You can only upload JPG/PNG file!");
      return;
    }
    let o = e.size / 1024 / 1024 < 2;
    if (!o) {
      d.error("Image must smaller than 2MB!");
      return;
    }
    return t && o;
  },
  getBase64 = (e) =>
    new Promise((t, o) => {
      let a = new FileReader();
      a.readAsDataURL(e),
        (a.onload = () => t(a.result)),
        (a.onerror = (e) => o(e));
    }),
  Post = () => {
    let e = o(),
      { users } = x(),
      [a, l] = i(initialState),
      [d, g] = i(!1),
     
      [local, setLocal] = i(0),
      b = (e) => {
        l({ ...a, [e.type]: e.payload });
      },
      f = s.get("token");
    r(() => {
      let e = u(f);
      l({ ...a, posterId: e?._id });
    }, []);

    let [h, w] = i(!1),
      [_, P] = i(""),
      [j, T] = i(""),
      [O, S] = i([]),
      k = () => w(!1),
      v = async (e) => {
        e.url || e.preview || (e.preview = await getBase64(e.originFileObj)),
          P(e.url || e.preview),
          w(!0),
          T(e.name || e.url.substring(e.url.lastIndexOf("/") + 1));
      },
      C = ({ fileList: e }) => {
        S(e);
      },
      F = y.find((e) => e.name == a.category);

    r(() => {
      if (e.query.name?.[0] == "multiple-city-ads") {
        let e = JSON.parse(localStorage?.getItem("cities"));
        if(e == null){
          setLocal("null")
          return
        }else{
          setLocal(e?.length * 0.5);
        }
      

      }
      if (e.query.name?.[0] == "local-ads") {
        setLocal(0.5);
      }
      if (e.query.name?.[0] == "free-ads") {
        setLocal(0.0);
      }

    }, [e.query.name]);


 

    let q = async (t) => {
        // g(!0);
        let o = { ...a },
          r = new FormData();
        if (
          (O[0] &&
            (r.append("images", O[0].originFileObj),
            await fetch("https://api-adbacklist.vercel.app/api/image/upload-file", {
              method: "POST",
              body: r,
            })
              .then((e) => e.json())
              .then((e) => {
                o.imgOne = e.payload.url;
              })),
          O[1] &&
            (r.append("images", O[1].originFileObj),
            await fetch("https://api-adbacklist.vercel.app/api/image/upload-file", {
              method: "POST",
              body: r,
            })
              .then((e) => e.json())
              .then((e) => {
                o.imgTwo = e.payload.url;
              })),
          O[2] &&
            (r.append("images", O[2].originFileObj),
            await fetch("https://api-adbacklist.vercel.app/api/image/upload-file", {
              method: "POST",
              body: r,
            })
              .then((e) => e.json())
              .then((e) => {
                o.imgThree = e.payload.url;
              })),
          O[3] &&
            (r.append("images", O[3].originFileObj),
            await fetch("https://api-adbacklist.vercel.app/api/image/upload-file", {
              method: "POST",
              body: r,
            })
              .then((e) => e.json())
              .then((e) => {
                o.imgFour = e.payload.url;
              })),
          "" == o.category ||
            "" == o.description ||
            "" == o.email ||
            "" == o.phone ||
            "" == o.name ||
            "" == o.imgOne)
        ) {
          l({ ...a, error: "All fields are required including an image" });
          return;
        }
        if (
          (l({ ...a, error: "" }),

          
          "free-ads" == t[0] && ((o.city = t[1] ), (o.isApproved = !1) ),

          ("local-ads" == t[0] || "multiple-city-ads" == t[0]) &&
            ((o.city = t[1] || ""), (o.isPremium = !0) , (o.isApproved = !0)),
          "multiple-city-ads" == t[0])
        ) {
          let i = JSON.parse(localStorage.getItem("cities"));
          o.cities = i;
        }

        console.log(o)

        await fetch("https://api-adbacklist.vercel.app/api/products", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            authorization: `Bearer ${f}`,
          },
          body: JSON.stringify(o),
        })
          .then((e) => e.json())
          .then((t) => {
            localStorage.removeItem("cities")
            const newCredit = users?.credit - local
            console.log(newCredit)
            axios
              .patch(
                `https://api-adbacklist.vercel.app/api/users/${users?._id}`,
                { credit : newCredit },
                {
                  headers: {
                    authorization: `Bearer ${f}`,
                  },
                }
              )
              .then((response) => {

                if (response.data.status == "success") {

                  g(!1),
                    "success" == t.status &&
                      m
                        .fire({
                          position: "top-center",
                          icon: "success",
                          title: "Your work has been saved",
                          showConfirmButton: !1,
                          timer: 2500,
                        })
                        .then(
                          setTimeout(() => {
                            e.push("/dashboard");
                          }, 500)
                        );
                }
              });
          });
      },


      B = (
        <div>
          <AiFillPlusCircle className="text-2xl sm:text-4xl m-auto" />

          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
      );

    return (
      <div>
        <e>
          <title>Post Ads</title>

          <link rel="icon" href="/logo.png" />
        </e>
        <Header></Header>

        <div className="bg-gray-100 p-5">
          <div className="bg-white p-5 ">
            <h1 className="text-lg mb-5 text-black sm:text-2xl">
              {e?.query ? (
                <div>
                  <p>
                    Post an Ad{" "}
                    <span className="text-xs"> ({e?.query?.name?.[0]})</span>
                  </p>{" "}
                  <p className="text-red-600 font-bold border p-2 border-green-400 w-10/12 sm:w-2/12">
                    Your Credits : ${users?.credit?.toFixed(2)}
                  </p>
                  {e?.query?.name?.[0] == "free-ads" && (
                    <p className="text-blue-600 font-bold w-10/12 sm:w-4/12">
                      You will be charged : ${local}
                    </p>
                  )}
                  {e?.query?.name?.[0] == "local-ads" && (
                    <p className="text-blue-600 font-bold w-10/12 sm:w-4/12">
                      You will be charged : ${local}
                    </p>
                  )}
                  {e?.query?.name?.[0] == "multiple-city-ads" && (
                    <div className="text-blue-600 font-bold w-10/12 sm:w-4/12">
                      You will be charged : ${local}
                    </div>
                  )}
                </div>
              ) : (
                "Loading"
              )}
            </h1>

            <hr />

            <p className="text-black text-xs text-right">
              {" "}
              Maximum 4 images, max size 2MB each
            </p>

            <div>
              <div>
                <div className={n.imageContainer}>
                  <Upload
                    action={!1}
                    listType="picture-card"
                    fileList={O}
                    beforeUpload={beforeUpload}
                    onPreview={v}
                    onChange={C}
                  >
                    {O.length >= 4 ? null : B}
                  </Upload>

                  <Modal open={h} title={j} footer={null} onCancel={k}>
                    <img alt="example" style={{ width: "100%" }} src={_} />
                  </Modal>
                </div>
              </div>

              <div className={n.formDiv}>
                <label className="text-black font-bold text-xs sm:text-xl mb-5">
                  Title :
                  <br />
                  <input
                    onChange={(e) =>
                      b({ type: "name", payload: e.target.value })
                    }
                    type="text"
                    placeholder="Type here"
                    className="input bg-gray-50  w-full "
                  />
                </label>

                <label className="text-black font-bold text-xs sm:text-xl mb-5">
                  Phone :
                  <br />
                  <input
                    type="number"
                    onChange={(e) =>
                      b({ type: "phone", payload: e.target.value })
                    }
                    placeholder="Type here"
                    className="input bg-gray-50  w-full "
                  />
                </label>

                <label className="text-black font-bold text-xs sm:text-xl">
                  Email :
                  <br />
                  <input
                    type="email"
                    onChange={(e) =>
                      b({ type: "email", payload: e.target.value })
                    }
                    placeholder="Type here"
                    className="input bg-gray-50 w-full "
                  />
                </label>
                <label className="text-black font-bold text-xs sm:text-xl">
                  Social Link :
                  <br />
                  <input
                    type="text"
                    onChange={(e) =>
                      b({ type: "link", payload: e.target.value })
                    }
                    placeholder={a?.link}
                    className="input bg-gray-50 w-full "
                  />
                </label>

                <label className="text-black font-bold text-xs sm:text-xl">
                  Your Age :
                  <br />
                  <input
                    type="number"
                    onChange={(e) =>
                      b({ type: "age", payload: e.target.value })
                    }
                    placeholder="Type here"
                    className="input bg-gray-50  w-full "
                  />
                </label>
              </div>

              <br />

              <div className={n.formDiv}>
                <label className="text-black font-bold text-xs sm:text-xl">
                  Category :
                  <br />
                  <select
                    name="category"
                    id="category"
                    onChange={(e) =>
                      b({ type: "category", payload: e.target.value })
                    }
                    className="input bg-gray-50 w-full"
                  >
                    <option value="category">-- Select Category --</option>

                    {y?.map((e) => (
                      <option value={e?.name}>{e?.name}</option>
                    ))}
                  </select>
                </label>

                <label className="text-black font-bold text-xs sm:text-xl">
                  Sub Category :
                  <br />
                  <select
                    name="category"
                    id="category"
                    onChange={(e) =>
                      b({ type: "subCategory", payload: e.target.value })
                    }
                    className="input bg-gray-50  w-full "
                  >
                    <option value="subCategory">
                      -- Select Sub-Category --
                    </option>

                    {F?.children?.map((e) => (
                      <option value={e?.name}>{e?.name}</option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="sm:w-2/4 w-full m-auto pt-10 ">
                <label className="text-black font-bold text-xs sm:text-xl">
                  Description :
                  <br />
                  <textarea
                    onChange={(e) =>
                      b({ type: "description", payload: e.target.value })
                    }
                    className="textarea h-48  w-full bg-gray-50"
                    placeholder="Description"
                  ></textarea>
                </label>
              </div>

              {e?.query?.name?.[1] && (
                <div className="sm:w-2/4 w-full  m-auto pt-10 ">
                  <label className="text-black font-bold text-xs sm:text-xl">
                    Selected Area :
                    <div className={n.locationLi}>
                      <li>{e?.query?.name?.[1]}</li>
                    </div>
                  </label>
                </div>
              )}

              <p className="text-red-600 text-xs">{a.error}</p>

              <div className="sm:w-2/4 w-full m-auto pt-10 ">
                {users?.credit < local || local == "null" ? (
                  <>
                  <button className={n.postButton} disabled role="button">
                    Submit Post
                  </button> 
                  <br />
                  <Link href={`/recharge-credits/${users?._id}`} className="rounded bg-green-400 font-bold text-white p-2 hover:bg-red-400"  >
                    Add Credits
                  </Link></>
                ) : (
                  <>
                    {d ? (
                      <button
                        className={`${n.postButton} loading`}
                        role="button"
                      >
                        Wait...
                      </button>
                    ) : (
                      <button
                        className={n.postButton}
                        onClick={() => q(e?.query?.name)}
                        role="button"
                      >
                        Submit Post
                      </button>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <Footer></Footer>
      </div>
    );
  };
export default Post;
