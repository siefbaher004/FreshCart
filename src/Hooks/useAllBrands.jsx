import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export default function useAllBrands() {
  function AllBrandsAPIcall() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/brands`);
  }
  const AllBrands = useQuery({
    queryKey: ["AllBrands"],
    queryFn: AllBrandsAPIcall,
    staleTime: 7000,
    select: (data) => data?.data?.data
  });

  return AllBrands;
}
