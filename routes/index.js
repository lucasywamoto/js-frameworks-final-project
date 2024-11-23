var express = require("express");
const Mood = require("../models/mood");
var router = express.Router();

/* GET home page. */
router.get("/", async (req, res, next) => {
  let moods = await Mood.find();
  res.render("index", { title: "FeelSync", dataset: moods });
});

module.exports = router;
