
import React, { useState, useContext } from "react";
import { useFormik } from "formik";
import { PasswordContext } from "./../../Context/PasswordContext";
import { useNavigate } from "react-router-dom";

export default function VerifyResetCode() {
  const { verifyResetCode, isLoading } = useContext(PasswordContext);
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      resetCode: "",
    },
    onSubmit: async (values) => {
      const response = await verifyResetCode(values.resetCode);
      console.log(response);
      
      if (response.status === "Success") {
        navigate("/resetpassword");
      }
    },
  });

  return (
    <div className="max-w-md mx-auto">
      <h2 className="text-xl font-bold text-emerald-600 mb-4">
        Verify Reset Code
      </h2>

      <form onSubmit={formik.handleSubmit}>
        <label className="block text-sm font-medium text-gray-700">
          Code:
        </label>
        <input
          type="text"
          name="resetCode"
          value={formik.values.resetCode}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-emerald-600 peer"
          required
        />
        <button
          disabled={isLoading}
          type="submit"
          className={`mt-4 px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 min-w-[150px] disabled:bg-emerald-200 disabled:cursor-not-allowed`}
        >
          {isLoading ? <i className="fas fa-spinner fa-spin"></i> : <> Verify Code</>}
        </button>
      </form>
    </div>
  );
}
