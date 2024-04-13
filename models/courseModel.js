import { Schema, model } from "mongoose";

const courseSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required!"],
      minLength: [8, "Title must be atleast 8 characters"],
      maxLength: [59, "Title should be less than 60 characters"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Description is required!"],
      minLength: [5, "Title must be atleast 10 characters"],
      maxLength: [199, "Title should be less than 200 characters"],
      trim: true,
    },
    category: {
      type: String,
      required: [true, "Category is required!"],
    },
    thumbnail: {
      public_id: {
        type: String,
        required: true,
      },
      secure_url: {
        type: String,
        required: true,
      },
    },
    lectures: [
      {
        title: {
          type: String,
          required: [true, "Title is required!"],
          trim: true,
        },
        description: {
          type: String,
          required: [true, "Description is required!"],
          trim: true,
        },
        lectures: {
          public_id: {
            type: String,
            required: true,
          },
          secure_url: {
            type: String,
            required: true,
          },
        },
      },
    ],
    numberofLectures: {
      type: Number,
      default: 0,
    },
    createdBy: {
      type: String,
      required: [true, 'CreatedBy field is required!'],
      trim: true,
    },
  },
  { timestamps: true }
);

const Course = model("Course", courseSchema);

export default Course;
