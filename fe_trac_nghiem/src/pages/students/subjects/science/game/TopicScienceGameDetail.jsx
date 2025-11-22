import React from "react";

export default function TopicScienceGameDetail() {
  const listgames = [
    {
      text1: "GAME 1",
      text2: "Living things and Non- living things",
      img: "/assets/students/Slide 33/95.png",
      link: "#",
    },
    {
      text1: "GAME 2",
      text2: "Characteristic of living things",
      img: "/assets/students/Slide 33/96.png",
      link: "#",
    },
    {
      text1: "GAME 3",
      text2: "Different types of plants",
      img: "/assets/students/Slide 33/97.png",
      link: "#",
    },
    {
      text1: "GAME 4",
      text2: "Parts of a plants and their functions",
      img: "/assets/students/Slide 33/98.png",
      link: "#",
    },
    {
      text1: "GAME 5",
      text2: "Life cycle of a flowering plant",
      img: "/assets/students/Slide 33/99.png",
      link: "#",
    },
    {
      text1: "GAME 6",
      text2: "Classification of animals",
      img: "/assets/students/Slide 33/100.png",
      link: "#",
    },
    {
      text1: "GAME 7",
      text2: "Life cycle of a butterfly",
      img: "/assets/students/Slide 33/101.png",
      link: "#",
    },
    {
      text1: "GAME 8",
      text2: "Our digestive system",
      img: "/assets/students/Slide 33/102.png",
      link: "#",
    },
    {
      text1: "GAME 9",
      text2: "Push or Pull",
      img: "/assets/students/Slide 33/103.png",
      link: "#",
    },
    {
      text1: "GAME 10",
      text2: "Solar System",
      img: "/assets/students/Slide 33/104.png",
      link: "#",
    },
  ];

  return (
    <div className="relative w-screen h-screen overflow-hidden pt-20">
      {/* Header với MATH GAME TIME */}
      <div className="w-full flex justify-center">
        <img
          src="/assets/students/Slide 33/94.png"
          alt="Math Game Time"
          className="object-contain h-35"
        />
      </div>

      {/* Grid 2 hàng x 5 cột */}
      <div className="grid grid-cols-5 gap-8 max-w-7xl mx-auto mt-15">
        {listgames.map((game, index) => (
          <a
            key={index}
            href={game.link}
            className="group flex flex-col items-center gap-3 transition duration-300 ease-in-out hover:scale-105"
          >
            {/* Icon/Image */}
            <div className="w-40 h-32 flex items-center justify-center">
              <img
                src={game.img}
                alt={game.text2}
                className="w-full h-full object-contain transition duration-300 group-hover:scale-110"
              />
            </div>

            {/* Text */}
            <div className="text-center mx-2">
              <p className="text-lg font-bold primary-text-color mb-1">
                {game.text1}
              </p>
              <p className="text-base font-semibold primary-text-color mx-4">
                {game.text2}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
