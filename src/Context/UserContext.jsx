import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export default function UserContextProvider(props) {
  const [IsLogin, setIsLogin] = useState(
    localStorage.getItem("userToken") ? localStorage.getItem("userToken") : null
  );
  const headers = { token: localStorage.getItem("userToken") };
  const [userID, setuserID] = useState(0)

  function verifyToken() {
    return  axios
    .get(`https://ecommerce.routemisr.com/api/v1/auth/verifyToken`, { headers })
    .then((res) => {
      // console.log(res);
      setuserID(res?.data?.decoded.id);
      return res;
    })
    .catch((err) => err);
  }


  useEffect(() => {
    verifyToken()
  }, [])
  

  return (
    <UserContext.Provider value={{ setIsLogin, IsLogin ,userID}}>
      {props.children}
    </UserContext.Provider>
  );
}
