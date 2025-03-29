import { useState } from "react";
import axios from "axios";

const ChangePassword = ({ setAuth }) => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleChangePassword = async () => {
    try {
      await axios.post("http://localhost:5000/api/change-password", { email, newPassword });
      alert("Password changed successfully!");
      setAuth("login");
    } catch (error) {
      alert("Failed to change password: " + error.response.data.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Change Password</h2>
      <input type="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="New Password" onChange={(e) => setNewPassword(e.target.value)} />
      <button onClick={handleChangePassword}>Change Password</button>
      <p><button onClick={() => setAuth("login")}>Back to Login</button></p>
    </div>
  );
};

export default ChangePassword;
