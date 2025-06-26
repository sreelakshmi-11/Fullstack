import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/appContext";
import { assets } from "../../assets/assets";
import { useParams } from "react-router-dom";
import humanizeDuration from "humanize-duration";
import YouTube from "react-youtube";
import Footer from "../../components/student/Footer";
import Rating from "../../components/student/Rating";

const Player = () => {
  const { enrolledCourses, calculateLectureDuration } = useContext(AppContext);

  const [courseData, setCourseData] = useState(null);
  const [openSection, setOpenSection] = useState({});
  const { courseId } = useParams();
  const [playerData, setPlayerData] = useState();

  const getCourseData = () => {
    enrolledCourses.map((course) => {
      if (course._id === courseId) {
        setCourseData(course);
      }
    });
  };

  useEffect(() => {
    getCourseData();
  }, [enrolledCourses]);
  const toggleSection = (i) => {
    setOpenSection((prev) => ({
      ...prev,
      [i]: !prev[i],
    }));
  };
  return (
    <>
      <div className="grid grid-cols-2 gap-10 px-36 py-20 mb-[50px]">
        <div className="flex flex-col text-gray-800 gap-3">
          <h1 className="text-[20px]">Course Structure</h1>
          <div className="w-full flex flex-col gap-3">
            {courseData &&
              courseData.courseContent.map((chapter, index) => (
                <div key={index}>
                  <div
                    className="flex justify-between p-[15px] bg-[#f7f9fD] "
                    onClick={() => toggleSection(index)}
                  >
                    <div className="flex gap-2">
                      <img
                        src={assets.down_arrow_icon}
                        className={`transform transition-transform ${
                          openSection[index] ? "rotate-180" : ""
                        }`}
                      />

                      <div>{chapter.chapterTitle}</div>
                    </div>
                    <div>
                      {chapter.chapterContent.length} lectures-
                      {calculateLectureDuration(chapter)}
                    </div>
                  </div>
                  <div
                    className={`overflow-hidden ${
                      openSection[index] ? "max-h-[90]" : "max-h-0"
                    }`}
                  >
                    <ul className="py-[20px] border border-[#E3e3e3] ">
                      {chapter.chapterContent.map((lecture, i) => (
                        <div
                          className="flex justify-between px-[20px] py-[10px]"
                          key={i}
                        >
                          <div className="flex gap-2 ">
                            <img src={assets.play_icon} />
                            <p>{lecture.lectureTitle}</p>
                          </div>

                          <div className="flex gap-3">
                            <div>
                              {lecture.lectureUrl && (
                                <p
                                  onClick={() =>
                                    setPlayerData({
                                      ...lecture,
                                      chapter: index + 1,
                                      lecture: i + 1,
                                    })
                                  }
                                  className="text-blue-500"
                                >
                                  Watch
                                </p>
                              )}
                            </div>
                            <div>
                              {" "}
                              {humanizeDuration(
                                lecture.lectureDuration * 60 * 1000,
                                { units: ["h", "m"] }
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
          </div>
          <div className="flex items-center font-bold">
            Rate this course : <Rating intialRating={0} />
          </div>
        </div>
        {/* right column */}
        <div>
          {playerData ? (
            <div>
              <YouTube
                videoId={playerData.lectureUrl.split("/").pop()}
                iframeClassName="w-full aspect-video"
              />
              <div className="flex justify-between items-center mt-1">
                <p>
                  {playerData.chapter}.{playerData.lecture}
                  {playerData.lectureTitle}
                </p>
                <button className="text-blue-600">
                  {false ? "Completed" : "Mark Complete"}
                </button>
              </div>
            </div>
          ) : (
            <img src={courseData ? courseData.courseThumbnail : ""} alt="" />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Player;
