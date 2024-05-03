import { useEffect, useState } from "react";
import ProjectsWorker from "./ProjectsWorker";
import ProjectsManager from "./ProjectsManager";
import ProjectsProjectManager from "./ProjectsProjectManager";
import Navbar from "../components/Navbar/Navbar";
import styles from "../components/Projects/Projects.module.css";
import { fetchOwnProfile } from "../services/users";

const Projects = () => {
  const [user, setUser] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const sessionToken = localStorage.getItem("token");
        if (sessionToken) {
          const profileData = await fetchOwnProfile(sessionToken);
          setUser(profileData);
        } else {
          console.error("No token found in local session");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div>
      <Navbar />
      <div className={styles.projectsContainer}>
        {user.role === "worker" && <ProjectsWorker />}
        {user.role === "manager" && <ProjectsManager />}
        {user.role === "projectManager" && <ProjectsProjectManager />}
      </div>
    </div>
  );
};

export default Projects;
