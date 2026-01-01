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
