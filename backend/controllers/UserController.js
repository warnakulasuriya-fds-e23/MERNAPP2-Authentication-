const User = require("../models/UserModel");
const login = async (req, res) => {
  res.status(200).json({ mssg: "login request handled" });
};

const signup = async (req, res) => {
  res.status(200).json({ mssg: "signup request handled" });
};

module.exports = { login, signup };
