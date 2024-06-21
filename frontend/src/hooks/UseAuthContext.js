import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const UseAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw Error("Needs to be used within a AuthContextProvider child element");

  return context;
};
