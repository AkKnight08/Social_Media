const express = require("express");
const port = 8000;
const app = express();
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./config/mongoose");
const expressLayouts = require("express-ejs-layouts");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");

const session = require("express-session");
const passport = require("passport");
const passportLocal = require("./config/passport-local-strategy");
const MongoStore = require("connect-mongo");

app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    credentials: true,
    origin: "http://localhost:3000",
    optionsSuccessStatus: 200,
  })
);

app.use(
  "/uploads/users/avatars",
  express.static(path.join(__dirname, "uploads/users/avatars"))
);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    name: "socialsphere",
    secret: "myfirstmernproject",
    saveUninitialized: false,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 1000,
    },
    store: MongoStore.create(
      {
        mongooseConnection: mongoose.connection,
        mongoUrl: "mongodb://127.0.0.1:27017/social-sphere",
        autoRemove: "disabled",
      },
      function (err) {
        console.log(err || "connect-mongodb setup ok");
      }
    ),
  })
);

app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);

app.use(expressLayouts);
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use("/", require("./routes"));
app.use(express.static("assets"));

app.listen(port, function (err) {
  if (err) {
    console.log("Error in initializing Server", err);
    return;
  } else {
    console.log("Server is up and Connected Successfully to the Port: ", port);
  }
});
