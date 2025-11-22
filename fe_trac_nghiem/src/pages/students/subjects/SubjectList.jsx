import OrangeButton from "@/components/OrangeButton";
import { useNavigate } from "react-router-dom";
const subjects = [
  {
    id: "math",
    name: "MATH",
    image: "/assets/students/Slide 9/9.1.png",
  },
  {
    id: "science",
    name: "SCIENCE",
    image: "/assets/students/Slide 9/Slide 9.2.png",
  },
  {
    id: "informatics",
    name: "TIN HỌC",
    image: "/assets/students/Slide 9/Slide 9.3.png",
  },
];

export default function SubjectList() {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center p-8 justify-center min-h-screen pt-30">
      <h1 className="text-6xl mb-4">HÔM NAY BẠN MUỐN HỌC GÌ?</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10">
        {subjects.map((subject) => (
          <div
            key={subject.id}
            onClick={() => {
              // Điều hướng đến trang chi tiết môn học
              navigate(`/subjects/${subject.id}`);
            }}
            className="flex flex-col items-center gap-10 m-5"
          >
            <img
              src={subject.image}
              alt={subject.name}
              className="w-90 object-contain hover:scale-105 transition-transform duration-200"
            />
            <OrangeButton
              text={subject.name}
              link={`/subjects/${subject.id}`}
            />{" "}
          </div>
        ))}
      </div>
    </div>
  );
}
