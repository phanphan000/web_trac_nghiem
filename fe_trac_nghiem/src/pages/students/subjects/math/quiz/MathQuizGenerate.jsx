import React, { useState, useEffect } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";

const MathQuizGenerate = () => {
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const subTopic = searchParams.get("sub");
  const API_BASE = import.meta.env.VITE_API_BASE_URL;

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const token = localStorage.getItem("token");
        // gọi API generate quiz
        const res = await fetch(`${API_BASE}/api/generate-quiz`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            questionCount: 10,
            topic: id,
            subTopic,
          }),
        });
        const data = await res.json();
        setQuiz(data);
      } catch (err) {
        console.error("Error generating quiz:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchQuiz();
  }, [id, subTopic]);

  const selectAnswer = (qid, option) => {
    setAnswers({ ...answers, [qid]: option });
  };

  const submitQuiz = () => {
    let correct = 0;
    quiz.questions.forEach((q) => {
      if (answers[q.id] === q.answer) correct++;
    });
    setScore(correct);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const getOptionClass = (q, opt) => {
    if (score === null) return "border-gray-300";
    if (answers[q.id] === opt && opt === q.answer)
      return "bg-green-100 border-green-500";
    if (answers[q.id] === opt && opt !== q.answer)
      return "bg-red-100 border-red-500";
    if (opt === q.answer) return "bg-green-50 border-green-300";
    return "border-gray-200";
  };

  if (loading) {
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
  }

  return (
    <div className="pt-30">
      <div className="max-w-5xl mx-auto p-6  bg-white rounded-xl shadow-md">
        {quiz && (
          <div className="mt-6">
            <h2 className="text-2xl font-bold primary-text-color text-center mb-2">
              Bài Trắc Nghiệm
            </h2>
            <div className="text-center mb-4 text-gray-600 flex gap-4 justify-center">
              <p>
                Chủ đề: <strong>{quiz.quizMeta.topic}</strong>
              </p>
            </div>

            {score !== null && (
              <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6 text-center font-semibold">
                Kết quả của bạn: {score}/{quiz.questions.length},{" "}
                {Math.round((score / quiz.questions.length) * 100)}%,{" "}
                {score === quiz.questions.length
                  ? "Xuất sắc!"
                  : "Cố gắng thêm!"}
              </div>
            )}

            {quiz.questions.map((q, idx) => (
              <div key={q.id} className="mb-6 p-4 border rounded-md">
                <p className="font-semibold mb-2">
                  Câu {idx + 1}: {q.questionText}
                </p>
                {q.options.map((opt, i) => (
                  <label
                    key={opt}
                    className={`block px-4 py-2 border rounded-md mb-2 cursor-pointer ${getOptionClass(
                      q,
                      opt
                    )}`}
                  >
                    <input
                      type="radio"
                      name={`q-${q.id}`}
                      value={opt}
                      disabled={score !== null}
                      checked={answers[q.id] === opt}
                      onChange={() => selectAnswer(q.id, opt)}
                      className="mr-2"
                    />
                    {String.fromCharCode(65 + i)}. {opt}
                  </label>
                ))}
                {score !== null && (
                  <p className="mt-2 text-sm text-gray-600">
                    <strong>Đáp án đúng:</strong> {q.answer} <br />
                    <strong>Giải thích:</strong> {q.explanation}
                  </p>
                )}
              </div>
            ))}

            <div className="flex justify-center primary-text-color">
              {score === null ? (
                <button
                  onClick={submitQuiz}
                  className="w-1/2 py-3 font-semibold rounded-md bg-red-100 hover:bg-red-200 transition "
                >
                  Nộp bài
                </button>
              ) : (
                <>
                  <button
                    onClick={() => {
                      setQuiz(null);
                      setAnswers({});
                      setScore(null);
                      setLoading(true);
                    }}
                    className="w-1/3 py-3 mr-10 bg-[var(--color-secondary)] text-white shadow-md hover:scale-105 transition-transform font-semibold rounded-md"
                  >
                    Tạo mới
                  </button>
                  {/* Thoát */}
                  <button
                    onClick={() => navigate("/subjects/math/quiz")}
                    className="w-1/3 py-3 bg-gray-500 text-white shadow-md hover:bg-gray-600 transition-colors font-semibold rounded-md"
                  >
                    Thoát
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MathQuizGenerate;
