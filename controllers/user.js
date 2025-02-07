const _ = require("lodash");
const User = require("../models/users");
const { validateUser } = require("../validator/user/validate");
const logger = require("../services/log")();
const sendEmail = require("../services/email");
const { hashPassword } = require("../services/bcrypt");

async function getUsers(req, res) {
  try {
    const user = await User.find();
    if (user.length === 0) res.status(400).send("No user was found");

    res.status(200).send(user);
  } catch (ex) {
    logger.error(ex.message);
  }
}

// REGISTER USER
async function registerUser(req, res) {
  console.log("hi")
  try {
    const { error } = validateUser.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) return res.status(401).send("Email exists already!");

    let user = new User(
      _.pick(req.body, ["name", "email", "password", "isAdmin"])
    );
    // hash password func
    user.password = await hashPassword(user.password);

    await user.save();

    // SEND EMAIL

    sendEmail(
      user,
      "Welcome to our Blog - Your Account has been Created!",
      `
        <p>Dear ${user.name},</p>
        <p>Welcome to our Blog! We are thrilled to have you as a new member of our community. </p>
        <p>Your account has been successfully created, and you are now ready to explore all the features and
        benefits our platform has to offer.</p>

       <p> If you have any questions or need assistance, feel free to reach out to our support team at blogcustomercare101@gmail.com. We're here to help you make the most out of your experience with our Blog.

       Once again, welcome aboard, and thank you for joining us! </p>

       <p>Best regards,</p>
       <span>Kenechukwu </span>
       <p>CEO</p>
       `
    );
    const token = user.generateToken();
    res.header("x-auth-token", token).status(201).send(user);
  } catch (ex) {
    logger.error(ex.message);
  }
}

// DELETE USER ACCOUNT
async function deleteUser(req, res) {
  try {
    const userId = await User.findByIdAndDelete({ _id: req.params.id });
    if (!userId) return res.status(400).send("User ID is not valid");

    res.status(200).send("User deleted successfully"), userId;
  } catch (ex) {
    logger.error(ex.message);
  }
}

module.exports = {
  getUsers,
  deleteUser,
  registerUser,
};
