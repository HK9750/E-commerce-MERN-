import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { Action } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { forgotPassword } from "@/actions/user";
import { FORGOT_PASSWORD_RESET } from "@/constants/userConstants";

const ForgetPassword: React.FC = () => {
  const dispatch: ThunkDispatch<any, any, Action> = useDispatch();
  const [email, setEmail] = useState("");
  const { success } = useSelector((state: any) => state.forgetPassword);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleForgetPassword = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };

  useEffect(() => {
    if (success) {
      console.log("Password reset link sent to your email");
      toast.success("Password reset link sent to your email");
      dispatch({ type: FORGOT_PASSWORD_RESET });
    }
  }, [success]);

  return (
    <div className="flex justify-center h-screen bg-transparent">
      <div className="bg-white w-[30%] h-[50%] mt-10 shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold mb-4">Forget Password</h2>
        <form onSubmit={handleForgetPassword}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:border-blue-500"
              placeholder="Enter your email"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPassword;
