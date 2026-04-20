import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../../../context";

export const AuthGuard = () => {
  const { user, isLoading } = useContext(AuthContext);
  const location = useLocation();

  if (isLoading) return null;

  if (!user) {
    return (
      <Navigate
        to={`/auth/loginadm?redirect=${location.pathname}${location.search}`}
        replace
      />
    );
  }

  return <Outlet />;
};