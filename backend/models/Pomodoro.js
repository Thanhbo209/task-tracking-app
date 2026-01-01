// models/Pomodoro.js
import mongoose from "mongoose";

const pomodoroSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  taskId: { type: mongoose.Schema.Types.ObjectId, ref: "Task" },
  duration: { type: Number, required: true },
  startTime: { type: Date, default: Date.now },
  endTime: { type: Date },
  completed: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Pomodoro", pomodoroSchema);
