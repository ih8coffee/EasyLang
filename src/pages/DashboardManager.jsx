// DashboardPage.jsx
import { useEffect, useState } from "react";
import DashboardCard from "../components/Dashboard/DashboardCard";
import ProjectCard from "../components/Projects/ProjectCard";
import ProgressBar from "../components/ProgressBar/ProgressBar";
import Task from "../components/Tasks/Task";
import styles from "../components/Dashboard/Dashboard.module.css";
import { fetchProjectTasks } from "../services/tasks";
import { fetchOwnProjects } from "../services/projects";
import { fetchUserById } from "../services/users";
import Button from "../components/Button/Button";

const DashboardManager = () => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const goToWorkspace = taskId => {
    window.location.href = `/workspace/${taskId}`;
  };

  const goToProject = projectId => {
    window.location.href = `/projects/${projectId}`;
  };

  useEffect(() => {
    // Fetch tasks and projects when the component mounts
    async function fetchData() {
      try {
        // Fetch tasks
        const sessionToken = localStorage.getItem("token");
        if (sessionToken) {
          // Fetch users using project.userAssigned array
          const projectsData = await fetchOwnProjects(sessionToken);
          const tasksData = await fetchProjectTasks(
            sessionToken,
            projectsData._id
          );
          const usersData = [];
          for (const project of projectsData) {
            for (const userId of project.userAssigned) {
              const userData = await fetchUserById(sessionToken, userId);
              usersData.push(userData);
            }
          }
          setUsers(usersData);
          setTasks(tasksData);
          setProjects(projectsData);
          console.log(tasksData);
          setIsLoading(false);
        } else {
          console.error("No token found in local session");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div className={styles.container}>
        <h2>Chief Editor Dashboard</h2>
        <div className={styles.dashboardContainer}>
          <DashboardCard title="Tasks in Progress">
            {tasks.map(task => {
              if (!task.inReview && task.state) {
                return (
                  <Task
                    key={task._id}
                    title={task.taskName}
                    status="In Progress"
                  >
                    {task.description}
                    <Button
                      onClick={goToWorkspace.bind(this, task._id)}
                      type={"success"}
                    >
                      Go To Task
                    </Button>
                  </Task>
                );
              }
            })}
          </DashboardCard>
          <DashboardCard title="Tasks in Review">
            {tasks.map(task => {
              if (task.inReview && task.state) {
                return (
                  <Task key={task._id} title={task.taskName} status="In Review">
                    {task.description}
                    <Button
                      onClick={goToWorkspace.bind(this, task._id)}
                      type={"success"}
                    >
                      Go To Task
                    </Button>
                  </Task>
                );
              }
            })}{" "}
          </DashboardCard>
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
            {users.map(user => {
              return (
                <div key={user._id} className={styles.userCard}>
                  <DashboardCard title={`${user.name} ${user.surname}`}>
                    <p>{user.email}</p>
                    <p>{user.role}</p>
                  </DashboardCard>
                </div>
              );
            })}
          </DashboardCard>
        </div>
      </div>
    </div>
  );
};

export default DashboardManager;
