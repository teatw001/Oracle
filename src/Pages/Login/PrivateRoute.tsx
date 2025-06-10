// components/PrivateRoute.tsx
import { Navigate, Outlet } from "react-router-dom";
import { getUser } from "./utils/auth";


const PrivateRoute = () => {
  const user = getUser();

  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;
