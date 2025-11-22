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
      <div className="text-center text-red-500 text-2xl">
        Lỗi lấy method trong môn học!!!
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center  p-8 min-h-screen pt-22">
      <div className="w-full overflow-hidden flex justify-center">
        <img
          src={subject.img1}
          alt="ảnh slide 17"
          className="object-contain w-[70%]"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[subject.img2, subject.img3, subject.img4].map((img, index) => (
          <div
            key={method[index]}
            className="flex flex-col items-center gap-10 mb-5 mx-5"
          >
            <img
              src={img}
              alt={`${subject.id}-${method[index]}`}
              className="w-90 object-contain hover:scale-105 transition-transform duration-200"
            />
            <OrangeButton
              text={method[index]}
              link={`/subjects/${subject.id}/${method[index].toLowerCase()}`}
            />{" "}
          </div>
        ))}
      </div>
    </div>
  );
}
