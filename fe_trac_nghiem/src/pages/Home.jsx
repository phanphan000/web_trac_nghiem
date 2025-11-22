import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
// import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { register } from "../services/auth";

function Section1({ goToSection }) {
  const handleRegisterClick = () => {
    goToSection(4); // chuyển đến Section5
  };
  return (
    <div className="h-full mx-10 flex items-center justify-between">
      <img
        src="/assets/students/Slide 2/Slide 2.3.png"
        alt="Login Background"
        className="absolute inset-0 w-full h-full object-contain object-bottom z-0"
      />
      <div className="w-full md:w-3/5 z-10 text-center md:text-left">
        <h1 className="text-2xl md:text-7xl mb-4 md:mb-6 primary-text-color text-center">
          WELCOME TO
        </h1>
        <h1 className="text-2xl md:text-7xl mb-4 md:mb-6 primary-text-color text-center">
          BRAINY LAND
        </h1>
        <p className="text-lg md:text-4xl primary-text-color mb-2 md:mb-3 text-center">
          Một sân chơi toàn diện cho Math,Science,Tin học
        </p>
        <p className="text-lg md:text-4xl primary-text-color mb-2 md:mb-3 text-center">
          Dành riêng cho Học sinh Ngôi Sao Hoàng Mai.
        </p>
      </div>

      <div className="w-full md:w-2/5 flex justify-center md:justify-between z-10 mt-6 md:mb-40">
        <button
          onClick={handleRegisterClick}
          className="py-3 px-6 md:py-6 md:px-8 rounded-4xl font-bold text-lg md:text-4xl
          bg-[#ef7131] text-white shadow-xl"
        >
          JOIN NOW FOR FREE
        </button>
      </div>
    </div>
  );
}
function Section2() {
  return (
    <div className="h-full w-full flex justify-between absolute z-100 pt-50">
      <div className="w-1/2 relative">
        <img
          src="/assets/students/Slide 3/Slide 3.1.png"
          alt="Slide 3.1.png"
          className="object-cover w-full"
        />
        <div className="absolute md:bottom-0">
          <img
            src="/assets/students/Slide 3/Slide 3.2.png"
            alt="Slide 3.2.png"
            className="w-30 h-30 md:w-60 md:h-60 object-contain"
          />
        </div>
      </div>

      <div className="w-1/2">
        <div className=" w-full">
          <div
            className="inline-flex flex-col justify-center items-center 
                 bg-contain bg-center bg-no-repeat 
                 px-20 
                 text-center"
            style={{
              backgroundImage: "url('/assets/students/Slide 3/Slide 3.4.png')",
              backgroundSize: "100% 250%",
            }}
          >
            <p className="text-base md:text-3xl font-semibold primary-text-color leading-snug m-4 md:m-10">
              Dành cho HS Tiểu học
              <br /> từ khối 3 - khối 5
            </p>
          </div>
        </div>
        <div className=" w-full mb-10">
          <div
            className="inline-flex flex-col justify-center items-center 
                 bg-contain bg-center bg-no-repeat 
                 py-10 md:p-12 lg:p-14 
                 text-center"
            style={{
              backgroundImage: "url('/assets/students/Slide 3/Slide 3.3.png')",
              backgroundSize: "100% 100%",
            }}
          >
            <p className="text-lg md:text-3xl font-semibold primary-text-color leading-snug m-10">
              Nội dung bám sát chương trình <br />
              Math, Science và Tin học <br />
              trường Ngôi Sao Hoàng Mai
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
function Section3() {
  return (
    <div className="h-full mx-4 md:mx-10 flex flex-col md:flex-row justify-between relative pt-25">
      <div className="text-center w-full md:scale-90">
        {/* Tiêu đề */}
        <div className="mb-1">
          <h1 className="text-2xl md:text-6xl primary-text-color">
            Khơi trí tuệ - Mở tương lai
          </h1>
          <div className="mt-3 flex  md:flex-row justify-center gap-4 md:gap-20 text-base md:text-xl font-semibold mb-6 md:mb-10">
            <p className="primary-text-color">Sáng Tạo</p>
            <p className="primary-text-color">Tự Học</p>
            <p className="primary-text-color">Làm Chủ Kiến Thức</p>
          </div>
        </div>

        {/* Nội dung 2 cột */}
        <div className="flex md:flex-row">
          {/* Cột trái */}
          <div className="w-full  md:w-1/2 space-y-6 md:space-y-10 mt-6 md:mt-0">
            <div className="flex md:flex-row items-center justify-center gap-2 md:gap-4">
              <img
                src="/assets/students/Slide 4/Slide 4.1.png"
                alt="Slide 4.1.png"
                className="w-16 md:w-35"
              />
              <span className="text-lg md:text-4xl primary-text-color">
                Cá nhân hóa lộ trình học tập
              </span>
            </div>
            <div className="mx-auto">
              <img
                src="/assets/students/Slide 4/Slide 4.5.png"
                alt=""
                className="w-1/2 md:w-2/7 mx-auto"
              />
            </div>

            <div className="flex md:flex-row items-center justify-center gap-2 md:gap-4">
              <img
                src="/assets/students/Slide 4/Slide 4.3.png"
                alt="Slide 4.3.png"
                className="w-16 md:w-35"
              />
              <span className="text-lg md:text-4xl primary-text-color">
                Học tập qua trò chơi
              </span>
            </div>
            <div className="mx-auto">
              <img
                src="/assets/students/Slide 4/Slide 4.7.png"
                alt=""
                className="w-1/2 md:w-2/7 mx-auto"
              />
            </div>
          </div>

          {/* Cột phải */}
          <div className="w-full md:w-1/2 space-y-6 md:space-y-10 mt-6 md:mt-0">
            <div className="flex md:flex-row items-center justify-center gap-2 md:gap-4">
              <img
                src="/assets/students/Slide 4/Slide 4.2.png"
                alt="Slide 4.2.png"
                className="w-16 md:w-35"
              />
              <span className="text-lg md:text-4xl primary-text-color">
                Nhạc hóa kiến thức
              </span>
            </div>
            <div className="mx-auto">
              <img
                src="/assets/students/Slide 4/Slide 4.6.png"
                alt=""
                className="w-1/2 md:w-2/7 mx-auto"
              />
            </div>

            <div className="flex md:flex-row items-center justify-center gap-2 md:gap-4">
              <img
                src="/assets/students/Slide 4/Slide 4.4.png"
                alt="Slide 4.4.png"
                className="w-16 md:w-35"
              />
              <span className="text-lg md:text-4xl primary-text-color">
                Bảng xếp hạng học tập
              </span>
            </div>
            <div className="mx-auto">
              <img
                src="/assets/students/Slide 4/Slide 4.8.png"
                alt=""
                className="w-1/2 md:w-2/7 mx-auto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section4() {
  return (
    <div className="h-full mx-4 md:mx-10 flex justify-between relative pt-17 md:pt-35">
      <div className="text-center w-full">
        {/* Heading */}
        <div className="mb-1">
          <h1 className="text-2xl md:text-6xl primary-text-color leading-snug">
            Chuẩn kiến thức cùng <br />
            GV Ngôi Sao Hoàng Mai
          </h1>
        </div>

        {/* Teacher cards */}
        <div className="grid grid-cols-2 md:flex items-start justify-center gap-2 md:gap-6">
          {/* Card 1 */}
          <div className="mt-6 md:mt-10 w-full md:w-auto">
            <img
              src="/assets/students/Slide 5/Slide 5.1.png"
              alt=""
              className="w-40 md:w-90 mx-auto"
            />
            <div className="w-full md:w-fit mx-auto text-center md:text-left m-2 md:ml-20">
              <p className="text-lg md:text-3xl primary-text-color">
                Giáo viên
              </p>
              <p className="text-lg md:text-3xl primary-text-color">
                Lê Thị Thu Trang
              </p>
              <p className="bg-red-200 inline-block p-1 primary-text-color text-sm md:text-xl">
                Creative Project Lead
              </p>
              <ul className="md:list-disc list-none primary-text-color mx-4 text-sm md:text-base">
                <li>Thạc sĩ Giáo dục học</li>
                <li>
                  Cử nhân bằng Giỏi SP <br /> Toán Tiếng Anh
                </li>
                <li>Top 10 AI Super Teacher 2025</li>
              </ul>
            </div>
          </div>

          {/* Card 2 */}
          <div className="mt-6 w-full md:mt-10 md:w-auto">
            <img
              src="/assets/students/Slide 5/Slide 5.2.png"
              alt=""
              className="w-40 md:w-90 mx-auto"
            />
            <div className="w-full md:w-fit mx-auto text-center md:text-left m-2 md:ml-20">
              <p className="text-lg md:text-3xl primary-text-color">
                Giáo viên
              </p>
              <p className="text-lg md:text-3xl primary-text-color">
                Bùi Thu Trang
              </p>
              <p className="bg-red-200 inline-block p-1 primary-text-color text-sm md:text-xl">
                Web Developer
              </p>
              <ul className="md:list-disc list-none primary-text-color mx-4 text-sm md:text-base">
                <li>Cử nhân SP Tin học Top</li>
                <li>Top 10 AI Super Teacher 2025</li>
              </ul>
            </div>
          </div>

          {/* Card 3 */}
          <div className="w-full md:mt-10 md:w-auto">
            <img
              src="/assets/students/Slide 5/Slide 5.3.png"
              alt=""
              className="w-40 md:w-90 mx-auto"
            />
            <div className="w-full md:w-fit mx-auto text-center md:text-left m-2 md:ml-20">
              <p className="text-lg md:text-3xl primary-text-color">
                Giáo viên
              </p>
              <p className="text-lg md:text-3xl primary-text-color">
                Nguyễn Thị Lan
              </p>
              <p className="bg-red-200 inline-block p-1 primary-text-color text-sm md:text-xl">
                UI/UX Designer
              </p>
              <ul className="md:list-disc list-none primary-text-color mx-4 text-sm md:text-base">
                <li>
                  Cử nhân bằng Xuất sắc <br /> SP Vật Lí Tiếng Anh
                </li>
                <li>Top 4 AI Super Teacher 2025</li>
              </ul>
            </div>
          </div>

          {/* Card 4 */}
          <div className="w-full md:mt-10 md:w-auto">
            <img
              src="/assets/students/Slide 5/Slide 5.4.png"
              alt=""
              className="w-40 md:w-90 mx-auto"
            />
            <div className="w-full md:w-fit mx-auto text-center md:text-left m-2 md:ml-20">
              <p className="text-lg md:text-3xl primary-text-color">
                Giáo viên
              </p>
              <p className="text-lg md:text-3xl primary-text-color">
                Trịnh Minh Dung
              </p>
              <p className="bg-red-200 inline-block p-1 primary-text-color text-sm md:text-xl">
                Academic Advisor
              </p>
              <ul className="md:list-disc list-none primary-text-color mx-4 text-sm md:text-base">
                <li>
                  Cử nhân bằng Giỏi SP <br /> Vật Lí Tiếng Anh
                </li>
                <li>Top 4 AI Super Teacher 2025</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Section5() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    full_name: "",
    email: "",
    role: "student", // mặc định là student
    class_id: "", // khớp với backend
  });

  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // navigate("/login");

    // validate cơ bản
    if (
      !formData.full_name ||
      !formData.username ||
      !formData.password ||
      !formData.email
    ) {
      setMessage("Vui lòng điền đầy đủ thông tin!");
      return;
    }
    if (formData.password.length < 6) {
      setMessage("Mật khẩu phải có ít nhất 6 ký tự!");
      return;
    }

    try {
      const res = await register(formData); // gọi API
      console.log("Register success:", res);
      setMessage("Đăng ký thành công! 🎉");

      // reset form
      setTimeout(() => {
        setFormData({
          username: "",
          password: "",
          full_name: "",
          email: "",
          role: "student",
          class_id: "",
        });
        setMessage("");
      }, 2000);
    } catch (err) {
      console.error(err);
      setMessage("Đăng ký thất bại!");
    }
  };

  return (
    <div className="h-full mx-4 md:mx-10 flex justify-between relative pt-20 md:pt-40">
      <div className="max-w-4xl mx-auto w-full">
        <div className="mb-5 text-center">
          <h1 className="text-2xl md:text-6xl primary-text-color">Đăng Kí</h1>
        </div>
        <form
          onSubmit={handleSubmit}
          className="space-y-6 md:space-y-8 md:mr-15"
        >
          {/* Họ tên */}
          <div className="flex md:flex-row items-center gap-4 md:gap-8">
            <label className="primary-text-color text-base md:text-2xl w-1/3 md:w-48">
              Họ tên
            </label>
            <input
              type="text"
              name="full_name"
              value={formData.full_name}
              onChange={handleInputChange}
              className="px-4 md:px-20 py-3 md:py-4 text-center rounded-full border-2 border-orange-400 bg-white focus:outline-none focus:border-orange-500 text-sm md:text-lg w-full md:w-[500px]"
            />
          </div>

          {/* Email */}
          <div className="flex md:flex-row items-center gap-4 md:gap-8">
            <label className="primary-text-color text-base md:text-2xl w-1/3 md:w-48">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="px-4 md:px-20 py-3 md:py-4 text-center rounded-full border-2 border-orange-400 bg-white focus:outline-none focus:border-orange-500 text-sm md:text-lg w-full md:w-[500px]"
            />
          </div>

          {/* Lớp */}
          <div className="flex md:flex-row items-center gap-4 md:gap-8">
            <label className="primary-text-color text-base md:text-2xl w-1/3 md:w-48">
              Lớp
            </label>
            <input
              type="text"
              name="class_id"
              value={formData.class_id}
              onChange={handleInputChange}
              className="px-4 md:px-20 py-3 md:py-4 text-center rounded-full border-2 border-orange-400 bg-white focus:outline-none focus:border-orange-500 text-sm md:text-lg w-full md:w-[500px]"
            />
          </div>

          {/* Tên đăng nhập */}
          <div className="flex md:flex-row items-center gap-4 md:gap-8">
            <label className="primary-text-color text-base md:text-2xl w-1/3 md:w-48">
              Tên đăng nhập
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="px-4 md:px-20 py-3 md:py-4 text-center rounded-full border-2 border-orange-400 bg-white focus:outline-none focus:border-orange-500 text-sm md:text-lg w-full md:w-[500px]"
            />
          </div>

          {/* Mật khẩu */}
          <div className="flex md:flex-row items-center gap-4 md:gap-8">
            <label className="primary-text-color text-base md:text-2xl w-1/3 md:w-48">
              Mật khẩu
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="px-4 md:px-20 py-3 md:py-4 text-center rounded-full border-2 border-orange-400 bg-white focus:outline-none focus:border-orange-500 text-sm md:text-lg w-full md:w-[500px]"
            />
          </div>

          {/* Nút đăng ký */}
          <div className="flex justify-center mt-8">
            <button
              type="submit"
              className="bg-[#ef7131] text-white font-semibold text-base md:text-xl px-8 md:px-20 py-3 md:py-5 rounded-full"
            >
              Đăng ký
            </button>
          </div>

          {/* Thông báo */}
          {message && (
            <div
              className={`text-center text-sm md:text-lg font-semibold ${
                message.includes("thành công")
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {message}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default function SmoothFullpageScroll({ goToSection }) {
  const [currentSection, setCurrentSection] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const touchStartY = useRef(0);

  const sections = [
    {
      id: 0,
      component: (
        <Section1
          goToSection={(id) => {
            setCurrentSection(id);
            setIsScrolling(true);
          }}
        />
      ),
    },
    {
      id: 1,
      component: <Section2 />,
      backgroundUrl: null,
    },
    { id: 2, component: <Section3 /> },
    { id: 3, component: <Section4 /> },
    {
      id: 4,
      component: <Section5 />,
      backgroundUrl: "/assets/students/Slide 2/Slide 2.3.png",
    },
  ];

  useEffect(() => {
    let scrollTimeout;

    const handleWheel = (e) => {
      if (isScrolling) return;

      e.preventDefault();

      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        if (e.deltaY > 0 && currentSection < sections.length - 1) {
          // Scroll down
          setCurrentSection((prev) => prev + 1);
          setIsScrolling(true);
        } else if (e.deltaY < 0 && currentSection > 0) {
          // Scroll up
          setCurrentSection((prev) => prev - 1);
          setIsScrolling(true);
        }
      }, 50);
    };

    const handleTouchStart = (e) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (isScrolling) return;

      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY.current - touchEndY;

      if (Math.abs(diff) > 50) {
        if (diff > 0 && currentSection < sections.length - 1) {
          setCurrentSection((prev) => prev + 1);
          setIsScrolling(true);
        } else if (diff < 0 && currentSection > 0) {
          setCurrentSection((prev) => prev - 1);
          setIsScrolling(true);
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart);
    window.addEventListener("touchend", handleTouchEnd);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      clearTimeout(scrollTimeout);
    };
  }, [currentSection, isScrolling]);

  useEffect(() => {
    if (isScrolling) {
      const timer = setTimeout(() => setIsScrolling(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [isScrolling]);

  useEffect(() => {
    if (goToSection !== null && goToSection !== currentSection) {
      setCurrentSection(goToSection);
      setIsScrolling(true);
    }
  }, [goToSection, currentSection]);

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Sections */}
      <AnimatePresence initial={false}>
        <motion.div
          key={currentSection}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{
            duration: 0.7,
            ease: [0.43, 0.13, 0.23, 0.96],
          }}
          className={`absolute inset-0 flex justify-centers`}
        >
          {sections[currentSection].backgroundUrl && (
            <img
              key={currentSection + "-bg"}
              src={sections[currentSection].backgroundUrl}
              alt="Section Background"
              className="absolute inset-0 w-full h-full 
                                object-contain object-bottom z-0"
            />
          )}

          <div className="absolute inset-0 z-10">
            {sections[currentSection].component}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
