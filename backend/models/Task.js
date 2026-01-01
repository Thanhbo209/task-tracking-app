import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
    },

    deadline: {
      type: Date,
    },

    estimatePomodoro: {
      type: Number,
      default: 1,
      min: 1,
    },

    color: {
      type: String,
      default: "blue",
      enum: ["gray", "blue", "green", "yellow", "red", "purple", "pink"],
    },

    icon: {
      type: String,
      default: "clipboard", // icon mặc định
    },

    status: {
      type: String,
      enum: ["todo", "doing", "done"],
      default: "todo",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
