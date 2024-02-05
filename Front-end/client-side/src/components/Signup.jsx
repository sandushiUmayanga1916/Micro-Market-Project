import React, { useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebook, FaInstagramSquare } from "react-icons/fa";
import { useForm } from "react-hook-form";
import Model from "./Model";
import { AuthContext } from "../context/AuthProvider";

const Signup = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { createUser, login } = useContext(AuthContext);

  // directing home page or specific page
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    createUser(email, password)
      .then((result) => {
        // Signed up
        const user = result.user;
        alert("Account create Successfully");
        document.getElementById("my_modal_5").close();
        navigate(from, { replace: true });
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  return (
    <div className=" max-w-md bg-white w-full shadow mx-auto flex justify-center items-center my-20">
      <div className="modal-action mt-0 flex flex-col justify-center">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="card-body"
          method="dialog"
        >
          <h3 className="font-bold text-lg">Creacte an account</h3>

          {/* email */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Email</span>
            </label>
            <input
              type="email"
              placeholder="email"
              className="input input-bordered"
              {...register("email")}
            />
          </div>

          {/* password */}
          <div className="form-control">
            <label className="label">
              <span className="label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="password"
              className="input input-bordered"
              {...register("password")}
            />
            <label className="label mt-1">
              <a href="#" className="label-text-alt link link-hover">
                Forgot password?
              </a>
            </label>
          </div>

          {/* error */}

          {/* Login button */}
          <div className="form-control mt-6">
            <input
              type="submit"
              value="Signup"
              className="btn bg-0-yellowColor text-white"
            />
          </div>
          <p className=" text-center my-2">
            Already have an account{" "}
            <button
              className=" underline text-red-600 ml-1 hover:font-semibold"
              onClick={() => document.getElementById("my_modal_5").showModal()}
            >
              Login
            </button>{" "}
          </p>

          <Link
            to="/"
            className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          >
            ✕
          </Link>
        </form>

        {/* Social Signin */}
        <div className=" text-center space-x-3 mb-5">
          <button className="btn btn-circle hover:bg-0-yellowColor hover:text-white">
            <FaGoogle />
          </button>
          <button className="btn btn-circle hover:bg-0-yellowColor hover:text-white">
            <FaFacebook />
          </button>
          <button className="btn btn-circle hover:bg-0-yellowColor hover:text-white">
            <FaInstagramSquare />
          </button>
        </div>
      </div>
      <Model />
    </div>
  );
};

export default Signup;
