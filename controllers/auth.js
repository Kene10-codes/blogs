const bcryptjs = require("bcryptjs");
const User = require("../models/users");
const logger = require("../services/log")();
const { validateLoginUser } = require("../validator/validate");
const { comparePassword } = require("../services/bcrypt");

async function loginUser(req, res) {
  const { error } = validateLoginUser.validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  try {
    // CHECK IF USER CREDENTIALS EXISTS
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("Invalid email or password");

    // COMPARE USER PASSWORD
    const isValid =  await comparePassword(req.body.password, user.password);
    if (!isValid) return res.status(400).send("Password is incorrect");

    const token = user.generateToken();

    res
      .header("x-auth-token", token)
      .status(201)
      .send("User successfully logged in");
  } catch (ex) {
    logger.error(ex.message);
  }
}

async function logoutUser(req, res) {
  try {
    const token = "";
    req.header("x-auth-token", token);
    res.status(200).send("User logged out successfully");
  } catch (ex) {
    logger.error(ex.message);
  }
}
module.exports = {
  loginUser,
  logoutUser,
};
