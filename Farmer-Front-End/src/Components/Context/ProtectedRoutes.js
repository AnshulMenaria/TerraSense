import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const farmerToken = localStorage.getItem("farmerToken");

  return farmerToken ? children : <Navigate to="/" />;
};

export default ProtectedRoute;
