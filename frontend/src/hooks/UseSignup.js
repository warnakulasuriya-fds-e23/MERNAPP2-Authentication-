import { useState } from "react";
import { UseAuthContext } from "./UseAuthContext";

export const UseSignup = () => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { dispatch } = UseAuthContext();

  const signupBackendCommunication = async (email, password) => {
    setError(null);
    const response = await fetch("/api/users/signup", {
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
  };

  return { signupBackendCommunication, isLoading, error };
};
