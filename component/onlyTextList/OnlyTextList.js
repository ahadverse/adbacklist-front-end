import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const OnlyTextList = ({ data1, data2 }) => {
  const router = useRouter();
  return (
    <div>
      {data1?.length > 0 && (
        <div>
          <h1 className="bg-gradient-to-r from-red-500 to-white w-8/12 px-1 text-xl text-black font-bold  py-1">
            Premium Ads
          </h1>
          {data1.map((a, index) => (
            <div key={index}>
              <ul>
                {a.objects.map((b) => (
                  <Link
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`/post/details/${router?.query?.names?.[1]}/${b._id}?city=${router.query.names?.[0]}&sub=${router.query.names?.[2]}`}
                    key={b._id}
                    className="text-xl m-3 block text-blue-600 hover:underline cursor-pointer"
                  >
                    {b.name}
                  </Link>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
      <h1 className="bg-gradient-to-r from-yellow-500 to-white w-8/12 px-1 text-xl text-black font-bold  py-1">
        Ads
      </h1>
      {data2.map((a, index) => (
        <div key={index}>
          {/*<li className="list-square bg-gradient-to-r from-gray-300 to-gray-100 sm:w-4/12 w-6/12 px-1 text-sm text-black font-bold  py-1 mt-5">
            {a.date}
          </li>*/}
          <ul>
            {a.objects.map((b) => (
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href={`/post/details/${router?.query?.names?.[1]}/${b._id}?city=${router.query.names?.[0]}&sub=${router.query.names?.[2]}`}
                key={b._id}
                className="text-xl mt-6 mx-3 block text-blue-600 hover:underline cursor-pointer"
              >
                {b.name} - <span className="text-black">{b.age}</span>
              </Link>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default OnlyTextList;
