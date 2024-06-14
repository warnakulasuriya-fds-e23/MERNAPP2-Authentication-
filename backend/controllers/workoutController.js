const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");
//GET all workouts
const getAllWorkouts = async (req, res) => {
  try {
    const allWorkouts = await Workout.find({}).sort({ createdAt: -1 });
    res.status(200).json(allWorkouts);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//GET a single workout
const getAWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    //checking for validity of id
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Invalid request id" });
    }

    const discoveredWorkout = await Workout.findById(id);
    //if the id was not discovered
    if (!discoveredWorkout) {
      return res.status(404).json({ error: "that workout was not found" });
    }

    //else
    res.status(200).json(discoveredWorkout);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//Create a workout (POST)
const createWorkout = async (req, res) => {
  const { title, reps, load, supvisorRecomended } = req.body;
  try {
    const emptyFields = [];
    if (!title) emptyFields.push("title");
    if (!load) emptyFields.push("load");
    if (!reps) emptyFields.push("reps");

    if (emptyFields.length > 0) {
      res.status(400).json({
        error: "Please fill in all the fields",
        emptyFields,
      });
      return;
    }

    const newWorkout = await Workout.create({
      title,
      reps,
      load,
      supvisorRecomended,
    });
    res.status(200).json(newWorkout);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

//DELETE a workout
const deleteAWorkout = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Invalid req ID" });
    }

    const deletedWorkout = await Workout.findByIdAndDelete(id);
    if (!deletedWorkout) {
      return res.status(404).json({ error: "workout was Not found" });
    }

    res.status(200).json(deletedWorkout);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
//Update existing workout(PATCH)
const updateAWorkout = async (req, res) => {
  try {
    const reqID = req.path.slice(1);
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: "Invalid req ID" });
    }

    const updatedWorkout = await Workout.findByIdAndUpdate(id, req.body);
    if (!updatedWorkout) {
      return res.status(404).json({ error: "workout was not found" });
    }

    res.status(200).json(updatedWorkout);
  } catch (err) {
    res.status(400).json({ error: err });
  }
};

module.exports = {
  createWorkout,
  getAllWorkouts,
  getAWorkout,
  deleteAWorkout,
  updateAWorkout,
};
