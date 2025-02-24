import React, { useContext, useEffect, useState } from "react";
import style from "./ProductDetails.module.css";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { AllProductsAPIcall } from "../../Context/AllProductsAPIcall";
import Slider from "react-slick";

export default function ProductDetails() {
  const [ProductDetails, setProductDetails] = useState(null);
  const [relatedProducts, setrelatedProducts] = useState([]);
  const { getAllProducts, allProducts } = useContext(AllProductsAPIcall);
  const { id, category } = useParams();

  function getProductDetails(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then((res) => {
        setProductDetails(res.data.data);
        const related = allProducts.filter(
          (product) => product.category.name == category  && product.id != id
        );
        setrelatedProducts(related);
      })
      .catch((res) => {});
  }

  useEffect(() => {
    getAllProducts();
  }, []);

  useEffect(() => {
    if (allProducts.length > 0) {
      getProductDetails(id);
      window.scrollTo({ top: 0, behavior: "smooth" });

    }
  }, [allProducts, id, category]);

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
  };


  return (
    <>
      <div className="flex flex-wrap items-center ">
      <div className=" md:w-1/2 lg:w-1/3">
          <Slider {...settings} className="w-3/4 mb-6">
            {ProductDetails?.images.map((src) => (
              <img src={src} key={src} />
            ))}
          </Slider>
        </div>
        <div className="md:w-1/2 lg:w-2/3 text-start ps-5">
          <h3 className="my-5 font-semibold text-3xl ">
            {ProductDetails?.title}
          </h3>
          <p className="my-5 text-slate-900"> {ProductDetails?.description}</p>
          <div className="flex justify-between my-5">
            <span>{ProductDetails?.price} EGP</span>
            <span>
              <i className="fas fa-star text-yellow-400 ml-2"></i>
              {ProductDetails?.ratingsAverage}
            </span>
          </div>
          <button className="w-full bg-emerald-500 text-white p-2 rounded-lg my-5">
            Add To Cart
          </button>
        </div>
      </div>

      {relatedProducts.length === 0 ? (
        <span className="loader"></span>
      ) : (
        <div className="flex flex-wrap">
          {relatedProducts.map((product) => (
            <div className="xl:w-1/5 lg:w-1/4 md:w-1/3 sm:w-1/2" key={product.id}>
              <div className="item p-3">
                <Link to={`/productdetails/${product.id}/${product.category.name}`}>
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
