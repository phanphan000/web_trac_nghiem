import { useNavigate, useParams } from "react-router-dom";
import ValueCard from "@/components/ValueCard";

export default function TopicList() {
  const navigate = useNavigate();
  const { id } = useParams();

  const topics = [
    {
      id: "living",
      text: "LIVING THINGS",
      img: "/assets/students/Slide 36/112.png",
      cards: [
        {
          text: "Animals",
          img: "/assets/students/Slide 36/113.png",
          link: "#",
        },
        {
          text: "Plants",
          img: "/assets/students/Slide 36/114.png",
          link: "#",
        },
      ],
    },
    {
      id: "human",
      text: "HUMAN BODY",
      img: "/assets/students/Slide 37/115.png",
      cards: [
        {
          text: "Digestive System",
          img: "/assets/students/Slide 37/116.png",
          link: "#",
        },
        {
          text: "Circulatory System",
          img: "/assets/students/Slide 37/117.png",
          link: "#",
        },
        {
          text: "Respiratory System",
          img: "/assets/students/Slide 37/118.png",
          link: "#",
        },
        {
          text: "Nervous System",
          img: "/assets/students/Slide 37/119.png",
          link: "#",
        },
      ],
    },
    {
      id: "matter",
      text: "MATTER AND MATERIALS",
      img: "/assets/students/slide 38/120.png",
      cards: [
        {
          text: "States of matter",
          img: "/assets/students/slide 38/121.png",
          link: "#",
        },
        {
          text: "Changing Materials",
          img: "/assets/students/slide 38/122.png",
          link: "#",
        },
        {
          text: "Mixtures",
          img: "/assets/students/slide 38/123.png",
          link: "#",
        },
        {
          text: "Physical and chemical changes",
          img: "/assets/students/slide 38/124.png",
          link: "#",
        },
      ],
    },
    {
      id: "forces",
      text: "FORCES, ENERGY, AND MOTION",
      img: "/assets/students/Slide 39/126.png",
      cards: [
        {
          text: "Types of forces",
          img: "/assets/students/Slide 39/127.png",
          link: "#",
        },
        {
          text: "Simple machines",
          img: "/assets/students/Slide 39/128.png",
          link: "#",
        },
        {
          text: "Sources and forms of energy",
          img: "/assets/students/Slide 39/129.png",
          link: "#",
        },
        {
          text: "Energy transfer and conservation ",
          img: "/assets/students/Slide 39/130.png",
          link: "#",
        },
      ],
    },
    {
      id: "earth",
      text: "EARTH AND SPACE",
      img: "/assets/students/Slide 40/131.png",
      cards: [
        {
          text: "The Solar System",
          img: "/assets/students/Slide 40/132.png",
          link: "#",
        },
        {
          text: "Day and night, shadows, and seasons",
          img: "/assets/students/Slide 40/133.png",
          link: "#",
        },
        {
          text: "The water cycle",
          img: "/assets/students/Slide 40/134.png",
          link: "#",
        },
        {
          text: "Weather and climate",
          img: "/assets/students/Slide 40/135.png",
          link: "#",
        },
      ],
    },
    {
      id: "environment",
      text: "ENVIRONMENT",
      img: "/assets/students/Slide 41/136.png",
      cards: [
        {
          text: "Natural resources and their uses",
          img: "/assets/students/Slide 41/137.png",
          link: "#",
        },
        {
          text: "Renewable vs non-renewable energy",
          img: "/assets/students/Slide 41/138.png",
          link: "#",
        },
        {
          text: "Pollution and waste management",
          img: "/assets/students/Slide 41/139.png",
          link: "#",
        },
        {
          text: "Human impact on the environment",
          img: "/assets/students/Slide 41/140.png",
          link: "#",
        },
      ],
    },
  ];

  const topic = topics.find((t) => t.id === id);

  if (!topic) {
    return (
      <div className="text-center mt-10 text-red-600 font-semibold">
        Chủ đề không tồn tại hoặc sai đường dẫn.
      </div>
    );
  }
  return (
    <div className="min-h-screen flex flex-col items-center pt-30 bg-gradient-to-b from-orange-50 to-orange-100">
      {/* Header */}
      <div className="inline-flex items-center justify-center">
        <img
          src="/assets/students/Slide 35/105.png"
          alt="Infor Game Time"
          className="object-contain h-30"
        />
      </div>

      <div className="flex w-full px-8 mt-15">
        {/* Bên trái: ảnh chiếm 3/7 */}
        <div className="w-3/7 flex flex-col items-center">
          <img src={topic.img} alt={topic.text} className="scale-75" />
          <p className="text-center text-3xl primary-text-color mx-10">
            {topic.text}
          </p>
        </div>

        {/* Bên phải: 4 phần tử chia 2 hàng */}
        <div
          className={`w-4/7 ${
            topic.cards.length === 2
              ? "flex flex-row justify-center gap-10 items-center"
              : "grid grid-cols-2 gap-8 justify-items-center"
          } mx-20`}
        >
          {topic.cards.map((card, index) => (
            <div className="text-sm scale-90 max-w-[300px]">
              <ValueCard
                key={`${id}-${index}`}
                img={card.img}
                text={card.text}
                link={card.link}
                navigate={navigate}
                className="w-45 h-25"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
