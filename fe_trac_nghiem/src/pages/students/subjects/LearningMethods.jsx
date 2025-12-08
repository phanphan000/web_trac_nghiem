import React from "react";
import { useParams } from "react-router-dom";
import OrangeButton from "@/components/OrangeButton";

const subjects = [
  {
    id: "math",
    img1: "/assets/students/Slide 17/45.png",
    img2: "/assets/students/Slide 17/191.png",
    img3: "/assets/students/Slide 17/192.png",
    img4: "/assets/students/Slide 17/193.png",
  },
  {
    id: "science",
    img1: "/assets/students/Slide 18/45.png",
    img2: "/assets/students/Slide 18/194.png",
    img3: "/assets/students/Slide 18/195.png",
    img4: "/assets/students/Slide 18/196.png",
  },
  {
    id: "informatics",
    img1: "/assets/students/slide 19/45.png",
    img2: "/assets/students/slide 19/197.png",
    img3: "/assets/students/slide 19/198.png",
    img4: "/assets/students/slide 19/199.png",
  },
];
const method = ["Quiz", "Game", "Music"];

export default function LearningMethods() {
  const { subjectId } = useParams();
  const subject = subjects.find((m) => m.id === subjectId);

  if (!subject) {
    return (
      <div className="text-center text-red-500 text-xl sm:text-2xl">
        Lỗi lấy method trong môn học!!!
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 lg:p-10">
      {/* Ảnh đầu */}
      <div className="w-full flex justify-center mb-6 sm:mb-10">
        <img
          src={subject.img1}
          alt="ảnh slide 17"
          className="object-contain w-3/4 sm:w-2/3 lg:w-1/2"
        />
      </div>

      {/* Grid các method */}
      <div className="grid grid-cols-3 md:grid-cols-3 gap-0 lg:gap-12 w-full max-w-6xl">
        {[subject.img2, subject.img3, subject.img4].map((img, index) => (
          <div
            key={method[index]}
            className="flex flex-col items-center gap-6 sm:gap-8 lg:gap-10 mb-6 sm:mb-8 lg:mb-10 mx-2 sm:mx-4"
          >
            <img
              src={img}
              alt={`${subject.id}-${method[index]}`}
              className="w-40 sm:w-56 lg:w-72 object-contain hover:scale-105 transition-transform duration-200"
            />
            <OrangeButton
              text={method[index]}
              link={`/subjects/${subject.id}/${method[index].toLowerCase()}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
