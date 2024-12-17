import { useDispatch, useSelector } from "react-redux";
import React, { useEffect } from "react";
import { registerUser } from "../store/userSlice/userSlice";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

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
      <div className="absolute inset-0 bg-[url(https://cdn.culture.ru/images/78aae915-0449-5683-9fe7-767da9281f94)] bg-cover z-0 filter brightness-75"></div>

      <form
        onSubmit={handleSubmit(submitRegistration)}
        className="bg-[rgba(0,0,0,0.5)] w-[50vw] h-[90vh] z-10 absolute top-[5vh] left-[25vw] rounded-lg flex flex-col justify-center items-center gap-[40px]"
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

        <button className="w-1/2 h-[5vh] bg-black  text-white transition duration-200 ease-in-out hover:bg-white hover:text-black">
          Add
        </button>
      </form>
    </section>
  );
};

export default Registration;
