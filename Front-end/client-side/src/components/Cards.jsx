/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FaThumbsUp } from "react-icons/fa6";

const Cards = ({ item }) => {
  const [isThumbsUp, setIsThumbsUp] = useState(false);

  const handleOkClick = () => {
    setIsThumbsUp(!isThumbsUp);
  };

  return (
    <div className="card w-80 bg-base-100 shadow-xl">
      <div
        className={`rating gap-1 absolute right-2 top-2 p-4 thumbsUp ok bg-0-yellowColor ${
          isThumbsUp ? " text-blue-700" : "text-white"
        }`}
        onClick={handleOkClick}
      >
        <FaThumbsUp className="w-5 h-5 cursor-pointer" />
      </div>
      <Link to={`/menu/${item._id}`}>
        <figure>
          <img
            src={item.image}
            alt=""
            className="hover:scale-105 transition-all duration-300 md:h-72"
          />
        </figure>
      </Link>
      <div className="card-body">
       <Link to={`/menu/${item._id}`}> <h2 className="card-title">{item.name}</h2></Link>
        <p>Description about the battery</p>
        <div className="card-actions justify-between items-center mt-2">
          <h5 className=" font-semibold">
            <span className="text-sm text-red-700">LKR </span>
            {item.price}
          </h5>
          <button className="btn bg-0-yellowColor text-white">Buy Now</button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
