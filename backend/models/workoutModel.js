const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const workoutSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },

    reps: {
      type: Number,
      required: true,
    },

    load: {
      type: Number,
      required: true,
    },
    supvisorRecomended: {
      type: Boolean,
      required: false,
    },
  },
  { timestamps: true }
);

//following line will export the model that was described above and
//it will also create a new mongoDb collection called workout if its not already available
module.exports = mongoose.model("workout", workoutSchema);
