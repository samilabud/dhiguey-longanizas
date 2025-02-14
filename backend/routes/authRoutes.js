import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Google Authentication (Save User if Not Exists)
router.post("/google", async (req, res) => {
  try {
    const { sub, name, email, picture } = req.body; // Google user info

    let user = await User.findOne({ googleId: sub });

    if (!user) {
      user = new User({
        googleId: sub,
        name,
        email,
        picture,
      });
      await user.save();
    }

    res.status(200).json({ message: "User authenticated", user });
  } catch (error) {
    console.error("Error in Google Auth:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
