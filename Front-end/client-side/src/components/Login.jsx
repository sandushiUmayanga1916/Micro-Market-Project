import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../context/AuthProvider";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaGoogle, FaFacebook, FaInstagramSquare } from "react-icons/fa";
import useAuth from "./../hooks/useAuth";
import useAxiosPublic from "./../hooks/useAxiosPublic";

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const { signUpWithGmail, login } = useAuth();
  const [errorMessage, setErrorMessage] = useState("");

  const useAxiosPublic2 = useAxiosPublic();

  // directing home page or specific page
  const location = useLocation();
  const navigate = useNavigate();
  const from = location.state?.from?.pathname || "/";

  const onSubmit = (data) => {
    const email = data.email;
    const password = data.password;
    login(email, password)
      .then((result) => {
        // Signed in
        const user = result.user;
        const userInfor = {
          name: data.name,
          email: data.email,
        };
        useAxiosPublic2.post("/users", userInfor).then((response) => {
          // console.log(response);
          alert("Signin successful!");
          navigate(from, { replace: true });
        });
        // console.log(user);
        // ...
      })
      .catch((error) => {
        const errorMessage = error.message;
        setErrorMessage("Please provide valid email & password!");
      });
    reset();
  };

  // login with google
  const handleLogin = () => {
    signUpWithGmail()
      .then((result) => {
        const user = result.user;
        const userInfor = {
          name: result?.user?.displayName,
          email: result?.user?.email,
        };
        useAxiosPublic2.post("/users", userInfor).then((response) => {
          // console.log(response);
          alert("Signin successful!");
          navigate("/");
        });
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="max-w-md bg-white shadow w-full mx-auto flex items-center justify-center my-20">
      <div className="mb-5">
        <form
          className="card-body"
          method="dialog"
          onSubmit={handleSubmit(onSubmit)}
        >
          <h3 className="font-bold text-lg">Please Login!</h3>

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
          {errorMessage ? (
            <p className=" text-red-600 text-sm italic">{errorMessage}</p>
          ) : (
            ""
          )}

          {/* Login button */}
          <div className="form-control mt-4">
            <input
              type="submit"
              value="Login"
              className="btn bg-0-yellowColor text-white"
            />
          </div>

          <p className=" text-center my-2">
            Do not have an account?
            <Link
              to="/signup"
              className=" underline text-red-600 ml-1 hover:font-semibold"
            >
              Signup now
            </Link>
          </p>
          <Link to="/">
            <div
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
            >
              ✕
            </div></Link>
        </form>

        {/* Social Signin */}
        <div className=" text-center space-x-3 mb-5">
          <button
            className="btn btn-circle hover:bg-0-yellowColor hover:text-white"
            onClick={handleLogin}
          >
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
    </div>
  );
};

export default Login;
