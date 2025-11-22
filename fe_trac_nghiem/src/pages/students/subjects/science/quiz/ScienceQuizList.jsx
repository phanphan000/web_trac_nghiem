import { useNavigate } from "react-router-dom";

export default function MathQuizList() {
  const navigate = useNavigate();

  const lists = [
    {
      id: "living",
      text: "LIVING THINGS",
      img: "/assets/students/Slide 35/106.png",
    },
    {
      id: "human",
      text: "HUMAN BODY",
      img: "/assets/students/Slide 35/107.png",
    },
    {
      id: "matter",
      text: "MATTER & MATERIALS",
      img: "/assets/students/Slide 35/108.png",
    },
    {
      id: "forces",
      text: "FORCES, ENERGY & MOTION",
      img: "/assets/students/Slide 35/109.png",
    },
    {
      id: "earth",
      text: "EARTH & SPACES",
      img: "/assets/students/Slide 35/110.png",
    },
    {
      id: "environment",
      text: "ENVIRONMENT",
      img: "/assets/students/Slide 35/111.png",
    },
  ];

  return (
    <div className="flex flex-col items-center pt-30">
      {/* Header */}
      <div className="inline-flex items-center justify-center">
        <img
          src="/assets/students/Slide 35/105.png"
          alt="Infor Game Time"
          className="object-contain h-35"
        />
      </div>
      <div className="flex flex-wrap justify-between max-w-7xl mx-auto gap-y-8 mt-15">
        {lists.map((list, index) => (
          <div
            key={index}
            onClick={() => navigate(`/subjects/science/quiz/${list.id}`)}
            className="w-[30%] min-w-[200px] group flex flex-col items-center gap-3 mb-5 transition duration-300 ease-in-out hover:scale-105"
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
