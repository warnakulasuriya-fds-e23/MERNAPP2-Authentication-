const User = require("../models/UserModel");
const jwt = require("jsonwebtoken");
const CreateWebToken = (_id) => {
  return jwt.sign({ _id }, process.env.TOKENCODE, { expiresIn: "3d" });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const createdUser = await User.login(email, password);
    const createdToken = CreateWebToken(createdUser._id);
    res.status(200).json({ email, createdToken });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const signup = async (req, res) => {
  const { email, password } = req.body;
  try {
    const createdUser = await User.signup(email, password);
    const createdToken = CreateWebToken(createdUser._id);
    res.status(200).json({ email, createdToken });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { login, signup };
