import React from "react";
import { useNavigate } from "react-router-dom";

const OrangeButton = ({ text, link, onClick, className = "" }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (link) {
      navigate(link); // chuyển sang trang khác
    } else if (onClick) {
      onClick(); // nếu không có link thì gọi sự kiện click
    }
  };

  return (
    <button
      onClick={handleClick}
      className={`
        bg-[var(--color-btn)]
        primary-text-color
        font-semibold
        text-lg sm:text-2xl lg:text-4xl
        py-3 sm:py-4 lg:py-5
        px-6 sm:px-16 lg:px-24
        rounded-4xl
        shadow-[0_7px_0_#974018]
        hover:scale-[1.05]
        transition-transform
        duration-200
        whitespace-nowrap
        ${className}
      `}
    >
      {text}
    </button>
  );
};

export default OrangeButton;
