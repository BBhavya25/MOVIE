import { useState } from "react";
import axios from "axios";

const Login = ({ setAuth, setUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await axios.post("http://localhost:5000/api/login", { email, password }, { withCredentials: true });
      setUser(true);
    } catch (error) {
      alert("Login failed: " + error.response.data.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
      <p>Don't have an account? <button onClick={() => setAuth("signup")}>Signup</button></p>
      <button onClick={() => setAuth("changePassword")}>Change Password</button>
    </div>
  );
};

export default Login;
