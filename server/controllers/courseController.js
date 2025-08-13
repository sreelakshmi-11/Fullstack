import Course from "../models/Course.js";

export const getAllCourse = async (req, res) => {
  try {
    const courses = await Course.find({ isPublished: true })
      .select(["-courseContent", "-enrolledStudents"])
      .populate({ path: "educator" });

    res.json({ success: true, courses });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getCourseById = async (req, res) => {
  const { id } = req.params;
  try {
    let course = await (
      await Course.findById(id)
    ).populate({ path: "educator" });
    //remove lectureUrl if ispreview isfalse

    // course.courseContent.map((chapter) =>
    //   chapter.chapterContent.map((lecture) => {
    //     if (!lecture.isPreviewFree) {
    //       lecture.lectureUrl = "";
    //     }
    //   })
    // );

    res.json({ success: true, course });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};
