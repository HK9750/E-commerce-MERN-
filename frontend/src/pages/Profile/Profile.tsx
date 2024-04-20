import { FaShoppingCart, FaKey, FaUserEdit } from "react-icons/fa";
import ProfileImg from "@/images/download.png";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state: any) => state.user);
  const navigate = useNavigate();

  const UpdateProfile = () => {
    navigate("/profile/update");
  };
  const updateFunc = () => {
    navigate("/profile/updatePassword");
  };
  return (
    <div className="flex flex-col justify-between bg-gray-100 rounded-lg shadow-md m-6 p-4 max-h-screen w-11/12 md:w-1/2 mx-auto">
      <div className="flex md:flex-row justify-between">
        <div>
          <h1 className="text-2xl font-bold mb-4 text-center">Profile</h1>
          <div className="flex items-center mb-4">
            {" "}
            <img
              src={
                user.avatar && user.avatar.url ? user.avatar.url : ProfileImg
              }
              alt="Avatar"
              className="w-12 h-12 rounded-full mr-4"
            />{" "}
            <div>
              {" "}
              <h2 className="text-lg font-semibold">{user.username}</h2>{" "}
              <p className="text-gray-600">{user.email}</p>{" "}
            </div>{" "}
          </div>
        </div>
        <div className="flex flex-col justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded text-nowrap mb-2 w-fit"
            onClick={UpdateProfile}
          >
            <FaUserEdit className="inline-block mr-2" />
            Edit Profile
          </button>
          <button className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded text-nowrap mb-2 w-fit">
            <FaShoppingCart className="inline-block mr-2" />
            See Cart
          </button>
          <button
            className="bg-gray-500 hover:bg-gray-600 text-white font-semibold px-4 py-2 rounded text-nowrap w-fit"
            onClick={updateFunc}
          >
            <FaKey className="inline-block mr-2" />
            Update Password
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
