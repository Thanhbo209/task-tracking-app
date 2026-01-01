// controllers/pomodoroController.js
import ActivityDay from "../models/ActivityDay.js";
import Pomodoro from "../models/Pomodoro.js";
import Task from "../models/Task.js";
import { markTodayActive } from "./activityController.js";

export const startPomodoro = async (req, res) => {
  const { taskId, duration } = req.body;
  const userId = req.user._id;

  const task = await Task.findById(taskId);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  //  CHẶN TASK ĐÃ DONE
  if (task.completed) {
    return res
      .status(400)
      .json({ message: "Cannot start Pomodoro for completed task" });
  }

  //  CHẶN TẠO 2 POMODORO SONG SONG
  const activePomodoro = await Pomodoro.findOne({
    userId,
    completed: false,
  });

  if (activePomodoro) {
    return res
      .status(400)
      .json({ message: "You already have an active Pomodoro" });
  }

  const pomodoro = await Pomodoro.create({
    userId,
    taskId,
    duration,
    startTime: new Date(),
    completed: false,
  });
  // ✅ MARK ACTIVITY DAY
  await markTodayActive(userId);
  res.status(201).json({ pomodoro });
};

// controllers/pomodoroController.js
export const getAllPomodoro = async (req, res) => {
  try {
    const pomodoros = await Pomodoro.find({})
      .populate("taskId", "title") // lấy luôn title
      .lean(); // trả về object thuần
    res.status(200).json({ pomodoros });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: err.message });
  }
};

export const getCurrentPomodoro = async (req, res) => {
  const userId = req.user._id;

  const pomodoro = await Pomodoro.findOne({ userId, completed: false })
    .sort({ startTime: -1 })
    .populate("taskId", "title"); // populate task name

  if (!pomodoro) return res.json({ message: "No active Pomodoro" });

  const elapsed = Math.floor((Date.now() - pomodoro.startTime) / 1000);
  const remaining = pomodoro.duration - elapsed;

  res.json({ pomodoro, remaining: remaining > 0 ? remaining : 0 });
};

export const endPomodoro = async (req, res) => {
  const { pomodoroId } = req.body;

  const pomodoro = await Pomodoro.findById(pomodoroId).populate(
    "taskId",
    "title"
  );
  if (!pomodoro) return res.status(404).json({ message: "Pomodoro not found" });

  // 1️ Gán completed và endTime
  pomodoro.completed = true;
  pomodoro.endTime = new Date();
  await pomodoro.save();

  // 2️ Cập nhật task tương ứng
  await Task.findByIdAndUpdate(pomodoro.taskId._id, { completed: true });

  // 3️ Cập nhật ActivityDay
  const userId = pomodoro.userId;
  const date = pomodoro.startTime.toISOString().slice(0, 10); // yyyy-mm-dd
  const durationMinutes = Math.floor(
    (pomodoro.endTime - pomodoro.startTime) / 60000
  );

  await ActivityDay.findOneAndUpdate(
    { userId, date },
    {
      $set: { active: true },
      $inc: {
        focusedMinutes: durationMinutes,
        focusedTasks: 1,
      },
    },
    { upsert: true }
  );

  res.json({ message: "Pomodoro ended", pomodoro });
};
