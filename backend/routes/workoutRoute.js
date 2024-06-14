const express = require("express");
const router = express.Router();
const {
  createWorkout,
  getAllWorkouts,
  getAWorkout,
  deleteAWorkout,
  updateAWorkout,
} = require("../controllers/workoutController");
//GET all the workouts
router.get("/", getAllWorkouts);

//GET a single workout
router.get("/:id", getAWorkout);

//POST a workout
router.post("/", createWorkout);

//DELETE a workout
router.delete("/:id", deleteAWorkout);

//UPDATE a workout
router.patch("/:id", updateAWorkout);
module.exports = router;
