import { useNavigate, useParams } from "react-router-dom";
import ValueCard from "@/components/ValueCard";

export default function TopicList() {
  const navigate = useNavigate();
  const { id } = useParams();

  const topics = [
    {
      id: "1",
      text: "MÁY TÍNH VÀ EM",
      img: "/assets/students/Slide 48/163.png",
      cards: [
        {
          text: "Phần cứng máy tính",
          img: "/assets/students/Slide 48/164.png",
          link: "/subjects/informatics/quiz/1/generate?sub=phan-cung-may-tinh",
        },
        {
          text: "Phần mềm máy tính",
          img: "/assets/students/Slide 48/165.png",
          link: "/subjects/informatics/quiz/1/generate?sub=phan-mem-may-tinh",
        },
      ],
    },
    {
      id: "2",
      text: "ĐẠO ĐỨC, PHÁP LUẬT TRONG MÔI TRƯỜNG SỐ",
      img: "/assets/students/slide 49/166.png",
      cards: [
        {
          text: "Bảo vệ thông tin cá nhân",
          img: "/assets/students/slide 49/167.png",
          link: "/subjects/informatics/quiz/2/generate?sub=bao-ve-thong-tin-ca-nhan",
        },
        {
          text: "Sử dụng công nghệ",
          img: "/assets/students/slide 49/168.png",
          link: "/subjects/informatics/quiz/2/generate?sub=su-dung-cong-nghe",
        },
      ],
    },
    {
      id: "3",
      text: "LƯU TRỮ, TÌM KIẾM THÔNG TIN",
      img: "/assets/students/Slide 50/169.png",
      cards: [
        {
          text: "Lưu trữ thông tin",
          img: "/assets/students/Slide 50/170.png",
          link: "/subjects/informatics/quiz/3/generate?sub=luu-tru-thong-tin",
        },
        {
          text: "Tìm kiếm thông tin",
          img: "/assets/students/Slide 50/171.png",
          link: "/subjects/informatics/quiz/3/generate?sub=tim-kiem-thong-tin",
        },
      ],
    },
    {
      id: "4",
      text: "ỨNG DỤNG TIN HỌC",
      img: "/assets/students/Slide 51/172.png",
      cards: [
        {
          text: "WordArt, Send to Back, Bring to front",
          img: "/assets/students/Slide 51/173.png",
          link: "/subjects/informatics/quiz/4/generate?sub=wordart-send-to-back-bring-to-front",
        },
        {
          text: "Hiệu ứng Animations",
          img: "/assets/students/Slide 51/174.png",
          link: "/subjects/informatics/quiz/4/generate?sub=hieu-ung-animations",
        },
        {
          text: "Hiệu ứng Transition",
          img: "/assets/students/Slide 51/175.png",
          link: "/subjects/informatics/quiz/4/generate?sub=hieu-ung-transition",
        },
        {
          text: "Làm quen với bảng tính",
          img: "/assets/students/Slide 51/176.png",
          link: "/subjects/informatics/quiz/4/generate?sub=lam-quen-voi-bang-tinh",
        },
      ],
    },
    {
      id: "5",
      text: "LẬP TRÌNH SCRATCH",
      img: "/assets/students/Slide 52/179.png",
      cards: [
        {
          text: "Scratch 1",
          img: "/assets/students/Slide 52/180.png",
          link: "/subjects/informatics/quiz/5/generate?sub=scratch-1",
        },
        {
          text: "Scratch 2",
          img: "/assets/students/Slide 52/181.png",
          link: "/subjects/informatics/quiz/5/generate?sub=scratch-2",
        },
      ],
    },
    {
      id: "6",
      text: "LẬP TRÌNH SWIFT PLAYGROUND",
      img: "/assets/students/Slide 53/183.png",
      cards: [
        {
          text: "Swift PlayGround 1",
          img: "/assets/students/Slide 53/184.png",
          link: "/subjects/informatics/quiz/6/generate?sub=swift-playground-1",
        },
        {
          text: "Swift PlayGround 2",
          img: "/assets/students/Slide 53/185.png",
          link: "/subjects/informatics/quiz/6/generate?sub=swift-playground-2",
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
          src="/assets/students/Slide 47/156.png"
          alt="Infor Game Time"
          className="object-contain h-30"
        />
      </div>

      <div className="flex w-full px-8 mt-10">
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
            <ValueCard
              key={`${id}-${index}`}
              img={card.img}
              text={card.text}
              link={card.link}
              navigate={navigate}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
