import { clerkClient } from "@clerk/express";
import Course from "../models/Course.js";
import { v2 as cloudinary } from "cloudinary";

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
    const educatorId = req.auth.userId;

    if (!imageFile) {
      return res.json({ success: false, message: "Thumbnail not attached" });
    }

    const parsedCourseData = JSON.parse(courseData);
    parsedCourseData.educator = educatorId;

    const newCourse = await Course.create(parsedCourseData);
    const imageUpload = await cloudinary.uploader.upload(imageFile.path);
    newCourse.thumbnail = imageUpload.secure_url;
    console.log("Educator ID:", educatorId);
    await newCourse.save();

    res.json({ success: true, message: "Course added successfully" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
};

export const getEducatorCourses = async (req, res) => {
  try {
    const educator = req.auth.userId;
    const courses = await Course.find({ educator });
    res.json({ success: true, courses });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
