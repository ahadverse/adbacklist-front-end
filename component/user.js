import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";

const User = () => {
  const [users, setUser] = useState({});

  const usersStringfy = Cookies.get("token");
  async function getUser(user) {
    try {
      const response = await axios.get(
        `https://api-adbacklist.vercel.app/api/users/${user._id}`
      );
      const data = response.data.data.user;
      setUser(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (usersStringfy) {
      const user = jwt_decode(usersStringfy);
      getUser(user);
    }

  }, []);

  return {users , usersStringfy}
};
export default User;
