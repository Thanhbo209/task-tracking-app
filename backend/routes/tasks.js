import express from "express";
import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
  getTaskStats,
  getOverdueTasks,
  getUpcomingTasks,
} from "../controllers/taskController.js";
import { auth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(auth);
// Thống kê tổng quan task
router.get("/stats", getTaskStats);

// Task quá hạn
router.get("/overdue", getOverdueTasks);

// Task sắp tới (3 ngày)
router.get("/upcoming", getUpcomingTasks);

router.post("/", createTask);
router.get("/", getTasks);
router.get("/:id", getTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
