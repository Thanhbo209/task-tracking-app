// controllers/dashboardController.js
import Pomodoro from "../models/Pomodoro.js";
import Activity from "../models/ActivityDay.js";

export const getDashboardStats = async (req, res) => {
  try {
    const userId = req.user._id;
    const dateQuery = req.query.date; // yyyy-mm-dd
    const baseDate = dateQuery ? new Date(dateQuery) : new Date();

    // Set start/end of the day
    const startOfDay = new Date(baseDate);
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date(baseDate);
    endOfDay.setHours(23, 59, 59, 999);

    /* =======================
       1. POMODORO FOR THE DAY
    ======================= */
    const pomodoros = await Pomodoro.find({
      userId,
      completed: true,
      endTime: { $gte: startOfDay, $lte: endOfDay },
    });

    const totalSeconds = pomodoros.reduce((sum, p) => {
      const start = new Date(p.startTime);
      const end = new Date(p.endTime);
      return sum + Math.floor((end - start) / 1000);
    }, 0);

    const focusedTodayMinutes = Math.floor(totalSeconds / 60);

    const tasksFocusedToday = new Set(pomodoros.map((p) => p.taskId.toString()))
      .size;

    /* =======================
       2. FOCUS STREAK
    ======================= */
    // Lấy tất cả ngày có activity của user, sắp xếp giảm dần
    const activities = await Activity.find({ userId })
      .sort({ date: -1 })
      .lean();

    let focusStreak = 0;
    let currentDate = new Date(baseDate);
    currentDate.setHours(0, 0, 0, 0);

    const activityDates = new Set(activities.map((a) => a.date));

    // Đếm streak liên tiếp từ ngày baseDate trở về trước
    while (activityDates.has(currentDate.toISOString().slice(0, 10))) {
      focusStreak++;
      currentDate.setDate(currentDate.getDate() - 1);
    }

    /* =======================
       3. RESPONSE
    ======================= */
    res.json({
      focusedTodayMinutes,
      tasksFocusedToday,
      focusStreak,
    });
  } catch (err) {
    console.error("Dashboard stats error:", err);
    res.status(500).json({ message: "Failed to load dashboard stats" });
  }
};
