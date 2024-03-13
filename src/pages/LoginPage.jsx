// LoginPage.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignCard from "../components/SignPage/SignCard";

const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const PASSWORD_REGEX = /^(?=.*\d).{5,}$/;

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Updated usage

  const authenticateUser = async e => {
    e.preventDefault(); // Prevent the form from submitting traditionally

    // Find the user by username and check if passwords match
    const v1 = EMAIL_REGEX.test(email);
    const v2 = PASSWORD_REGEX.test(password);

    if (!v1 || !v2) {
      alert("Invalid username or password.");
      return;
    } else {
      try {
        const response = await fetch("http://localhost:3000/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        const data = await response.json();

        if (response.status === 200) {
          console.log(data.message); // Login successful
          localStorage.setItem("token", data.token);
          // Redirect or update UI
          navigate("/dashboard");
        } else {
          alert(data);
        }
      } catch (error) {
        console.error("Login error:", error);
      }
    }
  };

  return (
    <div>
      <h2>Login Page</h2>
      <SignCard title="Login">
        <form onSubmit={authenticateUser}>
          <label>Email:</label>
          <input
            type="text"
            value={email}
            onChange={e => setEmail(e.target.value)}
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
