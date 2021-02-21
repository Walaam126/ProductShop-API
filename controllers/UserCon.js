const { User } = require("../db/models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
exports.signup = async (req, res, next) => {
  try {
    const hashedpwd = await bcrypt.hash(req.body.password, 10);
    req.body.password = hashedpwd;
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

exports.signin = async (req, res, next) => {
  console.log("signed success");
  const { user } = req;
  const payload = {
    id: user.id,
    username: user.username,
    exp: Date.now() + 900000,
  };
  const token = jwt.sign(JSON.stringify(payload), "wseckey");
  res.json({ token });
};
