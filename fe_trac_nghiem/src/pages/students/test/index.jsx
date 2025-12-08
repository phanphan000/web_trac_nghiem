import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [hasDoneTest, setHasDoneTest] = useState(false);
  const [testId, setTestId] = useState(null);

  // Lấy testId mới nhất
  useEffect(() => {
    async function fetchTest() {
      try {
        const res = await fetch("/api/tests/latest", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const data = await res.json();
        if (data && data.test && data.test.id) {
          setTestId(data.test.id);
        }
      } catch (err) {
        console.error("Error fetching latest test:", err);
      }
    }
    fetchTest();
  }, []);

  // Khi có testId thì check kết quả user và leaderboard
  useEffect(() => {
    if (!testId) return;

    const fetchData = async () => {
      try {
        // 1. Kiểm tra user đã làm test chưa
        const resUser = await fetch(`/api/results/me/${testId}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        });
        const userResults = await resUser.json();
        if (userResults && userResults.length > 0) {
          setHasDoneTest(true);
        }

        // 2. Nếu đã làm thì lấy leaderboard
        if (userResults && userResults.length > 0) {
          const resLeaderboard = await fetch(
            `/api/results/${testId}/leaderboard`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            }
          );
          const topScores = await resLeaderboard.json();
          setLeaderboard(topScores);
        }
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [testId]);
  function formatTime(seconds) {
    return `${seconds}s`;
  }

  return (
    <div
      className={
        hasDoneTest
          ? "min-h-screen flex flex-col lg:flex-row justify-center items-center bg-[var(--color-background)]"
          : "min-h-screen flex flex-col lg:flex-row justify-center items-center bg-[var(--color-background)]"
      }
    >
      <img
        src="/assets/students/Slide 2/Slide 2.3.png"
        alt="Login Background"
        className="absolute inset-0 w-full h-full object-contain object-bottom z-0"
      />

      <div className="w-full max-w-7xl mx-auto z-10 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8 items-center">
          {/* Welcome Text */}
          <div className="flex flex-col justify-center items-center text-center px-4">
            {!hasDoneTest && (
              <>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl primary-text-color leading-normal">
                  WELCOME TO <br />
                  BRAINY LAND
                </h1>
                <p className="text-base sm:text-lg lg:text-xl primary-text-color mt-5">
                  Một sân chơi toàn diện cho Math, Science, Tin học
                  <br />
                  Dành riêng cho Học Sinh Ngôi Sao Hoàng Mai
                </p>
              </>
            )}

            {hasDoneTest && (
              <div className="mt-6 w-full max-w-md sm:max-w-xl bg-amber-50 rounded-2xl shadow-xl p-4 sm:p-6 border-4 border-amber-200">
                <h2 className="text-lg sm:text-3xl font-bold text-center text-amber-800 mb-4">
                  🏆 TOP 5 BẢNG XẾP HẠNG 🏆
                </h2>

                {loading ? (
                  <div className="text-center text-amber-700 py-8">
                    Đang tải...
                  </div>
                ) : leaderboard.length === 0 ? (
                  <div className="text-center text-amber-700 py-8">
                    Chưa có dữ liệu xếp hạng
                  </div>
                ) : (
                  <div className="space-y-2">
                    {leaderboard.map((entry, index) => (
                      <div
                        key={index}
                        className={`flex items-center justify-between p-2 rounded-xl transition-all hover:scale-105 ${
                          index === 0
                            ? "bg-gradient-to-r from-yellow-400 to-yellow-300 shadow-lg"
                            : index === 1
                            ? "bg-gradient-to-r from-gray-300 to-gray-200"
                            : index === 2
                            ? "bg-gradient-to-r from-orange-400 to-orange-300"
                            : "bg-white"
                        }`}
                      >
                        <div className="flex items-center gap-4 flex-1">
                          <span className="text-2xl font-bold w-8">
                            {index === 0
                              ? "🥇"
                              : index === 1
                              ? "🥈"
                              : index === 2
                              ? "🥉"
                              : `${index + 1}.`}
                          </span>
                          <span className="text-lg font-semibold text-gray-800 truncate">
                            {entry.user.username}
                          </span>
                        </div>
                        <div className="flex gap-6 items-center">
                          <div className="text-center">
                            <div className="text-xs text-gray-600">Điểm</div>
                            <div className="text-xl font-bold text-amber-700">
                              {entry.score}
                            </div>
                          </div>
                          <div className="text-center">
                            <div className="text-xs text-gray-600">
                              Thời gian
                            </div>
                            <div className="text-xl font-bold text-blue-700">
                              {formatTime(entry.time_spent)}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Button Test */}
          <div className="flex justify-center items-center">
            <button
              onClick={() => navigate("/test/instructions")}
              className="w-3/4 sm:w-2/3 lg:w-3/5 bg-[var(--color-secondary)] text-white text-3xl sm:text-4xl lg:text-6xl px-6 sm:px-8 lg:px-10 py-3 sm:py-4 lg:py-5 rounded-full cursor-pointer transition-all transform hover:scale-105 shadow-lg"
            >
              TEST
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
