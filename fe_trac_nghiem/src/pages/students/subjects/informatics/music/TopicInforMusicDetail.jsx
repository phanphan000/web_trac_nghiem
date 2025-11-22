import React from "react";

export default function TopicInforMusicDetail() {
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
    <div className="relative w-screen h-screen overflow-hidden">
      {/* Ảnh nền */}
      <img
        src="/assets/students/Slide 55/187.png"
        alt="Login Background"
        className="absolute -top-10 left-5  z-0 opacity-75 scale-90"
      />

      {/* Nội dung  */}
      <div className="relative z-10 mt-15 flex flex-col w-full h-full">
        <div className="w-full flex justify-center ">
          <img
            src="/assets/students/Slide 55/186.png"
            alt="ảnh slide 31"
            className="object-contain w-[70%]"
          />
        </div>
        <div className="flex justify-between flex-1">
          <div className="w-1/3 pl-10 pt-10">
            <img
              src="/assets/students/Slide 55/188.png"
              alt="hehehhhe"
              className="scale-80"
            />
          </div>
          <div className="w-2/3 pl-10 flex">
            {[0, 1].map((col) => (
              <div key={col} className="w-1/3 flex flex-col space-y-4 mt-5">
                {musicItems.slice(col * 5, col * 5 + 5).map((item, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <img
                      src="/assets/students/Slide 55/189.png"
                      alt="ảnh slide 55"
                      className="object-contain w-[30%]"
                    />
                    <a
                      href={item.link}
                      className="text-lg font-semibold italic hover:text-[color:var(--color-secondary)] transition duration-300 ease-in-out hover:scale-105"
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
