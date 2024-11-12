import React from "react";
import { useForm } from "react-hook-form";
import { GoHorizontalRule } from "react-icons/go";
import { NavLink, useNavigate } from "react-router-dom";
import { number, object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";

let signInSchema = object({
  name: string().required("Name is required"),
  email: string().email("Invalid email").required("Email is required"),
  password: string().required("Password is required"),
  phone: number().nullable(), // Allowing phone to be nullable
});

const SignUp = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInSchema),
  });

  const handleClick = async (data) => {
    try {
      const res = (await axios.post("http://localhost:3001/api/auth/register", data))
      // console.log(res);
      reset(); // Reset form after successful submission
      navigate("/login")
    } catch (error) {
      console.error("Error signing up:", error.response?.data || error.message);
      // Handle error response here, e.g., show an error message to the user
    }
  };

  return (
    <div className="w-full h-96 flex flex-col items-center justify-center">
      <div className="text-3xl flex items-center text-black font-serif mt-24">
        Sign Up
        <span className="text-black ml-2">
          <GoHorizontalRule />
        </span>
      </div>
      <form className="mt-6 flex flex-col gap-5" onSubmit={handleSubmit(handleClick)}>
        <input
          className="border py-2 outline-none px-4 text-base w-72 xs:w-[390px] border-black"
          type="text"
          placeholder="Name"
          {...register("name")}
        />
        {errors.name && <p className="text-red-500">{errors.name.message}</p>}

        <input
          className="border py-2 outline-none px-4 text-base w-72 xs:w-[390px] border-black"
          type="email" // Use 'email' type for email input
          placeholder="Email"
          {...register("email")}
        />
        {errors.email && <p className="text-red-500">{errors.email.message}</p>}

        <input
          className="border py-2 outline-none px-4 text-base w-72 xs:w-[390px] border-black"
          type="tel" // Use 'tel' type for phone input
          placeholder="Phone"
          {...register("phone")}
        />
        {errors.phone && <p className="text-red-500">{errors.phone.message}</p>}

        <input
          className="border py-2 px-4 text-base w-72 xs:w-[390px] outline-none border-black"
          type="password"
          placeholder="Password"
          {...register("password")}
        />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}
        
        <button
          type="submit" // Keep the button type as submit
          className="bg-black text-white hover:bg-white hover:text-black hover:border border-black px-8 py-2 mt-4 w-72 xs:w-[390px]"
        >
          Sign Up
        </button>
      </form>
      <div className="flex justify-between w-72 xs:w-[390px] mt-2 text-sm font-semibold">
        <NavLink to={"/forgotpassword"}>
          <div className="cursor-pointer">Forgot Your Password?</div>
        </NavLink>
        <NavLink to={"/login"}>
          <div className="cursor-pointer">Sign In</div>
        </NavLink>
      </div>
    </div>
  );
};

export default SignUp;
