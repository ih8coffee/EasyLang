import styles from "../components/Projects/Projects.module.css";
import { fetchProject } from "../services/projects";
import { fetchProjectTasks } from "../services/tasks";
import { useEffect, useState } from "react";
import ProjectCard from "../components/Projects/ProjectCard";
import Task from "../components/Tasks/Task";
import Button from "../components/Button/Button";

const ProjectsWorker = () => {
  const [project, setProject] = useState({});
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const sessionToken = localStorage.getItem("token");
        if (sessionToken) {
          const projectID = window.location.pathname.split("/").pop();
          const projectData = await fetchProject(sessionToken, projectID);
          const tasksData = await fetchProjectTasks(sessionToken, projectID);
          console.log(projectData);
          setProject(projectData);
          setTasks(tasksData);
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
    <div className={styles.projectsContainer}>
      <ProjectCard title={project.projectName}>
        {project.description}
      </ProjectCard>
      <h2>Tasks in Progress</h2>
      <div className={styles.tasksContainer}>
        {tasks.map(task => {
          if (task.inReview === false && task.state === true) {
            return (
              <div key={task._id} className={styles.taskCard}>
                <Task title={task.taskName} status="In Progress">
                  {task.description}

                  <Button
                    onClick={() => {
                      window.location.href = `/workspace/${task._id}`;
                    }}
                    type={"success"}
                  >
                    Go To Task
                  </Button>
                </Task>
              </div>
            );
          }
        })}

        {tasks.length === 0 && (
          <p className={styles.noTasks}>No tasks available for this project</p>
        )}
      </div>
      <h2>Tasks in Review</h2>
      <div className={styles.tasksContainer}>
        {tasks.map(task => {
          if (task.inReview === true && task.state === true) {
            return (
              <div key={task._id} className={styles.taskCard}>
                <Task title={task.taskName} status="In Review">
                  {task.description}

                  <Button
                    onClick={() => {
                      window.location.href = `/workspace/${task._id}`;
                    }}
                    type={"success"}
                  >
                    Go To Task
                  </Button>
                </Task>
              </div>
            );
          }
        })}

        {tasks.length === 0 && (
          <p className={styles.noTasks}>No tasks available for this project</p>
        )}
      </div>
      <h2>Tasks in Completed</h2>
      <div className={styles.tasksContainer}>
        {tasks.map(task => {
          if (task.state === false && task.inReview === true) {
            return (
              <div key={task._id} className={styles.taskCard}>
                <Task title={task.taskName} status="Completed">
                  {task.description}

                  <Button
                    onClick={() => {
                      window.location.href = `/workspace/${task._id}`;
                    }}
                    type={"success"}
                  >
                    Go To Task
                  </Button>
                </Task>
              </div>
            );
          }
        })}

        {tasks.length === 0 && (
          <p className={styles.noTasks}>No tasks available for this project</p>
        )}
      </div>
    </div>
  );
};

export default ProjectsWorker;
