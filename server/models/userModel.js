const mongoose = require("mongoose"),
  bcrypt = require("bcrypt"),
  SALT_WORK_FACTOR = 10;

const Address = require("../schemas/addressSchema");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    min: [2, "firstname has to be at least 2 characters"],
    max: 20,
    required: true,
  },
  lastname: {
    type: String,
    min: [2, "lastname has to be at least 2 characters"],
    max: 20,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    min: [5, "password has to be at least 5 characters"],
    max: 20,
    required: true,
  },
  role: {
    type: String,
    required: true,
  },
  adminRequest: {
    type: String,
  },
  deliveryAddress: [Address],
});

userSchema.pre("save", function (next) {
  var user = this;

  if (user.password.length > 40) return next();

  // only hash the password if it has been modified (or is new)
  if (!user.isModified("password")) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
    if (err) return next(err);

    // hash the password using our new salt
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) return next(err);

      // override the cleartext password with the hashed one
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function (err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

module.exports = mongoose.model("User", userSchema);
