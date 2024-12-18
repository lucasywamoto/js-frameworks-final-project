const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const User = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  created: { type: Date, default: Date.now },
});

User.plugin(passportLocalMongoose, {
  usernameField: "email",
});

module.exports = mongoose.model("User", User);
