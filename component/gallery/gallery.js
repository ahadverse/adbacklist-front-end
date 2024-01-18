import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

const Gallery = ({ data1 }) => {
  const router = useRouter();
  return (
    <div>
      {data1?.length > 0 && (
        <div className="flex flex-wrap justify-center gap-2">
          {data1.map((a, index) => (
            <Link
              target="_blank"
              rel="noopener noreferrer"
              href={`/post/details/${router?.query?.names?.[1]}/${a._id}?city=${router.query.names?.[0]}&sub=${router.query.names?.[2]}`}
            >
              <img className="h-[300px] flex-1 object-cover" src={a.imgOne} />
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default Gallery;
