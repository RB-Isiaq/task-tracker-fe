import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthCtx } from "../context/authContext";

const ProtectedRoute = ({ children }) => {
  const { userAuth } = useContext(AuthCtx);
  const navigate = useNavigate();

  if (!userAuth.token) {
    console.log("PROTECTED");
    navigate("/");
  }

  return children;
};

export default ProtectedRoute;
