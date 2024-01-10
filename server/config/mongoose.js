const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/social-sphere", {});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error in DB Connection"));

db.once("open", function () {
  console.log("DB Connected");
});

module.exports = db;
