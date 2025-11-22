import React from "react";
import { useNavigate } from "react-router-dom";

const musicData = [
  {
    subject: "math",
    img: "/assets/students/Slide 31/91.png",
    link: "/subjects/math/music",
    topics: [
      {
        id: 1,
        name: "Place value",
        image: "/assets/students/Slide 31/92.png",
        link: "#",
      },
      {
        id: 2,
        name: "Place value",
        image: "/assets/students/Slide 31/92.png",
        link: "#",
      },
      {
        id: 3,
        name: "Place value",
        image: "/assets/students/Slide 31/92.png",
        link: "#n",
      },
      {
        id: 4,
        name: "Place value",
        image: "/assets/students/Slide 31/92.png",
        link: "#a",
      },
      {
        id: 5,
        name: "Place value",
        image: "/assets/students/Slide 31/92.png",
        link: "#a",
      },
      {
        id: 6,
        name: "Place value",
        image: "/assets/students/Slide 31/92.png",
        link: "#a",
      },
      {
        id: 7,
        name: "Place value",
        image: "/assets/students/Slide 31/92.png",
        link: "#a",
      },
      {
        id: 8,
        name: "Place value",
        image: "/assets/students/Slide 31/92.png",
        link: "#a",
      },
      {
        id: 9,
        name: "Place value",
        image: "/assets/students/Slide 31/92.png",
        link: "#a",
      },
    ],
  },
  {
    subject: "informatics",
    img: "/assets/students/Slide 55/186.png",
    link: "/subjects/informatics/music",
    topics: [
      {
        id: 11,
        name: "Place value",
        image: "/assets/students/Slide 55/189.png",
        link: "#",
      },
      {
        id: 12,
        name: "Place value",
        image: "/assets/students/Slide 55/189.png",
        link: "#",
      },
      {
        id: 13,
        name: "Place value",
        image: "/assets/students/Slide 55/189.png",
        link: "#",
      },
      {
        id: 14,
        name: "Place value",
        image: "/assets/students/Slide 55/189.png",
        link: "#",
      },
      {
        id: 15,
        name: "Place value",
        image: "/assets/students/Slide 55/189.png",
        link: "#",
      },
      {
        id: 16,
        name: "Place value",
        image: "/assets/students/Slide 55/189.png",
        link: "#",
      },
      {
        id: 17,
        name: "Place value",
        image: "/assets/students/Slide 55/189.png",
        link: "#",
      },
      {
        id: 18,
        name: "Place value",
        image: "/assets/students/Slide 55/189.png",
        link: "#",
      },
      {
        id: 19,
        name: "Place value",
        image: "/assets/students/Slide 55/189.png",
        link: "#",
      },
      {
        id: 20,
        name: "Place value",
        image: "/assets/students/Slide 55/189.png",
        link: "#",
      },
    ],
  },
  {
    subject: "science",
    img: "/assets/students/Slide 43/141.png",
    link: "/subjects/science/music",
    topics: [
      {
        id: 21,
        name: "Living things and Non-living things",
        image: "/assets/students/Slide 43/144.png",
        link: "#y",
      },
      {
        id: 22,
        name: "Characteristic of living things",
        image: "/assets/students/Slide 43/144.png",
        link: "#oc",
      },
      {
        id: 23,
        name: "Different types of plants",
        image: "/assets/students/Slide 43/144.png",
        link: "#hoc",
      },
      {
        id: 24,
        name: "Parts of a plants and their functions",
        image: "/assets/students/Slide 43/144.png",
        link: "#-van",
      },
      {
        id: 25,
        name: "Life cycle of a flowering plant",
        image: "/assets/students/Slide 43/144.png",
        link: "#",
      },
      {
        id: 26,
        name: "Classification of animals",
        image: "/assets/students/Slide 43/144.png",
        link: "#",
      },
      {
        id: 27,
        name: "Life cycle of a butterfly",
        image: "/assets/students/Slide 43/144.png",
        link: "#",
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
        <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
          🎧 Music Học Tập
        </h1>

        <div className="space-y-5">
          {musicData.map((subject, index) => (
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

export default QuizPage;
