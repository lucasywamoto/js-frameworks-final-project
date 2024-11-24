var express = require("express");
const Mood = require("../models/mood");
var router = express.Router();

/* GET home page. */
router.get("/", async (req, res, next) => {
  let moods = await Mood.find();
  res.render("dashboard", {
    title: "Dashboard",
    form: "mood-selector-initial",
    moods: moods,
  });
});

router.get("/selected", (req, res) => {
  const selectedMood = req.query.mood;
  const selectedType = req.query.type;

  console.log("Received mood selection:", {
    mood: selectedMood,
    type: selectedType,
  });

  if (req.xhr || req.headers["x-requested-with"] === "XMLHttpRequest") {
    res.render("partials/mood-selector-content", {
      layout: false,
      mood: selectedMood,
      type: selectedType,
    });
  } else {
    res.render("dashboard", {
      title: "Dashboard",
      form: "mood-selector-final",
      mood: selectedMood,
      type: selectedType,
    });
  }
});

module.exports = router;
