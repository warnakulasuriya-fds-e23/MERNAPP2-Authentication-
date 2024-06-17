import { useState } from "react";
import { UseAuthContext } from "./UseAuthContext";

export const UseLogin = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = UseAuthContext();

  const loginBackendCommunication = async (email, password) => {
    setError(null);
    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      const jsonForm = await response.json();

      if (!response.ok) {
        setIsLoading(false);
        setError(jsonForm.error);
      }
      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(jsonForm));

        dispatch({ type: "LOGIN", payload: jsonForm });

        setIsLoading(false);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return { loginBackendCommunication, isLoading, error };
};
