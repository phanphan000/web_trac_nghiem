import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../services/auth";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login(formData);
      console.log("Login response:", res);

      if (res.token) {
        localStorage.setItem("token", res.token);

        // lấy role từ mảng roles
        const role = res.roles && res.roles.length > 0 ? res.roles[0] : null;
        localStorage.setItem("role", role);

        setMessage("Đăng nhập thành công! 🎉");

        // điều hướng theo role
        if (role === "student") {
          navigate("/test");
        } else if (role === "teacher") {
          navigate("/teacher");
        } else if (role === "admin") {
          navigate("/admin");
        }
      }
    } catch (err) {
      console.error(err);
      setMessage("Tên đăng nhập hoặc mật khẩu không đúng!");
    }
  };
  return (
    <div className="h-full mx-10 flex justify-between pt-50 items-center">
      <img
        src="/assets/students/Slide 2/Slide 2.3.png"
        alt="Login Background"
        className="absolute inset-0 w-full h-full object-contain object-bottom z-0"
      />
      {/* Form */}
      <div className="max-w-4xl mx-auto z-10 w-full">
        <div className="text-center mb-6 md:mb-10">
          <h1 className="text-2xl md:text-6xl primary-text-color">Đăng Nhập</h1>
        </div>

        <form
          onSubmit={handleLogin}
          className="space-y-6 md:space-y-8 md:mr-15"
        >
          {/* Tên đăng nhập */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <label className="primary-text-color text-base md:text-2xl w-full md:w-48">
              Tên đăng nhập
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="px-4 md:px-20 py-3 md:py-4 text-center rounded-full border-2 border-orange-400 bg-white focus:outline-none focus:border-orange-500 text-sm md:text-lg w-full md:w-[500px]"
            />
          </div>

          {/* Mật khẩu */}
          <div className="flex flex-col md:flex-row items-center gap-4 md:gap-8">
            <label className="primary-text-color text-base md:text-2xl w-full md:w-48">
              Mật khẩu
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="px-4 md:px-20 py-3 md:py-4 text-center rounded-full border-2 border-orange-400 bg-white focus:outline-none focus:border-orange-500 text-sm md:text-lg w-full md:w-[500px]"
            />
          </div>

          {/* Nút đăng nhập */}
          <div className="flex justify-center mt-6 md:mt-8">
            <button
              type="submit"
              className="bg-[#ef7131] text-white font-semibold text-base md:text-xl px-8 md:px-20 py-3 md:py-5 rounded-full cursor-pointer transition-all transform hover:scale-105 shadow-lg mb-6 md:mb-10"
            >
              Đăng nhập
            </button>
          </div>

          {/* Thông báo */}
          {message && (
            <div
              className={`text-center text-sm md:text-lg font-semibold ${
                message.includes("thành công")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Login;
