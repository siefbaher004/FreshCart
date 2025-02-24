import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserContext } from "./../../Context/UserContext";

export default function ResetPassword() {
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
    newPassword: yup
      .string()
      .required("New Password is required")
      .matches(/^.{6,}$/, "Your password is too short."),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      newPassword: "",
    },
    validationSchema,
    onSubmit: handleResetPassword,
  });

  function handleResetPassword(values) {
    setisLoading(true);
    axios
      .put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, values)
      .then((res) => {
        setisLoading(false);
        console.log(res);
        if (res.data ) {
          localStorage.setItem("userToken", res.data.token);
          setIsLogin(res.data.token); 
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
          Reset Password
        </h2>
        {ApiError ? (
          <div
            className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 font-medium"
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
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="email"
            className="peer-focus:font-medium absolute left-0 text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
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
            name="newPassword"
            id="newPassword"
            autoComplete=""
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
            placeholder=" "
            required
          />
          <label
            htmlFor="newPassword"
            className="peer-focus:font-medium absolute left-0 text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-emerald-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
          >
            Enter your new password
          </label>
          {formik.errors.newPassword && formik.touched.newPassword ? (
            <div
              className="flex items-center p-4 mb-4 text-sm text-red-800 justify-center"
              role="alert"
            >
              <span className="font-medium pe-1">Oops! </span>
              {formik.errors.newPassword}
            </div>
          ) : null}
        </div>
        <div className="md:flex gap-3 items-center justify-center flex-wrap">
          <button
            type="submit"
            className="text-white bg-emerald-700 hover:bg-emerald-800 focus:outline-none font-medium rounded-lg text-sm w-full px-5 py-2.5 text-center md:w-[120px] mb-8"
          >
            {isLoading ? (
              <i className="fa-solid fa-spinner fa-spin-pulse"></i>
            ) : (
              "Reset Password"
            )}
          </button>
        </div>
      </form>
    </>
  );
}
