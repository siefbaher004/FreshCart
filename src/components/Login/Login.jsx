import React, { useContext, useState } from "react";
import style from "./Login.module.css";
import { useFormik } from "formik";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { UserContext } from "./../../Context/UserContext";

export default function Login() {
  const navigate = useNavigate();
  const [ApiError, setApiError] = useState("");
  const [isLoading, setisLoading] = useState(false);
  const { IsLogin, setIsLogin } = useContext(UserContext);

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .required("Email is required")
      .matches(
        /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com|outlook\.com|hotmail\.com|icloud\.com|aol\.com|zoho\.com|yandex\.com|protonmail\.com)$/,
        "Unvalid email"
      ),
    password: yup
      .string()
      .required("Password is required")
      .matches(/^.{6,}$/, "Your password is too short."),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: handleLogin,
  });

  function handleLogin(values) {
    setisLoading(true);
    axios
      .post(`https://ecommerce.routemisr.com/api/v1/auth/signin`, values)
      .then((res) => {
        setisLoading(false);

        setIsLogin(res.data.token);
        console.log(res);
        if (res.data.message == "success") {
          localStorage.setItem("userToken", res.data.token);
          console.log(res?.data?.user?.email);

          navigate("/");
        }
      })
      .catch((res) => {
        setisLoading(false);
        setApiError(res.response.data.message);
      });
  }

  return (
    <>
      <form className="max-w-md mx-auto" onSubmit={formik.handleSubmit}>
        <h2 className="font-extrabold text-4xl py-5 text-emerald-600 ">
          Welcome Back
        </h2>
        {ApiError ? (
          <div
            className="  p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 font-medium"
            role="alert"
          >
            {ApiError}
          </div>
        ) : null}
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="email"
            name="email"
            id="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute left-0 text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter your email
          </label>
          {formik.errors.email && formik.touched.email ? (
            <div
              className="flex items-center p-4 mb-4 text-sm text-red-800 justify-center"
              role="alert"
            >
              <span className="font-medium pe-1">Oops! </span>
              {formik.errors.email}
            </div>
          ) : null}
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="password"
            name="password"
            id="password"
            autoComplete=""
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="password"
            className="peer-focus:font-medium absolute left-0 text-sm text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter your password
          </label>
          {formik.errors.password && formik.touched.password ? (
            <div
              className="flex items-center p-4 mb-4 text-sm text-red-800 justify-center"
              role="alert"
            >
              <span className="font-medium pe-1">Oops! </span>
              {formik.errors.password}
            </div>
          ) : null}
        </div>
        <Link to={"/forgetpassword"}>
          <div className=" text-right py-3 text-sm underline text-blue-600">
            Forgot Your Password?
          </div>
        </Link>
        <div className="md:flex gap-3 items-center justify-center flex-wrap">
          <button
            type="submit"
            className="text-white bg-emerald-700 hover:bg-emerald-800 focus:outline-none font-medium rounded-lg text-sm w-full  px-5 py-2.5 text-center md:w-[120px] mb-8"
          >
            {isLoading ? (
              <i className="fa-solid fa-spinner fa-spin-pulse"></i>
            ) : (
              "Login"
            )}
          </button>
          <span className="text-slate-500 ">
            Don`t have an account?{" "}
            <Link
              to={"/register"}
              className="font-semibold text-blue-600 underline"
            >
              {" "}
              Sign up
            </Link>{" "}
          </span>
        </div>
      </form>
    </>
  );
}
