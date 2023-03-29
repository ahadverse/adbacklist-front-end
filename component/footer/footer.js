import React, { useEffect, useState } from "react";
import style from "../../styles/moduleCss/footer.module.css";
import { AiFillFacebook, AiFillTwitterSquare , AiFillInstagram } from "react-icons/ai";
import {BsPinterest} from "react-icons/bs"
import Cookies from "js-cookie";
import jwt_decode from "jwt-decode";
import Link from "next/link";

const Footer = () => {
  const [user, setUser] = useState();

  const usersStringfy = Cookies.get("token");
  useEffect(() => {
    if (usersStringfy) {
      const user = jwt_decode(usersStringfy);
      setUser(user);
    }
  }, []);

  return (
    <div>
      <footer className="main-footer">
        <div className={style.container}>
          <ul className={style.footer}>
            <li className={style.item}>
              <Link href="/" className="link text-uppercase" title="Home">
                Home
              </Link>
            </li>
            <li className={style.item}>
              <Link
                href="/about-us"
                className="link text-uppercase"
                title="About us"
              >
                About us
              </Link>
            </li>
            {user?._id && (
              <li className={style.item}>
                <Link
                  href={`/recharge-credits/${user?._id}`}
                  className="link text-uppercase"
                  title="Buy Credit"
                >
                  Buy Credit
                </Link>
              </li>
            )}

            <li className={style.item}>
              <Link
                href="/contact-us"
                className="link text-uppercase"
                title="Contact"
              >
                Contact
              </Link>
            </li>
            <li className={style.item}>
              <Link
                href="/privacy-policy"
                className="link text-uppercase"
                title="Privacy"
              >
                Privacy
              </Link>
            </li>
            <li className={style.item}>
              <Link href="/terms" className="link text-uppercase" title="Terms">
                Terms
              </Link>
            </li>
         
          </ul>
          <ul className={style.footer}>
          <li className={style.item}>
              <Link href="www.facebook.com" className="link text-uppercase" title="Terms">
                <AiFillFacebook className={style.facebook} />
              </Link>
            </li>
            <li className={style.item}>
              <Link href="https://www.instagram.com/adbacklist/" className="link text-uppercase" title="Terms">
                <AiFillInstagram className={style.insta}  />
              </Link>
            </li>
            <li className={style.item}>
              <Link href="https://twitter.com/Adbacklist" className="link text-uppercase" title="Terms">
                <AiFillTwitterSquare className={style.facebook}  />
              </Link>
            </li>
       
            <li className={style.item}>
              <Link href="https://www.pinterest.com/adbacklist/" className="link text-uppercase" title="Terms">
                <BsPinterest className={style.insta} />
              </Link>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
