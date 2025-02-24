import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const CartContext = createContext();

export default function CartContextProvider(props) {
  const headers = { token: localStorage.getItem("userToken") };
  const [CartDetails, setCartDetails] = useState({});
  const [loadingCountUpdate, setloadingCountUpdate] = useState(false);
  const [loadingDeleteItem, setloadingDeleteItem] = useState(false);
  const [loadingDeleteCart, setloadingDeleteCart] = useState(false);
  const [loading, setloading] = useState(false);
  const [currntID, setcurrntID] = useState(0);
  const [cartID, setcartID] = useState(0);
  const [numOfCartItems, setnumOfCartItems] = useState(0);

  function addToCart(productId) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          productId: productId,
        },
        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  }

  async function addToCartBtn(idOfTheProduct) {
    setloadingCountUpdate(true);
    setcurrntID(idOfTheProduct);
    const response = await addToCart(idOfTheProduct);
    console.log(response);
    if (response.data.status == "success") {
      toast.success(response.data.message);
      setloadingCountUpdate(false);
      setnumOfCartItems(numOfCartItems + 1);
    } else {
      toast.error(response.data.message);
      setloadingCountUpdate(false);
    }
  }

  function getLoggedUserCart() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then((res) => {
        setcartID(res?.data?.data?._id);
        setnumOfCartItems(res?.data?.numOfCartItems);
        return res;
      })
      .catch((err) => err);
  }

  useEffect(() => {
    getLoggedUserCart();
  }, []);

  async function viewCart() {
    setloading(true);
    const response = await getLoggedUserCart();
    setloading(false);
    if (response?.data?.status == "success") {
      setCartDetails(response.data.data);
    }
  }

  function updateCartProductQuantity(productId, newCount) {
    return axios
      .put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        { count: newCount },
        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  }

  async function updateCartProductQuantityBtn(id, count) {
    setloadingCountUpdate(true);
    setcurrntID(id);
    const response = await updateCartProductQuantity(id, count);

    if (response.data.status == "success") {
      setCartDetails(response?.data?.data);
      toast.success("Product Updated");
      setloadingCountUpdate(false);
    } else {
      toast.error("Update Failed");
      setloadingCountUpdate(false);
    }
  }

  function deleteCartItem(productId) {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        headers,
      })
      .then((res) => res)
      .catch((err) => err);
  }

  async function deleteCartItemBTN(id) {
    setloadingDeleteItem(true);
    setcurrntID(id);
    const response = await deleteCartItem(id);
    console.log(response);
    if (response.data.status == "success") {
      console.log(response.data.data);
      setCartDetails(response?.data?.data);
      toast.success("Product Deleted");
      setloadingDeleteItem(false);
      setnumOfCartItems(numOfCartItems - 1);
    } else {
      toast.error("Failed to delete product");
      setloadingDeleteItem(false);
    }
  }

  function clearCart() {
    return axios
      .delete(`https://ecommerce.routemisr.com/api/v1/cart`, { headers })
      .then((res) => res)
      .catch((err) => err);
  }

  async function clearCartBTN() {
    setloadingDeleteItemCart(true);
    const response = await clearCart();
    setCartDetails(response);
    setloadingDeleteCart(false);
  }

  function checkout(cartID, url, checkoutData) {
    return axios
      .post(
        `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartID}?url=${url}`,
        { shippingAddress: checkoutData },
        { headers }
      )
      .then((res) => res)
      .catch((err) => err);
  }

  return (
    <CartContext.Provider
      value={{
        addToCartBtn,
        viewCart,
        CartDetails,
        updateCartProductQuantityBtn,
        loadingCountUpdate,
        loadingDeleteItem,
        currntID,
        deleteCartItemBTN,
        loading,
        clearCartBTN,
        loadingDeleteCart,
        setcurrntID,
        setloadingDeleteItem,
        checkout,
        cartID,
        numOfCartItems,
      }}
    >
      {props.children}
    </CartContext.Provider>
  );
}
