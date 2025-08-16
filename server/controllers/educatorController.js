import { clerkClient } from "@clerk/express";
import Course from "../models/Course.js";
import { v2 as cloudinary } from "cloudinary";
import { Purchase } from "../models/Purchase.js";

export const updateRoleToEducator = async (req, res) => {
  try {
    const { userId } = req.auth();
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "User not authenticated" });
    }
    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: { role: "educator" },
    });
    res.json({ success: true, message: "you can publish a course now" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

export const addCourse = async (req, res) => {
  try {
    const { courseData } = req.body;
    const imageFile = req.file;
    // const educatorId = req.auth.userId;

    if (!imageFile) {
      return res.json({ success: false, message: "Thumbnail not attached" });
    }

    const parsedCourseData = JSON.parse(courseData);
    // parsedCourseData.educator = educatorId;

    const newCourse = await Course.create(parsedCourseData);
    const imageUpload = await cloudinary.uploader.upload(imageFile.path);
    newCourse.thumbnail = imageUpload.secure_url;
    // console.log("Educator ID:", educatorId);
    await newCourse.save();

    res.json({ success: true, message: "Course added successfully" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

export const getEducatorCourses = async (req, res) => {
  try {
    const { userId } = req.auth();
    console.log("Educator Id", educator);
    const courses = await Course.find({ userId });
    res.json({ success: true, courses });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const educatordashboardData = async (req, res) => {
  try {
    const educator = req.auth.userId;
    const courses = await Course.find({ educator });
    const totalCourses = courses.length;

    const courseIds = courses.map((course) => course._id);
    const purchases = await Purchase.find({
      courseId: { $in: courseIds },
      status: "completed",
    });
    const totalEarnings = purchases.reduce(
      (sum, purchase) => sum + purchase.amount,
      0
    );

    const enrolledStudentsData = [];
    for (const course of courses) {
      const students = await User.find(
        {
          _id: { $in: course.enrolledStudents },
        },
        "name imageUrl"
      );

      students.forEach((student) => {
        enrolledStudentsData.push({
          courseTitle: course.courseTitle,
          student,
        });
      });
    }
    res.json({
      success: true,
      dashboardData: { totalEarnings, enrolledStudentsData, totalCourses },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

export const getEnrolledStudentsData = async (req, res) => {
  try {
    const educator = req.auth.userId;
    const courses = await Course.find({ educator });
    const courseIds = courses.map((course) => course._id);

    const purchases = await Purchase.find({
      courseId: { $in: courseIds },
      status: "completed",
    })
      .populate("userId", "name imageurl")
      .populate("courseId", "courseTitle");

    const enrolledStudents = purchases.map((purchases) => ({
      student: purchases.userId,
      courseTitle: purchases.courseId.courseTitle,
      purchaseDate: purchases.createdAt,
    }));
    res.json({ success: true, enrolledStudents });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
