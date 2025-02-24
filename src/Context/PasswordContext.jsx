import axios from "axios";
import { createContext, useState } from "react";

export const PasswordContext = createContext();

export default function PasswordContextProvider({ children }) {
  const [isLoading, setisLoading] = useState(false);
  function forgetPassword(email) {
    setisLoading(true);
    return axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords", {
        email,
      })
      .then((res) => {
        setisLoading(false);
        return res.data;
      })
      .catch((err) => {
        if (err.response) {
          setisLoading(false);
          return err.response.data;
        } else {
          setisLoading(false);
          return {
            statusMsg: "fail",
            message: "An unexpected error occurred. Please try again.",
          };
        }
      });
  }

  function verifyResetCode(resetCode) {
    setisLoading(true);
    return axios
      .post("https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode", {
        resetCode, 
      })
      .then((res) => {
        setisLoading(false);
        return res.data;
      })
      .catch((err) => {
        if (err.response) {
          setisLoading(false);
          return err.response.data;
        } else {
          setisLoading(false);
          return {
            statusMsg: "fail",
            message: "An unexpected error occurred. Please try again.",
          };
        }
      });
  }
  

  return (
    <PasswordContext.Provider
      value={{ forgetPassword, isLoading, verifyResetCode }}
    >
      {children}
    </PasswordContext.Provider>
  );
}
