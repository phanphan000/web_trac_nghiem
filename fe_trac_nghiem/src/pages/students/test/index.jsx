import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LeaderboardCard({ title, data, loading }) {
  function formatTime(seconds) {
    return `${seconds}s`;
  }

  return (
    <div className="bg-amber-50 rounded-2xl shadow-xl p-2 md:p-6 lg:py-2 border-4 border-amber-200">
      <h2 className="text-lg sm:text-2xl font-bold text-center text-amber-800 mb-2">
        {title}
      </h2>

      {loading ? (
        <div className="text-center text-amber-700 py-8 animate-pulse">
          ⏳ Đang tải dữ liệu...
        </div>
      ) : data.length === 0 ? (
        <div className="text-center text-amber-700 py-8">
          Chưa có học sinh đạt yêu cầu
        </div>
      ) : (
        <div className="space-y-2">
          {data.map((entry, index) => (
            <div
              key={index}
              className={`flex items-center justify-between p-1 md:p-2 rounded-xl transition-all hover:scale-105 gap-0 md:gap-4 ${
                index === 0
                  ? "bg-gradient-to-r from-yellow-400 to-yellow-300 shadow-lg"
                  : index === 1
                  ? "bg-gradient-to-r from-gray-300 to-gray-200"
                  : index === 2
                  ? "bg-gradient-to-r from-orange-400 to-orange-300"
                  : "bg-white"
              }`}
            >
              <div className="flex items-center gap-0 md:gap-4 flex-1">
                <span className="text-2xl font-bold w-8">
                  {index === 0
                    ? "🥇"
                    : index === 1
                    ? "🥈"
                    : index === 2
                    ? "🥉"
                    : `${index + 1}.`}
                </span>
                <span className="text-base md:text-lg font-semibold truncate">
                  {entry.user.username}
                </span>
              </div>

              <div className="flex gap-4 md:gap-6 items-center">
                <div className="text-center">
                  <div className="text-xs text-gray-600">Điểm</div>
                  <div className="text-base md:text-lg font-bold text-amber-700">
                    {entry.score}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-xs text-gray-600">Time</div>
                  <div className="text-base md:text-lg font-bold text-blue-700 ">
                    {formatTime(entry.time_spent)}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const Index = () => {
  const navigate = useNavigate();
  const [hasDoneTest, setHasDoneTest] = useState(false);
  const [leaderboards, setLeaderboards] = useState({});
  const [loadingLeaderboards, setLoadingLeaderboards] = useState(false);

  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    async function fetchData() {
      try {
        const token = localStorage.getItem("token");
        const headers = { Authorization: `Bearer ${token}` };

        // 1. Check user đã làm test chưa
        const resUser = await fetch(`${API_BASE}/api/results/me`, { headers });
        const userResults = await resUser.json();

        if (Array.isArray(userResults) && userResults.length > 0) {
          setHasDoneTest(true);
          setLoadingLeaderboards(true);

          // 2. Lấy test active
          const resSubjects = await fetch(
            `${API_BASE}/api/subjects/active-tests`,
            { headers }
          );
          const subjects = await resSubjects.json();

          // 3. TẠO KHUNG RỖNG TRƯỚC (UX quan trọng)
          const emptyBoards = {};
          subjects.forEach((s) => {
            if (s.test_id) emptyBoards[s.name] = [];
          });
          setLeaderboards(emptyBoards);

          // 4. Gọi leaderboard
          const leaderboardCalls = subjects
            .filter((s) => s.test_id)
            .map(async (s) => {
              const resLb = await fetch(
                `${API_BASE}/api/results/test/${s.test_id}/leaderboard`,
                { headers }
              );
              const data = await resLb.json();
              return { name: s.name, data };
            });

          const results = await Promise.all(leaderboardCalls);

          const lbObj = {};
          results.forEach((r) => {
            lbObj[r.name] = r.data;
          });

          setLeaderboards(lbObj);
          setLoadingLeaderboards(false);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setLoadingLeaderboards(false);
      }
    }

    fetchData();
  }, []);

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
        <div
          className={`grid gap-4 sm:gap-8 items-center ${
            hasDoneTest ? "grid-cols-1" : "grid-cols-1 lg:grid-cols-2"
          }`}
        >
          {/* Welcome Text */}
          <div className="flex flex-col justify-center items-center text-center px-0 md:px-4">
            {!hasDoneTest ? (
              // Welcome view
              <div className="flex flex-col justify-center items-center text-center px-4">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl primary-text-color leading-normal">
                  WELCOME TO <br />
                  BRAINY LAND
                </h1>
                <p className="text-base sm:text-lg lg:text-xl primary-text-color mt-5">
                  Một sân chơi toàn diện cho Math, Science, Tin học
                  <br />
                  Dành riêng cho Học Sinh Ngôi Sao Hoàng Mai
                </p>
              </div>
            ) : (
              <>
                <h1 className="text-2xl sm:text-3xl lg:text-4xl primary-text-color text-center mb-3 md:mb-8">
                  🏆 BẢNG XẾP HẠNG 🏆
                </h1>

                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
                  {Object.entries(leaderboards).map(([name, data]) => (
                    <LeaderboardCard
                      key={name}
                      title={name}
                      data={data}
                      loading={loadingLeaderboards}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
          {/* Button Test */}
          {(!hasDoneTest || (hasDoneTest && window.innerWidth < 768)) && (
            <div className="flex justify-center items-center">
              <button
                onClick={() => navigate("/test/instructions")}
                className="w-3/4 sm:w-2/3 lg:w-3/5 bg-[var(--color-secondary)] text-white
                 text-3xl sm:text-4xl lg:text-6xl
                 px-6 sm:px-8 lg:px-10
                 py-3 sm:py-4 lg:py-5
                 rounded-full cursor-pointer
                 transition-all transform hover:scale-105 shadow-lg
                 "
              >
                TEST
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
