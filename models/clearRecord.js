const mongoose = require("mongoose");

const moodSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  mood: { type: mongoose.Schema.Types.ObjectId, ref: "Mood", required: true },
  created: { type: Date, default: Date.now },
  comment: { type: String, required: false },
  image: { type: String, required: false },
});

const Mood = mongoose.model("ClearRecord", moodSchema);

module.exports = Mood;
