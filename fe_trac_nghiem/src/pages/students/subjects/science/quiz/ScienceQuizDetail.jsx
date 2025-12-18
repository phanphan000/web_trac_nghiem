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
          link: "/subjects/science/quiz/living/generate?sub=animals",
        },
        {
          text: "Plants",
          img: "/assets/students/Slide 36/114.png",
          link: "/subjects/science/quiz/living/generate?sub=plants",
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
          link: "/subjects/science/quiz/human/generate?sub=digestive-system",
        },
        {
          text: "Circulatory System",
          img: "/assets/students/Slide 37/117.png",
          link: "/subjects/science/quiz/human/generate?sub=circulatory-system",
        },
        {
          text: "Respiratory System",
          img: "/assets/students/Slide 37/118.png",
          link: "/subjects/science/quiz/human/generate?sub=respiratory-system",
        },
        {
          text: "Nervous System",
          img: "/assets/students/Slide 37/119.png",
          link: "/subjects/science/quiz/human/generate?sub=nervous-system",
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
          link: "/subjects/science/quiz/matter/generate?sub=states-of-matter",
        },
        {
          text: "Changing Materials",
          img: "/assets/students/slide 38/122.png",
          link: "/subjects/science/quiz/matter/generate?sub=changing-materials",
        },
        {
          text: "Mixtures",
          img: "/assets/students/slide 38/123.png",
          link: "/subjects/science/quiz/matter/generate?sub=mixtures",
        },
        {
          text: "Physical and chemical changes",
          img: "/assets/students/slide 38/124.png",
          link: "/subjects/science/quiz/matter/generate?sub=physical-and-chemical-changes",
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
          link: "/subjects/science/quiz/forces/generate?sub=types-of-forces",
        },
        {
          text: "Simple machines",
          img: "/assets/students/Slide 39/128.png",
          link: "/subjects/science/quiz/forces/generate?sub=simple-machines",
        },
        {
          text: "Sources and forms of energy",
          img: "/assets/students/Slide 39/129.png",
          link: "/subjects/science/quiz/forces/generate?sub=sources-and-forms-of-energy",
        },
        {
          text: "Energy transfer and conservation",
          img: "/assets/students/Slide 39/130.png",
          link: "/subjects/science/quiz/forces/generate?sub=energy-transfer-and-conservation",
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
          link: "/subjects/science/quiz/earth/generate?sub=the-solar-system",
        },
        {
          text: "Day and night, shadows, and seasons",
          img: "/assets/students/Slide 40/133.png",
          link: "/subjects/science/quiz/earth/generate?sub=day-night-shadows-seasons",
        },
        {
          text: "The water cycle",
          img: "/assets/students/Slide 40/134.png",
          link: "/subjects/science/quiz/earth/generate?sub=the-water-cycle",
        },
        {
          text: "Weather and climate",
          img: "/assets/students/Slide 40/135.png",
          link: "/subjects/science/quiz/earth/generate?sub=weather-and-climate",
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
          link: "/subjects/science/quiz/environment/generate?sub=natural-resources-and-their-uses",
        },
        {
          text: "Renewable vs non-renewable energy",
          img: "/assets/students/Slide 41/138.png",
          link: "/subjects/science/quiz/environment/generate?sub=renewable-vs-non-renewable-energy",
        },
        {
          text: "Pollution and waste management",
          img: "/assets/students/Slide 41/139.png",
          link: "/subjects/science/quiz/environment/generate?sub=pollution-and-waste-management",
        },
        {
          text: "Human impact on the environment",
          img: "/assets/students/Slide 41/140.png",
          link: "/subjects/science/quiz/environment/generate?sub=human-impact-on-the-environment",
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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-orange-50 to-orange-100 px-4 md:px-0 mt-12 md:mt-0">
      {/* Header */}
      <div className="inline-flex items-center justify-center mb-3 md:mb-0">
        <img
          src="/assets/students/Slide 35/105.png"
          alt="Infor Game Time"
          className="object-contain h-20 md:h-30"
        />
      </div>

      {/* Nội dung */}
      <div className="flex flex-col md:flex-row items-center w-full md:mt-5 gap-10 md:gap-0">
        {/* Bên trái: ảnh chiếm 3/7 */}
        <div className="md:w-3/7 flex flex-col items-center justify-center">
          <img
            src={topic.img}
            alt={topic.text}
            className="w-40 md:w-auto scale-90 md:scale-75"
          />
          <p className="text-center text-2xl md:text-3xl primary-text-color mx-4 md:mx-10 mt-4 md:mt-0">
            {topic.text}
          </p>
        </div>

        {/* Bên phải: card */}
        <div
          className={`md:w-4/7 ${
            topic.cards.length === 2
              ? "flex flex-row justify-center gap-6 md:gap-10 items-center"
              : "grid grid-cols-2 gap-6 lg:gap-8 justify-items-center"
          } mx-0 md:mx-10 lg:mx-20`}
        >
          {topic.cards.map((card, index) => (
            <div className="text-xs md:text-sm scale-95 md:scale-90 max-w-[160px] md:max-w-[300px]">
              <ValueCard
                key={`${id}-${index}`}
                img={card.img}
                text={card.text}
                link={card.link}
                navigate={navigate}
                className="w-32 h-20 md:w-45 md:h-25"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
