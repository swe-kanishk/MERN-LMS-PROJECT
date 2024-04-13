import Course from "../models/courseModel.js";
import AppError from "../utils/errorUtil.js";

const getAllCourses = async function (req, res, next) {
  try {
    const courses = await Course.find({}).select("-lectures");
    if (!courses) {
      return res.status(404).json({
        success: false,
        message: "No courses found",
        courses: [],
      });
    }
    res.status(200).json({
      success: true,
      message: "All courses",
      courses,
    });
  } catch (err) {
    return next(new AppError(err.message, 500));
  }
};

const getLecturesByCourseId = async function (req, res, next) {
  try {
    const { id } = req.params;

    const course = await Course.findById(id);
    if(!course){
    return next(new AppError('course not found', 500));

    }

    res.json(200).json({
      success: true,
      message: "Course lectures fetched Successfully",
    });
  } catch (err) {
    return next(new AppError(err.message, 500));
  }
};

export { getAllCourses, getLecturesByCourseId };
