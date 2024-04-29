import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../Home/Loading";
import { loginUser } from "@/actions/user";
import { toast } from "react-toastify";
import { clearErrors } from "@/actions/products";
import { LOGIN_USER_RESET } from "@/constants/userConstants";

const Login = () => {
  const dispatch: ThunkDispatch<any, any, any> = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmail = (e: any) => setEmail(e.target.value);
  const handlePassword = (e: any) => setPassword(e.target.value);
  const handleForgetPassword = () => navigate("/forgetPassword");
  const handleRegister = () => navigate("/register");

  const { loading, error, success } = useSelector((state: any) => state.user);
  const handleLogin = (e: any) => {
    e.preventDefault();
    const data = { email, password };
    dispatch(loginUser(data));
  };

  useEffect(() => {
    if (error) {
      toast.error("Error: Can't Login");
      dispatch(clearErrors());
    }

    if (success) {
      navigate("/");
      toast.success("Login Successfully");
      dispatch({ type: LOGIN_USER_RESET });
    }
  }, [dispatch, error, success, navigate]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section className="flex justify-center items-center h-screen bg-gray-100">
          <div className="bg-white p-8 rounded-lg shadow-md w-96 h-96">
            <div>
              <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="my-2">
                  <label
                    htmlFor="email"
                    className="block text-md font-medium text-gray-700"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleEmail}
                    className="focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 mt-2 border"
                  />
                </div>
                <div className="my-2">
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={handlePassword}
                    className="mt-2 p-2 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md border"
                  />
                </div>
                <div className="my-4">
                  <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Login
                  </button>
                </div>
              </form>
              <div className="mt-2">
                <button
                  onClick={handleForgetPassword}
                  className="text-indigo-600 hover:underline focus:outline-none"
                >
                  Forget Password
                </button>
              </div>
              <div className="mt-2">
                Don't have an account{" "}
                <button
                  onClick={handleRegister}
                  className="text-indigo-600 hover:underline focus:outline-none"
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Login;
