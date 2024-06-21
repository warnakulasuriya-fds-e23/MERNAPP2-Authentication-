import { useState } from "react";
import { UseSignup } from "../hooks/UseSignup";

const Signup = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { signupBackendCommunication, isLoading, error } = UseSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(email, password);
    await signupBackendCommunication(email, password);
  };

  return (
    <form className="signup" onSubmit={handleSubmit}>
      <h4>Sign Up</h4>
      <label>Email:</label>
      <input
        type="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <label>Password:</label>
      <input
        type="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button disabled={isLoading}>Sign up</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Signup;
