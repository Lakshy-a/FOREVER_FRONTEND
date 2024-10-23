import React from "react";
import { useForm, Controller } from "react-hook-form";
import { GoHorizontalRule } from "react-icons/go";
import { NavLink } from "react-router-dom";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

let signInSchema = object({
  email: string().email("Invalid email").required("Email is required"),
});

const ForgotPassword = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInSchema),
  });

  const handleClick = (data) => {
    console.log(data);
    reset();
  };

  return (
    <>
      <div className="w-full h-96 flex flex-col items-center justify-center">
        <div className=" text-3xl flex items-center text-black font-serif">
          Forgot Your Password
          <span className="text-black ml-2">
            <GoHorizontalRule />
          </span>
        </div>
        <p className="mt-8 w-72 text-sm font-light xs:w-[390px]">Please enter the email address you'd like your password reset informayion sent to</p>
        <form className="mt-4 flex flex-col gap-5">
          <input
            className="border py-2 outline-none px-4 text-base w-72 xs:w-[390px] border-black"
            type="text"
            placeholder="Email"
            {...register("email")} // Use lowercase 'email' here
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}
        </form>
        <div className="flex justify-between w-72 xs:w-[390px] mt-2 text-sm font-semibold">
          <NavLink to={"/login"}>
            <div className="cursor-pointer">Sign In</div>
          </NavLink>
          <NavLink to={"/signup"}>
            <div className="cursor-pointer">Create Account</div>
          </NavLink>
        </div>
        <button
          onClick={handleSubmit(handleClick)}
          type="submit"
          className="bg-black text-white hover:bg-white hover:text-black hover:border border-black px-8 py-2 mt-8 w-72 xs:w-[390px]"
        >
          Request Reset Link
        </button>
      </div>
    </>
  );
};

export default ForgotPassword;
