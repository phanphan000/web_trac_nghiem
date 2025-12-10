import React from "react";

export default function TopicMathGameDetail() {
  const listgames = [
    {
      text1: "GAME 1",
      text2: "Place value",
      img: "/assets/students/Slide 29/81.png",
      link: "#",
    },
    {
      text1: "GAME 2",
      text2: "Addition & Subtraction",
      img: "/assets/students/Slide 29/82.png",
      link: "#",
    },
    {
      text1: "GAME 3",
      text2: "Multiplication",
      img: "/assets/students/Slide 29/83.png",
      link: "#",
    },
    {
      text1: "GAME 4",
      text2: "Division",
      img: "/assets/students/Slide 29/84.png",
      link: "#",
    },
    {
      text1: "GAME 5",
      text2: "Time",
      img: "/assets/students/Slide 29/85.png",
      link: "#",
    },
    {
      text1: "GAME 6",
      text2: "Triangle",
      img: "/assets/students/Slide 29/86.png",
      link: "#",
    },
    {
      text1: "GAME 7",
      text2: "Symmetry",
      img: "/assets/students/Slide 29/87.png",
      link: "#",
    },
    {
      text1: "GAME 8",
      text2: "2D Shapes",
      img: "/assets/students/Slide 29/88.png",
      link: "#",
    },
    {
      text1: "GAME 9",
      text2: "3D Shapes",
      img: "/assets/students/Slide 29/89.png",
      link: "#",
    },
    {
      text1: "GAME 10",
      text2: "Data Handling",
      img: "/assets/students/Slide 29/90.png",
      link: "#",
    },
  ];

  return (
    <div className="relative w-screen h-screen md:flex md:flex-col md:justify-center md:items-center mt-20 md:mt-0">
      {/* Header với MATH GAME TIME */}
      <div className="w-full flex justify-center">
        <img
          src="/assets/students/Slide 29/80.png"
          alt="Math Game Time"
          className="object-contain h-20 md:h-35"
        />
      </div>

      {/* Grid responsive */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 md:gap-8 max-w-7xl mx-auto md:mt-10">
        {listgames.map((game, index) => (
          <a
            key={index}
            href={game.link}
            className="group flex flex-col items-center gap-2 md:gap-3 transition duration-300 ease-in-out hover:scale-105"
          >
            {/* Icon/Image */}
            <div className="w-28 h-24 md:w-40 md:h-32 flex items-center justify-center">
              <img
                src={game.img}
                alt={game.text2}
                className="w-full h-full object-contain transition duration-300 group-hover:scale-110"
              />
            </div>

            {/* Text */}
            <div className="text-center">
              <p className="text-sm md:text-lg font-bold primary-text-color mb-1">
                {game.text1}
              </p>
              <p className="text-xs md:text-base font-semibold primary-text-color">
                {game.text2}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
