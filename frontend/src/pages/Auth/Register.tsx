import { registerUser } from "@/actions/user";
import { Action, ThunkDispatch } from "@reduxjs/toolkit";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import ProfileImg from "@/images/download.png";
import { useNavigate } from "react-router-dom";
import Loading from "../Home/Loading";

const Register = () => {
  const dispatch: ThunkDispatch<any, any, Action> = useDispatch();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatar, setAvatar] = useState(ProfileImg);
  const [avatarPreview, setAvatarPreview] = useState(ProfileImg);

  const { loading, success, error } = useSelector((state: any) => state.user);

  const avatarHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const reader = new FileReader();
      reader.onload = () => {
        if (reader.readyState === 2) {
          const result = reader.result;
          if (typeof result === "string") {
            const base64String = result.split(",")[1];
            setAvatarPreview(result);
            setAvatar(base64String);
          } else {
            console.error("Failed to read file as a string.");
          }
        }
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleRegister = (e: any) => {
    e.preventDefault();
    const userData = new FormData();
    userData.append("username", username);
    userData.append("email", email);
    userData.append("password", password);
    userData.append("avatar", avatar);
    dispatch(registerUser(userData));
  };
  console.log();

  useEffect(() => {
    if (error) {
      toast.error("Error : Can't Regsiter User");
    }
    if (success) {
      toast.success("You have registered Successfully");
      navigate("/");
    }
  }, [error, dispatch, success, avatarPreview]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <section className="flex justify-center items-center min-h-screen bg-gray-100">
          <div className="max-w-md bg-white p-8 rounded shadow-md">
            <h1 className="text-center text-2xl mb-2 font-semibold text-gray-800">
              Register
            </h1>
            <form onSubmit={handleRegister} encType="multipart/form-data">
              <div className="mb-4">
                <label htmlFor="username" className="block font-semibold">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  name="username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="email" className="block font-semibold">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block font-semibold">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="avatar" className="block font-semibold">
                  Avatar (Optional)
                </label>
                <div className="flex items-center mt-1">
                  <img
                    src={avatarPreview}
                    alt=""
                    className="h-12 w-12 rounded-full mr-2"
                  />
                  <input
                    type="file"
                    id="avatar"
                    name="avatar"
                    accept="image/*"
                    onChange={avatarHandle}
                    className="border border-gray-300 rounded px-3 py-2"
                  />
                </div>
              </div>
              <div className="mb-4">
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white font-semibold px-4 py-2 rounded hover:bg-blue-600"
                >
                  Register
                </button>
              </div>
            </form>
            <div className="text-center">
              Already have an account{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-blue-500 font-semibold hover:underline focus:outline-none"
              >
                Login
              </button>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Register;
