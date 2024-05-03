import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchOwnProfile } from "../services/users";
import WorkspaceWorker from "./WorkspaceWorker";
import WorkspaceManager from "./WorkspaceManager";
import WorkspaceProjectManager from "./WorkspaceProjectManager";
import styles from "../components/Workspace/Workspace.module.css";
import Navbar from "../components/Navbar/Navbar";

const Workspace = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async token => {
      try {
        const data = await fetchOwnProfile(token);
        setUsername(data.username);
        setEmail(data.email);
        setRole(data.role);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        // Handle error, such as token expired or invalid
        localStorage.removeItem("token");
        navigate("/login");
      }
    };

    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      fetchUserProfile(token);
    }
  }, [navigate]);

  //depending on role, render different dashboard
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        {role === "worker" && (
          <WorkspaceWorker username={username} email={email} />
        )}
        {role === "manager" && (
          <WorkspaceManager username={username} email={email} />
        )}
        {role === "projectManager" && (
          <WorkspaceProjectManager username={username} email={email} />
        )}
      </div>
    </>
  );
};

export default Workspace;
