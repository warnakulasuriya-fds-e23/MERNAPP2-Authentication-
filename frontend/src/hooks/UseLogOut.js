import { UseAuthContext } from "./UseAuthContext";
export const UseLogout = () => {
  const { dispatch } = UseAuthContext();
  const Logout = () => {
    localStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
  };
  return { Logout };
};
