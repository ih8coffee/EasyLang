// LoginPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import users from "../data/users.json";
import SignCard from "../components/SignPage/SignCard";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Updated usage

  const authenticateUser = e => {
    e.preventDefault(); // Prevent the form from submitting traditionally

    // Find the user by username and check if passwords match
    const user = users.users.find(
      user => user.username === username && user.password === password
    );

    if (user) {
      // Redirect based on user role
      switch (user.role) {
        case "worker":
          navigate("/dashboard/worker"); // Updated navigation method
          break;
        case "manager":
          navigate("/dashboard/manager"); // Updated navigation method
          break;
        case "project-manager":
          navigate("/dashboard/project-manager"); // Updated navigation method
          break;
        default:
          alert("Role not recognized.");
          break;
      }
    } else {
      // Handle login failure
      alert("Invalid username or password.");
    }
  };

  return (
    <div>
      <h2>Login Page</h2>
      <SignCard title="Login">
        <form onSubmit={authenticateUser}>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            required
          />
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
          <button type="submit">Login</button>
        </form>
      </SignCard>
    </div>
  );
};

export default LoginPage;
