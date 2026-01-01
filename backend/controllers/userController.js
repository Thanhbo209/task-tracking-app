import User from "../models/User.js";

export const getMe = async (req, res) => {
  try {
    res.status(200).json({
      user: req.user,
    });
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
