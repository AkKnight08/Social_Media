const User = require("../models/user");
const fs = require("fs");
const path = require("path");
const upload=require("../config/multer");
module.exports.profile = async function (req, res) {
  try {
    if (req.isAuthenticated()) {
      const user = await User.findById(req.user.id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      return res.status(200).json({ user });
    }

    return res.status(401).json({ message: "Unauthorized" });
  } catch (err) {
    console.error("Error in profile creation:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};


module.exports.OtherProfile = async function (req, res) {
  try {
    if (req.isAuthenticated()) {
      const user = await User.findById(req.params.id);
      return res.json({
        user: user,
      });
    }
    return res.json({});
  } catch (err) {
    console.error("Error in profile creation:", err);
    return res.json({});
  }
};

module.exports.signIn = function (req, res) {
  return res.json({ title: "User Sign In" });
};

module.exports.signUp = function (req, res) {
  return res.json({ title: "User Sign Up" });
};

module.exports.create = async function (req, res) {
  try {
    if (req.body.password !== req.body.cpassword) {
      return res.json({});
    }

    const existingUser = await User.findOne({ email: req.body.email });

    if (!existingUser) {
      const newUser = await User.create(req.body);
      return res.json({});
    } else {
      return res.json({});
    }
  } catch (err) {
    console.error("Error in user creation:", err);
    return res.json({});
  }
};

module.exports.createSession = async function (req, res) {
  try {
    const existingUser = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });

    if (!existingUser) {
      return res.json({});
    } else {
      if (existingUser.password !== req.body.password) {
        return res.json({});
      }
      req.login(existingUser, function (err) {
        if (err) {
          console.error("Error in login:", err);
          return res.json({});
        }
        return res.json({
          message: "Authentication successful",
          user: existingUser,
        });
      });
    }
  } catch (err) {
    console.error("Error in Sign In:", err);
    return res.json({});
  }
};

module.exports.destroySession = async function (req, res) {
  if (req.isAuthenticated()) {
    req.logout((err) => {
      if (err) console.log("error in destroying session", err);
      return res.json({});
    });
  } else {
    return res.json({});
  }
};

module.exports.update = async function (req, res) {
  try {
    if (req.user.id == req.params.id) {
      let user = await User.findById(req.params.id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      user.name = req.body.name;
      user.email = req.body.email;

      if (req.file) {
        if (user.avatar) {
          try {
            fs.unlinkSync(path.join(__dirname, "..", user.avatar));
          } catch (err) {
            console.error("Error deleting existing avatar:", err);
          }
          user.avatar = "/uploads/users/avatars/" + req.file.filename;
        }
      }

      await user.save();
      return res.json({ user });
    }

    return res.status(403).json({ message: "Unauthorized" });
  } catch (err) {
    console.error("Error in updating:", err);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};



