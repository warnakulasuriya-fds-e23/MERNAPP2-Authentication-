import { useEffect } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { UseWorkoutsContext } from "../hooks/UseWorkoutsContext";
import { UseAuthContext } from "../hooks/UseAuthContext";
const Home = () => {
  const { workoutsArray, dispatch } = UseWorkoutsContext();
  const { user } = UseAuthContext();
  useEffect(() => {
    const fetchWorkouts = async () => {
      if (!user) {
        return;
      }
      const response = await fetch("/api/workouts/", {
        headers: {
          Authorization: `Bearer ${user.createdToken}`,
        },
      }); // refer IMPORTANT.txt NOTE 1 for more info
      const jsonForm = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_ALL_WORKOUTS", payload: jsonForm });
      }
    };
    fetchWorkouts();
  }, [dispatch]);

  return (
    <div className="home">
      <div className="workouts">
        {workoutsArray &&
          workoutsArray.map((workout) => (
            <WorkoutDetails key={workout._id} workout={workout} />
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
