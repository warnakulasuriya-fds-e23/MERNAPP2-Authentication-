import { createContext, useReducer } from "react";

export const WorkoutsContext = createContext();

const WorkoutsReducer = (state, action) => {
  switch (action.type) {
    case "SET_ALL_WORKOUTS":
      return {
        workoutsArray: action.payload,
      };
    case "ADD_WORKOUT":
      return {
        workoutsArray: [action.payload, ...state.workoutsArray], //shouldnt it be [...action.payload, ...state.workouts]??? NO! because here just a single workout will be passed in as the payload but in the previous case an array of many workouts would have been passed in.
      };
    case "DELETE_WORKOUT":
      return {
        workoutsArray: state.workoutsArray.filter(
          (workout) => workout._id !== action.payload._id
        ),
      };
    default:
      return state;
  }
};

export const WorkoutsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(WorkoutsReducer, {
    workoutsArray: null,
  });
  return (
    <WorkoutsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </WorkoutsContext.Provider>
  );
};
