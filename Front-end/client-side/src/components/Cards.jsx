/* eslint-disable react/prop-types */
import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaThumbsUp } from "react-icons/fa6";
import { AuthContext } from "../context/AuthProvider";
import Swal from 'sweetalert2'
import { Navigate } from 'react-router-dom';
import axios from "axios";
import useCart from "../hooks/useCart";

const Cards = ({ item }) => {
  const { name, image, price, description, _id } = item;
  const [cart, refetch] = useCart();
  const [isThumbsUp, setIsThumbsUp] = useState(false);
  const { user } = useContext(AuthContext);
  // console.log(user)

  const navigate = useNavigate();
  const location = useLocation();

  // add to cart butto
  const handleAddToCart = item => {
    // console.log(item);
    if(user && user.email){
        const cartItem = {menuItemId: _id, name, quantity : 1, image, price, email: user.email}

        axios.post('http://localhost:5000/carts', cartItem)
        .then((response) => {
          console.log(response);
          if(response){
            refetch(); 
              Swal.fire({
                  position: 'center',
                  icon: 'success',
                  title: 'Battery added on the cart.',
                  showConfirmButton: false,
                  timer: 1500
                })
          }
        })
        .catch( (error) => {
          console.log(error.response.data.message);
          const errorMessage = error.response.data.message;
          Swal.fire({
            position: 'center',
            icon: 'warning',
            title: `${errorMessage}`,
            showConfirmButton: false,
            timer: 1500
          })
        });
    }
    else{
        Swal.fire({
            title: 'Please login to order the battery',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Login now!'
          }).then((result) => {
            if (result.isConfirmed) {
              navigate('/login', {state: {from: location}})
            }
          })
    }
}

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
            onClick={() => handleAddToCart(item)}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
