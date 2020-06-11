const User = require("../models/userModel");
const ServerError = require("../serverError");

exports.findUserByName = async (req, res, next) => {
  let user;
  let condition;

  if (req.body.email) condition = req.body.email;
  if (req.params.email) condition = req.params.email;

  user = await User.findOne({ email: condition }).select("+password");
  if (!user) {
    throw new ServerError("Wrong username or password", 404);
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

    // Skapa en session
    // Allt
    req.session.deliveryAddress = res.user.deliveryAddress;
    req.session.email = res.user.email;
    req.session.id = res.user._id;
    req.session.role = res.user.role;
    req.session.name = res.user.name;
    req.session.lastname = res.user.lastname;

    // Vi kan nu kolla om (req.session.role === role') i requests

    console.log("Created client session");

    // Skickar tillbaks en genomförd login
    res.json({
      email: res.user.email,
      role: res.user.role,
      deliveryAddress: res.user.deliveryAddress,
    });
  });
  console.log("reached");
};

exports.checkLoginSession = (req, res, next) => {
  let user;
  if (req.session.id && req.session.id !== undefined) {
    user = {
      email: req.session.email,
      role: req.session.role,
      deliveryAddress: req.session.deliveryAddress,
      id: req.session.id,
    };
    res.session = user;
    res.json(user);
    return;
  }
  res.json({ error: true });
};

exports.logout = (req, res) => {
  res.clearCookie("LoginSession");
  res.clearCookie("LoginSession.sig");
  console.log("Destroyed client session");
  res.json({ success: true, message: "You have been logged out" });
};
