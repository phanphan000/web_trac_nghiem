import React from "react";

const Card = ({ img, text, link, navigate }) => {
  const handleClick = () => {
    if (link && navigate) {
      navigate(link);
    }
  };

  return (
    <div
      onClick={handleClick}
      className=" w-36 md:w-60 lg:w-80 p-3 md:p-4 bg-[var(--color-valuecard)] border-2 md:border-3 border-[var(--color-secondary)] rounded-2xl md:rounded-3xl cursor-pointer hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105 flex flex-col items-center md:gap-6"
    >
      {/* Hình ảnh */}
      <div className="w-24 h-20 lg:w-50 lg:h-30 flex items-center justify-center">
        <img src={img} alt={text} className="w-full h-full object-contain" />
      </div>

      {/* Text */}
      <h3 className="text-sm md:text-xl primary-text-color text-center">
        {text}
      </h3>
    </div>
  );
};

export default Card;
