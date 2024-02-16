import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const Order = () => {
  const { user } = useContext(AuthContext);
  console.log(user?.email);

  const token = localStorage.getItem("access-token");

  const {
    isLoading,
    isError,
    refetch,
    data: orders = [],
  } = useQuery({
    queryKey: ["orders", user?.email],
    queryFn: async () => {
      try {
        const res = await fetch(
          `http://localhost:5000/payment?email=${user?.email}`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok) {
          throw new Error("Failed to fetch orders");
        }
        return res.json();
      } catch (error) {
        throw new Error("Failed to fetch orders");
      }
    },
  });

  // Log data for debugging
  console.log("Orders data:", orders);

  const formatDate = (createdAt) => {
    const createdDate = new Date(createdAt);
    return createdDate.toLocaleDateString();
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error fetching orders</div>;
  }

  return (
    <div className="max-w-screen-2xl container mx-auto xl:px-24 px-4">
      {/* banner */}
      <div className=" bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100%">
        <div className="py-28 flex flex-col items-center justify-center">
          {/* content */}
          <div className=" text-center px-4 space-y-7">
            <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
              Traking All Your
              <span className=" text-0-yellowColor"> Orders</span>
            </h2>
          </div>
        </div>
      </div>

      {/* table */}
      <div>
        <div className="">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead className=" bg-0-yellowColor text-white rounded-lg text-center">
                <tr>
                  <th>#</th>
                  <th>Order Date</th>
                  <th>Transaction ID</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((item, index) => (
                  <tr key={index}>
                    <td className="text-center">{index + 1}</td>
                    <td className="text-center">
                      {formatDate(item.createdAt)}
                    </td>
                    <td className="text-center">{item.transitionId}</td>
                    <td className="text-center">
                      LKR{" "}
                      {item.price.toLocaleString("en-US", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="text-red-400 font-semibold text-center">
                      {item.status}
                    </td>
                    <td className="text-center">
                      <Link to="/contact" className="underline italic ">
                        Contact
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
