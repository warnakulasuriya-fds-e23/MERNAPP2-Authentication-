import { useState } from "react";
import { UseWorkoutsContext } from "../hooks/UseWorkoutsContext";
const WorkoutForm = () => {
  const { dispatch } = UseWorkoutsContext();
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState("");
  const [reps, setReps] = useState("");
  const [error, setError] = useState(null);
  const [emptyFields, setEmptyFields] = useState([]);
  //   const [isSupervisorRecommended, setIsSupervisorRecommended] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const workout = { title, load, reps };

    const response = await fetch("/api/workouts/", {
      method: "POST",
      body: JSON.stringify(workout),
      headers: {
        "Content-Type": "application/json",
      },
    });

    const jsonFormOfRes = await response.json();
    if (!response.ok) {
      setError(jsonFormOfRes.error);
      setEmptyFields(jsonFormOfRes.emptyFields);
    } else if (response.ok) {
      dispatch({ type: "ADD_WORKOUT", payload: jsonFormOfRes });
      setError(null);
      setEmptyFields([]);
      setTitle("");
      setLoad("");
      setReps("");
    }
    console.log(emptyFields);
  };
  return (
    <>
      <form className="create" onSubmit={handleSubmit}>
        <h3>Add a New Workout</h3>
        <label>Enter Title/name of workout:</label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          className={emptyFields.includes("title") ? "error" : ""}
        />
        <label>Load(kg):</label>
        <input
          type="number"
          onChange={(e) => setLoad(e.target.value)}
          value={load}
          className={emptyFields.includes("load") ? "error" : ""}
        />
        <label>Number of reps (repitions):</label>
        <input
          type="number"
          onChange={(e) => setReps(e.target.value)}
          value={reps}
          className={emptyFields.includes("reps") ? "error" : ""}
        />
        {/* <label>Is a supervisor needed? :</label>
        <input
          type="text"
          onChange={(e) => setIsSupervisorRecommended(e.target.value)}
          value={isSupervisorRecommended}
        /> */}
        <button>Add Workout</button>
        {error && <div className="error"> {error}</div>}
      </form>
    </>
  );
};

export default WorkoutForm;
