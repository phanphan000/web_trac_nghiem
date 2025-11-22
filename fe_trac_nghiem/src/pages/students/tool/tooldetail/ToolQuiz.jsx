import React from "react";
import { useNavigate } from "react-router-dom";

const quizData = [
  {
    subject: "math",
    img: "/assets/students/Slide 21/45.png",
    link: "/subjects/math/quiz",
    topics: [
      {
        id: 1,
        name: "NUMBERS",
        image: "/assets/students/Slide 21/46.png",
        link: "numbers",
      },
      {
        id: 2,
        name: "OPERATIONS",
        image: "/assets/students/Slide 21/47.png",
        link: "operations",
      },
      {
        id: 3,
        name: "GEOMETRY",
        image: "/assets/students/Slide 21/48.png",
        link: "geometry",
      },
      {
        id: 4,
        name: "HANDLING DATA",
        image: "/assets/students/Slide 21/49.png",
        link: "data",
      },
      {
        id: 5,
        name: "MEASUREMENT",
        image: "/assets/students/Slide 21/50.png",
        link: "measurement",
      },
      {
        id: 6,
        name: "LOGICAL THINKING",
        image: "/assets/students/Slide 21/51.png",
        link: "logical",
      },
    ],
  },
  {
    subject: "informatics",
    img: "/assets/students/Slide 47/156.png",
    link: "/subjects/informatics/quiz",
    topics: [
      {
        id: 7,
        name: "Máy tính và em",
        image: "/assets/students/Slide 47/157.png",
        link: "1",
      },
      {
        id: 8,
        name: "Đạo đức, pháp luật trong môi trường số",
        image: "/assets/students/Slide 47/158.png",
        link: "2",
      },
      {
        id: 9,
        name: "Lưu trữ, tìm kiếm thông tin",
        image: "/assets/students/Slide 47/159.png",
        link: "3",
      },
      {
        id: 10,
        name: "Ứng dụng tin học",
        image: "/assets/students/Slide 47/160.png",
        link: "4",
      },
      {
        id: 11,
        name: "Lập trình Scratch",
        image: "/assets/students/Slide 47/161.png",
        link: "5",
      },
      {
        id: 12,
        name: "Lập trình Swift PlayGround",
        image: "/assets/students/Slide 47/162.png",
        link: "6",
      },
    ],
  },
  {
    subject: "science",
    img: "/assets/students/Slide 35/105.png",
    link: "/subjects/science/quiz",
    topics: [
      {
        id: 13,
        name: "LIVING THINGS",
        image: "/assets/students/Slide 35/106.png",
        link: "living",
      },
      {
        id: 14,
        name: "HUMAN BODY",
        image: "/assets/students/Slide 35/107.png",
        link: "hunman",
      },
      {
        id: 15,
        name: "MATTER & MATERIALS",
        image: "/assets/students/Slide 35/108.png",
        link: "matter",
      },
      {
        id: 16,
        name: "FORCES, ENERGY & MOTION",
        image: "/assets/students/Slide 35/109.png",
        link: "forces",
      },
      {
        id: 17,
        name: "EARTH & SPACES",
        image: "/assets/students/Slide 35/110.png",
        link: "earth",
      },
      {
        id: 18,
        name: "ENVIRONMENT",
        image: "/assets/students/Slide 35/111.png",
        link: "environment",
      },
    ],
  },
];

const QuizPage = () => {
  const navigate = useNavigate();

  const handleTopicClick = (subject, link) => {
    navigate(`/subjects/${subject}/quiz/${link}`);
  };

  return (
    <div className="min-h-screen flex flex-col justify-center pt-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
          🧠 Quiz Học Tập
        </h1>

        <div className="space-y-5">
          {quizData.map((subject, index) => (
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
                  <div className="grid grid-cols-3 gap-2">
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

export default QuizPage;
