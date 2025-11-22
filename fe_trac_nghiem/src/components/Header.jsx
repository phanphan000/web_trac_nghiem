import React, { useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Header = ({ onLogout, onRegisterClick }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token"); // kiểm tra token
  const [isOpen, setIsOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    if (onLogout) onLogout();
    navigate("/login");
  };

  const handleRegisterClick = () => {
    navigate("/", { state: { scrollToSection: 5 } });
    if (onRegisterClick) onRegisterClick();
  };

  return (
    <header className="bg-[var(--color-background)] fixed top-0 left-0 right-0 z-50 flex justify-between items-center px-4 md:px-8 py-4">
      {/* Logo */}
      <div className="cursor-pointer ml-4 md:ml-8">
        <Link to="/">
          <img
            src="/assets/students/Slide 2/Slide 2.1.png"
            alt="logo"
            className="w-24 md:w-50"
          />
        </Link>
      </div>

      {/* Hamburger button (mobile only) */}
      <button
        className="md:hidden text-[var(--color-secondary)]"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {/* Navigation */}
      <div className="hidden md:flex px-10 mx-6 items-center">
        {!token ? (
          <nav className="flex gap-4 justify-end">
            <button
              onClick={() => navigate("/login")}
              className="py-3 px-6 md:py-6 md:px-12 rounded-4xl font-bold text-lg md:text-2xl
              bg-[#ffecca] text-[var(--color-secondary)] shadow-md hover:scale-105 transition-transform"
            >
              Đăng nhập
            </button>
            <button
              onClick={handleRegisterClick}
              className="py-3 px-6 md:py-4 md:px-8 rounded-4xl font-bold text-lg md:text-2xl
              bg-[var(--color-secondary)] text-white shadow-md hover:scale-105 transition-transform"
            >
              Đăng ký ngay <ArrowRight size={20} className="inline-block" />
            </button>
          </nav>
        ) : (
          <nav className="flex items-center gap-10 justify-end text-lg md:text-2xl primary-text-color">
            <Link to="/test" className="hover:text-[var(--color-secondary)]">
              Test
            </Link>
            <Link
              to="/subjects"
              className="hover:text-[var(--color-secondary)]"
            >
              Môn học
            </Link>
            <Link to="/tool" className="hover:text-[var(--color-secondary)]">
              Công cụ
            </Link>
            <Link to="/results" className="hover:text-[var(--color-secondary)]">
              Kết quả
            </Link>
            <div className="flex items-center gap-2">
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded transition hover:text-[var(--color-secondary)]"
              >
                Đăng xuất
              </button>
              <img
                src="/assets/students/Slide 2/Slide 2.1.png"
                alt="avatar user"
                className="w-12 md:w-20 rounded-full"
              />
            </div>
          </nav>
        )}
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-[var(--color-background)] shadow-md md:hidden">
          {!token ? (
            <nav className="flex flex-col gap-4 p-4">
              <button
                onClick={() => {
                  navigate("/login");
                  setIsOpen(false);
                }}
                className="py-2 px-4 rounded font-bold text-lg
                bg-[#ffecca] text-[var(--color-secondary)] shadow-md"
              >
                Đăng nhập
              </button>
              <button
                onClick={handleRegisterClick}
                className="py-2 px-4 rounded font-bold text-lg
                bg-[var(--color-secondary)] text-white shadow-md"
              >
                Đăng ký ngay <ArrowRight size={18} className="inline-block" />
              </button>
            </nav>
          ) : (
            <nav className="flex flex-col gap-4 p-4 text-lg primary-text-color">
              <Link
                to="/test"
                onClick={() => setIsOpen(false)}
                className="hover:text-[var(--color-secondary)]"
              >
                Test
              </Link>
              <Link
                to="/subjects"
                onClick={() => setIsOpen(false)}
                className="hover:text-[var(--color-secondary)]"
              >
                Môn học
              </Link>
              <Link
                to="/tool"
                onClick={() => setIsOpen(false)}
                className="hover:text-[var(--color-secondary)]"
              >
                Công cụ
              </Link>
              <Link
                to="/results"
                onClick={() => setIsOpen(false)}
                className="hover:text-[var(--color-secondary)]"
              >
                Kết quả
              </Link>
              <div className="flex justify-between">
                <button
                  onClick={handleLogout}
                  className="py-1 rounded transition hover:text-[var(--color-secondary)]"
                >
                  Đăng xuất
                </button>
                <img
                  src="/assets/students/Slide 2/Slide 2.1.png"
                  alt="avatar user"
                  className="w-12 md:w-20 rounded-full"
                />
              </div>
            </nav>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
