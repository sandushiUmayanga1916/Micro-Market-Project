import React, { useContext, useState, useEffect } from "react";
import useCart from "../../hooks/useCart";
import { RiDeleteBin6Fill } from "react-icons/ri";
import Swal from "sweetalert2";
import { AuthContext } from "../../context/AuthProvider";
import LoadingSpinner from "./../../components/LoadingSpinner";
import { Link } from "react-router-dom";

const CartPage = () => {
  const [cart, refetch] = useCart();
  const { user } = useContext(AuthContext);
  const [cartItems, setCartItems] = useState([]);

  // Fetch cart items when user changes
  useEffect(() => {
    setCartItems(cart);
  }, [cart]);

  if (!user) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  const calculatePrice = (item) => {
    return item.price * item.quantity;
  };

  // Item quantity increase
  const handleIncrease = (item) => {
    fetch(`http://localhost:5000/carts/${item._id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
      body: JSON.stringify({ quantity: item.quantity + 1 }),
    })
      .then((res) => res.json())
      .then((data) => {
        const updatedCart = cartItems.map((cartItem) => {
          if (cartItem.id === item.id) {
            return {
              ...cartItem,
              quantity: cartItem.quantity + 1,
            };
          }
          return cartItem;
        });

        refetch();
        setCartItems(updatedCart);
      });
  };

  // Item quantity decrease
  const handleDecrease = (item) => {
    // console.log(item._id);
    if (item.quantity > 1) {
      fetch(`http://localhost:5000/carts/${item._id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
        body: JSON.stringify({ quantity: item.quantity - 1 }),
      })
        .then((res) => res.json())
        .then((data) => {
          const updatedCart = cartItems.map((cartItem) => {
            if (cartItem.id === item.id) {
              return {
                ...cartItem,
                quantity: cartItem.quantity - 1,
              };
            }
            return cartItem;
          });

          refetch();
          setCartItems(updatedCart);
        });
    } else {
      alert("Item can-t be zero");
    }
  };

  // calculate total price
  const cartSubTotal = cart.reduce((total, item) => {
    return total + calculatePrice(item);
  }, 0);

  const orderTotal = cartSubTotal;

  // delete button
  const handleDelete = (item) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/carts/${item._id}`, {
          method: "DELETE",
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.deletedCount > 0) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your file has been deleted.",
                icon: "success",
              });
            }
          });
      }
    });
  };

  return (
    <div className=" selection-container">
      {/* banner */}
      <div className="py-36 flex flex-col justify-center items-center gap-8">
        <div className="space-y-7 px-4">
          <h2 className=" md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
            Items added to the
            <span className=" text-0-yellowColor"> CART</span>
          </h2>
        </div>
      </div>

      {/* table for cart items */}
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead className=" bg-0-yellowColor text-white">
            <tr>
              <th>#</th>
              <th>Battery</th>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}
            {cart.map((item, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle w-12 h-12">
                        <img src={item.image} />
                      </div>
                    </div>
                  </div>
                </td>
                <td className=" font-medium">{item.name}</td>
                <td>
                  <button
                    className="btn btn-xs rounded-full"
                    onClick={() => handleDecrease(item)}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={() => console.log(item.quantity)}
                    className=" w-10 mx-2 text-center overflow-hidden
                   appearance-none"
                  />
                  <button
                    className="btn btn-xs rounded-full"
                    onClick={() => handleIncrease(item)}
                  >
                    +
                  </button>
                </td>
                <td>
                  LKR{" "}
                  {parseFloat(calculatePrice(item))
                    .toLocaleString("en-US", {
                      style: "currency",
                      currency: "LKR",
                    })
                    .replace(/^LKR\s/, "")}
                </td>

                <th>
                  <button
                    className="btn btn-ghost text-red-600 btn-lg"
                    onClick={() => handleDelete(item)}
                  >
                    <RiDeleteBin6Fill />
                  </button>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* customer detail */}
      <div className=" my-12 flex flex-col md:flex-row justify-between items-start">
        <div className="md:w-1/2 space-y-3">
          <h3 className=" font-medium">Customer Details</h3>
          <p>Name: {user.displayName}</p>
          <p>Email: {user.email}</p>
          <p>User ID: {user.uid}</p>
        </div>
        <div className="md:w-1/2 space-y-3">
          <div className="md:w-1/2 space-y-3">
            <h3 className=" font-medium">Shoping Details</h3>
            <p>Total Items: {cart.length}</p>
            <p>
              Total Price:{" "}
              {orderTotal.toLocaleString("en-US", {
                style: "currency",
                currency: "LKR",
              })}
            </p>
            <Link to="/process-checkout">
              <button className="btn bg-0-yellowColor text-white">
                Check out
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
