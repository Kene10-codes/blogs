const bcryptjs = require("bcryptjs");

const hashPassword = async (password) => {
  const salt = await bcryptjs.genSalt(10);
  return await bcryptjs.hash(password, salt);
};

const comparePassword = async (userPassword, dbPassword) => {
  return await bcryptjs.compare(userPassword, dbPassword);
};

module.exports = {
  hashPassword,
  comparePassword,
};
