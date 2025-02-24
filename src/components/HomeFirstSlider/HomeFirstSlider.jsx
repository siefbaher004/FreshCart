import React from "react";
import style from "./HomeFirstSlider.module.css";
import Slider from "react-slick";
import slied1 from "../../assets/slider-image-1.jpeg";
import slied2 from "../../assets/slider-image-2.jpeg";
import slied3 from "../../assets/slider-image-3.jpeg";
import slied4 from "../../assets/grocery-banner.png";
import slied5 from "../../assets/grocery-banner-2.jpeg";

export default function HomeFirstSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows:false,

  };

  return (
    <>
      <div className="md:flex  w-[80%] mx-auto my-8">
        <Slider {...settings} className="md:w-3/4 mb-6">
          <img src= {slied5} alt=""  className="w-full h-[300px] md:h-[400px]"/>
          <img src= {slied2} alt="" className="w-full h-[300px] md:h-[400px] "/>
          <img src= {slied3} alt="" className="w-full h-[300px] md:h-[400px] "/>
        </Slider>
        <div className="md:w-1/4 md:block flex">
          <img src={slied4} alt="" className="w-1/2 md:w-full h-[150px] md:h-[200px] object-cover"/>
          <img src={slied1} alt="" className="w-1/2 md:w-full h-[150px] md:h-[200px] object-cover"/>
        </div>
      </div>
    </>
  );
}
