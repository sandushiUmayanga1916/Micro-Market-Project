import React from 'react'
import { useForm } from 'react-hook-form';
import { RiBatterySaverFill } from "react-icons/ri";
import Swal from 'sweetalert2'
import useAxiosPublic from "../../../hooks/useAxiosPublic";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const AddMenu = () => {
    const { register, handleSubmit, reset } = useForm();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();

  // image hosting key
  const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
  // console.log(image_hostiimport useAxiosPublic from './../../../hooks/useAxiosPublic';

  const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;
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
        recipe: data.recipe,
        image: hostingImg.data.data.display_url
      };

      // console.log(menuItem);
      const postMenuItem = axiosSecure.post('/menu', menuItem);
      if(postMenuItem){
        reset()
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Your Item is inserted successfully!",
          showConfirmButton: false,
          timer: 1500
        });
      }
    }
  };

  return (
    <div className='w-full md:w-[870px] px-4 mx-auto'>
        <h2 className="text-2xl font-semibold my-4">
        Upload a new <span className=" text-0-yellowColor uppercase">Menu Item</span>
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
              {...register("name", { required: true })}
              placeholder="Recipe Name"
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
                defaultValue="default"
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
              {...register("recipe", { required: true })}
              className="textarea textarea-bordered h-24"
              placeholder="Tell the worlds about your recipe"
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
            Add Item <RiBatterySaverFill/>
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddMenu