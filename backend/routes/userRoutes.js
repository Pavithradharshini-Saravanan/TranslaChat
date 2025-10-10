const express = require("express");
const router = express.Router();
const User = require("../models/User");

// Register or get user
router.post("/register", async (req, res) => {
  const { username, preferredLanguage } = req.body;
  console.log("Register request received:", req.body); // log incoming data
  try {
    let user = await User.findOne({ username });
    console.log("Existing user:", user); // log if user exists
    if (!user) {
      user = new User({ username, preferredLanguage });
      await user.save();
      console.log("New user saved:", user); // log new user
    }
    res.json(user);
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: err.message });
  }
});


router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
// ----------------------------------------------------
// NEW ROUTE: GET /users/:id (Get a single user by ID)
// ----------------------------------------------------
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;