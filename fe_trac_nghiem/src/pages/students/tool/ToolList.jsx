import React from "react";
import { useNavigate } from "react-router-dom";

const tools = [
  {
    id: "1",
    name: "Quiz",
    link: "/tool/quiz",
    image: "/assets/students/Slide 10/slide 10.1.png",
  },
  {
    id: "2",
    name: "Game",
    link: "/tool/game",
    image: "/assets/students/Slide 10/slide 10.2.png",
  },
  {
    id: "3",
    name: "Music",
    link: "/tool/music",
    image: "/assets/students/Slide 10/slide 10.3.png",
  },
];

export default function ToolList() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center p-4 sm:p-6 lg:p-8 justify-center min-h-screen pt-16 sm:pt-24 lg:pt-30 primary-text-color">
      <h1 className="text-2xl sm:text-4xl lg:text-6xl mb-8 sm:mb-12 lg:mb-20 text-center">
        HÔM NAY BẠN MUỐN HỌC THEO CÁCH NÀO?
      </h1>

      {/* Chỉ lg mới có 3 cột, còn lại 1 cột */}
      <div className="grid grid-cols-3 lg:grid-cols-3 gap-6 mt-10 w-full max-w-6xl">
        {tools.map((tool) => (
          <div
            key={tool.id}
            className="flex flex-col items-center gap-4 sm:gap-6 lg:gap-8 m-2 sm:m-4 cursor-pointer"
            onClick={() => tool.link !== "#" && navigate(tool.link)}
          >
            <img
              src={tool.image}
              alt={tool.name}
              className="w-50 sm:w-70 lg:w-120 object-contain hover:scale-105 transition-transform duration-200"
            />
            <span className="text-black text-lg sm:text-2xl lg:text-4xl font-bold hover:text-[var(--color-primary)]">
              {tool.name}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
