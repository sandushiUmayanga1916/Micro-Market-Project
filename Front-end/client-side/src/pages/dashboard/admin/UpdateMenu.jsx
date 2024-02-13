import React from "react";
import { PiBatteryWarningVerticalFill } from "react-icons/pi";
import Swal from "sweetalert2";
import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useLoaderData, useNavigate } from "react-router-dom";

const UpdateMenu = () => {
  const item = useLoaderData();
  console.log(item);

  const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  const navigate = useNavigate();

  // image hosting key
  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;

  const image_hosting_api = `https://api.imgbb.com/1/upload?&key=${image_hosting_key}`;

  const onSubmit = async (data) => {
    // console.log(data)
    const imageFile = { image: data.image[0] };
    const hostingImg = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    // console.log(hostingImg.data)
    if (hostingImg.data.success) {
      const menuItem = {
        name: data.name,
        category: data.category,
        price: parseFloat(data.price), 
        description: data.description,
        image: hostingImg.data.data.display_url
      };

      // console.log(menuItem);
      const postMenuItem = axiosSecure.patch(`/menu/${item._id}`, menuItem);
      if(postMenuItem){
        reset()
        Swal.fire({
          position: "middle",
          icon: "success",
          title: "Your item updated successfully!",
          showConfirmButton: false,
          timer: 1500
        });
        navigate("/dashboard/manage-items")
      }
    }
  };

  return (
    <div className="w-full md:w-[870px] px-4 mx-auto">
      <h2 className="text-2xl font-semibold my-4">
        Update This <span className=" text-0-yellowColor">Menu Item</span>
      </h2>

      {/* form */}
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Battery Name*</span>
            </label>
            <input
              type="text"
              defaultValue={item.name}
              {...register("name", { required: true })}
              placeholder="Battery Name"
              className="input input-bordered w-full"
            />
          </div>

          {/* 2nd row */}
          <div className="flex items-center gap-4">
            {/* categories */}
            <div className="form-control w-full my-6">
              <label className="label">
                <span className="label-text">Category*</span>
              </label>
              <select
                {...register("category", { required: true })}
                className="select select-bordered"
                defaultValue={item.category}
              >
                <option disabled value="default">
                  Select a category
                </option>
                <option value="bike">Bike</option>
                <option value="van">Van</option>
                <option value="car">Car</option>
                <option value="lorry">Lorry</option>
                <option value="popular">Popular</option>
                <option value="other">Other</option>
              </select>
            </div>

            {/* prices */}
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Price*</span>
              </label>
              <input
                type="number"
                defaultValue={item.price}
                {...register("price", { required: true })}
                placeholder="Price"
                className="input input-bordered w-full"
              />
            </div>
          </div>

          {/* 3rd row */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Battery Details</span>
            </label>
            <textarea
             defaultValue={item.description}
              {...register("description", { required: true })}
              className="textarea textarea-bordered h-24"
              placeholder="Tell the worlds about your battery"
            ></textarea>
          </div>

          {/* 4th row */}
          <div className="form-control w-full my-6">
            <input
              {...register("image", { required: true })}
              type="file"
              className="file-input w-full max-w-xs"
            />
          </div>

          <button className="btn bg-0-yellowColor text-white px-6">
            Update Item <PiBatteryWarningVerticalFill />
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateMenu;
