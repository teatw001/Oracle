import { Navigate, Outlet } from "react-router-dom";
import { getUser } from "./utils/auth";

const AdminRoute = () => {
  const user = getUser();

  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "personnel") return <Navigate to="/atmKH" replace />;

  return <Outlet />;
};

export default AdminRoute;
