var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");

var indexRouter = require("./routes/index");
var loginRouter = require("./routes/login");

var mongoose = require("mongoose");
var configs = require("./configs/globals");

var hbs = require("hbs");

var Mood = require("./models/mood");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/", loginRouter);

mongoose
  .connect(configs.ConnectionStrings.MongoDB)
  .then(() => {
    console.log("Connected Successfully!");
    Mood.seedDatabase(); // Now this runs after successful DB connection
  })
  .catch((error) => {
    console.log(`Error while connecting: ${error}`);
  });

hbs.registerHelper("ifCond", function (v1, operator, v2, options) {
  if (operator === "==") {
    return v1 == v2 ? options.fn(this) : options.inverse(this);
  }
  return options.inverse(this); // if the operator is not recognized, return the inverse block
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;