/* eslint-disable react/prop-types */
import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaThumbsUp } from "react-icons/fa6";
import { AuthContext } from "../context/AuthProvider";
import Swal from 'sweetalert2'
import { Navigate } from 'react-router-dom';

const Cards = ({ item }) => {
  const { name, image, price, description, _id } = item;
  const [isThumbsUp, setIsThumbsUp] = useState(false);
  const { user } = useContext(AuthContext);
  // console.log(user)

  const navigate = useNavigate();
  const location = useLocation();

  // add to cart butto
  const handleAddtoCart = (item) => {
    // console.log("button is clicked", item)
    if (user && user?.email) {
      const cartItem = {
        menuItemId: _id,
        name,
        quantity: 1,
        image,
        price,
        email: user.email,
      };
      // console.log(cartItems)
      fetch("http://localhost:5000/carts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cartItem),
      })
        .then((res) => res.json())
        .then((data) => {
          // console.log(data);
          if(data.insertedId){
            Swal.fire({
              position: "middle",
              icon: "success",
              title: "Your work has been saved",
              showConfirmButton: false,
              timer: 1500
            });
          }
        });
    }
    else{
      Swal.fire({
        title: "Please Login!",
        text: "Without an account can't able to add products!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Signup Now"
      }).then((result) => {
        if (result.isConfirmed) {
          navigate('/signup', {state:{from:location}})
        }
      });
    }
  };

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
        <Link to={`/menu/${item._id}`}>
          {" "}
          <h2 className="card-title">{item.name}</h2>
        </Link>
        <p>Description about the battery</p>
        <div className="card-actions justify-between items-center mt-2">
          <h5 className="font-semibold">
            <span className="text-sm text-red-700">LKR</span>{" "}
            {parseFloat(item.price).toLocaleString("en-US", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 8,
            })}
          </h5>
          <button
            className="btn bg-0-yellowColor text-white"
            onClick={() => handleAddtoCart(item)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
