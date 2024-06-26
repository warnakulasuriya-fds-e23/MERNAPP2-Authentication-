import { UseWorkoutsContext } from "../hooks/UseWorkoutsContext";
import { formatDistanceToNow } from "date-fns";
import { UseAuthContext } from "../hooks/UseAuthContext";

const WorkoutDetails = ({ workout }) => {
  const { dispatch } = UseWorkoutsContext();
  const { user } = UseAuthContext();
  const DeleteOnClick = async () => {
    if (!user) {
      return;
    }
    const response = await fetch("/api/workouts/" + workout._id, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.createdToken}`,
      },
    });
    const jsonForm = await response.json();

    if (response.ok) {
      dispatch({ type: "DELETE_WORKOUT", payload: jsonForm });
    }
  };
  return (
    <div className="workout-details">
      <h4>{workout.title}</h4>
      <p>
        <strong>Load (kg):</strong> {workout.load} <br />
        <strong>reps:</strong> {workout.reps}
        <br />
        {/* <strong>is supervisor recommended:</strong> {workout.supvisorRecomended}
        <br /> */}
        <strong>created At:</strong>{" "}
        {formatDistanceToNow(workout.createdAt, { addSuffix: true })}
        <br />
      </p>
      <span className="material-symbols-outlined" onClick={DeleteOnClick}>
        delete
      </span>
    </div>
  );
};
export default WorkoutDetails;
