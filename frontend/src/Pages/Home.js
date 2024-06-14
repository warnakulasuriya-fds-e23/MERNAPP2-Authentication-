import { useEffect } from "react";
import WorkoutDetails from "../components/WorkoutDetails";
import WorkoutForm from "../components/WorkoutForm";
import { UseWorkoutsContext } from "../hooks/UseWorkoutsContext";
const Home = () => {
  const { workoutsArray, dispatch } = UseWorkoutsContext();
  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("/api/workouts/"); // refer IMPORTANT.txt NOTE 1 for more info
      const jsonForm = await response.json();
      if (response.ok) {
        dispatch({ type: "SET_ALL_WORKOUTS", payload: jsonForm });
      }
    };
    fetchWorkouts();
  }, [dispatch]); //leaving the second argument of use effect as an empty array ensures that this function is fired only once upon initialization of home page

  return (
    <div className="home">
      <div className="workouts">
        {workoutsArray &&
          workoutsArray.map((workout) => (
            <>
              <WorkoutDetails key={workout._id} workout={workout} />
            </>
          ))}
      </div>
      <WorkoutForm />
    </div>
  );
};

export default Home;
