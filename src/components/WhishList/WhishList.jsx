import React, { useContext, useEffect, useState } from "react";
import style from "./WhishList.module.css";
import { WhishListContext } from "../../Context/WhishListContext";
import { CartContext } from "../../Context/cartContext";
import emptyWishListe from "../../assets/emptyWishListe.png";

export default function WhishList() {
  const {
    deleteWishListItemBTN,
    viewWishList,
    WishList,
  }= useContext(WhishListContext);
  const { addToCartBtn, loadingCountUpdate } = useContext(CartContext);

  useEffect(() => {
    viewWishList();
  }, [WishList.length]);

  // if (loading) {
  //   return (
  //     <>
  //       <span className="loader relative left-1/2 my-20 z-50"></span>
  //     </>
  //   );
  // }

  return (
    <>
      {WishList.length > 0 ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg  w-[80%] mx-auto">
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
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {WishList?.map((product) => (
                <tr
                  key={product?._id}
                  className="bg-white border-b   border-gray-200 hover:bg-gray-50 "
                >
                  <td className="p-4">
                    <img
                      src={product.imageCover}
                      className="w-16 md:w-32 max-w-full max-h-full"
                      alt={product.title}
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 ">
                    {product.title}
                  </td>

                  <td className="px-6 py-4 font-semibold text-gray-900 ">
                    {product.price} EGP
                  </td>
                  <td className="px-6 py-4">
                    <div
                      className="cursor-pointer font-medium text-emerald-600 dark:text-red-500 hover:underline"
                      onClick={() => {
                        addToCartBtn(product?._id);
                      }}
                    >
                      <> Add To Cart</>
                      {/* {loadingCountUpdate && currntID == product?.id ? (
                        <i className="fas fa-spinner fa-spin"></i>
                      ) : (
                        <> Add To Cart</>
                      )} */}
                    </div>
                    <span
                      className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline"onClick={() => {deleteWishListItemBTN(product?.id)}}>Remove</span>
                    {/* <span
                      className="cursor-pointer font-medium text-red-600 dark:text-red-500 hover:underline"
                      onClick={() => {
                        deleteWhishListItemBTN(product?._id);
                      }}
                    >
                      {loadingDeleteItem && currntID == product?.id ? (
                        <i className="fas fa-spinner fa-spin"></i>
                      ) : (
                        <> Remove</>
                      )}
                    </span> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <>
          <img src={emptyWishListe} alt="" className="md:w-[50%] mx-auto " />
          <h3 className="text-center text-3xl capitalize font-semibold text-gray-500">
            Your WishList is empty
          </h3>
        </>
      )}
    </>
  );
}
