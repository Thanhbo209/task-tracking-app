import mongoose from "mongoose";

const activityDaySchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    date: {
      type: String, // yyyy-mm-dd
      required: true,
      index: true,
    },

    active: {
      type: Boolean,
      default: true,
    },

    // 🔥 NEW FIELDS
    focusedMinutes: {
      type: Number,
      default: 0, // tổng phút tập trung trong ngày
    },

    focusedTasks: {
      type: Number,
      default: 0, // số task đã focus trong ngày
    },

    // (OPTIONAL – nâng cao)
    pomodoroCount: {
      type: Number,
      default: 0, // số phiên pomodoro
    },
  },
  { timestamps: true }
);

activityDaySchema.index({ userId: 1, date: 1 }, { unique: true });

export default mongoose.model("ActivityDay", activityDaySchema);
