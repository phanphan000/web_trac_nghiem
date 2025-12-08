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
    <div className="flex flex-col items-center p-4 sm:p-6 lg:p-8 justify-center min-h-screen pt-16 sm:pt-24 lg:pt-30">
      <h1 className="text-2xl sm:text-4xl lg:text-6xl mb-4 text-center">
        HÔM NAY BẠN MUỐN HỌC GÌ?
      </h1>

      <div className="grid grid-cols-3 md:grid-cols-3 gap-0 lg:gap-12 mt-10 w-full max-w-7xl">
        {subjects.map((subject) => (
          <div
            key={subject.id}
            onClick={() => navigate(`/subjects/${subject.id}`)}
            className="flex flex-col items-center gap-6 sm:gap-8 lg:gap-10 m-2 sm:m-4 cursor-pointer"
          >
            <img
              src={subject.image}
              alt={subject.name}
              className="w-40 sm:w-56 lg:w-72 object-contain hover:scale-105 transition-transform duration-200"
            />
            <OrangeButton
              text={subject.name}
              link={`/subjects/${subject.id}`}
              className="w-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
