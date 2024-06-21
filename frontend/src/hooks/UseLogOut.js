import { UseAuthContext } from "./UseAuthContext";
import { UseWorkoutsContext } from "./UseWorkoutsContext";
export const UseLogout = () => {
  const { dispatch } = UseAuthContext();
  const { dispatch: workoutsDispatch } = UseWorkoutsContext();
  const Logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    // workoutsDispatch({ type: "SET_ALL_WORKOUTS", payload: null });
    workoutsDispatch({ type: "CLEAR_WORKOUTS" });
  };
  return { Logout };
};
