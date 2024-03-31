import { useSelector } from "react-redux";

const Profile = () => {
  const { user } = useSelector((state: any) => state.loadUser);
  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <img
          src={user.avatar.url}
          alt="Avatar"
          className="w-12 h-12 rounded-full mr-4"
        />
        <div>
          <h2 className="text-xl font-semibold">{user.username}</h2>
          <p className="text-gray-500">{user.email}</p>
        </div>
      </div>
      <div className="mb-6">
        <p className="text-gray-600">Role: {user.role}</p>
        <p className="text-gray-600">
          Joined: {new Date(user.createdAt).toLocaleDateString()}
        </p>
      </div>
      <div className="flex justify-between">
        <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none">
          Edit Profile
        </button>
        <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded focus:outline-none">
          See Cart
        </button>
        <button className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded focus:outline-none">
          Reset Password
        </button>
      </div>
    </div>
  );
};

export default Profile;
