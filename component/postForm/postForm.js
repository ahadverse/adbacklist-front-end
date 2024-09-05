import React, { useEffect, useRef, useState } from "react";
import style from "./postForm.module.css";
import { FiPlus } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import categories from "../../public/withoutadult.json";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { FaUser } from "react-icons/fa";
import { Radio, message } from "antd";
import Link from "next/link";
import User from "../user";
import { useSession } from "next-auth/react";

const initialState = {
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
  isPremium: false,
  isApproved: false,
  error: "",
};

const PostForm = () => {
  const router = useRouter();
  const { users } = User();
  const { data: session } = useSession();
  const [state, setState] = useState(initialState);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [local, setLocal] = useState(0);
  const [value1, setValue1] = useState(0);

  const handleFileChange = (event) => {
    const files = event.target.files;

    if (files?.[0].size > 50000) {
      message.error({
        type: "error",
        content: "Max Image Size is 50kb",
      });
      return;
    }

    if (previewUrls?.length == 5) {
      alert("Max 5 files");
      return;
    }
    if (files.length > 0) {
      const newSelectedFiles = Array.from(files);
      setSelectedFiles([...selectedFiles, ...newSelectedFiles]);

      const newPreviewUrls = newSelectedFiles.map((file) =>
        URL.createObjectURL(file)
      );
      setPreviewUrls([...previewUrls, ...newPreviewUrls]);
    }
  };

  const removeImage = (e) => {
    const indexToRemove = previewUrls.findIndex((url) => url === e);

    if (indexToRemove !== -1) {
      const newSelectedFiles = [...selectedFiles];
      newSelectedFiles.splice(indexToRemove, 1);

      const newPreviewUrls = [...previewUrls];
      newPreviewUrls.splice(indexToRemove, 1);
      setSelectedFiles(newSelectedFiles);
      setPreviewUrls(newPreviewUrls);
    }
  };
  const handleInput = (e) => {
    setState({ ...state, [e.type]: e.payload });
  };

  const subCategories = categories.find((e) => e.name == state.category);

  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      setState({ ...state, description: editorRef.current.getContent() });
    }
  };

  const options = [
    {
      label: "Default (free)",
      value: 0,
    },
    {
      label: "7 Days ($7)",
      value: 7,
    },
    {
      label: "14 Days ($10)",
      value: 10,
    },
    {
      label: "30 Days ($15)",
      value: 15,
    },
  ];
  const topForDays = ({ target: { value } }) => {
    setValue1(value);
    let e = JSON.parse(localStorage?.getItem("cities"));

    if (e?.query?.name?.[0] == "multiple-city-ads") {
      const newData = 0.05 + value * e.length;
      setLocal(newData);
    } else {
      const newData = 0.0 + value;
      setLocal(newData);
    }
  };

  useEffect(() => {
    if (router.query.name?.[0] == "multiple-city-ads") {
      let e = JSON.parse(localStorage?.getItem("cities"));
      if (e == null) {
        setLocal(0);
        return;
      } else {
        setLocal(e?.length * 0.05);
      }
    }
    if (router.query.name?.[0] == "local-ads") {
      setLocal(0.0);
    }
    if (router.query.name?.[0] == "premium-ads") {
      setLocal(1);
    }
  }, [router.query.name]);

  // form

  const handleSubmit = async () => {
    setLoading(true);
    const data = { ...state };

    if (router?.query?.name[0] != "local-ads") {
      const city = localStorage.getItem("cities");
      if (city == null) {
        message.error({
          type: "error",
          content:
            "You have not any city selected. please select minimum a city. Try again",
        });
        setLoading(false);
        return;
      }
    }

    const formData = new FormData();
    formData.append("images", selectedFiles[0]);
    formData.append("images", selectedFiles[1]);
    formData.append("images", selectedFiles[2]);
    formData.append("images", selectedFiles[3]);

    await fetch("https://api3.adbacklist.com/api/files2/files", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((result) => {
        data.imgOne = result[0] ?? "empty";
        data.imgTwo = result[1] ?? "empty";
        data.imgThree = result[2] ?? "empty";
        data.imgFour = result[3] ?? "empty";
      });

    if (router.query.name[0] == "local-ads") {
      (data.cities = [router.query.name[1]]), (data.isPremium = true);
    } else {
      let i = JSON.parse(localStorage.getItem("cities"));
      data.isApproved = true;
      data.isPremium = true;
      data.cities = i;
    }

    if (local == 0.0) {
      data.premiumDay = 0;
    }
    if (local == 7) {
      data.premiumDay = 7 * 24;
      data.isPremium = false;
      data.isApproved = true;
    }
    if (local == 10) {
      data.premiumDay = 14 * 24;
      data.isPremium = false;
      data.isApproved = true;
    }
    if (local == 15) {
      data.premiumDay = 30 * 24;
      data.isApproved = true;
      data.isPremium = false;
    }

    if (
      data.name == "" ||
      data.category == "" ||
      data.subCategory == "" ||
      data.description == "" ||
      data.email == "" ||
      data.imgOne == "empty"
    ) {
      message.error({
        type: "error",
        content:
          "Image, Title, Category, Sub Category and Description is required",
      });
      setLoading(false);
      return;
    }

    data.posterId = session?.user?.id;
    await fetch("https://api3.adbacklist.com/api/products", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((e) => e.json())
      .then((t) => {
        localStorage.removeItem("cities");
        const newCredit = users?.credit - local?.toFixed(2);
        axios
          .patch(`https://api3.adbacklist.com/api/users/${session?.user?.id}`, {
            credit: newCredit,
          })
          .then((response) => {
            setLoading(false);
            if (response.data.status == "success") {
              Swal.fire({
                position: "top-center",
                icon: "success",
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 2500,
              }).then(
                setTimeout(() => {
                  router.push("/dashboard/profile");
                }, 500)
              );
            }
          })
          .catch((err) => console.log(err));
      });
  };

  return (
    <div className="sm:mx-20">
      <h1 className="text-lg mb-5 text-black sm:text-2xl">
        {router?.query ? (
          <div>
            <p>
              Post an Ad{" "}
              <span className="text-xs"> ({router?.query?.name?.[0]})</span>
            </p>{" "}
            <p className="text-red-600 font-bold border p-2 border-green-400 w-10/12 sm:w-4/12">
              Your Credits : ${users?.credit?.toFixed(2)}
            </p>
            {router?.query?.name?.[0] == "premium-ads" && (
              <p className="text-blue-600 font-bold w-10/12 sm:w-4/12">
                You will be charged : ${local?.toFixed(2)}
              </p>
            )}
            {router?.query?.name?.[0] == "local-ads" && (
              <p className="text-blue-600 font-bold w-10/12 sm:w-4/12">
                You will be charged : ${local?.toFixed(2)}
              </p>
            )}
            {router?.query?.name?.[0] == "multiple-city-ads" && (
              <div className="text-blue-600 font-bold w-10/12 sm:w-4/12">
                You will be charged : ${local?.toFixed(2)}
              </div>
            )}
          </div>
        ) : (
          "Loading"
        )}
      </h1>
      <div className="flex justify-center sm:flex-row flex-col gap-5">
        <div
          className={`${previewUrls.length < 4 ? "block" : "hidden"} h-[200px]`}
        >
          {previewUrls.length < 4 && (
            <label className="block font-bold relative">
              <input
                className="rounded w-[170px]"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
              />
              <FaUser className="absolute top-0 bg-white w-[170px] h-[200px] p-5 text-gray-400 border border-red-500 rounded" />
            </label>
          )}
        </div>
        <div>
          {previewUrls.length > 0 && (
            <div className="grid grid-cols-2 sm:flex items-center sm:flex-row  gap-5">
              {previewUrls.map((url, index) => (
                <div key={index} className={`${style.card}`}>
                  <img src={url} alt={`Preview ${index + 1}`} />
                  <p
                    className={`${style.cross}`}
                    onClick={() => removeImage(url)}
                  >
                    <span>
                      <FaTrash />
                    </span>
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <br />
      {/*form start here */}
      <div className="flex justify-between sm:flex-row flex-col sm:gap-10 gap-2">
        <label className="text-black font-bold text-xs sm:text-xl sm:mb-5 sm:w-6/12">
          <span className="text-red-600">*</span> Title :
          <br />
          <input
            onChange={(e) =>
              handleInput({ type: "name", payload: e.target.value })
            }
            type="text"
            className="input bg-gray-200  w-full "
          />
        </label>

        <label className="text-black font-bold text-xs sm:text-xl mb-5 sm:w-6/12">
          Phone :
          <br />
          <input
            type="number"
            onChange={(e) =>
              handleInput({ type: "phone", payload: e.target.value })
            }
            className="input bg-gray-200  w-full "
          />
        </label>
      </div>
      <div className="flex justify-between sm:flex-row flex-col sm:gap-10 gap-2">
        <label className="text-black font-bold text-xs sm:text-xl sm:w-6/12">
          <span className="text-red-600">*</span> Email :
          <br />
          <input
            type="email"
            onChange={(e) =>
              handleInput({ type: "email", payload: e.target.value })
            }
            className="input bg-gray-200 w-full "
          />
        </label>

        <label className="text-black font-bold text-xs sm:text-xl sm:w-6/12">
          Your Age :
          <br />
          <input
            type="number"
            onChange={(e) =>
              handleInput({ type: "age", payload: e.target.value })
            }
            className="input bg-gray-200  w-full "
          />
        </label>
      </div>
      <br />
      <div className="flex justify-between sm:flex-row flex-col sm:gap-10 gap-2">
        <label className="text-black font-bold text-xs sm:text-xl sm:w-6/12">
          <span className="text-red-600">*</span> Category :
          <br />
          <select
            name="category"
            id="category"
            onChange={(e) =>
              handleInput({ type: "category", payload: e.target.value })
            }
            className="input bg-gray-200 w-full"
          >
            <option value="category">-- Select Category --</option>

            {categories?.map((e) => (
              <option value={e?.name}>{e?.name}</option>
            ))}
          </select>
        </label>

        <label className="text-black font-bold text-xs sm:text-xl sm:w-6/12">
          <span className="text-red-600">*</span> Sub Category :
          <br />
          <select
            name="category"
            id="category"
            onChange={(e) =>
              handleInput({ type: "subCategory", payload: e.target.value })
            }
            className="input bg-gray-200  w-full "
          >
            <option value="category">-- Select Sub Category --</option>

            {subCategories?.children?.map((e) => (
              <option value={e?.name}>{e?.name}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="sm:w-full w-full m-auto pt-10 ">
        <label className="text-black font-bold text-xs sm:text-xl">
          <span className="text-red-600">*</span> Description :
          <br />
          <Editor
            onBlur={log}
            apiKey="lsomljxr6jq719eep6p1gnkb6648rvtp291uwsy43kesby4m"
            onInit={(evt, editor) => (editorRef.current = editor)}
            init={{
              height: 350,
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
      {router.query.name?.[0] == "multiple-city-ads" ? (
        ""
      ) : (
        <div className="sm:w-full w-full m-auto pt-10 ">
          <label className="text-black font-bold text-xs sm:text-xl">
            Show your adds at top <small>(extra charged)</small>
          </label>
          <br />

          <Radio.Group options={options} onChange={topForDays} value={value1} />
        </div>
      )}
      <br />
      <p className="text-red-600 text-xs">{state.error}</p>
      <br />
      <div className=" w-full m-auto pt-10 ">
        {users?.credit < local || local == "null" ? (
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
            {loading ? (
              <button className={`${style.postButton} loading`} role="button">
                Wait...
              </button>
            ) : (
              <button
                className={style.postButton}
                onClick={() => handleSubmit(router?.query?.name)}
                role="button"
              >
                Submit Post
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PostForm;
