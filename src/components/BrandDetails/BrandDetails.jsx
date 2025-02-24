import React, { useContext, useEffect, useState } from "react";
import style from "./BrandDetails.module.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { AllProductsAPIcall } from "./../../Context/AllProductsAPIcall";

export default function BrandDetails() {
  const [brandDetails, setbrandDetails] = useState({});
  const [brandItems, setbrandItems] = useState([]);
  const { id } = useParams();
  const { getAllProducts, allProducts } = useContext(AllProductsAPIcall);

  function getBrandDetails(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
      .then((res) => {
        setbrandDetails(res?.data?.data);
        const items = allProducts.filter((item) => item.brand._id == id);
        setbrandItems(items);
      });
  }

  useEffect(() => {
    getAllProducts();
  }, []);
  useEffect(() => {
    getBrandDetails(id);
  }, [id, brandItems]);

  return (
    <>
      {brandItems.length === 0 ? (
        <>
          <h3 className=" text-start font-semibold text-3xl  w-[80%] mx-auto mb-5">
            {brandDetails.name} :{" "}
          </h3>
          <h3 className=" text-3xl text-emerald-700  text-center mb-[80vh]">
            No Stock Available <i className="fa-solid fa-face-frown"></i>{" "}
          </h3>
        </>
      ) : (
        <div className="flex flex-wrap  w-[80%] mx-auto">
          <h3 className="w-full text-start font-semibold text-3xl  mb-5">
            {brandDetails.name} :{" "}
          </h3>

          {brandItems.map((product) => (
            <div
              className="xl:w-1/5 lg:w-1/4 md:w-1/3 sm:w-1/2"
              key={product.id}
            >
              <div className="item p-3">
                <Link
                  to={`/productdetails/${product.id}/${product.category.name}`}
                >
                  <img src={product.imageCover} alt="" className="rounded-md" />
                  <h2 className="text-left text-emerald-600 mb-1">
                    {product.category.name}
                  </h2>
                  <h3 className="text-lg text-left font-semibold">
                    {product.title.split(" ").slice(0, 2).join(" ")}
                  </h3>
                  <div className="flex justify-between mb-1">
                    <span>{product.price} EGP</span>
                    <span>
                      <i className="fas fa-star text-yellow-400 ml-2"></i>
                      {product.ratingsAverage}
                    </span>
                  </div>
                </Link>
                <button className="btn">
                  Add To Cart <i className="fas fa-cart-plus"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
