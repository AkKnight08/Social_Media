var express = require("express");
var router = express.Router();
const passport = require("passport");
const userController = require("../controllers/users_controller");
const upload = require("../config/multer");
console.log("Router Loaded");
router.get("/profile", userController.profile);
router.get("/profile/:id", userController.OtherProfile);
router.get("/sign-in", userController.signIn);
router.get("/sign-up", userController.signUp);

router.post("/create", userController.create);
router.post("/update/:id", upload.single("avatar"), userController.update);
router.post(
  "/create-session",
  passport.authenticate("local", {
    failureRedirect: "/users/sign-in",
  }),
  userController.createSession
);
router.get("/sign-out", userController.destroySession);
module.exports = router;
