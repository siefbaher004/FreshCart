import React, { useContext, useEffect, useState } from "react";
import style from "./ReacentProuducts.module.css";
import { Link } from "react-router-dom";
import useAllProducts from "../../Hooks/useAllProducts";
import { CartContext } from "../../Context/cartContext";
import { WhishListContext } from "../../Context/WhishListContext";

export default function ReacentProuducts() {
  const { data, error, isError, isLoading, isFetching } = useAllProducts();
  const { addToCartBtn, currntID, loadingCountUpdate } =
    useContext(CartContext);
  const { IsInWishList, deleteWishListItemBTN, addToWishList, WishList } =
    useContext(WhishListContext);

  if (isError) {
    console.log(error);
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-[50vh]">
        <span className="loader"></span>
      </div>
    );
  }
  return (
    <>
      <div className="flex flex-wrap w-[80%] mx-auto">
        {data?.map((proudct) => {
          const isWishListItem = IsInWishList(proudct?.id);
          return (
            <div
              className="xl:w-1/5 lg:w-1/4 md:w-1/3 sm:w-1/2"
              key={proudct?.id}
            >
              <div className="item p-3 relative">
                <i
                  className={`fas fa-heart absolute top-5 right-5 text-2xl cursor-pointer ${
                    isWishListItem ? "text-emerald-500" : "text-black"
                  }`}
                  onClick={() => {
                    if (isWishListItem) {
                      deleteWishListItemBTN(proudct?.id);
                    } else {
                      addToWishList(proudct);
                    }
                  }}
                ></i>
                <Link
                  to={`productdetails/${proudct.id}/${proudct.category.name}`}
                >
                  <img src={proudct.imageCover} alt="" className="rounded-md" />
                  <h2 className=" text-left text-emerald-600 mb-1">
                    {proudct.category.name}
                  </h2>
                  <h3 className="text-lg text-left font-semibold">
                    {proudct.title.split(" ").slice(0, 2).join(" ")}
                  </h3>
                  <div className="flex justify-between mb-1">
                    <span>{proudct.price} EGP</span>
                    <span>
                      <i className="fas fa-star text-yellow-400 ml-2"></i>
                      {proudct.ratingsAverage}
                    </span>
                  </div>
                </Link>
                <button
                  className="btn"
                  onClick={() => {
                    addToCartBtn(proudct.id);
                  }}
                >
                  {loadingCountUpdate && currntID == proudct.id ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    <>
                      Add To Cart <i className="fas fa-cart-plus"></i>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
