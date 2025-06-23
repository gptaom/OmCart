// src/components/AdminRoute.jsx
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const AdminRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => state.auth);

  if (!userInfo || !userInfo.isAdmin) {
    return <Navigate to="/" />; // redirect non-admins to home
  }

  return children; // allow admin access
};

export default AdminRoute;
