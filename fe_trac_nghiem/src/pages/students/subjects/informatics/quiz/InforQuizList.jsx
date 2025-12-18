import { useNavigate } from "react-router-dom";

export default function MathQuizList() {
  const navigate = useNavigate();

  const lists = [
    {
      id: "1",
      text: "Máy tính và em",
      img: "/assets/students/Slide 47/157.png",
    },
    {
      id: "2",
      text: "Đạo đức, pháp luật trong môi trường số",
      img: "/assets/students/Slide 47/158.png",
    },
    {
      id: "3",
      text: "Lưu trữ, tìm kiếm thông tin",
      img: "/assets/students/Slide 47/159.png",
    },
    {
      id: "4",
      text: "Ứng dụng tin học",
      img: "/assets/students/Slide 47/160.png",
    },
    {
      id: "5",
      text: "Lập trình Scratch",
      img: "/assets/students/Slide 47/161.png",
    },
    {
      id: "6",
      text: "Lập trình Swift PlayGround",
      img: "/assets/students/Slide 47/162.png",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {/* Header */}
      <div className="w-full flex justify-center mt-10 md:mt-0">
        <img
          src="/assets/students/Slide 47/156.png"
          alt="Math Game Time"
          className="object-contain h-20 md:h-32"
        />
      </div>

      {/* Grid responsive */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10  max-w-7xl mx-auto mt-3 md:mt-10">
        {lists.map((list, index) => (
          <div
            key={index}
            onClick={() => navigate(`/subjects/informatics/quiz/${list.id}`)}
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
