import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchOwnProfile } from "../services/users";

const DashboardPage = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      fetchUserProfile(token);
    }
  }, [navigate]);

  const fetchUserProfile = async token => {
    try {
      const data = await fetchOwnProfile(token);
      setUsername(data.username);
      setEmail(data.email);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      // Handle error, such as token expired or invalid
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  return (
    <div>
      <h2>Welcome, {username}!</h2>
      <p>Email: {email}</p>
      {/* Other dashboard content */}
    </div>
  );
};

export default DashboardPage;
