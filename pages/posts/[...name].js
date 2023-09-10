import e from "next/head";
import t from "next/dynamic";
import { useRouter as o } from "next/router";
import a, { useEffect as r, useRef as l, useState as i, useRef } from "react";
let Footer = t(() => import("@/component/footer/footer")),
  Header = t(() => import("@/component/header/header"));
import n from "../../styles/moduleCss/addPost.module.css";
import m from "sweetalert2";
import { message as d, Upload, Modal, message, Select, Radio } from "antd";
import y from "../../public/category.json";
import { AiFillPlusCircle } from "react-icons/ai";
import x from "@/component/user";
import axios from "axios";
import Link from "next/link";
import { Editor } from "@tinymce/tinymce-react";
import { useSession } from "next-auth/react";

let initialState = {
    name: "",
    phone: "",
    email: "",
    description: "",
    category: "",
    subCategory: "",
    imgOne: "",
    imgTwo: "",
    imgThree: "",
    imgFour: "",
    city: "",
    month: "",
    cities: "",
    premiumDay: 0,
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
    const { data: session } = useSession();
    const [value1, setValue1] = i(0);
    let e = o(),
      { users } = x(),
      [a, l] = i(initialState),
      [d, g] = i(!1),
      [local, setLocal] = i(0),
      b = (e) => {
        l({ ...a, [e.type]: e.payload });
      },
      f = "";

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
        if (e == null) {
          setLocal(0);
          return;
        } else {
          setLocal(e?.length * 0.05);
        }
      }
      if (e.query.name?.[0] == "local-ads") {
        setLocal(0.05);
      }
      if (e.query.name?.[0] == "premium-ads") {
        setLocal(1);
      }
    }, [e.query.name]);

    const topForDays = ({ target: { value } }) => {
      setValue1(value);
      let e = JSON.parse(localStorage?.getItem("cities"));

      if (e?.query?.name?.[0] == "multiple-city-ads") {
        const newData = 0.05 + value * e.length;
        setLocal(newData);
      } else {
        const newData = 0.05 + value;
        setLocal(newData);
      }
    };

    const editorRef = useRef(null);
    const log = () => {
      if (editorRef.current) {
        l({ ...a, description: editorRef.current.getContent() });
      }
    };

    let q = async (t) => {
        if (e?.query?.name[0] != "local-ads") {
          const city = localStorage.getItem("cities");
          if (city == null) {
            message.error({
              type: "error",
              content:
                "You have not any city selected. please select minimum a city. Try again",
            });
            return;
          }
        }

        g(!0);
        let o = { ...a },
          r = new FormData();
        if (
          (O[0] &&
            (r.append("images", O[0].originFileObj),
            await fetch("https://api-adbacklist.vercel.app/api/files/files", {
              method: "POST",
              body: r,
            })
              .then((e) => e.json())
              .then((e) => {
                o.imgOne = e.url;
              })),
          O[1] &&
            (r.append("images", O[1].originFileObj),
            await fetch("https://api-adbacklist.vercel.app/api/files/files", {
              method: "POST",
              body: r,
            })
              .then((e) => e.json())
              .then((e) => {
                o.imgTwo = e.url;
              })),
          O[2] &&
            (r.append("images", O[2].originFileObj),
            await fetch("https://api-adbacklist.vercel.app/api/files/files", {
              method: "POST",
              body: r,
            })
              .then((e) => e.json())
              .then((e) => {
                o.imgThree = e.url;
              })),
          O[3] &&
            (r.append("images", O[3].originFileObj),
            await fetch("https://api-adbacklist.vercel.app/api/files/files", {
              method: "POST",
              body: r,
            })
              .then((e) => e.json())
              .then((e) => {
                o.imgFour = e.url;
              })),
          "" == o.category || "" == o.description || "" == o.name)
        ) {
          g(!1);
          l({ ...a, error: "" });
          message.error({
            type: "error",
            content:
              "Image, Title, Category, Sub Category and Description is required",
          });
          return;
        }
        if (
          (l({ ...a, error: "" }),
          ("local-ads" == t[0] || "multiple-city-ads" == t[0]) &&
            ((o.cities = [t[1]] || ""),
            (o.isApproved = !0),
            (o.isPremium = !0)),
          "multiple-city-ads" == t[0])
        ) {
          let i = JSON.parse(localStorage.getItem("cities"));

          o.cities = i;
        }
        if (local == 0.05) {
          o.premiumDay = 0;
        }
        if (local == 10.05) {
          o.premiumDay = 7 * 24;
          o.isPremium = !1;
        }
        if (local == 20.05) {
          o.premiumDay = 14 * 24;
          o.isPremium = !1;
        }
        if (local == 35.05) {
          o.premiumDay = 30 * 24;
          o.isPremium = !1;
        }

        o.posterId = session?.user?.id;

        await fetch("https://api-adbacklist.vercel.app/api/products", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(o),
        })
          .then((e) => e.json())
          .then((t) => {
            localStorage.removeItem("cities");
            const newCredit = users?.credit - local?.toFixed(2);
            axios
              .patch(
                `https://api-adbacklist.vercel.app/api/users/${session?.user?.id}`,
                {
                  credit: newCredit,
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
                            e.push("/dashboard/profile");
                          }, 500)
                        );
                }
              })
              .catch((err) => console.log(err));
          });
      },
      B = (
        <div>
          <AiFillPlusCircle className="text-2xl sm:text-4xl m-auto" />

          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
      );

    const options = [
      {
        label: "Default",
        value: 0,
      },
      {
        label: "7 Days",
        value: 10,
      },
      {
        label: "14 Days",
        value: 20,
      },
      {
        label: "30 Days",
        value: 35,
      },
    ];

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
                  {e?.query?.name?.[0] == "premium-ads" && (
                    <p className="text-blue-600 font-bold w-10/12 sm:w-4/12">
                      You will be charged : ${local?.toFixed(2)}
                    </p>
                  )}
                  {e?.query?.name?.[0] == "local-ads" && (
                    <p className="text-blue-600 font-bold w-10/12 sm:w-4/12">
                      You will be charged : ${local?.toFixed(2)}
                    </p>
                  )}
                  {e?.query?.name?.[0] == "multiple-city-ads" && (
                    <div className="text-blue-600 font-bold w-10/12 sm:w-4/12">
                      You will be charged : ${local?.toFixed(2)}
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
                    {O.length >= 1 ? null : B}
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
                    className="input bg-gray-100  w-full "
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
                    className="input bg-gray-100  w-full "
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
                    className="input bg-gray-100 w-full "
                  />
                </label>

                <label className="text-black  font-bold text-xs sm:text-xl">
                  Your Age :
                  <br />
                  <input
                    type="number"
                    onChange={(e) =>
                      b({ type: "age", payload: e.target.value })
                    }
                    placeholder="Type here"
                    className="input bg-gray-100  w-full "
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
                    className="input bg-gray-100 w-full"
                  >
                    <option value="category">-- Select Category --</option>

                    {y?.map((e) => (
                      <option value={e?.name} key={e?.name}>
                        {e?.name}
                      </option>
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
                    className="input bg-gray-100  w-full "
                  >
                    <option value="subCategory">
                      -- Select Sub-Category --
                    </option>

                    {F?.children?.map((e) => (
                      <option value={e?.name} key={e?.name}>
                        {e?.name}
                      </option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="sm:w-3/4 w-full m-auto pt-10 ">
                <label className="text-black font-bold text-xs sm:text-xl">
                  Description :
                  <br />
                  <Editor
                    onBlur={log}
                    apiKey="85y33d08bi5k84w3nxa07aq607ko8v165dau2joyygooce9j"
                    onInit={(evt, editor) => (editorRef.current = editor)}
                    initialValue={a.description}
                    init={{
                      height: 250,
                      menubar: false,
                      plugins: [
                        "advlist",
                        "autolink",
                        "lists",
                        "link",
                        "image",
                        "charmap",
                        "preview",
                        "anchor",
                        "searchreplace",
                        "visualblocks",
                        "code",
                        "fullscreen",
                        "insertdatetime",
                        "media",
                        "table",
                        "code",
                        "help",
                        "wordcount",
                      ],
                      toolbar:
                        "insertfile image media pageembed template link anchor codesample | bold italic forecolor | alignleft aligncenter " +
                        "undo redo | blocks | " +
                        "alignright alignjustify | bullist numlist outdent indent | " +
                        "removeformat | help",
                      image_caption: true,
                      image_advtab: true,
                      content_style:
                        "body { font-family:Helvetica,Arial,sans-serif; font-size:14px ;  }",
                      relative_urls: true,
                    }}
                  />
                </label>
              </div>

              {e?.query?.name?.[1] && (
                <div className="sm:w-3/4 w-full  m-auto pt-10 ">
                  <label className="text-black font-bold text-xs sm:text-xl">
                    Selected Area :
                    <div className={n.locationLi}>
                      <li>{e?.query?.name?.[1]}</li>
                    </div>
                  </label>
                </div>
              )}

              {/* <p className="text-red-600 text-xs">{a.error}</p> */}
              {e.query.name?.[0] == "multiple-city-ads" ? (
                ""
              ) : (
                <div className="sm:w-3/4 w-full m-auto pt-10 ">
                  <label className="text-black font-bold text-xs sm:text-xl">
                    Show your adds at top <small>(extra charged)</small>
                  </label>
                  <br />

                  <Radio.Group
                    options={options}
                    onChange={topForDays}
                    value={value1}
                  />
                </div>
              )}

              <div className="sm:w-3/4 w-full m-auto pt-10 ">
                {session?.user?.credit < local || local == "null" ? (
                  <>
                    <h1 className="text-2xl text-red-600 font-bold">
                      Insufficient Balance
                    </h1>
                    <br />
                    <Link
                      href={`/recharge-credits/${users?._id}`}
                      className="rounded bg-green-400 font-bold text-white p-2 hover:bg-red-400"
                    >
                      Buy Credits
                    </Link>
                  </>
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
