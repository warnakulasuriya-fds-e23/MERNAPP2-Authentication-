import { WorkoutsContext } from "../context/WorkoutsContext";
import { useContext } from "react";

export const UseWorkoutsContext = () => {
  const context = useContext(WorkoutsContext);
  if (!context)
    throw Error(
      "UseWorkoutsContext must be used within a WorkoutsContextProvider's child element"
    );
  return context;
};
