import React from "react";
import { useNavigate } from "react-router-dom";

const gameData = [
  {
    subject: "math",
    img: "/assets/students/Slide 29/80.png",
    link: "/subjects/math/game",

    topics: [
      {
        id: 1,
        name: "Place value",
        image: "/assets/students/Slide 29/81.png",
        link: "#",
      },
      {
        id: 2,
        name: "Addition & Subtraction",
        image: "/assets/students/Slide 29/82.png",
        link: "#",
      },
      {
        id: 3,
        name: "Multiplication",
        image: "/assets/students/Slide 29/83.png",
        link: "#n",
      },
      {
        id: 4,
        name: "Division",
        image: "/assets/students/Slide 29/84.png",
        link: "#a",
      },
      {
        id: 5,
        name: "Time",
        image: "/assets/students/Slide 29/85.png",
        link: "#a",
      },
      {
        id: 6,
        name: "Triangle",
        image: "/assets/students/Slide 29/86.png",
        link: "#a",
      },
      {
        id: 7,
        name: "Symmetry",
        image: "/assets/students/Slide 29/87.png",
        link: "#a",
      },
      {
        id: 8,
        name: "2D Shapes",
        image: "/assets/students/Slide 29/88.png",
        link: "#a",
      },
      {
        id: 9,
        name: "3D Shapes",
        image: "/assets/students/Slide 29/89.png",
        link: "#a",
      },
      {
        id: 10,
        name: "Data Handling",
        image: "/assets/students/Slide 29/90.png",
        link: "#a",
      },
    ],
  },
  {
    subject: "informatics",
    img: "/assets/students/Slide 45/145.png",
    link: "/subjects/informatics/game",
    topics: [
      {
        id: 11,
        name: "Phần cứng máy tính",
        image: "/assets/students/Slide 45/146.png",
        link: "#",
      },
      {
        id: 12,
        name: "Phần mềm máy tính",
        image: "/assets/students/Slide 45/147.png",
        link: "#",
      },
      {
        id: 13,
        name: "Bảo vệ thông tin cá nhân",
        image: "/assets/students/Slide 45/148.png",
        link: "#",
      },
      {
        id: 14,
        name: "Sử dụng công nghệ",
        image: "/assets/students/Slide 45/149.png",
        link: "#",
      },
      {
        id: 15,
        name: "WordArt, Send to Back, Bring to front",
        image: "/assets/students/Slide 45/150.png",
        link: "#",
      },
      {
        id: 16,
        name: "Hiệu ứng Animations",
        image: "/assets/students/Slide 45/151.png",
        link: "#",
      },
      {
        id: 17,
        name: "Hiệu ứng Transition",
        image: "/assets/students/Slide 45/152.png",
        link: "#",
      },
      {
        id: 18,
        name: "Lập trình Scratch",
        image: "/assets/students/Slide 45/153.png",
        link: "#",
      },
      {
        id: 19,
        name: "Làm quen với bảng tính",
        image: "/assets/students/Slide 45/154.png",
        link: "#",
      },
      {
        id: 120,
        name: "Thu thập và tìm kiếm thông tin",
        image: "/assets/students/Slide 45/155.png",
        link: "#",
      },
    ],
  },
  {
    subject: "science",
    img: "/assets/students/Slide 33/94.png",
    link: "/subjects/science/game",
    topics: [
      {
        id: 21,
        name: "Living things and Non-living things",
        image: "/assets/students/Slide 33/95.png",
        link: "#y",
      },
      {
        id: 22,
        name: "Characteristic of living things",
        image: "/assets/students/Slide 33/96.png",
        link: "#oc",
      },
      {
        id: 23,
        name: "Different types of plants",
        image: "/assets/students/Slide 33/97.png",
        link: "#hoc",
      },
      {
        id: 24,
        name: "Parts of a plants and their functions",
        image: "/assets/students/Slide 33/98.png",
        link: "#-van",
      },
      {
        id: 25,
        name: "Life cycle of a flowering plant",
        image: "/assets/students/Slide 33/99.png",
        link: "#",
      },
      {
        id: 26,
        name: "Classification of animals",
        image: "/assets/students/Slide 33/100.png",
        link: "#",
      },
      {
        id: 27,
        name: "Life cycle of a butterfly",
        image: "/assets/students/Slide 33/101.png",
        link: "#",
      },
      {
        id: 28,
        name: "Our digestive system",
        image: "/assets/students/Slide 33/102.png",
        link: "#",
      },
      {
        id: 29,
        name: "Push or Pull",
        image: "/assets/students/Slide 33/103.png",
        link: "#",
      },
      {
        id: 30,
        name: "Solar System",
        image: "/assets/students/Slide 33/104.png",
        link: "#",
      },
    ],
  },
];

const GamePage = () => {
  const navigate = useNavigate();

  const handleTopicClick = (subject, link) => {
    navigate(`/subjects/${subject}/game/${link}`);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center pt-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          🎮 Game Học Tập
        </h1>

        <div className="space-y-5">
          {gameData.map((subject, index) => (
            <div key={index} className="rounded-2xl shadow-lg overflow-hidden">
              <div className="flex flex-col md:flex-row max-h-[180px] overflow-hidden">
                {/* Phần 1: Tên môn học */}
                <div
                  className="md:w-48 bg-[#ffecca] px-6 flex flex-col items-center justify-center text-white"
                  onClick={() => navigate(subject.link)}
                >
                  <img src={subject.img} alt={subject.subject} />
                  <div className="mt-4 text-sm primary-text-color">
                    {subject.topics.length} chủ đề
                  </div>
                </div>

                {/* Phần 2: Grid các chủ đề */}
                <div className="w-full flex-1 p-2 h-[180px] overflow-hidden">
                  <div className="grid grid-cols-5 gap-2">
                    {subject.topics.map((topic) => (
                      <div
                        key={topic.id}
                        onClick={() =>
                          handleTopicClick(subject.subject, topic.link)
                        }
                        className="group cursor-pointer hover:scale-105 transition-transform duration-200"
                      >
                        <div className="bg-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md h-[80px] flex items-center justify-center">
                          <img
                            src={topic.image}
                            alt={topic.name}
                            className=" w-[50px] h-[50px] object-cover"
                          />
                          <div className="p-1 primary-text-color">
                            <h3 className="text-center text-xs font-medium group-hover:text-[var(--color-secondary)]">
                              {topic.name}
                            </h3>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GamePage;
