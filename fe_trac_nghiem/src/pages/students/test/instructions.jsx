// src/pages/students/test/Instructions.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { MousePointerClick } from "lucide-react";
import { Target } from "lucide-react";
import { Zap } from "lucide-react";
import { FlaskConical } from "lucide-react";
import { Laptop2 } from "lucide-react";
import { Clock } from "lucide-react";
import { Rocket } from "lucide-react";
export default function Instructions() {
  const navigate = useNavigate();

  return (
    <div className="h-full mx-10 flex justify-between pt-35 primary-text-color items-center">
      <img
        src="/assets/students/Slide 2/Slide 2.3.png"
        alt="Login Background"
        className="absolute inset-0 w-full h-full object-contain object-bottom z-0"
      />
      <div
        className="scale-[0.95] w-full max-w-4xl mx-auto z-10 relative bg-cover bg-center bg-no-repeat flex flex-col justify-center pt-30 pb-40 px-30"
        style={{ backgroundImage: 'url("/assets/students/Slide 14/34.png")' }}
      >
        {/* Phần nội dung */}
        <div className="flex flex-col items-start gap-6 relative ml-10">
          <div className="flex items-center gap-2">
            <Target size={32} color="blue" />
            <h1 className="text-2xl font-bold">
              THỬ THÁCH 3 TRONG 1 ĐANG ĐỢI BẠN
            </h1>
          </div>

          <ul className="list-none text-xl space-y-2 ml-6">
            <li className="flex items-center gap-2">
              <Zap size={24} color="orange" />
              <span>Toán học nhanh như chớp</span>
            </li>
            <li className="flex items-center gap-2">
              <FlaskConical size={24} color="green" />
              <span>Khoa học siêu khám phá</span>
            </li>
            <li className="flex items-center gap-2">
              <Laptop2 size={24} color="blue" />
              <span>Tin học thông minh</span>
            </li>
          </ul>

          <div className="flex items-center gap-2">
            <Clock size={24} color="blue" />
            <h1 className="text-2xl">Bạn có 30 phút để hoàn thành tất cả!</h1>
          </div>
          <div className="flex items-center gap-2">
            <Rocket size={24} color="red" />{" "}
            <h1 className="text-2xl">
              Bấm nút bên dưới để bắt đầu trò chơi
              <br />
              trí thức ngay thôi!
            </h1>
          </div>
        </div>

        {/* Nút START */}
        <div className="flex justify-center">
          <button
            onClick={() => navigate("/test/exam")}
            className="border border-black group flex items-center justify-center gap-2 text-xl bg-yellow-500 rounded-full px-8 py-4 hover:bg-yellow-300 transition-colors absolute bottom-10"
          >
            <span className="text-blue-900 font-bold">START</span>
            <MousePointerClick className="w-6 h-6 text-blue-900 transform transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-12" />
          </button>
        </div>
      </div>
    </div>
  );
}
