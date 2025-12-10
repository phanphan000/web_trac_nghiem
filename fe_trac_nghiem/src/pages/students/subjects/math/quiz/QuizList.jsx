import { useNavigate } from "react-router-dom";

export default function MathQuizList() {
  const navigate = useNavigate();

  const lists = [
    { id: "numbers", text: "NUMBERS", img: "/assets/students/Slide 21/46.png" },
    {
      id: "operations",
      text: "OPERATIONS",
      img: "/assets/students/Slide 21/47.png",
    },
    {
      id: "geometry",
      text: "GEOMETRY",
      img: "/assets/students/Slide 21/48.png",
    },
    {
      id: "data",
      text: "HANDLING DATA",
      img: "/assets/students/Slide 21/49.png",
    },
    {
      id: "measurement",
      text: "MEASUREMENT",
      img: "/assets/students/Slide 21/50.png",
    },
    {
      id: "logical",
      text: "LOGICAL THINKING",
      img: "/assets/students/Slide 21/51.png",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {/* Header */}
      <div className="w-full flex justify-center">
        <img
          src="/assets/students/Slide 21/45.png"
          alt="Math Game Time"
          className="object-contain h-20 md:h-32"
        />
      </div>

      {/* Grid responsive */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10  max-w-7xl mx-auto mt-3 md:mt-10">
        {lists.map((list, index) => (
          <div
            key={index}
            onClick={() => navigate(`/subjects/math/quiz/${list.id}`)}
            className="group flex flex-col items-center gap-3 transition duration-300 ease-in-out hover:scale-105 cursor-pointer lg:mx-10"
          >
            {/* Icon/Image */}
            <div className="w-28 h-24 md:w-40 md:h-32 flex items-center justify-center">
              <img
                src={list.img}
                alt={list.text}
                className="w-full h-full object-contain transition duration-300 group-hover:scale-110"
              />
            </div>

            {/* Text */}
            <div className="text-center">
              <p className="text-sm md:text-lg font-bold primary-text-color mb-1">
                {list.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
