var createError = require("http-errors");
var express = require("express");
const { engine } = require("express-handlebars");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var configs = require("./configs/globals");
var hbs = require("hbs");
//routers
var indexRouter = require("./routes/index");
var dashboardRouter = require("./routes/dashboard");
var User = require("./models/user");
//passport and session
var passport = require("passport");
var session = require("express-session");
//model
var User = require("./models/user");

var app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());

passport.use(User.createStrategy());

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use("/", indexRouter);
app.use("/dashboard", dashboardRouter);

mongoose
  .connect(configs.ConnectionStrings.MongoDB)
  .then(() => {
    console.log("Connected Successfully!");
    // Mood.seedDatabase();
    // createUsersAndRecords();
  })
  .catch((error) => {
    console.log(`Error while connecting: ${error}`);
  });

app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    partialsDir: path.join(__dirname, "views", "partials"),
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
    },
    helpers: {
      ifCond: function (v1, operator, v2, options) {
        switch (operator) {
          case "==":
            return v1 == v2 ? options.fn(this) : options.inverse(this);
          case "!=":
            return v1 != v2 ? options.fn(this) : options.inverse(this);
          case "<":
            return v1 < v2 ? options.fn(this) : options.inverse(this);
          case "<=":
            return v1 <= v2 ? options.fn(this) : options.inverse(this);
          case ">":
            return v1 > v2 ? options.fn(this) : options.inverse(this);
          case ">=":
            return v1 >= v2 ? options.fn(this) : options.inverse(this);
          default:
            return options.inverse(this);
        }
      },
    },
  })
);

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
