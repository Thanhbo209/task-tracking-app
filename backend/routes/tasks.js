import express from "express";
import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
} from "../controllers/taskController.js";
import { auth } from "../middleware/auth.middleware.js";

const router = express.Router();

router.use(auth);

router.post("/", createTask);
router.get("/", getTasks);
router.get("/:id", getTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

export default router;
