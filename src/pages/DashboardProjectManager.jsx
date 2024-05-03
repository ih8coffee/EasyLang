import { useEffect, useState } from "react";
import DashboardCard from "../components/Dashboard/DashboardCard";
import styles from "../components/Dashboard/Dashboard.module.css";
import { fetchProjects } from "../services/projects";
import { fetchUserData } from "../services/users";
import ProjectCard from "../components/Projects/ProjectCard";
import ProgressBar from "../components/ProgressBar/ProgressBar";
import Button from "../components/Button/Button";

const DashboardProjectManager = () => {
  const [projects, setProjects] = useState([]);
  const [users, setUsers] = useState([]);

  const goToProject = projectId => {
    window.location.href = `/projects/${projectId}`;
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const sessionToken = localStorage.getItem("token");
        if (sessionToken) {
          const projectsData = await fetchProjects(sessionToken);
          const usersData = await fetchUserData(sessionToken);
          setUsers(usersData);
          setProjects(projectsData);
        } else {
          console.error("No token found in local session");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <div className={styles.container}>
        <div className={styles.dashboardContainer}>
          <DashboardCard title="Projects">
            {projects.map(project => (
              <ProjectCard key={project._id} title={project.projectName}>
                <p>{project.description}</p>
                <ProgressBar progress={project.progress} />
                <Button
                  onClick={goToProject.bind(this, project._id)}
                  type={"success"}
                >
                  Go to Project
                </Button>
              </ProjectCard>
            ))}{" "}
          </DashboardCard>
          <DashboardCard title="Personnel">
            {users.map(user => (
              <div key={user._id} className={styles.userCard}>
                <DashboardCard title={`${user.name} ${user.surname}`}>
                  <p>{user.email}</p>
                  <p>Productivity: {user.productivity}%</p>
                </DashboardCard>
              </div>
            ))}
          </DashboardCard>
        </div>
      </div>
    </div>
  );
};

export default DashboardProjectManager;
