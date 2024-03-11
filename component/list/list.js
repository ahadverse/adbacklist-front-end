import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const List = ({ data1, data2 }) => {
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
              {a.objects.map((b) => (
                <Link
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`/post/details/${router?.query?.names?.[1]}/${b._id}?city=${router.query.names?.[0]}&sub=${router.query.names?.[2]}`}
                  key={b._id}
                  className="border  gap-3 block flex"
                >
                  <img className="w-[100px] h-[100px]" src={b.imgOne} />
                  <div>
                    <li className="list-none text-xl m-3 text-blue-600 hover:underline cursor-pointer">
                      {b.name}
                    </li>
                    <li className="list-none text-xl m-3 text-black  cursor-pointer">
                      {b.age}
                    </li>
                  </div>
                </Link>
              ))}
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
          <div key={index}>
            {a.objects.map((b) => (
              <Link
                target="_blank"
                rel="noopener noreferrer"
                href={`/post/details/${router?.query?.names?.[1]}/${b._id}?city=${router.query.names?.[0]}&sub=${router.query.names?.[2]}`}
                key={b._id}
                className="border flex gap-3"
              >
                <img className="w-[100px] h-[100px]" src={b.imgOne} />
                <div>
                  <li className="list-none text-xl m-3 text-blue-600 hover:underline cursor-pointer">
                    {b.name}
                  </li>
                  <li className="list-none text-xl m-3 text-black  cursor-pointer">
                    {b.age}
                  </li>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default List;
