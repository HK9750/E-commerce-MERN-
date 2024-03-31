import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const UserRoute = () => {
  const { user } = useSelector((state: any) => state.loadUser);
  return user.role && (user.role === "user" || user.role === "admin") ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace />
  );
};

export default UserRoute;
