const express = require("express");
const User = require("../models/User");
const Bookmark = require("../models/Bookmark.js");

const router = express.Router();

// Create new user
router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ error: "User already exists" });

    const user = new User({ email, password });
    await user.save();
    res.status(201).json(user);
  } catch (err) {
    res.status(500).json({ error: "Signup failed" });
  }
});

// Add a bookmark
router.post("/bookmark", async (req, res) => {
  try {
    const { userId, title, url, source, image } = req.body;
    const bookmark = new Bookmark({ user: userId, title, url, source, image });
    await bookmark.save();

    await User.findByIdAndUpdate(userId, {
      $push: { bookmarks: bookmark._id },
    });
    res.status(201).json(bookmark);
  } catch (err) {
    res.status(500).json({ error: "Bookmark failed" });
  }
});

// Get user bookmarks
router.get("/bookmarks/:userId", async (req, res) => {
  try {
    const bookmarks = await Bookmark.find({ user: req.params.userId });
    res.status(200).json(bookmarks);
  } catch (err) {
    res.status(500).json({ error: "Fetch failed" });
  }
});

module.exports = router;
