import React, { useState, useEffect } from "react";

const ProgressBar = ({ data }) => {
  const [animatedValues, setAnimatedValues] = useState(data.map(() => 0));

  useEffect(() => {
    const animationDuration = 1500;
    const steps = 60;
    const stepDuration = animationDuration / steps;

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      setAnimatedValues(
        data.map((item) => {
          return Math.min(item.score * progress, item.score);
        })
      );

      if (currentStep >= steps) {
        clearInterval(interval);
        setAnimatedValues(data.map((item) => item.score));
      }
    }, stepDuration);

    return () => clearInterval(interval);
  }, [data]);

  const getColor = (score) => {
    if (score >= 90) return "bg-blue-400";
    if (score >= 70) return "bg-green-400";
    if (score >= 50) return "bg-orange-400";
    return "bg-red-400";
  };

  const getLightColor = (score) => {
    if (score >= 90) return "bg-blue-200";
    if (score >= 70) return "bg-green-200";
    if (score >= 50) return "bg-orange-200";
    return "bg-red-200";
  };

  return (
    <div className="w-full space-y-4">
      {data.map((item, index) => {
        const score = animatedValues[index];
        const isHighScore = item.score >= 90;

        return (
          <div key={index} className="flex gap-4 items-center mx-15">
            {/* Cột 1: Text chủ đề */}
            <div className="flex-1 flex ml-20">
              <p className="text-2xl primary-text-color ml-10">{item.name}</p>
            </div>

            {/* Cột 2: Thanh điểm số */}
            <div className="flex-1 mx-15">
              <div className="h-9 rounded-full overflow-hidden relative">
                <div
                  className={`absolute inset-0 ${getLightColor(item.score)}`}
                ></div>
                <div
                  className={`absolute inset-y-0 left-0 ${getColor(
                    item.score
                  )} transition-all duration-300 ease-out rounded-full`}
                  style={{ width: `${score}%` }}
                ></div>
              </div>
            </div>

            {/* Cột 3: Điểm số và trạng thái */}
            <div className="flex-1 flex flex-col items-center mx-15">
              <span className="text-lg font-bold primary-text-color">
                {Math.round(score)}%
              </span>
              {isHighScore ? (
                <div className="mt-1 px-3 py-1 bg-pink-200 text-pink-700 rounded-full text-xs font-semibold flex items-center gap-1">
                  <span>GOOD JOB</span>
                  <span>❤️</span>
                </div>
              ) : (
                <div className="mt-1 px-3 py-1 bg-black text-white rounded-full text-xs font-semibold">
                  LUYỆN TẬP
                </div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ProgressBar;
