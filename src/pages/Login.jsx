import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../store/userSlice/userSlice";
import { useForm } from "react-hook-form";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loginStatus, error, user } = useSelector((state) => state.user); // Получаем статус и ошибку из Redux

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitLogin = async (data) => {
    const action = await dispatch(loginUser(data));

    if (action.type === "user/loginUser/fulfilled") {
      // Если вход успешный, перенаправляем на страницу профиля
      localStorage.setItem("currentUser", JSON.stringify(action.payload));
      navigate("/profile");
    }
  };

  return (
    <section className="h-[100vh] relative">
      <div className="absolute inset-0 bg-[url(https://cdn.culture.ru/images/78aae915-0449-5683-9fe7-767da9281f94)] bg-cover z-0 filter brightness-75"></div>

      <form
        onSubmit={handleSubmit(submitLogin)}
        className="bg-[rgba(0,0,0,0.5)] w-[50vw] h-[90vh] z-10 absolute top-[5vh] left-[25vw] rounded-lg flex flex-col justify-center items-center gap-[40px]"
      >
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
      </form>
    </section>
  );
};

export default Login;
