/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Cards from "../../components/Cards";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";

const SampleNextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "red" }}
      onClick={onClick}
    >
      NEXT
    </div>
  );
};

const SamplePrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "green" }}
      onClick={onClick}
    >
      BACK
    </div>
  );
};

const SpecialBatteries = () => {
  const [batteries, setBatteries] = useState([]);
  const slider = React.useRef(null);

  useEffect(() => {
    fetch("/menu.json")
      .then((res) => res.json())
      .then((data) => {
        const popularBatteries = data.filter((item) => item.category.includes("popular"));
        setBatteries(popularBatteries);
      });
  }, []);
  
  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],

    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  return (
    <div className="selection-container relative bg-gradient-to-r  from-[#fffdf7] via-[#fff2b2] to-[#ffee99] ...">
      <div className="text-left">
        <p className="subtitle">Special Batteries</p>
        <p className="title md:w-[520px]">Standout Batteries from Our Shop</p>
      </div>

      <div className="md:absolute right-3 top-8 mb-10 md:mr-24">
        <button
          onClick={() => slider?.current?.slickPrev()}
          className=" btn p-2 rounded-full ml-5"
        >
          <FaAngleLeft className=" h-8 w-8 p-1" />
        </button>
        <button
          className=" bg-0-yellowColor text-white btn p-2 rounded-full ml-5"
          onClick={() => slider?.current?.slickNext()}
        >
          <FaAngleRight className=" h-8 w-8 p-1" />
        </button>
      </div>

      <Slider
        ref={slider}
        {...settings}
        className="overflow-hidden mt-10 space-x-5"
      >
        {batteries.map((item, i) => (
          <Cards key={i} item={item} />
        ))}
      </Slider>
    </div>
  );
};

export default SpecialBatteries;
