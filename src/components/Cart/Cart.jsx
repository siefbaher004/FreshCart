import React, { useContext, useEffect, useState } from "react";
import style from "./Cart.module.css";
import { CartContext } from "../../Context/CartContext";
import emptyCart from "../../assets/emptyCart.png";
import { Link } from 'react-router-dom';

export default function Cart() {
  const {
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
  } = useContext(CartContext);

  useEffect(() => {
    viewCart();
  }, []);

  if (loading) {
    return (
      <>
        <span className="loader relative left-1/2 my-20 z-50"></span>
      </>
    );
  }

  return (
    <>
      {CartDetails?.products?.length > 0 ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg  w-[80%] mx-auto">
          <div className="flex justify-between p-5 ">
            <h3 className="text-center text-3xl text-emerald-600 font-semibold my-2">
              Total Price: {CartDetails?.totalCartPrice}
            </h3>
            <button
              onClick={() => {
                clearCartBTN();
              }}
              className="min-w-[150px] border border-red-500 px-4 rounded-lg text-slate-600 hover:bg-red-600 hover:text-white hover:border-red-300 hover:shadow hover:shadow-red-400"
            >
              {loadingDeleteCart ? (
                <i className="fas fa-spinner fa-spin text-slate-600"></i>
              ) : (
                <>Clear Cart</>
              )}
            </button>
          </div>
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {CartDetails?.products?.map((product) => (
                <tr
                  key={product?.product?.id}
                  className="bg-white border-b   border-gray-200 hover:bg-gray-50 "
                >
                  <td className="p-4">
                    <img
                      src={product.product.imageCover}
                      className="w-16 md:w-32 max-w-full max-h-full"
                      alt="Apple Watch"
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 ">
                    {product.product.title}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <button
                        className=" inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 "
                        type="button"
                        onClick={() => {
                          updateCartProductQuantityBtn(
                            product?.product?.id,
                            product?.count - 1
                          );
                        }}
                      >
                        <span className="sr-only">Quantity button</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 2"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M1 1h16"
                          />
                        </svg>
                      </button>
                      <div>
                        <span>
                          {loadingCountUpdate &&
                          currntID == product?.product?.id ? (
                            <i className="fas fa-spinner fa-spin"></i>
                          ) : (
                            product.count
                          )}
                        </span>
                      </div>
                      <button
                        className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 "
                        type="button"
                        onClick={() => {
                          updateCartProductQuantityBtn(
                            product?.product?.id,
                            product?.count + 1
                          );
                        }}
                      >
                        <span className="sr-only">Quantity button</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 18"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 1v16M1 9h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 ">
                    {product.price * product.count} EGP
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline"
                      onClick={() => {
                        deleteCartItemBTN(product?.product?.id);
                      }}
                    >
                      {loadingDeleteItem && currntID == product?.product?.id ? (
                        <i className="fas fa-spinner fa-spin"></i>
                      ) : (
                        <> Remove</>
                      )}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Link to={`/checkout`}>
            <button className="btn my-3">Order Now</button>
          </Link>
        </div>
      ) : (
        <>
          <img src={emptyCart} alt="" className="md:w-[50%] mx-auto " />
          <h3 className="text-center text-3xl capitalize font-semibold text-gray-500">
            Your cart is empty
          </h3>
        </>
      )}
    </>
  );
}
