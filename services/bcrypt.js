const bcryptjs = require("bcryptjs");

const hashPassword = async (password) => {
  const salt = await bcryptjs.genSalt(10);
  return (user.password = await bcryptjs.hash(password, salt));
};

module.exports = {
  hashPassword,
};
