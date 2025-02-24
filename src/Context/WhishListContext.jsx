{
  /*


import axios from "axios";
import { createContext, useContext, useState } from "react";
import toast from "react-hot-toast";
import { CartContext } from "./CartContext";

export const WhishListContext = createContext();

export default function WhishListContextProvider(props) {
  const headers = { token: localStorage.getItem("userToken") };
  const { currntID, setcurrntID, loadingDeleteItem, setloadingDeleteItem } =
    useContext(CartContext);
  const [loadingHeart, setloadingHeart] = useState(false);
  const [loading, setloading] = useState(false);
  // const [WhishListDetails, setWhishListDetails] = useState({});

  const [WhishListDetails, setWhishListDetails] = useState([]); 
  // const [isInWishList, setIsInWishList] = useState([]);

  function addToWhishList(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        {
          productId: productId,
        },
        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  }

  async function addToWhishListBtn(idOfTheProduct) {
    setcurrntID(idOfTheProduct);
    setloadingHeart(true);
    const response = await addToWhishList(idOfTheProduct);
    console.log(response?.data?.data);
    if (response.data.status == "success") {
      toast.success(response.data.message);
      setloadingHeart(false);
      setWhishListDetails(...WhishListDetails,idOfTheProduct)
    } else {
      toast.error(response.data.message);
      setloadingHeart(false);
    }
  }

  function getLoggedUserWhishList() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/wishlist`, { headers })
      .then((res) => res)
      .catch((err) => err);
  }

  async function viewWhishList() {
    setloading(true);
    const response = await getLoggedUserWhishList();
    setloading(false);
    if (response?.data?.status == "success") {
      console.log(response?.data?.data);
      setWhishListDetails(response?.data?.data||[]);
    }
  }

  function deleteWhishListItem(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
        headers,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  async function deleteWhishListItemBTN(id) {
    setloadingDeleteItem(true);
    setcurrntID(id);
    const response = await deleteWhishListItem(id);
    console.log(response);
    if (response?.data?.status == "success") {
      console.log(response?.data?.data);
      setWhishListDetails(response?.data?.data);
      toast.success(response?.data?.message);
      setloadingDeleteItem(false);
      setWhishListDetails(WhishListDetails.filter((id) => id !== currntID));
    } else {
      toast.error("Failed to delete product");
      setloadingDeleteItem(false);
    }
  }

  async function toggleWhishListItem(idOfTheProduct) {
    setcurrntID(idOfTheProduct);
    setloadingHeart(true);

    if (WhishListDetails.includes(idOfTheProduct)) {
      await deleteWhishListItemBTN(idOfTheProduct);
    } else {
      await addToWhishListBtn(idOfTheProduct);
    }
  }

  // async function toggleWhishListItem(idOfTheProduct) {
  //   setcurrntID(idOfTheProduct);
  //   setloadingHeart(true);

  //   const isProductInWishlist = WhishListDetails.some(
  //     (product) => product._id === idOfTheProduct
  //   );

  //   if (isProductInWishlist) {
  //     await deleteWhishListItemBTN(idOfTheProduct);
  //     setloadingHeart(false);
  //   } else {
  //     await addToWhishListBtn(idOfTheProduct);
  //     setloadingHeart(false);
  //   }
  // }

  return (
    <WhishListContext.Provider
      value={{
        addToWhishListBtn,
        loadingHeart,
        viewWhishList,
        WhishListDetails,
        loading,
        currntID,
        deleteWhishListItemBTN,
        loadingDeleteItem,
        toggleWhishListItem,
      }}
    >
      {props.children}
    </WhishListContext.Provider>
  );
}
*/
}

import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const WhishListContext = createContext();

export default function WhishListContextProvider({ children }) {
  const headers = { token: localStorage.getItem("userToken") };
  const [WishList, setWishList] = useState([]);

  async function viewWishList() {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { headers }
      );
      setWishList(data?.data || []);
    } catch (error) {
      console.log(error);

      // toast.error(error?.message);
    }
  }

  async function addToWishList(product) {
    try {
      await axios.post(
        `https://ecommerce.routemisr.com/api/v1/wishlist`,
        { productId: product?.id },
        { headers }
      );

      setWishList((WishList) => [...WishList, product]); 
    } catch (error) {
      console.log(error);
    }
  }
  async function deleteWishListItemBTN(productID) {
    try {
      await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/wishlist/${productID}`,
        { headers }
      );

      setWishList((WishList) =>
        WishList.filter((item) => item.id !== productID)
      ); 
    } catch (error) {
      console.log(error);
    }
  }

  function IsInWishList(productID) {
    return WishList.some((item) => item.id === productID);
  }
  
  useEffect(() => {
    viewWishList();
  }, []);

  return (
    <WhishListContext.Provider
      value={{
        IsInWishList,
        deleteWishListItemBTN,
        addToWishList,
        viewWishList,
        WishList,
      }}
    >
      {children}
    </WhishListContext.Provider>
  );
}
