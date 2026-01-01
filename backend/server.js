import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/connectDB.js";
import passport from "passport";
import cors from "cors";
import "./config/passport.js";
import route from "./routes/index.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const connectionString = process.env.MONGODB_URI;

connectDB(connectionString);
const allowedOrigins = [
  "http://localhost:3000",
  "https://task-tracking.vercel.app",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(passport.initialize());

// route
route(app);

app.listen(PORT, () => {
  console.log(`Server listen on port ${PORT}`);
});
