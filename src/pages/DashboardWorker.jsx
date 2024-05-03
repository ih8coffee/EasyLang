import { useEffect, useState } from "react";
import DashboardCard from "../components/Dashboard/DashboardCard";
import ProjectCard from "../components/Projects/ProjectCard";
import ProgressBar from "../components/ProgressBar/ProgressBar";
import Task from "../components/Tasks/Task";
import styles from "../components/Dashboard/Dashboard.module.css";
import { fetchOwnTasks } from "../services/tasks";
import { fetchOwnProjects } from "../services/projects";
import Button from "../components/Button/Button";

const DashboardWorker = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const goToWorkspace = taskId => {
    window.location.href = `/workspace/${taskId}`;
  };

  useEffect(() => {
    // Fetch tasks and projects when the component mounts
    async function fetchData() {
      try {
        // Fetch tasks
        const sessionToken = localStorage.getItem("token");
        if (sessionToken) {
          setIsLoading(true); // Set loading to true before fetching data
          const tasksData = await fetchOwnTasks(sessionToken);
          setTasks(tasksData);
          const projectsData = await fetchOwnProjects(sessionToken);
          setProjects(projectsData);
          setIsLoading(false); // Set loading to false after fetching data
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
        <section className={styles.breadcrumb}>Easylang - Dashboard</section>
        <h2>Worker Dashboard</h2>
        {isLoading ? ( // Display loading indicator if isLoading is true
          <div>Loading...</div>
        ) : (
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
                return null;
              })}
            </DashboardCard>
            <DashboardCard title="Tasks in Review">
              {tasks.map(task => {
                if (task.inReview && task.state) {
                  return (
                    <Task
                      key={task._id}
                      title={task.taskName}
                      status="In Review"
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
                return null;
              })}
            </DashboardCard>
            <DashboardCard title="My Project">
              {projects.map(project => (
                <ProjectCard key={project._id} title={project.projectName}>
                  <p>{project.description}</p>
                  <ProgressBar progress={project.progress} />
                </ProjectCard>
              ))}
            </DashboardCard>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardWorker;
