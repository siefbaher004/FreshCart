import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export default function useAllCategories() {
  function AllCategoriesAPIcall() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/categories`);
  }
  const AllCategories = useQuery({
    queryKey: ["AllCategories"],
    queryFn: AllCategoriesAPIcall,
    staleTime: 7000,
    select: (data) => data?.data?.data
  });

  return AllCategories;
}
