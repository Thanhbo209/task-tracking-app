// routes/pomodoroRoutes.js
import express from "express";
import {
  startPomodoro,
  getCurrentPomodoro,
  endPomodoro,
  getAllPomodoro,
} from "../controllers/pomodoroController.js";
import { auth } from "../middleware/auth.middleware.js";

const router = express.Router();
router.use(auth);
router.get("/", getAllPomodoro);
router.post("/start", startPomodoro);
router.get("/current", getCurrentPomodoro);
router.post("/end", endPomodoro);

export default router;
