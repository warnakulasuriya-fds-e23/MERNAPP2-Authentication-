const User = require("../models/UserModel");
const login = async (req, res) => {
  res.status(200).json({ mssg: "login request handled" });
};

const signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const createdUser = await User.signup(email, password);
    res.status(200).json({ email, createdUser });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { login, signup };
