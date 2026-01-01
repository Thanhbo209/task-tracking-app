import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { register, login } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);

// Google OAuth
router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // redirect về frontend + token
    res.redirect(`http://localhost:3000/oauth-success?token=${token}`);
  }
);

export default router;
