const validator = require("validator");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

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
  //validation handling
  if (!email || !password) {
    throw Error(
      "No empty fields allowed, please fill in both password and email"
    );
  }
  if (!validator.isEmail(email)) {
    throw Error("Please enter a valid Email address");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Please enter a stronger password");
  }

  const exists = await this.findOne({ email });
  if (exists) throw Error("This email address has already been used");

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const createdUser = this.create({ email, password: hash });
  return createdUser;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error(
      "No empty fields allowed, please fill in both password and email."
    );
  }

  const returnedUser = await this.findOne({ email });
  if (!returnedUser) throw Error("Incorrect Email Adress.");

  const matching = bcrypt.compare(password, returnedUser.password);
  if (!matching) throw Error("Incorrect password");

  return returnedUser;
};
module.exports = mongoose.model("user", userSchema);
