const User = require("../models/userModel");
const ServerError = require("../serverError");

exports.findUserByName = async (req, res, next) => {
  let user;
  let condition;

  if (req.body.email) condition = req.body.email;
  if (req.params.email) condition = req.params.email;

  user = await User.findOne({ email: condition });
  if (!user) {
    throw new ServerError("User was not found", 404);
  }

  res.user = user;

  next();
};

// Login user
exports.login = async (req, res) => {
  if (!res.user)
    return res.status(401).json({ err: "Wrong username or password" });
  res.user.comparePassword(req.body.password, async function (err, isMatch) {
    if (err) throw err;
    if (!isMatch)
      return res.status(401).json({ err: "Wrong username or password" });

    // Create a session
    req.session.email = res.user.email;
    req.session.id = res.user._id;
    req.session.role = res.user.role;
    // We can now check role with if (req.session.role === role') in requests

    console.log("Created client session");

    // Returns successful login
    res.json({ email: res.user.email, role: res.user.role });
  });
};

exports.checkLoginSession = async (req, res, next) => {
  let user;
  if (req.session.id) {
    user = {
      email: req.session.email,
      role: req.session.role,
    };
    res.session = user;
    next();
  } else {
    res.json({ err: { login: "Please renew your login session!" } });
  }
  res.json(res.session);
};
