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
    <div className="min-h-screen flex flex-col items-center pt-25 bg-gradient-to-b from-orange-50 to-orange-100">
      {/* Header */}
      <div className="w-full flex justify-center">
        <img
          src="/assets/students/Slide 29/80.png"
          alt="Math Game Time"
          className="object-contain h-35"
        />
      </div>

      <div className="flex w-full px-8 mt-15">
        {/* Bên trái: ảnh chiếm 3/7 */}
        <div className="w-3/7 flex flex-col items-center">
          <img src={topic.img} alt={topic.text} className="scale-80" />
          <p className="text-center text-4xl primary-text-color">
            {topic.text}
          </p>
        </div>

        {/* Bên phải: 4 phần tử chia 2 hàng */}
        <div className="w-4/7 grid grid-cols-2 gap-8 justify-items-center mx-25">
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
