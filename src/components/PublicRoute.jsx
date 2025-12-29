import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  const token = sessionStorage.getItem("token");
  return token ? <Navigate to="/landing" replace /> : children;
};

export default PublicRoute;