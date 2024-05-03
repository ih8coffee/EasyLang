import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SignCard from "../components/SignPage/SignCard";
import Button from "../components/Button/Button";
import styles from "../components/SignPage/LoginPage.module.css";

const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
const PASSWORD_REGEX = /^(?=.*\d).{5,}$/;

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State to store login error
  const navigate = useNavigate();

  const authenticateUser = async e => {
    e.preventDefault();

    const v1 = EMAIL_REGEX.test(email);
    const v2 = PASSWORD_REGEX.test(password);

    if (!v1 || !v2) {
      setError("Invalid username or password.");
      return;
    }

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
        console.log(data.message);
        localStorage.setItem("token", data.token);
        navigate("/dashboard");
      } else {
        setError("Invalid username or password"); // Set error state with error message
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An error occurred. Please try again."); // Set generic error message
    }
  };

  return (
    <div className={styles.container}>
      <SignCard title="EasyLang">
        <p>Login</p>
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
          <Button type="info" onClick={"submit"}>
            Login
          </Button>
        </form>
        {error && <section className={styles.error}>{error}</section>}{" "}
        {/* Render error message if present */}
      </SignCard>
    </div>
  );
};

export default LoginPage;
