import { PropsWithChildren } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

type UserRouteProps = PropsWithChildren<{}>;

export default function UserRoute({ children }: UserRouteProps) {
  const { user } = useSelector((state: any) => state.user);
  const sessionUser = JSON.parse(sessionStorage.getItem("user") || "{}");
  return ((user || sessionUser) &&
    (user.role || sessionUser?.role) &&
    (user.role === "user" || user.role === "admin")) ||
    sessionUser.role === "user" ||
    sessionUser.role === "admin" ? (
    children
  ) : (
    <Navigate to="/login" />
  );
}
