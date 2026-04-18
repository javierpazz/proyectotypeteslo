import { useContext } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { AuthContext } from "../../../context";

export const EsUserAdminGuard = () => {
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

  if (user.role === "user") {
    if (window.confirm('Usuario Sin Autorizacion')) {}
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};