import Link from "next/link";
import React from "react";
import style from "./header.module.css";

const Header = ({ data }) => {

  return (
    <div className={style.container}>
      <div className={style.logo}>
        <Link href={`/`}>
        <h1 className={style.title}>ADBACKLIST</h1>
        </Link>
        <Link href={'/user/post'}><button className={style.postButton}> + Post Ad</button></Link>
      </div>

      <div className={style.location}>
        {
          data ?   <p>
          {data?.[2]}, {data?.[1]}, {data?.[0]}
        </p> : ""
        }
      
      </div>
    </div>
  );
};

export default Header;