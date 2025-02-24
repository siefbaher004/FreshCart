import React, { useEffect, useState } from "react";
import style from "./CategoriesSlider.module.css";
import axios from "axios";
import Slider from "react-slick";

export default function CategoriesSlider() {
  const [categoriesSlider, setCategoriesSlider] = useState([]); // ✅ Renamed state

  function getAllCategories() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then((res) => {
        setCategoriesSlider(res.data.data);
      });
  }

  useEffect(() => {
    getAllCategories();
  }, []);

  var settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 3,
    autoplay: true,
    autoplaySpeed: 1500,
    dots: false, // ✅ Ensured only one `dots` declaration
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false, // ✅ Changed to match root-level `dots`
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <div className="w-[80%] mx-auto">
      <h2 className="text-slate-700 text-start capitalize my-4 font-semibold text-lg">
        Shop Popular Categories
      </h2>
      <Slider {...settings} className="mb-5">
        {categoriesSlider.map((category) => ( // ✅ Updated variable name
          <div key={category._id}>
            <img
              src={category.image}
              className="w-full h-[200px] object-cover"
              alt={category.name} // ✅ Better alt text for accessibility
            />
            <h4>{category.name}</h4>
          </div>
        ))}
      </Slider>
    </div>
  );
}
