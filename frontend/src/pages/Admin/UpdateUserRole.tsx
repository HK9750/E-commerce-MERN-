import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { Action } from "@reduxjs/toolkit";
import { updateUserRole, clearErrors } from "@/actions/user";
import Sidebar from "./Sidebar";
import { UPDATE_USER_ROLE_RESET } from "@/constants/userConstants";

const UpdateUserRole = () => {
  const dispatch: ThunkDispatch<any, any, Action> = useDispatch();
  const { error, user, isUpdated } = useSelector(
    (state: any) => state.adminUsers
  );
  const [role, setRole] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const id = useParams<{ id: string }>().id;
  const updateUserRoleHandler = (e: any) => {
    e.preventDefault();
    const myForm = new FormData();
    myForm.append("role", role);
    myForm.append("username", username);
    myForm.append("email", email);
    dispatch(updateUserRole(id || "", myForm));
  };
  const handleUserName = (e: any) => {
    setUserName(e.target.value);
  };
  const handleEmail = (e: any) => {
    setEmail(e.target.value);
  };
  const handleRole = (e: any) => {
    setRole(e.target.value);
  };

  useEffect(() => {
    if (user) {
      setRole(user.role);
      setUserName(user.username);
      setEmail(user.email);
    }
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }
    if (isUpdated) {
      toast.success("User role updated successfully");
      dispatch({ type: UPDATE_USER_ROLE_RESET });
    }
  }, [dispatch, error, isUpdated]);

  return (
    <div className="flex flex-row dark:bg-transparent">
      <div className="w-1/4 dark:border-white dark:text-white">
        <Sidebar />
      </div>
      <div className="w-3/4 dark:bg-transparent py-8 mx-auto">
        <h1 className="text-3xl font-bold mb-4 dark:text-white">
          Update User Role
        </h1>
        <div className="w-[60%]">
          <form onSubmit={updateUserRoleHandler}>
            <div className="mb-4">
              <label
                htmlFor="username"
                className="block dark:text-white font-semibold"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={handleUserName}
                className="border border-gray-300 dark:border-white rounded-md p-2 w-full dark:bg-transparent"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block dark:text-white  font-semibold"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={handleEmail}
                className="border border-gray-300 dark:border-white rounded-md p-2 w-full  dark:bg-transparent"
              />
            </div>
            <div className="mb-4">
              <label
                htmlFor="role"
                className="block dark:text-white  font-semibold"
              >
                Role
              </label>
              <select
                name="role"
                id="role"
                value={role}
                onChange={handleRole}
                className="border border-gray-300 dark:border-white rounded-md p-2 w-full  dark:bg-transparent"
              >
                <option
                  value="select"
                  className=" dark:bg-transparent dark:text-black"
                >
                  Select Role
                </option>
                <option
                  value="user"
                  className="dark:bg-transparent dark:text-black"
                >
                  User
                </option>
                <option
                  value="admin"
                  className="dark:bg-transparent dark:text-black"
                >
                  Admin
                </option>
              </select>
            </div>
            <br />
            <button
              type="submit"
              className="bg-gray-500 hover:bg-gray-700 text-white font-semibold py-2 px-4 rounded dark:bg-white dark:text-black"
            >
              Update Role
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default UpdateUserRole;
