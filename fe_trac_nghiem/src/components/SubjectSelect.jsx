import { useNavigate } from "react-router-dom";

export default function SubjectSelect({ onClose }) {
  const navigate = useNavigate();

  const subjects = [
    { id: 1, name: "Toán", type: "subject" },
    { id: 2, name: "Tin học", type: "subject" },
    { id: 3, name: "Science", type: "subject" },
    { key: "combined", name: "Tổng hợp", type: "mode" },
  ];

  const handleSelect = (item) => {
    if (item.type === "subject") {
      navigate(`/test/exam?subject_id=${item.id}`);
    } else {
      navigate(`/test/exam?mode=combined`);
    }
    onClose?.(); // đóng modal sau khi chọn
  };

  return (
    /* Overlay */
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-[1px]">
      {/* Modal box */}
      <div className="bg-[var(--color-background)] p-6 rounded-xl shadow-xl text-center w-[90%] max-w-md">
        <h1 className="text-2xl font-bold mb-4">Chọn môn để bắt đầu</h1>

        <div className="grid grid-cols-2 gap-4">
          {subjects.map((item) => (
            <button
              key={item.name}
              onClick={() => handleSelect(item)}
              className="px-4 py-2 bg-[var(--color-secondary)] text-white shadow-md hover:scale-105 transition-transform rounded-lg"
            >
              {item.name}
            </button>
          ))}
        </div>

        {/* nút đóng (tuỳ chọn) */}
        <button
          onClick={onClose}
          className="mt-4 text-sm text-gray-500 hover:underline"
        >
          Đóng
        </button>
      </div>
    </div>
  );
}
