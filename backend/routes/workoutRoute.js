const express = require("express");
const router = express.Router();
const { RequireAuth } = require("../middleware/RequireAuth");
const {
  createWorkout,
  getAllWorkouts,
  getAWorkout,
  deleteAWorkout,
  updateAWorkout,
} = require("../controllers/workoutController");

//Check for availabilty of valid to token and authorize the accessing of the rest of the routes
router.use(RequireAuth);
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
