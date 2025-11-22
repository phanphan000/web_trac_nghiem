import { useNavigate } from "react-router-dom";

export default function MathQuizList() {
  const navigate = useNavigate();

  const lists = [
    {
      id: "numbers",
      text: "NUMBERS",
      img: "/assets/students/Slide 21/46.png",
    },
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
    <div className="min-h-screen flex flex-col items-center pt-30">
      {/* Header */}
      <div className="w-full flex justify-center">
        <img
          src="/assets/students/Slide 21/45.png"
          alt="Math Game Time"
          className="object-contain scale-75"
        />
      </div>
      <div className="flex flex-wrap justify-between max-w-7xl mx-auto gap-y-8 mt-10">
        {lists.map((list, index) => (
          <div
            key={index}
            onClick={() => navigate(`/subjects/math/quiz/${list.id}`)}
            className="w-[30%] min-w-[200px] group flex flex-col items-center gap-3 transition duration-300 ease-in-out hover:scale-105"
          >
            {/* Icon/Image */}
            <div className="w-45 h-32 flex items-center justify-center">
              <img
                src={list.img}
                alt={list.text}
                className="w-full h-full object-contain transition duration-300 group-hover:scale-110"
              />
            </div>

            {/* Text */}
            <div className="text-center">
              <p className="text-lg font-bold primary-text-color mb-1">
                {list.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
