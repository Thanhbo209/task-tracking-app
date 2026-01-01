import express from "express";
import {
  getActivityDayByDate,
  getActivityDaysByYear,
} from "../controllers/activityController.js";
import { auth } from "../middleware/auth.middleware.js";

const router = express.Router();
// Lấy danh sách ngày theo năm
router.get("/", auth, getActivityDaysByYear);

// Lấy stat của 1 ngày cụ thể
router.get("/:date", auth, getActivityDayByDate);

export default router;
