import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import { useSession } from "next-auth/react";

const User = () => {
  const [users, setUser] = useState({});
  const { data: session } = useSession();
  const usersStringfy = Cookies.get("token");

  async function getUser() {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/users/${session?.user?.id}`
      );
      const data = response.data.data.user;
      setUser(data);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    if (session) {
      // const user = jwt_decode(usersStringfy);
      getUser();
    }
  }, [session?.user?.email]);

  return { users, usersStringfy };
};
export default User;
