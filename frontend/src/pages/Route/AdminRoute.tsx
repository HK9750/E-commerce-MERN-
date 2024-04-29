import { useSelector } from "react-redux";
import { PropsWithChildren } from "react";
import { Navigate } from "react-router-dom";

type AdminRouteProps = PropsWithChildren<{}>;

export default function AdminRoute({ children }: AdminRouteProps) {
  const { user } = useSelector((state: any) => state.user);
  const sessionUser = JSON.parse(sessionStorage.getItem("user") || "{}");
  return ((user || sessionUser) &&
    (user.role || sessionUser?.role) &&
    user.role === "admin") ||
    sessionUser.role === "admin" ? (
    children
  ) : (
    <Navigate to="/login" />
  );
}
