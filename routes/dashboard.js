var express = require("express");
const Mood = require("../models/mood");
var router = express.Router();

/* GET home page. */
router.get("/", async (req, res, next) => {
  let moods = await Mood.find();
  // Render the initial view
  res.render("dashboard", {
    title: "Dashboard",
    form: "mood-selector-initial",
    dataset: moods,
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
    // Render only the partial for AJAX requests
    res.render("partials/mood-selector-content", {
      layout: false, // Don't use the main layout for partial
      mood: selectedMood,
      type: selectedType,
    });
  } else {
    // Full page render for direct access
    res.render("dashboard", {
      title: "Dashboard",
      form: "mood-selector-final",
      mood: selectedMood,
      type: selectedType,
    });
  }
});

module.exports = router;
