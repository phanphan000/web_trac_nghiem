import { useNavigate, useParams } from "react-router-dom";
import ValueCard from "@/components/ValueCard";

export default function TopicList() {
  const navigate = useNavigate();
  const { id } = useParams();

  const topics = [
    {
      id: "numbers",
      text: "NUMBERS",
      text1: "Place Value",
      text2: "Positive & Negative",
      text3: "Fractions",
      text4: "Number Pattern",
      img: "/assets/students/Slide 22/46.png",
      img1: "/assets/students/Slide 22/52.png",
      img2: "/assets/students/Slide 22/53.png",
      img3: "/assets/students/Slide 22/54.png",
      img4: "/assets/students/Slide 22/55.png",
      link1: "#",
      link2: "#",
      link3: "#",
      link4: "#",
    },
    {
      id: "operations",
      text: "OPERATIONS",
      text1: "Addition",
      text2: "Subtraction",
      text3: "Multiplication",
      text4: "Division",
      img: "/assets/students/Slide 23/47.png",
      img1: "/assets/students/Slide 23/56.png",
      img2: "/assets/students/Slide 23/57.png",
      img3: "/assets/students/Slide 23/58.png",
      img4: "/assets/students/Slide 23/59.png",
      link1: "#",
      link2: "#",
      link3: "#",
      link4: "#",
    },
    {
      id: "geometry",
      text: "GEOMETRY",
      text1: "2D Shapes",
      text2: "3D Shapes",
      text3: "Symmetry",
      text4: "Angle",
      img: "/assets/students/Slide 24/60.png",
      img1: "/assets/students/Slide 24/61.png",
      img2: "/assets/students/Slide 24/62.png",
      img3: "/assets/students/Slide 24/63.png",
      img4: "/assets/students/Slide 24/64.png",
      link1: "#",
      link2: "#",
      link3: "#",
      link4: "#",
    },
    {
      id: "data",
      text: "HANDLING DATA",
      text1: "Bar graph",
      text2: "Venn Diagram",
      text3: "Caroll Diagram",
      text4: "Frequency Table",
      img: "/assets/students/Slide 25/65.png",
      img1: "/assets/students/Slide 25/66.png",
      img2: "/assets/students/Slide 25/67.png",
      img3: "/assets/students/Slide 25/68.png",
      img4: "/assets/students/Slide 25/69.png",
      link1: "#",
      link2: "#",
      link3: "#",
      link4: "#",
    },
    {
      id: "measurement",
      text: "MEASUREMENT",
      text1: "Perimeter",
      text2: "Area",
      text3: "Length",
      text4: "Mass",
      img: "/assets/students/Slide 26/70.png",
      img1: "/assets/students/Slide 26/71.png",
      img2: "/assets/students/Slide 26/72.png",
      img3: "/assets/students/Slide 26/73.png",
      img4: "/assets/students/Slide 26/74.png",
      link1: "#",
      link2: "#",
      link3: "#",
      link4: "#",
    },
    {
      id: "logical",
      text: "LOGICAL THINKING",
      text1: "Arithmetic",
      text2: "Geometry",
      text3: "Number Theory",
      text4: "Combinatorics",
      img: "/assets/students/Slide 27/75.png",
      img1: "/assets/students/Slide 27/76.png",
      img2: "/assets/students/Slide 27/77.png",
      img3: "/assets/students/Slide 27/78.png",
      img4: "/assets/students/Slide 27/79.png",
      link1: "#",
      link2: "#",
      link3: "#",
      link4: "#",
    },
  ];

  const cards = [1, 2, 3, 4];

  const topic = topics.find((t) => t.id === id);

  if (!topic) {
    return (
      <div className="text-center mt-10 text-red-600 font-semibold">
        Chủ đề không tồn tại hoặc sai đường dẫn.
      </div>
    );
  }
  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-orange-50 to-orange-100 px-10 md:px-0 lg:px-4 md:pr-8 lg:pr-0 mt-6 md:mt-0 ">
      {/* Header */}
      <div className="w-full flex justify-center">
        <img
          src="/assets/students/Slide 29/80.png"
          alt="Math Game Time"
          className="object-contain h-20 md:h-35"
        />
      </div>

      {/* Nội dung */}
      <div className="flex flex-col md:flex-row w-full md:mt-5 gap-5 md:gap-0">
        {/* Bên trái: ảnh */}
        <div className="md:w-3/7 flex flex-col items-center justify-center">
          <img
            src={topic.img}
            alt={topic.text}
            className="w-40 md:w-auto scale-90 md:scale-80"
          />
          <p className="text-center text-2xl md:text-4xl primary-text-color mt-0">
            {topic.text}
          </p>
        </div>

        {/* Bên phải: grid card */}
        <div className="md:w-4/7 grid grid-cols-2 gap-6 md:gap-8 justify-items-center lg:mx-25">
          {cards.map((i) => (
            <ValueCard
              key={`${id}-${i}`}
              img={topic[`img${i}`]}
              text={topic[`text${i}`]}
              link={topic[`link${i}`]}
              navigate={navigate}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
