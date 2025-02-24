import React, { useEffect } from "react";
import style from "./Catagories.module.css";
import { useQuery } from "@tanstack/react-query";
import useAllCategories from "../../Hooks/useAllCategories";
import { Link } from "react-router-dom";
import axios from "axios";

export default function Catagories() {
  const { data, error, isError, isLoading, isFetching } = useAllCategories();
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
      <div className="flex flex-wrap  w-[80%] mx-auto my-10">
        {data?.map((category) => (
          <div className="xl:w-1/5 lg:w-1/4 md:w-1/3 sm:w-1/2 " key={category._id}>
            <Link to={`/CategoryDetails/${category?._id}`}>
              <div className="item p-3">
                <img
                  src={category.image}
                  alt={category.name}
                  className="rounded-md object-cover w-full h-[300px]"
                />
                <h3 className="text-lg text-left font-semibold text-emerald-600">
                  {category.name}
                </h3>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
}
