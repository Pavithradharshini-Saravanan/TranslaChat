const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  preferredLanguage: { type: String, default: "en" },
});

module.exports = mongoose.model("User", userSchema);
