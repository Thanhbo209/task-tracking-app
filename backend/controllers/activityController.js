import ActivityDay from "../models/ActivityDay.js";

/**
 * Đánh dấu ngày hiện tại là có hoạt động
 * (gọi khi tạo task)
 */
export const markTodayActive = async (userId) => {
  const today = new Date().toISOString().slice(0, 10);

  await ActivityDay.findOneAndUpdate(
    { userId, date: today },
    { $set: { active: true } },
    { upsert: true, new: true }
  );
};

/**
 * Lấy danh sách ngày hoạt động theo năm
 */
export const getActivityDaysByYear = async (req, res) => {
  try {
    const userId = req.user.id;
    const year = req.query.year || new Date().getFullYear();

    const start = `${year}-01-01`;
    const end = `${year}-12-31`;

    const days = await ActivityDay.find({
      userId,
      date: { $gte: start, $lte: end },
    }).select("date -_id");

    res.json(days);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getActivityDayByDate = async (req, res) => {
  try {
    const { date } = req.params;
    const userId = req.user.id;

    const activity = await ActivityDay.findOne({ userId, date }).lean();
    res.json({
      focusedMinutes: activity?.focusedMinutes || 0,
      focusedTasks: activity?.focusedTasks || 0,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
