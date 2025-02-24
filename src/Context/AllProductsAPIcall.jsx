import { createContext, useState } from "react";
import axios from 'axios';




export const AllProductsAPIcall = createContext();

export default function AllProductsAPIcallProvider(props) {
  const [allProducts, setallProducts] = useState([]);
  function getAllProducts() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then((res) => {
        setallProducts(res.data.data);
      })
      .catch((res) => {
        console.log(res);
      });
  }
  return (
    <AllProductsAPIcall.Provider value={{ getAllProducts, allProducts }}>
      {props.children}
    </AllProductsAPIcall.Provider>
  );
}
