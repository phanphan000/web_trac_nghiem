import React from "react";

export default function TopicScienceMusicDetail() {
  const musicItems = [
    { text: "Place value", link: "#1" },
    { text: "Addition & Subtraction", link: "#2" },
    { text: "Multiplication", link: "#3" },
    { text: "Division", link: "#4" },
    { text: "Fractions", link: "#5" },
    { text: "Decimals", link: "#6" },
    { text: "Measurement", link: "#7" },
    { text: "Geometry", link: "#8" },
    { text: "Time", link: "#9" },
    { text: "Money", link: "#10" },
  ];
  return (
    <div className="flex items-center justify-center h-screen ">
      {/* Ảnh nền */}
      <img
        src="/assets/students/Slide 43/142.png"
        alt="Login Background"
        className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-0 opacity-55 md:scale-85 lg:scale-75 object-contain"
      />

      {/* Nội dung */}
      <div className="z-10 md:mt-5 lg:mt-0 md:mb-40">
        <div className="w-full flex justify-center">
          <img
            src="/assets/students/Slide 43/141.png"
            alt="ảnh slide 43"
            className="object-contain w-[65%]"
          />
        </div>

        <div className="flex justify-between flex-1 mb-17 mt-3 md:mb-0 md:mt-0">
          {/* Bên trái */}
          <div className="w-1/3 pl-10 mt-10  md:flex md:items-start md:justify-end">
            <img
              src="/assets/students/Slide 43/199.png"
              alt="hehehhhe"
              className="w-70"
            />
          </div>

          {/* Bên phải */}
          <div className="w-2/3 pl-3 md:pl-10 flex">
            {[0, 1].map((col) => (
              <div
                key={col}
                className="w-full lg:w-1/3 flex flex-col sm:space-y-4"
              >
                {musicItems.slice(col * 5, col * 5 + 5).map((item, index) => (
                  <div key={index} className="flex items-center sm:gap-3">
                    <img
                      src="/assets/students/Slide 43/144.png"
                      alt="ảnh slide 43"
                      className="object-contain w-8 sm:w-10 lg:w-[20%]"
                    />
                    <a
                      href={item.link}
                      className="text-xs sm:text-base lg:text-lg font-semibold italic hover:text-[color:var(--color-secondary)] transition duration-300 ease-in-out hover:scale-105"
                    >
                      {item.text}
                    </a>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
