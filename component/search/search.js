import Link from "next/link";
import React, { useEffect, useState } from "react";

const Search = () => {
  const [keyword, setKeyword] = useState("");
  const [result, setResult] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!keyword) {
      return setResult([]);
    } else {
      setIsLoading(true);
      fetch(`https://api3.adbacklist.com/api/countries/search?q=${keyword}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.code == 404) {
            setResult([{ name: "No City Found" }]);
          } else {
            setResult(data);
          }
          setIsLoading(false);
        });
    }
  }, [keyword]);

  const onSearch = (e) => {
    e.preventDefault();
    setKeyword(e.target.keyword.value);
  };

  return (
    <div>
      <div className="my-5 sm:w-9/12 m-auto">
        <form onSubmit={onSearch} className="flex items-center">
          <input
            placeholder="City Name"
            className="w-full p-2 bg-gray-200"
            name="keyword"
          />
          {isLoading ? (
            <button className="bg-red-400 p-2 font-bold  border-0 rounded text-white ">
              Searching
            </button>
          ) : (
            <button
              type="submit"
              className="bg-red-400 p-2 font-bold  border-0 rounded text-white"
            >
              Search
            </button>
          )}
        </form>
        {result?.length !== 0 && (
          <div className="w-9/12 block m-auto text-decoration-none  text-yellow-600 hover:underline">
            {result?.map((a) => (
              <li key={a._id}>
                <Link href={`/${a?.name}`}>{a?.name}</Link>
              </li>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
