import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
//import các components
import Header from "./components/Header";
import ArrowCursorProvider from "./components/ArrowCursorProvider";
import NotFound from "./pages/NotFound";
import PrivateRoute from "./components/PrivateRoute";
//import các layout
import MainLayout from "./layouts/MainLayout";
//import các trang
import Home from "./pages/Home";
import Login from "./pages/Login";
//import các trang học sinh-->tool
import ToolList from "./pages/students/tool/ToolList";
import ToolGame from "./pages/students/tool/tooldetail/ToolGame";
import ToolQuiz from "./pages/students/tool/tooldetail/ToolQuiz";
import ToolMusic from "./pages/students/tool/tooldetail/ToolMusic";
//import các trang học sinh-->test
import Index from "./pages/students/test/index";
import Instructions from "./pages/students/test/instructions";
import Exam from "./pages/students/test/exam";
// import các trang học sinh--->Results
import Results from "./pages/students/results/Results";
//import các trang học sinh-->subjects
import SubjectList from "./pages/students/subjects/SubjectList";
import LearningMethods from "./pages/students/subjects/LearningMethods";
//import các trang học sinh-->subjects-->math
import TopicMathMusicDetail from "./pages/students/subjects/math/music/TopicMathMusicDetail";
import TopicMathGameDetail from "./pages/students/subjects/math/game/TopicMathGameDetail";
import MathQuizList from "./pages/students/subjects/math/quiz/QuizList";
import MathQuizDetail from "./pages/students/subjects/math/quiz/MathQuizDetail";
// import các trang học sinh-->subjects-->tin
import TopicInforMusicDetail from "./pages/students/subjects/informatics/music/TopicInforMusicDetail";
import TopicInforGameDetail from "./pages/students/subjects/informatics/game/TopicInforGameDetail";
import InforQuizList from "./pages/students/subjects/informatics/quiz/InforQuizList";
import InforQuizDetail from "./pages/students/subjects/informatics/quiz/InforQuizDetail";
//import các trang học sinh-->subjects-->khoa học
import TopicScienceMusicDetail from "./pages/students/subjects/science/music/TopicScienceMusicDetail";
import TopicScienceGameDetail from "./pages/students/subjects/science/game/TopicScienceGameDetail";
import ScienceQuizList from "./pages/students/subjects/science/quiz/ScienceQuizList";
import ScienceQuizDetail from "./pages/students/subjects/science/quiz/ScienceQuizDetail";
// import các trang teacher
import QuestionRatioSettings from "./pages/teacher/QuestionRatioSettings";
function App() {
  const [goToSection, setGoToSection] = useState(null);

  return (
    <Router>
      <ArrowCursorProvider>
        <Header
          onLogout={() => {
            localStorage.removeItem("token");
          }}
        />
        <Routes>
          <Route
            element={
              <MainLayout
                onRegisterClick={() => {
                  setGoToSection(4);
                  setTimeout(() => setGoToSection(null), 200);
                }}
              />
            }
          >
            {/* Public routes */}
            <Route path="/" element={<Home goToSection={goToSection} />} />
            <Route path="/login" element={<Login />} />
            <Route path="/teacher" element={<QuestionRatioSettings />} />

            {/* Private routes */}
            <Route element={<PrivateRoute />}>
              <Route path="/test" element={<Index />} />
              <Route path="/test/instructions" element={<Instructions />} />
              <Route path="/test/exam" element={<Exam />} />

              <Route path="/tool" element={<ToolList />} />
              <Route path="/tool/game" element={<ToolGame />} />
              <Route path="/tool/quiz" element={<ToolQuiz />} />
              <Route path="/tool/music" element={<ToolMusic />} />

              <Route path="/results" element={<Results />} />

              <Route path="/subjects" element={<SubjectList />} />
              <Route
                path="/subjects/:subjectId"
                element={<LearningMethods />}
              />

              <Route
                path="/subjects/math/music"
                element={<TopicMathMusicDetail />}
              />
              <Route
                path="/subjects/math/game"
                element={<TopicMathGameDetail />}
              />
              <Route path="/subjects/math/quiz" element={<MathQuizList />} />
              <Route
                path="/subjects/math/quiz/:id"
                element={<MathQuizDetail />}
              />

              <Route
                path="/subjects/informatics/music"
                element={<TopicInforMusicDetail />}
              />
              <Route
                path="/subjects/informatics/game"
                element={<TopicInforGameDetail />}
              />
              <Route
                path="/subjects/informatics/quiz"
                element={<InforQuizList />}
              />
              <Route
                path="/subjects/informatics/quiz/:id"
                element={<InforQuizDetail />}
              />

              <Route
                path="/subjects/science/music"
                element={<TopicScienceMusicDetail />}
              />
              <Route
                path="/subjects/science/game"
                element={<TopicScienceGameDetail />}
              />
              <Route
                path="/subjects/science/quiz"
                element={<ScienceQuizList />}
              />
              <Route
                path="/subjects/science/quiz/:id"
                element={<ScienceQuizDetail />}
              />
            </Route>

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </ArrowCursorProvider>
    </Router>
  );
}

export default App;
