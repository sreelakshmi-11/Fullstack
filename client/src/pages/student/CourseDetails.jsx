import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/appContext";
import { assets } from "../../assets/assets";
import Footer from "../../components/student/Footer";
import humanizeDuration from "humanize-duration";
import YouTube from "react-youtube";

const CourseDetails = () => {
  const { id } = useParams();

  const {
    allCourses,
    calculateRating,
    calculateLectureDuration,
    calculateCourseDuration,
    calculateTotalLectures,
    currency,
  } = useContext(AppContext);
  const [courseData, setCourseData] = useState();
  const [openSection, setOpenSection] = useState(false);
  const [isAlreadyEnrolled, setIsAlreadyEnrolled] = useState(false);
  const [playerData, setPlayerData] = useState(null);
  const fetchCourseDetails = () => {
    if (allCourses && allCourses.length > 0) {
      const findCourse = allCourses.find((course) => course._id === id);
      setCourseData(findCourse);
    }
  };

  useEffect(() => {
    fetchCourseDetails();
  }, [allCourses, id]);

  const toggleSection = (i) => {
    setOpenSection((prev) => ({
      ...prev,
      [i]: !prev[i],
    }));
  };
  if (!courseData) return <div>Loading...</div>;

  return (
    <>
      <div className="flex w-full p-[100px] gap-[20%] space-y-7 bg-gradient-to-b from-cyan-100/70">
        <div className="flex flex-col w-[50%] items-start gap-4">
          <h1 className="text-[40px] font-medium">{courseData.courseTitle}</h1>
          <div
            dangerouslySetInnerHTML={{
              __html: courseData.courseDescription.slice(0, 200),
            }}
            className="text-[16px] font-normal text-[#565656]"
          ></div>
          <div className="flex items-center justify-center gap-2">
            <p>{calculateRating(courseData)}</p>
            <div className="flex">
              {Array.from({ length: 5 }).map((_, index) => (
                <img
                  src={
                    index < Math.floor(calculateRating(courseData))
                      ? assets.star
                      : assets.star_blank
                  }
                  alt="star"
                  key={index}
                />
              ))}
            </div>
            ({" "}
            <p className="text-gray-500">
              {courseData.courseRatings.length}{" "}
              {courseData.courseRatings.length > 1 ? "ratings" : "rating"}
            </p>
            )
            <p>
              {courseData.enrolledStudents.length}
              {courseData.enrolledStudents.length > 1 ? "students" : "student"}
            </p>
          </div>
          <p className="text-[#565656]">course by GreatStack</p>
          <div className="flex flex-col mt-[30px]">
            <h2 className="text-[20px] font-bold">Course Structure</h2>
            <p>
              {calculateTotalLectures(courseData)} lectures-
              {calculateCourseDuration(courseData)} total duration
            </p>
          </div>
          <div className="w-full flex flex-col gap-3">
            {courseData.courseContent.map((chapter, i) => (
              <div key={i}>
                <div
                  className="flex justify-between p-[15px] bg-[#f7f9fD] "
                  onClick={() => toggleSection(i)}
                >
                  <div className="flex gap-2">
                    <img
                      src={assets.down_arrow_icon}
                      className={`transform transition-transform ${
                        openSection[i] ? "rotate-180" : ""
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
                    openSection[i] ? "max-h-[90]" : "max-h-0"
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
                            {lecture.isPreviewFree && (
                              <p
                                onClick={() =>
                                  setPlayerData({
                                    videoId: lecture.lectureUrl
                                      .split("/")
                                      .pop(),
                                  })
                                }
                                className="text-blue-500"
                              >
                                Preview
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
          <div className="mt-[50px] text-[20px] font-bold">
            Course Description
          </div>
          <div
            dangerouslySetInnerHTML={{
              __html: courseData.courseDescription,
            }}
            className="text-[16px] font-normal text-[#565656]"
          ></div>
        </div>
        <div className="w-[30%] flex flex-col">
          {playerData ? (
            <YouTube
              videoId={playerData.videoId}
              opts={{ playerVars: { autoplay: 1 } }}
              iframeClassName="w-full aspect-video"
            />
          ) : (
            <img
              src={courseData.courseThumbnail}
              alt="thumbnail"
              className=" flex justify-center items-center object-cover"
            />
          )}
          <div className="flex flex-col p-[30px] gap-[15px] border">
            <div className="flex gap-2">
              <img src={assets.time_left_clock_icon} />
              <div className="text-[red]">{5}days left at this price!</div>
            </div>
            <div className="flex items-center gap-5 text-[18px]">
              <div className="text-[34px]">
                {currency}
                {(
                  courseData.coursePrice -
                  (courseData.discount * courseData.coursePrice) / 100
                ).toFixed(2)}
              </div>
              <div className="text-[18px] line-through">
                {currency}
                {courseData.coursePrice}
              </div>

              <div>{courseData.discount}% off</div>
            </div>
            <div className="flex gap-4 ">
              <div className="flex text-nowrap gap-2 ">
                <img src={assets.star} />
                <div>{calculateRating(courseData)}</div>
              </div>
              <div className="h-4 w-px bg-gray-500/40"></div>
              <div className="flex text-nowrap gap-2">
                <img src={assets.time_clock_icon} />
                <div>{calculateCourseDuration(courseData)}</div>
              </div>
              <div className="h-4 w-px bg-gray-500/40"></div>
              <div className="flex text-nowrap gap-2">
                <img src={assets.lesson_icon} />
                <div>{calculateTotalLectures(courseData)} lessons</div>
              </div>
            </div>
            <button className="h-[48px] bg-[#4B7BFF] text-white">
              {isAlreadyEnrolled ? "Already Enrolled" : "Enroll now"}
            </button>
            <div className="flex flex-col  gap-2">
              <h2 className="text-[18px] font-medium">What’s in the course?</h2>
              <div>
                <ul className="text-[14px] text-[#565656]">
                  <li>Lifetime access with free updates.</li>
                  <li>Step-by-step, hands-on project guidance.</li>
                  <li>LDownloadable resources and source code..</li>
                  <li>Quizzes to test your knowledge.</li>
                  <li>Certificate of completion.</li>
                  <li>LQuizzes to test your knowledge..</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CourseDetails;
