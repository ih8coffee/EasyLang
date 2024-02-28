import express from "express";
import { json } from "express";
import cookieParser from "cookie-parser";
import cors from "cors"; // Import the cors middleware

const app = express();

app.use(json());
app.use(cookieParser());
app.use(cors()); // Use the cors middleware to handle CORS

// Authentication middleware to check if user is logged in
const isAuthenticated = (req, res, next) => {
  if (req.cookies.sessionToken) {
    next();
  } else {
    res.status(401).send("User is not authenticated. Please log in.");
  }
};

// Login endpoint
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  if (username === "user" && password === "password") {
    const sessionToken = "abc123";
    res.cookie("sessionToken", sessionToken, {
      expires: new Date(Date.now() + 6000),
      httpOnly: true,
    });
    res.status(200).send("Login successful");
  } else {
    res.status(401).send("Invalid username or password.");
  }
});

// Protected route (dashboard)
app.get("/api/dashboard", isAuthenticated, (req, res) => {
  res.send("Dashboard");
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
