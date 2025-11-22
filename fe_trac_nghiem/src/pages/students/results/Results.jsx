import React, { useState } from "react";
import ProgressBar from "@/components/ProgressBar";

export default function Results() {
  const [selectedSubject, setSelectedSubject] = useState("math");

  const subjects = {
    math: {
      label: "MATH",
      data: [
        { name: "TOPIC 1: NUMBERS", score: 50 },
        { name: "TOPIC 2: OPERATIONS", score: 29 },
        { name: "TOPIC 3: GEOMETRY", score: 73 },
        { name: "TOPIC 4: HANDLING DATA", score: 84 },
        { name: "TOPIC 5: MEASUREMENT", score: 96 },
        { name: "TOPIC 6: LOGICAL THINKING", score: 51 },
      ],
    },
    inf: {
      label: "Tin học",
      data: [
        { name: "TOPIC 1: Máy tính và em", score: 80 },
        { name: "TOPIC 2: Đạo đức, pháp luật trong môi trường số", score: 60 },
        { name: "TOPIC 3: Lưu trữ, tìm kiếm thông tin", score: 43 },
        { name: "TOPIC 4: Ứng dụng tin học", score: 24 },
        { name: "TOPIC 5: Lập trình Scratch", score: 59 },
        { name: "TOPIC 6: Lập trình Swift PlayGround", score: 70 },
      ],
    },
    science: {
      label: "SCIENCE",
      data: [
        { name: "TOPIC 1: LIVING THINGS", score: 70 },
        { name: "TOPIC 2: HUMAN BODY", score: 30 },
        { name: "TOPIC 3: MATTER & MATERIALS", score: 43 },
        { name: "TOPIC 4: FORCES, ENERGY & MOTION", score: 64 },
        { name: "TOPIC 5: EARTH & SPACES", score: 56 },
        { name: "TOPIC 6: ENVIRONMENT", score: 91 },
      ],
    },
  };

  return (
    <div className="w-full flex flex-col items-center justify-center pt-30">
      <h1 className="text-5xl font-bold text-center primary-text-color mb-10">
        Kết quả học tập
      </h1>

      {/* Thanh chọn môn */}
      <div className="flex gap-6 mb-10">
        {Object.keys(subjects).map((key) => (
          <div
            key={key}
            onClick={() => setSelectedSubject(key)}
            className={`px-6 py-3 rounded-lg font-semibold text-lg cursor-pointer transition-all duration-200 ${
              selectedSubject === key
                ? "bg-[var(--color-secondary)] text-white scale-105"
                : "bg-gray-200 primary-text-color hover:bg-gray-300"
            }`}
          >
            {subjects[key].label}
          </div>
        ))}
      </div>

      {/* Hiển thị kết quả môn đã chọn */}
      <div className="w-full  px-4">
        <ProgressBar data={subjects[selectedSubject].data} />
      </div>
    </div>
  );
}
