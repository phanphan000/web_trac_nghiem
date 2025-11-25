import { Navigate } from "react-router-dom";

function GuestOnlyRoute({ children }) {
  const token = localStorage.getItem("token"); // hoặc lấy từ context/state

  if (token) {
    // Nếu đã đăng nhập thì redirect sang dashboard
    return <Navigate to="/test" replace />;
  }

  return children;
}

export default GuestOnlyRoute;
