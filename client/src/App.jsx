import "./App.css";
import { Routes, Route } from "react-router-dom";
import CourseDetails from "./pages/student/CourseDetails";
import CourseLists from "./pages/student/CourseLists";
import MyEnrollments from "./pages/student/MyEnrollments";
import Home from "./pages/student/Home";
import Player from "./pages/student/Player";
import Loading from "./components/student/Loading";
import Educator from "./pages/educator/Educator";
import Dashboard from "./pages/educator/Dashboard";
import AddCourse from "./pages/educator/AddCourse";
import MyCourses from "./pages/educator/MyCourses";
import StudentsEnrolled from "./pages/educator/StudentsEnrolled";
import Navbar from "./components/student/Navbar";
import { useLocation } from "react-router-dom";
import "quill/dist/quill.snow.css";
function App() {
  const location = useLocation();
  const isEducatorRoute = location.pathname.includes("/educator");
  return (
    <div className="w-screen min-h-screen bg-white">
      {!isEducatorRoute && <Navbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="course-list" element={<CourseLists />} />
        <Route path="/course-list/:input" element={<CourseLists />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/my-enrollments" element={<MyEnrollments />} />
        <Route path="/player/:courseId" element={<Player />} />
        <Route path="/loading/:path" element={<Loading />} />

        <Route path="/educator" element={<Educator />}>
          <Route path="/educator" element={<Dashboard />} />
          <Route path="add-course" element={<AddCourse />} />
          <Route path="my-courses" element={<MyCourses />} />
          <Route path="students-enrolled" element={<StudentsEnrolled />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
