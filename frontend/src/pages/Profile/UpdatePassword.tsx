import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { updatePassword } from "@/actions/user";
import { UPDATE_PASSWORD_RESET } from "@/constants/userConstants";

const UpdatePassword: React.FC = () => {
  const dispatch: ThunkDispatch<any, any, Action> = useDispatch();
  const navigate = useNavigate();
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { error, isUpdated } = useSelector(
    (state: any) => state.updatePassword
  );

  const handleOldPasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOldPassword(e.target.value);
  };
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      const formData = new FormData();
      formData.append("oldPassword", oldPassword);
      formData.append("password", password);
      formData.append("confirmPassword", confirmPassword);
      dispatch(updatePassword(formData));
    }
  };
  useEffect(() => {
    if (isUpdated) {
      toast.success("Password reset successfully");
      navigate("/profile");
      dispatch({ type: UPDATE_PASSWORD_RESET });
    }
    if (error) {
      toast.error(error);
    }
  }, [isUpdated, error, dispatch, navigate]);

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        className="w-full h-[70%] max-w-sm bg-white shadow-xl rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="oldpassword"
          >
            OldPassword
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="oldpassword"
            type="password"
            placeholder="Enter your old password"
            value={oldPassword}
            onChange={handleOldPasswordChange}
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            placeholder="Enter your new password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="confirmPassword"
          >
            Confirm Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="confirmPassword"
            type="password"
            placeholder="Confirm your new password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdatePassword;
