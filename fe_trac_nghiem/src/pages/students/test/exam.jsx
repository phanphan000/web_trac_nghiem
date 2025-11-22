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
    };
    console.log("Payload gửi lên BE:", payload);
    // Lưu id của test
    const testId = data.test.id; // hoặc data.id nếu format khác
    // setTestId(testId);
    try {
      const res = await fetch(`/api/tests/${testId}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("Kết quả từ backend:", data);

      // Backend trả về score đã tính
      setScore(data.score);
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
      <div className="min-h-screen flex items-center justify-center p-6">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-lg w-full">
          <h2 className="text-xl font-semibold">Chưa có câu hỏi</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Xin hãy nạp bộ câu hỏi trước khi bắt đầu.
          </p>
        </div>
      </div>
    );

  if (score !== null) {
    return (
      <div className="min-h-screen flex items-center justify-center p-30 bg-[var(--color-blackground)] primary-text-color">
        <img
          src="/assets/students/Slide 2/Slide 2.3.png"
          alt="Login Background"
          className="absolute inset-0 w-full h-full object-contain object-bottom z-0"
        />
        <img
          src="/assets/students/Slide 15/38.png"
          className="absolute bottom-0 -right-15 w-2/7 object-contain object-bottom z-30  "
        />
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-xl w-full text-center z-10">
          <h1 className="text-3xl font-extrabold">Kết quả</h1>
          <p className="mt-4 text-lg">
            Bạn trả lời đúng <span className="font-semibold">{score}</span> trên{" "}
            <span className="font-semibold">{questions.length}</span>
          </p>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <button
              onClick={restart}
              className="py-3 rounded-xl shadow-md border hover:scale-[1.01] transition"
            >
              Làm lại
            </button>
            <button
              onClick={() => navigate("/test")}
              className="py-3 rounded-xl shadow-md border bg-yellow-100 hover:brightness-95 transition"
            >
              Thoát
            </button>
          </div>
          <div className="mt-6 text-sm text-gray-600">
            Thời gian còn lại khi nộp: {formatTime(timeLeft)}
          </div>
        </div>
      </div>
    );
  }

  const q = questions[index];
  const progress = Math.round((index / questions.length) * 100);

  return (
    <div className="min-h-screen flex items-center justify-center p-30 bg-[var(--color-blackground)] primary-text-color mr-10">
      <img
        src="/assets/students/Slide 2/Slide 2.3.png"
        alt="Login Background"
        className="absolute inset-0 w-full h-full object-contain object-bottom z-0"
      />
      <img
        src="/assets/students/Slide 15/38.png"
        className="absolute bottom-0 -right-15 w-2/7 object-contain object-bottom z-30 "
      />
      <div className="w-full max-w-4xl z-10">
        <header className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-2xl font-bold">Bài kiểm tra vui</h2>
            <p className="text-sm text-gray-600">
              Dành cho học sinh tiểu học — Hãy chọn đáp án đúng.
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm">
              Câu {index + 1} / {questions.length}
            </div>
            <div className="text-xs mt-1">
              Thời gian còn lại:{" "}
              <span className="font-semibold">{formatTime(timeLeft)}</span>
            </div>
          </div>
        </header>

        <div className="bg-white rounded-3xl p-6 shadow-lg">
          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-3 mb-4 overflow-hidden">
            <div
              className="h-3 rounded-full"
              style={{
                width: `${progress}%`,
                background: "linear-gradient(90deg,#60a5fa,#fbbf24)",
              }}
            />
          </div>

          {/* Question card */}
          <div className="flex gap-4 items-start">
            <div className="flex-1">
              <div className="rounded-xl p-4 border border-dashed border-gray-100 bg-gradient-to-br from-white to-blue-50">
                <div className="text-lg font-semibold mb-2">{q.title}</div>
                {q.image && (
                  <img
                    src={q.image}
                    alt="question"
                    className="w-full max-h-40 object-contain rounded-md my-2"
                  />
                )}
                <div className="mt-2 grid gap-3">
                  {(q?.options || []).map((opt, i) => {
                    const isSelected = selected === i || answers[index] === i;
                    const isCorrect = q.correct === i;
                    const reveal = showAnswer && (isCorrect || isSelected);
                    return (
                      <button
                        key={i}
                        onClick={() => handleSelect(i)}
                        disabled={showAnswer}
                        className={`w-full text-left p-4 rounded-xl shadow-sm border transition transform focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-indigo-300 hover:scale-103 ${
                          isSelected ? "bg-gray-300 scale-[1.01]" : "bg-white"
                        }`}
                        aria-pressed={isSelected}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold bg-white border">
                            {String.fromCharCode(65 + i)}
                          </div>
                          <div className="flex-1">{opt}</div>
                          {/* small badge when reveal */}
                          {/* {reveal && (
                            <div
                              className={`px-3 py-1 rounded-full text-sm ${
                                isCorrect
                                  ? "bg-green-100 text-green-800"
                                  : "bg-red-100 text-red-800"
                              }`}
                            >
                              {isCorrect ? "Đúng" : "Sai"}
                            </div>
                          )} */}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Controls */}
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <div className="px-2 py-1 rounded bg-white shadow-sm">
                    Mẹo: Dùng phím 1-4
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      if (index > 0) setIndex(index - 1);
                    }}
                    disabled={index === 0}
                    className="px-4 py-2 rounded-xl border shadow-lg"
                  >
                    Quay lại
                  </button>
                  <button
                    onClick={() => {
                      if (index < questions.length - 1) setIndex(index + 1);
                      else finishQuiz();
                    }}
                    className="px-4 py-2 rounded-xl bg-yellow-100 border shadow-lg hover:bg-yellow-200 transition"
                  >
                    Tiếp tục
                  </button>
                </div>
              </div>
            </div>

            {/* Sidebar: small summary */}
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

              <div className="p-4 z-1000">
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
