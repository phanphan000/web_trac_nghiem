// src/pages/students/test/Instructions.jsx
import React, { useState } from "react";
import { MousePointerClick } from "lucide-react";
import { Target } from "lucide-react";
import { Zap } from "lucide-react";
import { FlaskConical } from "lucide-react";
import { Laptop2 } from "lucide-react";
import { Clock } from "lucide-react";
import { Rocket } from "lucide-react";
import SubjectSelect from "../../../components/SubjectSelect";
export default function Instructions() {
  const [showSubjectSelect, setShowSubjectSelect] = useState(false);

  return (
    <div className="flex items-center justify-center h-screen primary-text-color">
      <img
        src="/assets/students/Slide 2/Slide 2.3.png"
        alt="Login Background"
        className="absolute inset-0 w-full h-full object-contain object-bottom z-0"
      />

      <div
        className="scale-90 sm:scale-[0.95] w-full max-w-full sm:max-w-3xl lg:max-w-4xl z-10 bg-cover bg-center bg-no-repeat pt-10 sm:pt-24 lg:pt-30 pb-5 sm:pb-18 lg:pb-40 sm:px-10 lg:px-30"
        style={{ backgroundImage: 'url("/assets/students/Slide 14/34.png")' }}
      >
        {/* Nội dung */}
        <div className="flex items-center justify-center">
          <div className="flex flex-col items-start gap-4 sm:gap-6 relative ml-4 sm:ml-6 lg:ml-10">
            <div className="flex items-center gap-2">
              <Target size={28} className="sm:w-8 sm:h-8" color="blue" />
              <h1 className="text-md sm:text-xl lg:text-2xl font-bold">
                THỬ THÁCH 3 TRONG 1 ĐANG ĐỢI BẠN
              </h1>
            </div>

            <ul className="list-none text-base sm:text-lg lg:text-xl space-y-2 ml-4 sm:ml-6">
              <li className="flex items-center gap-2">
                <Zap size={20} className="sm:w-6 sm:h-6" color="orange" />
                <span>Toán học nhanh như chớp</span>
              </li>
              <li className="flex items-center gap-2">
                <FlaskConical
                  size={20}
                  className="sm:w-6 sm:h-6"
                  color="green"
                />
                <span>Khoa học siêu khám phá</span>
              </li>
              <li className="flex items-center gap-2">
                <Laptop2 size={20} className="sm:w-6 sm:h-6" color="blue" />
                <span>Tin học thông minh</span>
              </li>
            </ul>

            <div className="flex items-center gap-2">
              <Clock size={20} className="sm:w-6 sm:h-6" color="blue" />
              <h1 className="text-base sm:text-lg lg:text-2xl">
                Bạn có 45 phút để hoàn thành tất cả!
              </h1>
            </div>

            <div className="flex items-center gap-2">
              <Rocket size={20} className="sm:w-6 sm:h-6" color="red" />
              <h1 className="text-base sm:text-lg lg:text-2xl">
                Bấm nút bên dưới để bắt đầu trò chơi
                <br />
                trí thức ngay thôi!
              </h1>
            </div>
          </div>
        </div>

        {/* Nút START */}
        <div className="flex justify-center mt-8 lg:mt-0">
          <button
            onClick={() => setShowSubjectSelect(true)}
            className="border border-black group flex items-center justify-center gap-2 text-base sm:text-lg lg:text-xl bg-yellow-500 rounded-full px-6 sm:px-8 py-3 sm:py-4 hover:bg-yellow-300 transition-colors lg:absolute lg:bottom-10"
          >
            <span className="text-blue-900 font-bold">START</span>
            <MousePointerClick className="w-5 h-5 sm:w-6 sm:h-6 text-blue-900 transform transition-transform duration-300 group-hover:scale-125 group-hover:-rotate-12" />
          </button>
        </div>
      </div>
      {showSubjectSelect && (
        <SubjectSelect onClose={() => setShowSubjectSelect(false)} />
      )}
    </div>
  );
}
