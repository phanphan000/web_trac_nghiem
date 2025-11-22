import React, { useState, useEffect } from "react";

const QuestionCountSettings = () => {
  const [subjects, setSubjects] = useState([]);
  const [topicsBySubject, setTopicsBySubject] = useState({});
  const [mode, setMode] = useState("combined"); // "combined" hoặc "bySubject"
  const [activeSubject, setActiveSubject] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    fetch("/api/subjects", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(async (data) => {
        setSubjects(data);
        // load topics cho từng môn
        const allTopics = {};
        for (let s of data) {
          const res = await fetch(`/api/subjects/${s.id}/topics`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
          });
          const tData = await res.json();
          allTopics[s.id] = tData.map((t) => ({
            ...t,
            easy_count: 0,
            medium_count: 0,
            hard_count: 0,
            total_questions: 0,
          }));
        }
        setTopicsBySubject(allTopics);
      })
      .catch((err) => console.error(err));
  }, []);

  // Khi click nav
  const handleModeChange = (newMode) => {
    setMode(newMode);
    if (newMode === "combined") {
      // tất cả topic của tất cả môn = 1 câu mỗi độ khó
      const updated = {};
      for (let sid in topicsBySubject) {
        updated[sid] = topicsBySubject[sid].map((t) => ({
          ...t,
          easy_count: 1,
          medium_count: 1,
          hard_count: 1,
          total_questions: 3,
        }));
      }
      setTopicsBySubject(updated);
    } else {
      setActiveSubject(null); // reset
    }
  };

  // Khi click table môn trong chế độ "bySubject"
  const handleSubjectClick = (subjectId) => {
    setActiveSubject(subjectId);
    const updated = {};
    for (let sid in topicsBySubject) {
      updated[sid] = topicsBySubject[sid].map((t) => ({
        ...t,
        easy_count: sid == subjectId ? 1 : 0,
        medium_count: sid == subjectId ? 1 : 0,
        hard_count: sid == subjectId ? 1 : 0,
        total_questions: sid == subjectId ? 3 : 0,
      }));
    }
    setTopicsBySubject(updated);
  };

  const handleChangeDifficulty = (subjectId, topicId, field, value) => {
    setTopicsBySubject((prev) => ({
      ...prev,
      [subjectId]: prev[subjectId].map((t) =>
        t.id === topicId
          ? {
              ...t,
              [field]: Number(value),
              total_questions:
                (field === "easy_count" ? Number(value) : t.easy_count) +
                (field === "medium_count" ? Number(value) : t.medium_count) +
                (field === "hard_count" ? Number(value) : t.hard_count),
            }
          : t
      ),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const settings = [];
    let totalQuestions = 0;
    for (let sid in topicsBySubject) {
      for (let t of topicsBySubject[sid]) {
        if (t.total_questions > 0) {
          // Kiểm tra số âm
          if (t.easy_count < 0 || t.medium_count < 0 || t.hard_count < 0) {
            alert(`Chủ đề "${t.name}" có số câu âm! Vui lòng nhập lại.`);
            return;
          }

          settings.push({
            topic_id: t.id,
            total_questions: t.total_questions,
            easy_count: t.easy_count,
            medium_count: t.medium_count,
            hard_count: t.hard_count,
          });

          totalQuestions += t.total_questions;
        }
      }
    }

    if (totalQuestions !== 30) {
      setErrorMessage(
        `Tổng số câu hỏi hiện tại là ${totalQuestions}, không phải 30. Vui lòng nhập lại!`
      );
      setShowModal(true);
      return;
    }

    const payload = {
      subject_id: activeSubject,
      title: "Đề kiểm tra",
      duration: 45,
      settings: settings.map((s) => ({
        ...s,
        is_active: true, // cấu hình mới luôn active
      })),
    };

    console.log("Payload gửi lên API:", payload);
    // Gửi sang backend
    fetch("/api/tests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(payload),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Kết quả từ backend:", data);
        alert("Cấu hình mới đã được lưu và đặt làm active!!");
      })
      .catch((err) => {
        console.error("Lỗi khi gửi dữ liệu:", err);
        alert("Có lỗi xảy ra khi tạo đề!");
      });
  };

  return (
    <div className="p-6 pt-30">
      <h2 className="text-xl font-bold mb-4 text-center">
        Thiết lập độ khó cho bài test
      </h2>

      {/* Nav */}
      <div className="flex justify-center space-x-4 mb-6">
        <button
          className={`px-4 py-2 rounded ${
            mode === "combined" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => handleModeChange("combined")}
        >
          Đề tổng hợp
        </button>

        <button
          className={`px-4 py-2 rounded ${
            mode === "bySubject" ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => handleModeChange("bySubject")}
        >
          Đề theo môn học
        </button>
      </div>

      {/* Tables: 3 bảng cùng 1 hàng ngang */}
      <div className="grid grid-cols-3 gap-6">
        {subjects.map((s) => (
          <div key={s.id} className="border rounded p-4 cursor-pointer">
            <h3
              className="font-semibold mb-2"
              onClick={() => mode === "bySubject" && handleSubjectClick(s.id)}
            >
              {s.name}
            </h3>

            <table className="w-full border">
              <thead>
                <tr>
                  <th className="border px-2">Topic</th>
                  <th className="border px-2">Easy</th>
                  <th className="border px-2">Medium</th>
                  <th className="border px-2">Hard</th>
                </tr>
              </thead>

              <tbody>
                {topicsBySubject[s.id]?.map((t) => (
                  <tr key={t.id}>
                    <td className="border px-2">{t.name}</td>

                    <td className="border px-2">
                      <input
                        type="number"
                        min="0"
                        value={t.easy_count}
                        onChange={(e) =>
                          handleChangeDifficulty(
                            s.id,
                            t.id,
                            "easy_count",
                            e.target.value
                          )
                        }
                        className="w-16 border rounded px-1"
                      />
                    </td>

                    <td className="border px-2">
                      <input
                        type="number"
                        min="0"
                        value={t.medium_count}
                        onChange={(e) =>
                          handleChangeDifficulty(
                            s.id,
                            t.id,
                            "medium_count",
                            e.target.value
                          )
                        }
                        className="w-16 border rounded px-1"
                      />
                    </td>

                    <td className="border px-2">
                      <input
                        type="number"
                        min="0"
                        value={t.hard_count}
                        onChange={(e) =>
                          handleChangeDifficulty(
                            s.id,
                            t.id,
                            "hard_count",
                            e.target.value
                          )
                        }
                        className="w-16 border rounded px-1"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      <button
        onClick={handleSubmit}
        className="bg-green-600 text-white px-4 py-2 rounded mt-6"
      >
        Lưu cấu hình
      </button>
      {/* Modal cảnh báo */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/1 backdrop-blur-sm bg-opacity-40">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h3 className="text-lg font-bold mb-4">Thông báo</h3>
            <p className="mb-4">{errorMessage}</p>
            <button
              onClick={() => setShowModal(false)}
              className="bg-red-600 text-white px-4 py-2 rounded"
            >
              Đóng
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionCountSettings;
