import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export default function useAllProducts() {
  function AllProductsAPIcall() {
    return axios.get(`https://ecommerce.routemisr.com/api/v1/products`);
  }
  const AllProducts = useQuery({
    queryKey: ["AllProducts"],
    queryFn: AllProductsAPIcall,
    staleTime: 7000,
    select: (data) => data?.data?.data,
  });

  return AllProducts;
}
