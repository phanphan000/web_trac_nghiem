import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function QuizApp() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState(null);
  const [answers, setAnswers] = useState([]);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showIncompleteWarning, setShowIncompleteWarning] = useState(false);
  const [score, setScore] = useState(null);
  const [timeLeft, setTimeLeft] = useState(null); // in seconds
  const [duration, setDuration] = useState(0); // phút
  const timerRef = useRef(null);

  useEffect(() => {
    if (duration > 0) {
      setTimeLeft(duration * 60);
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setTimeLeft((t) => t - 1);
      }, 1000);
      return () => clearInterval(timerRef.current);
    }
  }, [duration]);

  useEffect(() => {
    if (timeLeft !== null && timeLeft <= 0) {
      clearInterval(timerRef.current);
      finishQuiz();
    }
  }, [timeLeft]);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const res = await fetch("/api/tests/latest"); // test_id mới nhất
        const data = await res.json();
        console.log("API response1:", data);
        console.log("Questions from API:", data.questions);

        // map dữ liệu từ DB sang format giống SAMPLE_QUESTIONS
        const mapped = (data.questions || []).map((q) => ({
          id: q.id, // id câu hỏi từ DB
          title: q.question_text, // nội dung câu hỏi
          options: [q.option_a, q.option_b, q.option_c, q.option_d], // mảng đáp án
          correct: q.correct_answer,
          explanation: q.explanation || "", // nếu có cột giải thích
          image: q.image || null,
        }));

        setQuestions(mapped);
        setAnswers(Array(mapped.length).fill(null)); // reset answers theo số câu hỏi
        // lấy duration từ test (đơn vị phút) và đổi sang giây
        const durationMinutes = data.test.duration;
        setDuration(durationMinutes);
        setTimeLeft(durationMinutes * 60);
      } catch (err) {
        console.error("Error fetching questions:", err);
      }
    }

    fetchQuestions();
  }, []);

  function handleSelect(optionIndex) {
    if (showAnswer) return; // don't change after showing
    setSelected(optionIndex);
    const newAnswers = [...answers];
    newAnswers[index] = optionIndex;
    setAnswers(newAnswers);
    // show correct/incorrect briefly
    setShowAnswer(true);
    setTimeout(() => {
      setShowAnswer(false);
      setSelected(null);
      if (index < questions.length - 1) {
        setIndex(index + 1);
      } else {
        // Không tự nộp nữa, chỉ dừng lại
        setSelected(null);
      }
    }, 900);
  }

  async function finishQuiz(finalAnswers = answers, forceSubmit = false) {
    console.log(">>> finishQuiz được gọi <<<", finalAnswers);
    const unanswered = finalAnswers.filter((a) => a === null).length;

    if (unanswered > 0 && !forceSubmit) {
      setShowIncompleteWarning(true);
      return; // dừng lại, chờ user chọn nút
    }

    console.log("Cấu trúc questions:", questions);
    clearInterval(timerRef.current);

    // Chuẩn bị payload gửi lên backend
    const res = await fetch("/api/tests/latest"); // test_id mới nhất
    const data = await res.json();
    console.log("cấu trúc data:", data);

    const letters = ["A", "B", "C", "D"];
    const payload = {
      answers: questions.map((q, i) => ({
        question_id: q.id, // id câu hỏi từ DB
        selected_answer:
          finalAnswers[i] !== null ? letters[finalAnswers[i]] : null, // đáp án học sinh chọn (A/B/C/D)
      })),
      time_spent: duration * 60 - timeLeft, // số giây đã làm bài
    };
    console.log("Payload gửi lên BE:", payload);

    // 👉 Tính điểm hiện tại ở frontend
    let currentScore = 0;
    questions.forEach((q, i) => {
      const selected =
        finalAnswers[i] !== null ? letters[finalAnswers[i]] : null;
      if (selected && selected === q.correct) {
        currentScore++;
      }
    });

    const testId = data.test.id; // hoặc data.id nếu format khác

    try {
      const res = await fetch(`/api/tests/${testId}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });

      const submitData = await res.json();
      console.log("Kết quả từ backend:", submitData);

      // 👉 Hiển thị điểm lần này (currentScore)
      setScore(currentScore);

      // Nếu muốn lưu cả điểm cao nhất để hiển thị thêm:
      // setBestScore(submitData.score);
    } catch (err) {
      console.error("Error submitting quiz:", err);
    }
  }

  function restart() {
    setIndex(0);
    setSelected(null);
    setAnswers(Array(questions.length).fill(null));
    setShowAnswer(false);
    setScore(null);
    setTimeLeft(duration * 60);
    clearInterval(timerRef.current);
    timerRef.current = setInterval(() => setTimeLeft((t) => t - 1), 1000);
  }

  // Accessibility: allow number keys 1..4 to choose
  useEffect(() => {
    function onKey(e) {
      if (score !== null) return;

      const currentQuestion = questions[index];
      if (!currentQuestion) return; // nếu chưa có câu hỏi thì thoát
      if (
        e.key >= "1" &&
        e.key <= String(Math.min(4, questions[index].options.length))
      ) {
        handleSelect(parseInt(e.key, 10) - 1);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, showAnswer, score]);

  if (!questions || questions.length === 0)
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <p className="text-xl font-semibold text-[var(--color-secondary)] mb-4">
            Đang tải câu hỏi
          </p>
          <div className="flex gap-2 justify-center">
            <div className="w-3 h-3 bg-[var(--color-btn)] rounded-full animate-bounce"></div>
            <div className="w-3 h-3 bg-[var(--color-btn)] rounded-full animate-bounce [animation-delay:0.2s]"></div>
            <div className="w-3 h-3 bg-[var(--color-btn)] rounded-full animate-bounce [animation-delay:0.4s]"></div>
          </div>
        </div>
      </div>
    );

  if (score !== null) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 sm:p-10 lg:p-30 bg-[var(--color-blackground)] primary-text-color">
        <img
          src="/assets/students/Slide 2/Slide 2.3.png"
          alt="Login Background"
          className="absolute inset-0 w-full h-full object-contain object-bottom z-0"
        />
        <img
          src="/assets/students/Slide 15/38.png"
          className="absolute bottom-0 -right-15 w-2/7 object-contain object-bottom z-30 "
        />
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 max-w-md sm:max-w-xl w-full text-center z-10">
          <h1 className="text-2xl sm:text-3xl font-extrabold">Kết quả</h1>
          <p className="mt-4 text-base sm:text-lg">
            Bạn trả lời đúng <span className="font-semibold">{score}</span> trên
            <span className="font-semibold">{questions.length}</span>
          </p>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <button
              onClick={restart}
              className="py-2 sm:py-3 rounded-xl shadow-md border hover:scale-[1.01] transition"
            >
              Làm lại
            </button>
            <button
              onClick={() => navigate("/test")}
              className="py-2 sm:py-3 rounded-xl shadow-md border bg-yellow-100 hover:brightness-95 transition"
            >
              Thoát
            </button>
          </div>
          <div className="mt-6 text-xs sm:text-sm text-gray-600">
            Thời gian còn lại khi nộp: {formatTime(timeLeft)}
          </div>
        </div>
      </div>
    );
  }

  const q = questions[index];
  const progress = Math.round((index / questions.length) * 100);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 sm:p-10 lg:p-30 bg-[var(--color-blackground)] primary-text-color">
      <img
        src="/assets/students/Slide 2/Slide 2.3.png"
        alt="Login Background"
        className="absolute inset-0 w-full h-full object-contain object-bottom z-0"
      />
      <img
        src="/assets/students/Slide 15/38.png"
        className="absolute bottom-0 -right-15 w-2/7 object-contain object-bottom z-10 "
      />
      <div className="w-full max-w-2xl sm:max-w-4xl z-10">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-2 sm:gap-0">
          <div>
            <h2 className="text-lg sm:text-2xl font-bold">Bài kiểm tra vui</h2>
            <p className="text-xs sm:text-sm text-gray-600">
              Dành cho học sinh tiểu học — Hãy chọn đáp án đúng.
            </p>
          </div>
          <div className="text-left sm:text-right">
            <div className="text-xs sm:text-sm">
              Câu {index + 1} / {questions.length}
            </div>
            <div className="text-xs mt-1">
              Thời gian còn lại:
              <span className="font-semibold">{formatTime(timeLeft)}</span>
            </div>
          </div>
        </header>

        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg">
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3 mb-4 overflow-hidden">
            <div
              className="h-2 sm:h-3 rounded-full"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg,#60a5fa,#fbbf24)",
              }}
            />
          </div>
          {/* Question card */}
          <div className="flex flex-col md:flex-row gap-4 items-start">
            <div className="flex-1">
              <div className="rounded-xl p-3 sm:p-4 border border-dashed border-gray-100 bg-gradient-to-br from-white to-blue-50">
                <div className="text-sm sm:text-lg font-semibold mb-2">
                  {q.title}
                </div>
                {q.image && (
                  <img
                    src={q.image}
                    alt="question"
                    className="w-full max-h-32 sm:max-h-40 object-contain rounded-md my-2"
                  />
                )}
                <div className="mt-2 grid gap-2 sm:gap-3">
                  {(q?.options || []).map((opt, i) => {
                    const isSelected = selected === i || answers[index] === i;
                    const isCorrect = q.correct === i;
                    const reveal = showAnswer && (isCorrect || isSelected);
                    return (
                      <button
                        key={i}
                        onClick={() => handleSelect(i)}
                        disabled={showAnswer}
                        className={`w-full text-left p-2 sm:p-4 rounded-xl shadow-sm border transition transform focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-300 hover:scale-103 ${
                          isSelected ? "bg-gray-300 scale-[1.01]" : "bg-white"
                        }`}
                        aria-pressed={isSelected}
                      >
                        <div className="flex items-center gap-2 sm:gap-3">
                          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center font-bold bg-white border">
                            {String.fromCharCode(65 + i)}
                          </div>
                          <div className="flex-1 text-sm sm:text-base">
                            {opt}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Controls */}
              <div className="lg:mt-4 flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-0">
                <div className="hidden lg:flex items-center gap-2 text-xs sm:text-sm text-gray-600 lg:mr-auto">
                  <div className="px-2 py-1 rounded bg-white shadow-sm">
                    Mẹo: Dùng phím 1-4
                  </div>
                </div>

                <div className="flex items-center gap-2 lg:mr-auto">
                  <button
                    onClick={() => {
                      if (index > 0) setIndex(index - 1);
                    }}
                    disabled={index === 0}
                    className="px-3 sm:px-4 py-2 rounded-xl border shadow-lg text-sm sm:text-base"
                  >
                    Quay lại
                  </button>
                  <button
                    onClick={() => {
                      if (index < questions.length - 1) setIndex(index + 1);
                      else finishQuiz();
                    }}
                    className="px-3 sm:px-4 py-2 rounded-xl bg-yellow-100 border shadow-lg hover:bg-yellow-200 transition text-sm sm:text-base"
                  >
                    Tiếp tục
                  </button>
                  <button
                    onClick={() => finishQuiz()}
                    className="md:hidden px-3 sm:px-4 py-2 rounded-xl bg-red-100 border shadow-lg hover:bg-red-200 transition text-sm sm:text-base"
                  >
                    Nộp bài
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar chỉ hiện từ md trở lên */}
            <aside className="w-40 hidden md:flex flex-col h-full">
              <div className="bg-gradient-to-b from-white to-indigo-50 p-4 rounded-xl shadow-inner text-center">
                <div className="text-sm">Tiến trình</div>
                <div className="mt-2 grid grid-cols-5 gap-2">
                  {questions.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setIndex(i)}
                      className={`h-7 w-7 rounded-full text-sm font-semibold flex items-center justify-center transition ${
                        answers[i] !== null
                          ? "bg-gray-400 text-white"
                          : "bg-gray-200 text-black"
                      }`}
                      title={`Câu ${i + 1}`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>
              <div className="p-4 z-50">
                <button
                  onClick={() => finishQuiz()}
                  className="w-full px-4 py-2 rounded-xl bg-red-100 border shadow-lg hover:bg-red-200 transition"
                >
                  Nộp bài
                </button>
              </div>
            </aside>
          </div>
          {/* Div cảnh báo */}
          {showIncompleteWarning && (
            <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-xl shadow-xl max-w-sm w-full text-center">
                <h2 className="text-lg font-semibold text-yellow-700">
                  ⚠️ Còn câu chưa làm
                </h2>
                <p className="mt-2 text-sm text-gray-700">
                  Bạn vẫn còn một số câu hỏi chưa trả lời. Bạn có chắc chắn muốn
                  nộp bài không?
                </p>
                <div className="mt-4 flex justify-center gap-3">
                  <button
                    onClick={() => finishQuiz(answers, true)}
                    className="px-4 py-2 rounded bg-yellow-400 hover:bg-yellow-500 text-white font-semibold"
                  >
                    Vẫn nộp bài
                  </button>
                  <button
                    onClick={() => setShowIncompleteWarning(false)}
                    className="px-4 py-2 rounded border font-medium"
                  >
                    Quay lại
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ---------- Helpers & Sample data ----------

function formatTime(sec) {
  if (sec <= 0) return "00:00";
  const m = Math.floor(sec / 60)
    .toString()
    .padStart(2, "0");
  const s = Math.floor(sec % 60)
    .toString()
    .padStart(2, "0");
  return `${m}:${s}`;
}
