import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const adminToken = localStorage.getItem("adminToken"); // Directly check in localStorage

  return adminToken ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
