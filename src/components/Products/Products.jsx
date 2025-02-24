import React from 'react'
import style from "./Products.module.css"
import useAllProducts from "../../Hooks/useAllProducts";
import { Link } from 'react-router-dom';


export default function Products() {
    const { data, error, isError, isLoading, isFetching } = useAllProducts();
  
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
        
        <div className="flex flex-wrap  w-[80%] mx-auto">
          {data?.map((proudct) => (
            <div className="xl:w-1/5 lg:w-1/4 md:w-1/3 sm:w-1/2" key={proudct.id}>
              <div className="item p-3">
                <Link
                  to={`/productdetails/${proudct.id}/${proudct.category.name}`}
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
                <button className=" btn">
                  Add To Cart <i className="fas fa-cart-plus"></i>
                </button>
              </div>
            </div>
          ))}
        </div>
      </>
    );
}
