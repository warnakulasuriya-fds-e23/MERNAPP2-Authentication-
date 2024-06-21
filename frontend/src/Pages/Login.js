import { useState } from "react";
import { UseLogin } from "../hooks/UseLogin";

const Login = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { loginBackendCommunication, isLoading, error } = UseLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await loginBackendCommunication(email, password);
  };

  return (
    <form className="login" onSubmit={handleSubmit}>
      <h4>Log In</h4>
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
      <button disabled={isLoading}>Log In</button>
      {error && <div className="error">{error}</div>}
    </form>
  );
};

export default Login;
