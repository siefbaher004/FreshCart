import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { UserContext } from "./UserContext";

export const AllOrdersContext = createContext();

export default function AllOrdersContextProvider({ children }) {
  const { userID } = useContext(UserContext); 
  const [orders, setOrders] = useState([]); 

  function getUserOrders(userID) {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/orders/user/${userID}`)
      .then((res) => {
        console.log( res.data);
        setOrders(res.data); 
        return res;
      })
  }

  return (
    <AllOrdersContext.Provider value={{ orders, getUserOrders }}>
      {children}
    </AllOrdersContext.Provider>
  );
}

