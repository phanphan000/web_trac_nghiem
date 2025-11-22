import React from "react";

// Component Card có thể tái sử dụng
const Card = ({ img, text, link, navigate }) => {
  const handleClick = () => {
    if (link && navigate) {
      navigate(link);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="w-80 p-4 bg-[var(--color-valuecard)] border-3 border-[var(--color-secondary)] rounded-3xl cursor-pointer hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105 flex flex-col items-center gap-6"
    >
      {/* Hình ảnh */}
      <div className="w-50 h-30 flex items-center justify-center">
        <img src={img} alt={text} className="w-full h-full object-contain" />
      </div>

      {/* Text */}
      <h3 className="text-xl primary-text-color text-center">{text}</h3>
    </div>
  );
};
export default Card;
