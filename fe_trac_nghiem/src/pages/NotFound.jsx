import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const goToLogin = () => {
    navigate("/login"); // chuyển hướng về trang login
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen ">
      <h1 className="text-4xl md:text-6xl font-bold text-red-600 mb-4">
        404 - Page Not Found
      </h1>
      <p className="text-lg md:text-2xl text-gray-700 mb-8">
        Trang bạn tìm không tồn tại hoặc bạn chưa đăng nhập.
      </p>
      <button
        onClick={goToLogin}
        className="bg-[var(--color-secondary)] text-white font-semibold text-base md:text-xl px-8 md:px-20 py-3 md:py-5 rounded-full cursor-pointer transition-all transform hover:scale-105 shadow-lg"
      >
        Quay về trang đăng nhập
      </button>
    </div>
  );
};

export default NotFound;
