import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { registerUser } from "../store/userSlice/userSlice";
import { useForm } from "react-hook-form";
import { NavLink, useNavigate } from "react-router-dom";

const Registration = () => {
  const dispatch = useDispatch();
  const { status, error, user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm();
  const submitRegistration = async (data) => {
    dispatch(registerUser(data));
    localStorage.setItem("currentUser", JSON.stringify(data));
    localStorage.setItem("username", JSON.stringify(data.username));
  };

  useEffect(() => {
    if (status === "succeeded") {
      reset();
      navigate("/profile");
    }
  }, [user, navigate, reset]);

  useEffect(() => {
    if (status === "failed") {
      reset();
    }
  }, [status, reset]);

  return (
    <section className="h-[100vh] relative">
      <div
        className="absolute 
      inset-0
      max-sm:bg-[url(https://avatars.mds.yandex.net/i?id=5ae0bc543cec08904cd5bd707015607ea67b713e-5365021-images-thumbs&n=13)] 
      max-sm:bg-contain
      bg-[url(https://cdn.culture.ru/images/78aae915-0449-5683-9fe7-767da9281f94)] bg-cover z-0 filter brightness-75"
      ></div>

      <form
        onSubmit={handleSubmit(submitRegistration)}
        className="bg-[rgba(0,0,0,0.5)] lg:w-[50vw] lg:h-[90vh]
        z-10 absolute lg:top-[5vh] lg:left-[25vw] rounded-lg flex 
        flex-col justify-center items-center gap-[40px]
        max-sm:w-[90vw]
        max-sm:top-[5vh]
        max-sm:left-[3vh]
        "
      >
        <h1 className="text-5xl text-white font-bold">Registration</h1>
        <input
          placeholder="Name"
          id="username"
          type="text"
          className="w-1/2 h-[5vh] p-[1rem]"
          {...register("username", {
            required: "This Input Cannot Be Empty",
            minLength: {
              value: 4,
              message: "There must be more than 3 symbols",
            },
          })}
        />
        {errors.username && (
          <p className="text-red-500 text-xl">{errors.username.message}</p>
        )}

        <input
          placeholder="Email"
          className="w-1/2 h-[5vh]  p-[1rem]"
          type="email"
          {...register("userEmail", {
            required: "This Input Cannot Be Empty",
            minLength: {
              value: 4,
              message: "There must be more than 3 symbols",
            },
          })}
        />

        <input
          placeholder="Password"
          className="w-1/2 h-[5vh]  p-[1rem]"
          type="password"
          {...register("password", {
            required: "This Input Cannot Be Empty",
            minLength: {
              value: 8,
              message: "Password must contain at least 8 symbols",
            },
          })}
        />
        {errors.password && (
          <p className="text-red-500 text-xl">{errors.password.message}</p>
        )}

        <input
          placeholder="Confirm Password"
          className="w-1/2 h-[5vh]  p-[1rem]"
          type="password"
          {...register("confirmPassword", {
            required: "This Input Cannot Be Empty",
            validate: (value) => {
              const { password } = getValues();
              return password === value || "Passwords do not match";
            },
          })}
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-xl">
            {errors.confirmPassword.message}
          </p>
        )}

        {error && <p className="text-red-500 text-xl">{error}</p>}

        <button className="w-1/2 h-[5vh] shadow-white bg-gray-900  text-white transition duration-200 ease-in-out hover:bg-white hover:text-black">
          Sing Up
        </button>
        <hr className="border-white w-[30vw]" />
        <NavLink
          to="/login"
          className="w-1/2 h-[5vh] bg-white block text-center p-[0.5rem] text-black  transition duration-200 ease-in-out hover:bg-black hover:text-white"
        >
          Sing In
        </NavLink>
      </form>
    </section>
  );
};

export default Registration;
