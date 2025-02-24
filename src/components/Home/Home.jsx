import React from "react";
import style from "./Home.module.css";
import ReacentProuducts from "./../ReacentProuducts/ReacentProuducts";
import CategoriesSlider from "./../CategoriesSlider/CategoriesSlider";
import HomeFirstSlider from "../HomeFirstSlider/HomeFirstSlider";

export default function Home() {
  return (
    <>
      <HomeFirstSlider />
      <CategoriesSlider />
      <ReacentProuducts />
    </>
  );
}
