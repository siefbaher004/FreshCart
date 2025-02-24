import React, { useEffect } from "react";
import style from "./Brands.module.css";
import { useQuery } from "@tanstack/react-query";
import useAllBrands from "../../Hooks/useAllBrands";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Brands() {
  const { data, error, isError, isLoading, isFetching } = useAllBrands();
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
            {data?.map((brand) => (
              <div className="xl:w-1/5 lg:w-1/4 md:w-1/3 sm:w-1/2" key={brand._id}>
                <Link to={`/brandDetails/${brand?._id}`}>
                <div className="item p-3">
                    <img src={brand.image} alt=  {brand.name} className="rounded-md" />
                </div>
                </Link>
              </div>
            ))}
          </div>
        </>
      );
}
