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

module.exports = mongoose.model("user", userSchema);
