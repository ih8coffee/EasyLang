import { useEffect, useState } from "react";
import DashboardCard from "../components/Dashboard/DashboardCard";
import Task from "../components/Tasks/Task";
import styles from "../components/Dashboard/Dashboard.module.css";
import { fetchOwnTasks } from "../services/tasks"; // Adjust the path based on your project structure
import { fetchOwnProjects } from "../services/projects"; // Adjust the path based on your project structure
import Button from "../components/Button/Button";

const DashboardWorker = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Fetch tasks and projects when the component mounts
    async function fetchData() {
      try {
        // Fetch tasks
        const sessionToken = localStorage.getItem("token");
        if (sessionToken) {
          const tasksData = await fetchOwnTasks(sessionToken);
          setTasks(tasksData);
          const projectsData = await fetchOwnProjects(sessionToken);
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
      <h2>Worker Dashboard</h2>
      <div>
        <div className={styles.dashboardContainer}>
          <DashboardCard title="My Project">
            {projects.map(project => (
              <p key={project._id}>{project.projectName}</p>
            ))}{" "}
          </DashboardCard>
          <DashboardCard title="My Tasks">
            {/* Render tasks here */}
            {tasks.map(task => (
              <Task key={task._id} title={task.taskName} status="In Progress">
                {task.description}

                <Button
                  onClick={() => console.log("Task completed")}
                  type={"success"}
                >
                  Mark as completed
                </Button>
              </Task>
            ))}
          </DashboardCard>
          <DashboardCard title="My Performance">
            {/* Placeholder data */}
            <p>Task 1: 44%</p>
            <p>Task 2: 89%</p>
            <p>Task 3: 65%</p>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
};

export default DashboardWorker;
