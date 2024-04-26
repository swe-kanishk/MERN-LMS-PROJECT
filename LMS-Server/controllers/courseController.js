import Course from "../models/courseModel.js";
import AppError from "../utils/errorUtil.js";
import fs from "fs/promises";
import cloudinary from "cloudinary";

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
    if (!course) {
      return next(new AppError("course not found", 500));
    }

    res.json(200).json({
      success: true,
      message: "Course lectures fetched Successfully",
    });
  } catch (err) {
    return next(new AppError(err.message, 500));
  }
};

const createCourse = async function (req, res, next) {
  const { title, description, category, createdBy } = req.body;

  if (!title || !description || !category || !createdBy) {
    return next(new AppError("All fields are required", 400));
  }

  const course = await Course.create({
    title,
    description,
    createdBy,
    category,
    thumbnail: {
      public_id: "Dummy",
      secure_url: "Dummy",
    },
  });

  if (!course) {
    return next(
      new AppError("course could not be created, please try again", 500)
    );
  }

  if ((req, file)) {
    try {
      const result = await cloudinary.v2.uploader.upload(req, file.path, {
        folder: "lms",
      });
      if (result) {
        course.thumbnail.public_id = result.public_id;
        course.thumbnail.secure_url = result.secure_url;
      }
      fs.rm(`uploads/${req.file.filename}`);
    } catch (err) {
      return next(new AppError(err.message, 500));
    }
  }
  await course.save();

  res.status(200).json({
    success: true,
    message: "Course created successfully",
    course,
  });
};

const updateCourse = async function (req, res, next) {
  try {
    const { id } = req.params;
    const course = await Course.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      {
        runValidators: true,
      }
    );
    if (!course) {
      return next(new AppError("Course does not exist", 500));
    }
    res.status(200).json({
      success: true,
      message: "course updated successfully",
      course,
    });
  } catch (err) {
    return next(new AppError(err.message, 500));
  }
};

const destroyCourse = async function (req, res, next) {
  try {
    const { id } = req.params;
    const course = await Course.findById(id);

    if (!course) {
      return next(new AppError("course does not exist", 500));
    }

    await Course.findByIdAndDelete(id);

    res.status(200).json({
      success: true,
      message: "course deleted successfully",
    });
  } catch (err) {
    return next(new AppError(err.message, 500));
  }
};

const addLectureToCourseById = async function (req, res, next) {
  try {
    const { title, description } = req.body;
    const { id } = req.params;

    if (!title || !description) {
      return next(new AppError("All fields are required", 400));
    }
    const course = await Course.findById(id);
    if (!course) {
      return next(new AppError("course does not exist", 500));
    }

    const lectureData = {
      title,
      description,
      lecture: {}
    };

    if (req.file) {
      try {
        const result = await cloudinary.v2.uploader.upload(req, file.path, {
          folder: "lms",
        });
        if (result) {
          lectureData.lecture.public_id = result.public_id;
          lectureData.lecture.secure_url = result.secure_url;
        }
        fs.rm(`uploads/${req.file.filename}`);
      } catch (err) {
        return next(new AppError(err.message, 500));
      }
    }
    course.lectures.push(lectureData);
    course.numberofLectures = course.lectures.length;
    await course.save();

    res.status(200).json({
      success: true,
      message: "Lecture is added successfully to the course",
      course,
    });
  } catch (err) {
    return next(new AppError(err.message, 500));
  }
};

export {
  getAllCourses,
  getLecturesByCourseId,
  createCourse,
  updateCourse,
  destroyCourse,
  addLectureToCourseById,
};
