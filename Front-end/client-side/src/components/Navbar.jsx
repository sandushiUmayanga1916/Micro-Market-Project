import React, { useContext, useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import Model from "./Model";
import Profile from "./Profile";
import { Link } from "react-router-dom";
import useCart from "../hooks/useCart";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const [isSticky, setSticky] = useState(false);
  const { user, loading } = useAuth();
  console.log(user);

  const [cart, refetch] = useCart();
  // console.log(cart)

  //handle scroll function
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      if (offset > 0) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const NavItems = (
    <>
      <li>
        <a href="/" className=" text-0-yellowColor">
          Home
        </a>
      </li>
      <li>
        <a href="/menu">Menu</a>
      </li>
      <li>
        <details>
          <summary>Services</summary>
          <ul className="p-2">
            <li>
              <a href="/menu">Online Order</a>
            </li>
            <li>
              <a href="/order">Traking Order</a>
            </li>
          </ul>
        </details>
      </li>
      <li>
        <a href="/">Offers</a>
      </li>
    </>
  );
  return (
    <header className=" max-w-screen-2xl container mx-auto fixed left-0 right-0 transition-all duration-300 ease-in-out">
      <div
        className={`navbar xl:px-24 ${
          isSticky
            ? "shadow-md bg-base-100 transition-all duration-300 ease-in-out"
            : ""
        }`}
      >
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              {/* Nav Items */}

              {NavItems}
            </ul>
          </div>
          <a className="btn btn-ghost text-xl" href="/">
            Logo
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            {/* Nav Items */}
            {NavItems}
          </ul>
        </div>
        <div className="navbar-end">
          {/* search Items */}
          <button className="btn btn-ghost btn-circle hidden lg:flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          {/* Cart items */}
          <Link to="/cart-page">
            <label
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle mr-3 lg:flex hidden justify-center"
            >
              <div className="indicator">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="badge badge-sm indicator-item">
                  {cart.length || 0}
                </span>
              </div>
            </label>
          </Link>

          {user ? (
            <Profile user={user} />
          ) : (
            <button
              onClick={() => document.getElementById("my_modal_5").showModal()}
              className="btn bg-0-yellowColor text-white flex items-center px-6 rounded-full gap-2"
            >
              <FaUser />
              Login
            </button>
          )}
          <Model />
          
        </div>
      </div>
    </header>
  );
};

export default Navbar;
