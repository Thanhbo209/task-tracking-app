import authRoutes from "./auth.js";
import userRoutes from "./users.js";
import taskRoutes from "./tasks.js";
import pomodoroRoutes from "./pomodoros.js";
import activityoutes from "./activities.js";
import dashboardRoutes from "./dashboard.js";

function route(app) {
  app.use("/api/auth", authRoutes);
  app.use("/api/users", userRoutes);
  app.use("/api/tasks", taskRoutes);
  app.use("/api/pomodoro", pomodoroRoutes);
  app.use("/api/dashboard", dashboardRoutes);
  app.use("/api/activity-days", activityoutes);
}

export default route;
