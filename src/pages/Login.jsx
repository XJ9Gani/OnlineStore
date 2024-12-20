import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../store/userSlice/userSlice";
import { useForm } from "react-hook-form";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loginStatus, error, user } = useSelector((state) => state.user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitLogin = async (data) => {
    const action = await dispatch(loginUser(data));

    if (action.type === "user/loginUser/fulfilled") {
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
      navigate("/profile");
    }
  };

  return (
    <section className="h-[100vh] relative">
      <div
        className="absolute inset-0 
      bg-[url(https://cdn.culture.ru/images/78aae915-0449-5683-9fe7-767da9281f94)] 
      bg-cover
      max-sm:bg-[url(https://avatars.mds.yandex.net/i?id=5ae0bc543cec08904cd5bd707015607ea67b713e-5365021-images-thumbs&n=13)]
      max-sm:bg-contain
      z-0 filter brightness-75"
      ></div>

      <form
        onSubmit={handleSubmit(submitLogin)}
        className="bg-[rgba(0,0,0,0.5)] w-[50vw] h-[90vh]
        max-sm:w-[90vw]
      
        max-sm:top-[5vh] 
        max-sm:left-[5vw]
        z-10 absolute top-[5vh] left-[25vw] rounded-lg flex flex-col justify-center items-center gap-[40px]"
      >
        <h1 className="text-5xl text-white font-bold">Login</h1>
        <input
          placeholder="Email"
          className="w-1/2 h-[5vh] p-[1rem]"
          type="email"
          {...register("userEmail", {
            required: "Email is required",
          })}
        />
        {errors.userEmail && (
          <p className="text-red-500">{errors.userEmail.message}</p>
        )}

        <input
          placeholder="Password"
          className="w-1/2 h-[5vh] p-[1rem]"
          type="password"
          {...register("password", {
            required: "Password is required",
          })}
        />
        {errors.password && (
          <p className="text-red-500">{errors.password.message}</p>
        )}

        {loginStatus === "failed" && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          className="w-1/2 h-[5vh] bg-black text-white transition duration-200 ease-in-out hover:bg-white hover:text-black"
        >
          Login
        </button>
        <hr className="border-white w-[30vw]" />
        <NavLink
          to="/"
          className="w-1/2 h-[5vh] bg-white block text-center p-[0.5rem] text-black  transition duration-200 ease-in-out hover:bg-black hover:text-white"
        >
          Sing Up
        </NavLink>
      </form>
    </section>
  );
};

export default Login;
