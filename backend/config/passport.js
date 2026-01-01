import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import User from "../models/User.js";
import dotenv from "dotenv";
dotenv.config();
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        if (!profile.emails || !profile.emails.length) {
          return done(new Error("Google account has no email"), null);
        }

        const email = profile.emails[0].value;

        let user = await User.findOne({ email });

        if (!user) {
          user = await User.create({
            username: profile.displayName || email.split("@")[0],
            email,
            avatar: profile.photos?.[0]?.value || null,
            provider: "google",
            googleId: profile.id,
            password: null, // ❗ KHÔNG lưu password
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

export default passport;
