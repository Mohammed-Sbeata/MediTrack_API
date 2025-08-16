const jwt = require("jsonwebtoken");

const createToken = (data) =>
  jwt.sign({ userId: data }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE_TIME,
  });

module.exports = createToken;