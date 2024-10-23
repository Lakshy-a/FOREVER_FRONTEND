import React from "react";
import { GoHorizontalRule } from "react-icons/go";
import { useForm } from "react-hook-form";
import CartTotals from "./CartTotals";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import stripe_logo from "../../assets/frontend_assets/stripe_logo.png";
import razorpay_logo from "../../assets/frontend_assets/razorpay_logo.png";

// Define the Yup schema
const schema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  street: yup.string().required("Street is required"),
  city: yup.string().required("City is required"),
  state: yup.string().required("State is required"),
  zipCode: yup.string().required("Zip code is required"),
  country: yup.string().required("Country is required"),
  phone: yup
    .string()
    .required("Phone is required")
    .matches(/^\d{10}$/, "Phone must be exactly 10 digits"),
  paymentMethod: yup.string().required("Please select a payment method"),
});

export default function Checkout() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <div className="custom-padding">
        <div>
          <div className="uppercase text-2xl text-gray-400 font-semibold flex items-center mt-8">
            Delivery <span className="text-black ml-2">Information</span>
            <span className="text-black ml-2">
              <GoHorizontalRule />
            </span>
          </div>
        </div>
        <div>
          {/* Delivery form */}
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="mt-12 xs:flex gap-20"
          >
            <div className="xs:w-1/2">
              <div className="flex gap-4">
                <input
                  type="text"
                  {...register("firstName")}
                  placeholder="First Name"
                  className="border p-2 border-gray-400 outline-none w-1/2 rounded-md"
                />
                <p className="text-red-500 text-sm">{errors.firstName?.message}</p>

                <input
                  type="text"
                  {...register("lastName")}
                  placeholder="Last Name"
                  className="border p-2 border-gray-400 outline-none w-1/2 rounded-md"
                />
                <p className="text-red-500 text-sm">{errors.lastName?.message}</p>
              </div>
              <div className="mt-4">
                <input
                  type="email"
                  {...register("email")}
                  placeholder="Email"
                  className="border border-gray-400 outline-none p-2  w-full rounded-md"
                />
                <p className="text-red-500 text-sm">{errors.email?.message}</p>
              </div>
              <div className="mt-4">
                <input
                  type="text"
                  {...register("street")}
                  placeholder="Street"
                  className="border border-gray-400 outline-none p-2  w-full rounded-md"
                />
                <p className="text-red-500 text-sm">{errors.street?.message}</p>
              </div>
              <div className="flex gap-4 mt-4">
                <input
                  type="text"
                  {...register("city")}
                  placeholder="City"
                  className="border p-2 border-gray-400 outline-none w-1/2 rounded-md"
                />
                <p className="text-red-500 text-sm">{errors.city?.message}</p>

                <input
                  type="text"
                  {...register("state")}
                  placeholder="State"
                  className="border p-2 border-gray-400 outline-none w-1/2 rounded-md"
                />
                <p className="text-red-500 text-sm">{errors.state?.message}</p>
              </div>
              <div className="flex gap-4 mt-4">
                <input
                  type="text"
                  {...register("zipCode")}
                  placeholder="Zip Code"
                  className="border p-2 border-gray-400 outline-none w-1/2 rounded-md"
                />
                <p className="text-red-500 text-sm">{errors.zipCode?.message}</p>

                <input
                  type="text"
                  {...register("country")}
                  placeholder="Country"
                  className="border p-2 border-gray-400 outline-none w-1/2 rounded-md"
                />
                <p className="text-red-500 text-sm">{errors.country?.message}</p>
              </div>
              <div className="mt-4">
                <input
                  type="text"
                  {...register("phone")}
                  placeholder="Phone"
                  className="border border-gray-400 outline-none p-2  w-full rounded-md"
                />
                <p className="text-red-500 text-sm">{errors.phone?.message}</p>
              </div>
            </div>
            <div className="xs:w-1/2">
              {/* Cart Totals */}
              <div className="mt-20 xs:mt-0">
                <CartTotals placeOrder={false} />
              </div>
              {/* Payment methods */}
              <div className="xs:custom-padding mt-16 xs:mt-10">
                <div className="uppercase text-2xl text-gray-400 font-semibold flex items-center mt-8">
                  Payment <span className="text-black ml-2">Method</span>
                  <span className="text-black ml-2">
                    <GoHorizontalRule />
                  </span>
                </div>
                <div className="flex flex-col gap-4 mt-4">
                  <div className="flex flex-col gap-4 xs:flex-row">
                    <div className="border border-gray-400 py-2 px-4 rounded-md flex gap-4 xs:gap-2 items-center">
                      <input
                        type="radio"
                        {...register("paymentMethod")}
                        value={"stripe"}
                        className=""
                        id="stripe"
                      />
                      <label htmlFor="stripe">
                        <img src={stripe_logo} className="w-12" />
                      </label>
                    </div>
                    <div className="border border-gray-400 py-2 px-4 rounded-md flex gap-4 items-center">
                      <input
                        type="radio"
                        {...register("paymentMethod")}
                        value={"razorpay"}
                        className=""
                        id="razorpay"
                      />
                      <label htmlFor="razorpay">
                        <img src={razorpay_logo} className="w-28" />
                      </label>
                    </div>
                    <div className="border border-gray-400 py-2 px-4 rounded-md flex gap-4 items-center">
                      <input
                        type="radio"
                        id="cod"
                        {...register("paymentMethod")}
                        value={"cod"}
                      />
                      <label htmlFor="cod">
                        <div className="uppercase text-sm font-semibold text-gray-400">
                          Cash On Delivery
                        </div>
                      </label>
                    </div>
                  </div>
                  <p className="text-red-500 text-sm">{errors.paymentMethod?.message}</p>
                  <div className="w-full text-right">
                    <button
                      type="submit"
                      className={`mt-4 uppercase bg-black text-white text-sm px-5 py-3 hover:bg-white hover:text-black hover:border-black hover:border `}
                    >
                      Proceed To Checkout
                    </button>
                  </div>
                </div>
              </div>{" "}
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
