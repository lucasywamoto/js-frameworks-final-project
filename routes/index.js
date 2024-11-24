var express = require("express");
const Mood = require("../models/mood");
const User = require("../models/user");
var router = express.Router();
const passport = require("passport");

/* GET home page. */
router.get("/", async (req, res, next) => {
  res.render("index", { title: "FeelSync" });
});

router.get("/login", (req, res, next) => {
  let messages = req.session.messages || [];
  req.session.messages = [];
  res.render("login", { title: "Login", messages: messages, user: req.user });
});

router.post("/login", (req, res, next) => {
  console.log("Email:", req.body.email);
  console.log("Password:", req.body.password);

  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
    failureMessage: "Invalid credentials",
  })(req, res, next);
});

router.get("/register", (req, res, next) => {
  res.render("register", { title: "Create a new account", user: req.user });
});

router.post("/register", (req, res, next) => {
  console.log("Request body:", req.body);
  User.register(
    new User({
      email: req.body.email,
    }),
    req.body.password,
    (err, newUser) => {
      if (err) {
        console.log(err);
        return res.redirect("/register");
      } else {
        req.login(newUser, (err) => {
          if (err) {
            console.log(err);
            return res.redirect("/login");
          }
          res.redirect("/dashboard");
        });
      }
    }
  );
});

router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    res.redirect("/login");
  });
});

module.exports = router;
