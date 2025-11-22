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
    <div className="flex flex-col items-center pt-30">
      {/* Header */}
      <div className="inline-flex items-center justify-center">
        <img
          src="/assets/students/Slide 47/156.png"
          alt="Infor Game Time"
          className="object-contain h-35"
        />
      </div>
      <div className="flex flex-wrap justify-between max-w-7xl mx-auto gap-y-8 mt-15">
        {lists.map((list, index) => (
          <div
            key={index}
            onClick={() => navigate(`/subjects/informatics/quiz/${list.id}`)}
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
