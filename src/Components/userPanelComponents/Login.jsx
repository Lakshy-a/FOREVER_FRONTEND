import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { GoHorizontalRule } from "react-icons/go";
import { NavLink, useNavigate } from "react-router-dom";
import { object, string } from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { loggedIn, loggedOut } from "../../slices/isLoggedIn/loggedInSlice";
import { setCart } from "../../slices/cartData/cartSlice";

let signInSchema = object({
  email: string().email("Invalid email").required("Email is required"),
  password: string().required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logged = useSelector((state) => state.loggedIn.isLoggedIn);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [isLoggedIn, setIsLoggedIn] = useState(logged);
  const [cartData, setCartData] = useState([]);
  const [userEmail, setUserEmail] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInSchema),
  });

  const handleClick = async (data) => {
    await axios
      .post(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, data)
      .then((response) => {
        localStorage.setItem("accessToken", response.data.data);
        dispatch(loggedIn());
        setUserEmail(data.email);
        navigate("/");
      })
      .catch((error) => console.log(error));
    reset();
  };

  useEffect(() => {
    const fetchCart = async () => {
      try {
        await axios.get(
          `${import.meta.env.VITE_API_BASE_URL}/cart/getUsersCart`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        )
          .then((response) => {
            if (response.status == 200)
              dispatch(setCart(response.data.data.products));
          })
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (logged) {
      fetchCart();
    }
  }, [logged])

  return (
    <>
      <div className="w-full h-96 flex flex-col items-center justify-center">
        <div className=" text-3xl flex items-center text-black font-serif">
          Log In
          <span className="text-black ml-2">
            <GoHorizontalRule />
          </span>
        </div>
        <form className="mt-6 flex flex-col gap-5">
          <input
            className="border py-2 outline-none px-4 text-base w-72 xs:w-[390px] border-black"
            type="text"
            placeholder="Email"
            {...register("email")} // Use lowercase 'email' here
          />
          {errors.email && (
            <p className="text-red-500">{errors.email.message}</p>
          )}

          <input
            className="border py-2 px-4 text-base w-72 xs:w-[390px] outline-none border-black"
            type="password"
            placeholder="Password"
            {...register("password")} // Use lowercase 'password' here
          />
          {errors.password && (
            <p className="text-red-500">{errors.password.message}</p>
          )}
        </form>
        <div className="flex justify-between w-72 xs:w-[390px] mt-2 text-sm font-semibold">
          <NavLink to={"/forgotpassword"}>
            <div className="cursor-pointer">Forgot Your Password?</div>
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
          Sign In
        </button>
      </div>
    </>
  );
};

export default Login;
