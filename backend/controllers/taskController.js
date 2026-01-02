import mongoose from "mongoose";
import Task from "../models/Task.js";
import { markTodayActive } from "./activityController.js";

// CREATE
export const createTask = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const task = await Task.create({ ...req.body, userId: req.user.id });

    // 🔥 đánh dấu ngày hoạt động
    await markTodayActive(req.user.id);
    res.status(201).json({ message: "Created Successfully!", task });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// READ ALL
export const getTasks = async (req, res) => {
  const tasks = await Task.find({
    userId: req.user.id,
  }).sort({ createdAt: -1 });

  if (!tasks) {
    return res.status(400).json({
      message: "Found nothing!",
    });
  }
  res.json(tasks);
};

// READ ONE
export const getTask = async (req, res) => {
  const task = await Task.findOne({
    _id: req.params.id,
    userId: req.user.id,
  });

  if (!task) {
    return res.status(400).json({ message: "Task not found!" });
  }

  res.json(task);
};

// UPDATE
export const updateTask = async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, userId: req.user.id },
    req.body,
    {
      new: true,
    }
  );

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  res.json({ message: "Updated Successfully!", task });
};

// DELETE

export const deleteTask = async (req, res) => {
  const task = await Task.findOneAndDelete({
    _id: req.params.id,
    userId: req.user.id,
  });

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }
  res.json({ message: "Deleted Succesfully!" });
};

export const getTaskStats = async (req, res) => {
  try {
    const userId = req.user.id; // hoặc req.params.userId

    const stats = await Task.aggregate([
      {
        $match: {
          userId: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $group: {
          _id: null,
          totalTasks: { $sum: 1 },
          todoTasks: {
            $sum: { $cond: [{ $eq: ["$status", "todo"] }, 1, 0] },
          },
          doingTasks: {
            $sum: { $cond: [{ $eq: ["$status", "doing"] }, 1, 0] },
          },
          doneTasks: {
            $sum: { $cond: [{ $eq: ["$status", "done"] }, 1, 0] },
          },
        },
      },
    ]);

    res.json(
      stats[0] || {
        totalTasks: 0,
        todoTasks: 0,
        doingTasks: 0,
        doneTasks: 0,
      }
    );
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getOverdueTasks = async (req, res) => {
  const userId = req.user.id;

  const overdueTasks = await Task.find({
    userId,
    status: { $ne: "done" },
    deadline: { $lt: new Date() },
  }).sort({ deadline: 1 });

  res.json(overdueTasks);
};

export const getUpcomingTasks = async (req, res) => {
  const userId = req.user.id;

  const now = new Date();
  const threeDaysLater = new Date();
  threeDaysLater.setDate(now.getDate() + 3);

  const upcomingTasks = await Task.find({
    userId,
    status: { $ne: "done" },
    deadline: { $gte: now, $lte: threeDaysLater },
  }).sort({ deadline: 1 });

  res.json(upcomingTasks);
};
