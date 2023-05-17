import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const Footer = dynamic(() => import("@/component/footer/footer2"));
const Header = dynamic(() => import("@/component/header/header"));
import style from "../../styles/moduleCss/location.module.css";
import { BsArrowRight } from "react-icons/bs";
import Head from "next/head";
import cities from "../../public/country.json";

const Location = () => {
  const router = useRouter();
  const [state, setState] = useState([]);
  const [reload, setReload] = useState(false);
  const [isCountrySelected, setisCountrySelected] = useState({});

  const seleceCountry = (e) => {
    const { checked } = e.target;
    const q = e.target.value;

    if (checked) {
      const selectedRegion = cities?.find((a) => a?._id == q);
      setisCountrySelected(selectedRegion);

      const regions = selectedRegion?.children?.map((a) =>
        a.children.map((a) => {
          const data = a.name ? { ...a, isChecked: true } : a;

          const findData = state.find((s) => s._id == a._id);

          if (findData) {
            return;
          }
          state.push(data);
        })
      );
    } else if (checked == false) {
      const selectedRegion = cities?.find((a) => a?._id == q);
      setisCountrySelected({});
      state.pop(selectedRegion);
      const regions = selectedRegion?.children?.map((a) =>
        a.children.map((p) => {
          const data = p.name ? { ...p, isChecked: false } : p;

          state.pop(data);
        })
      );
    }

    setReload(!reload);
  };

  const selectAll = (e) => {
    const { checked } = e.target;
    const q = e.target.value.split(",");

    if (checked) {
      const selectedRegion = cities?.find((a) => a?._id == q[0]);
      const regions = selectedRegion?.children?.find((a) => a?._id == q[1]);

      const checkData = state.filter((a) => a.parentId == q[1]);

      if (checkData) {
        const removeOld = checkData.map((a) => state.pop(a));
      }

      const localCities = regions?.children?.filter((a) => a.parentId == q[1]);
      const city = localCities?.map((a) =>
        a.name ? { ...a, isChecked: true } : a
      );
      const res = city.map((a) => state.push(a));
    } else if (checked == false) {
      console.log(checked);

      const selectedRegion = cities?.find((a) => a?._id == q[0]);
      const regions = selectedRegion?.children?.find((a) => a?._id == q[1]);

      const checkData = state.filter((a) => a.parentId !== q[1]);
      setState(checkData);
    }

    setReload(!reload);
  };

  const seletectedCity = (d) => {
    const seleted = state.find((a) => a._id == d._id);

    if (seleted) {
      const newState = state.filter((a) => a._id !== d._id);
      setState(newState);
    } else {
      const New = { ...d, isChecked: true };
      setState([...state, New]);
    }
  };

  const citiesName = () => {
    let data = [];
    const cities = state.map((a) => data.push(a.name));

    localStorage.setItem("cities", JSON.stringify(data));
  };

  return (
    <div className="bg-gray-100">
      <Head>
        <title>Select Location</title>

        <link rel="icon" href="/logo.png" />
      </Head>
      <Header></Header>
      {router?.query?.location?.[0] == "multiple-city-ads" && (
        <div className="m-5 sm:mx-24 bg-white p-2 flex  flex-row-reverse justify-between items-center">
          <div className="flex justify-between mx-5">
            <div>
              {" "}
              {state.length == 0 ? (
                <button
                  disabled
                  className="cursor-not-allowed bg-gray-400 px-5 text-red-400 rounded flex text-2xl font-bold items-center"
                >
                  Next
                  <BsArrowRight className="text-xl ml-2"></BsArrowRight>{" "}
                </button>
              ) : (
                <>
                  <Link href={`/posts/multiple-city-ads`}>
                    <button
                      className="bg-green-500 px-5 text-white rounded flex text-2xl font-bold items-center"
                      onClick={() => citiesName()}
                    >
                      Post
                      <BsArrowRight className="text-xl ml-2"></BsArrowRight>{" "}
                    </button>
                  </Link>
                </>
              )}
            </div>
          </div>
          <div className="ml-5 text-black inline">
            Selected Cities :{" "}
            <span className="font-bold text-red-600">{state.length} </span>{" "}
            Cities are selected
          </div>
        </div>
      )}
      <div className="m-5 sm:mx-24">
        <p className="text-2xl text-red-600">Choose locations : </p>
        {cities?.map((a) => (
          <div className="collapse collapse-arrow" key={a._id}>
            <input type="checkbox" className="peer" />
            <div className="collapse-title bg-gray-300 text-black border peer-checked:bg-gray-300 peer-checked:text-black">
              {a.name}
            </div>
            <div className="collapse-content bg-gray-300 text-primary-content peer-checked:bg-gray-300 peer-checked:text-black">
              {router?.query?.location?.[0] == "multiple-city-ads" ? (
                <>
                  <br />
                  <label className="font-bold text-lg bg-gray-300">
                    <input
                      type="checkbox"
                      className="bg-red-100"
                      value={[a._id]}
                      onClick={seleceCountry}
                    ></input>{" "}
                    Select all States
                  </label>
                  <br />
                  <br />

                  {a?.children?.map((c) => (
                    <div className="collapse collapse-arrow" key={c._id}>
                      <input type="checkbox" className="peer" />
                      <div className="collapse-title bg-gray-200 text-black border border-gray-300 peer-checked:bg-gray-200 peer-checked:text-black">
                        {c?.name}
                      </div>
                      <div className="collapse-content bg-gray-200 text-primary-content peer-checked:bg-white peer-checked:text-black">
                        <div>
                          <label className="font-bold text-lg">
                            <input
                              type="checkbox"
                              className="bg-red-100 ahad"
                              disabled={isCountrySelected?.children?.find((a) =>
                                a.name == c.name ? true : false
                              )}
                              checked={isCountrySelected?.children?.find((a) =>
                                a.name == c.name ? true : false
                              )}
                              value={[a?._id, c?._id]}
                              onClick={selectAll}
                            ></input>
                            Select all
                          </label>
                          <br></br>
                          <hr />

                          <div className={style.stateBox}>
                            {c?.children?.map((d) => (
                              <>
                                <label key={d._id}>
                                  <input
                                    type="checkbox"
                                    className="bg-gray-100"
                                    checked={state.find((a) =>
                                      a.name == d.name ? true : false
                                    )}
                                    onChange={() => seletectedCity(d)}
                                  ></input>
                                  {d.name}($ 0.05)
                                </label>
                              </>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              ) : (
                <>
                  {a?.children?.map((c) => (
                    <div className="collapse collapse-arrow" key={c._id}>
                      <input type="checkbox" className="peer" />
                      <div className="collapse-title bg-gray-200 text-black border border-gray-300 peer-checked:bg-gray-200 peer-checked:text-black">
                        {c.name}
                      </div>
                      <div className="collapse-content bg-gray-200 text-primary-content peer-checked:bg-white peer-checked:text-black">
                        <div className={style.stateBox}>
                          {c?.children?.map((d) => (
                            <Link
                              key={d._id}
                              href={`/posts/${router?.query?.location?.[0]}/${d.name}`}
                            >
                              {d.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
};

export default Location;
