import React, { useRef, useState } from "react";
import style from "./updatePost.module.css";
import { FiPlus } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import categories from "../../public/withoutadult.json";
import { Editor } from "@tinymce/tinymce-react";
import axios from "axios";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

const initialState = {
  name: "",
  phone: "",
  email: "",
  category: "",
  subCategory: "",
  imgOne: "",
  imgTwo: "",
  imgThree: "",
  imgFour: "",
  city: "",
  month: "",
  cities: "",
  link: "",
  age: "",
  posterId: "",
  error: "",
  description: "",
};

const UpdatedPost = ({ post }) => {
  const router = useRouter();
  const [state, setState] = useState(initialState);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previewUrls, setPreviewUrls] = useState([]);
  const [editImage, setEditImage] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const files = event.target.files;

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

  const handleSubmit = async (e) => {
    setLoading(true);
    const data = { ...state };
    if (selectedFiles.length > 0) {
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
    }

    const dataWithValues = {};
    Object.keys(data).forEach((key) => {
      if (data[key] !== "") {
        dataWithValues[key] = data[key];
      }
    });
    const options = {
      headers: {
        "content-type": "application/json",
      },
    };

    await axios
      .patch(
        `https://api3.adbacklist.com/api/products/${router.query.id}`,
        dataWithValues,
        options
      )
      .then((res) => {
        setLoading(false);
        if (res.data.status == "success") {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Your Profile has been updated",
            showConfirmButton: false,
            timer: 1500,
          })
            .then(() => {
              router.push("/dashboard/profile");
            })
            .catch((err) => console.log(err));
        }
      });
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

  return (
    <div className="w-10/12 m-auto bg-white p-5">
      {editImage && (
        <small className="text-red-500">Please Re-select the images</small>
      )}
      {!editImage ? (
        <div className="grid grid-cols-2 sm:flex justify-center items-center sm:flex-row gap-5">
          {post.imgOne != "empty" && (
            <div className={`${style.card}`}>
              <img src={post.imgOne} />
            </div>
          )}
          {post.imgTwo != "empty" && (
            <div className={`${style.card}`}>
              <img src={post.imgTwo} />
            </div>
          )}
          {post.imgThree != "empty" && (
            <div className={`${style.card}`}>
              <img src={post.imgThree} />
            </div>
          )}
          {post.imgFour != "empty" && (
            <div className={`${style.card}`}>
              <img src={post.imgFour} />
            </div>
          )}
          <button onClick={() => setEditImage(!editImage)}>
            <FaRegEdit className=" bg-white w-[120px] h-[200px] p-5 text-red-500 border border-red-500 rounded" />
          </button>
        </div>
      ) : (
        <div className="flex justify-center sm:flex-row flex-col gap-5">
          <div
            className={`${
              previewUrls.length < 4 ? "block" : "hidden"
            } h-[200px]`}
          >
            {previewUrls.length < 4 && (
              <label className="block font-bold relative">
                <input
                  className="rounded w-[170px]"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                />
                <FiPlus className="absolute top-0 bg-white w-[170px] h-[200px] p-5 text-red-500 border border-red-500 rounded" />
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
      )}
      <br />
      {/*form start here */}
      <div className="flex justify-between sm:flex-row flex-col sm:gap-10 gap-2">
        <label className="text-black font-bold text-xs sm:text-xl sm:mb-5 sm:w-6/12">
          Title :
          <br />
          <input
            onChange={(e) =>
              handleInput({ type: "name", payload: e.target.value })
            }
            type="text"
            defaultValue={post?.name}
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
            defaultValue={post?.phone}
            className="input bg-gray-200  w-full "
          />
        </label>
      </div>
      <div className="flex justify-between sm:flex-row flex-col sm:gap-10 gap-2">
        <label className="text-black font-bold text-xs sm:text-xl sm:w-6/12">
          Email :
          <br />
          <input
            type="email"
            onChange={(e) =>
              handleInput({ type: "email", payload: e.target.value })
            }
            defaultValue={post?.email}
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
            defaultValue={post?.age}
            className="input bg-gray-200  w-full "
          />
        </label>
      </div>
      <br />
      <div className="flex justify-between sm:flex-row flex-col sm:gap-10 gap-2">
        <label className="text-black font-bold text-xs sm:text-xl sm:w-6/12">
          Category :
          <br />
          <select
            name="category"
            id="category"
            onChange={(e) =>
              handleInput({ type: "category", payload: e.target.value })
            }
            className="input bg-gray-200 w-full"
          >
            <option value="category">{post?.category}</option>

            {categories?.map((e) => (
              <option value={e?.name}>{e?.name}</option>
            ))}
          </select>
        </label>

        <label className="text-black font-bold text-xs sm:text-xl sm:w-6/12">
          Sub Category :
          <br />
          <select
            name="category"
            id="category"
            onChange={(e) =>
              handleInput({ type: "subCategory", payload: e.target.value })
            }
            className="input bg-gray-200  w-full "
          >
            <option value="category">{post?.subCategory}</option>

            {subCategories?.children?.map((e) => (
              <option value={e?.name}>{e?.name}</option>
            ))}
          </select>
        </label>
      </div>
      <div className="sm:w-full w-full m-auto pt-10 ">
        <label className="text-black font-bold text-xs sm:text-xl">
          Description :
          <br />
          <Editor
            onBlur={log}
            apiKey="85y33d08bi5k84w3nxa07aq607ko8v165dau2joyygooce9j"
            onInit={(evt, editor) => (editorRef.current = editor)}
            initialValue={post.description}
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
      {post?.city !== "" ? (
        <div className="sm: w-full  m-auto pt-10 ">
          <label className="text-black font-bold text-xs sm:text-base">
            Selected Area :
            <div className={"font-normal"}>
              <li>{post?.city}</li>
            </div>
          </label>
        </div>
      ) : (
        <div className="sm:w-full  m-auto pt-10 ">
          <label className="text-black font-bold  text-xs sm:text-base">
            Selected Area :
            <div className={"grid grid-cols-4 font-normal"}>
              {post?.cities && (
                <>
                  {" "}
                  {post?.cities?.map((a) => (
                    <li className="list-decimal mr-1" key={a}>
                      {a}
                    </li>
                  ))}
                </>
              )}
            </div>
          </label>
        </div>
      )}
      <br />
      <p className="text-red-600 text-xs">{state.error}</p>
      <br />
      {loading ? (
        <button className={`${style.postButton} loading`} role="button">
          Wait...
        </button>
      ) : (
        <button
          className={style.postButton}
          onClick={() => handleSubmit()}
          role="button"
        >
          Submit Post
        </button>
      )}
    </div>
  );
};

export default UpdatedPost;
