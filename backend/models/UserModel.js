const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { schema } = require("./workoutModel");

const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: {
    type: String,
    requried: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.statics.signup = async function (email, password) {
  const exists = await this.findOne({ email });
  if (exists) throw Error("This email address has already been used");

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const createdUser = this.create({ email, password: hash });
  return createdUser;
};

module.exports = mongoose.model("user", userSchema);
