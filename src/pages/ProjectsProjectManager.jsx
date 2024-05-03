import styles from "../components/Projects/Projects.module.css";
import {
  fetchProject,
  updateProject,
  deleteProject,
} from "../services/projects";
import {
  fetchProjectTasks,
  updateTask,
  createTask,
  deleteTask,
} from "../services/tasks";
import { useEffect, useState } from "react";
import ProjectCard from "../components/Projects/ProjectCard";
import Task from "../components/Tasks/Task";
import Button from "../components/Button/Button";

const ProjectsProjectManager = () => {
  const [project, setProject] = useState({});
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editedProjectName, setEditedProjectName] = useState("");
  const [editedProjectDescription, setEditedProjectDescription] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const sessionToken = localStorage.getItem("token");
        if (sessionToken) {
          const projectID = window.location.pathname.split("/").pop();
          const projectData = await fetchProject(sessionToken, projectID);
          const tasksData = await fetchProjectTasks(sessionToken, projectID);
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

  const handleEditClick = () => {
    setIsEditing(true);
    setEditedProjectName(project.projectName);
    setEditedProjectDescription(project.projectDescription);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleSaveEdit = async () => {
    try {
      const sessionToken = localStorage.getItem("token");
      if (sessionToken) {
        const updatedProject = {
          ...project,
          projectName: editedProjectName,
          projectDescription: editedProjectDescription,
        };
        await updateProject(sessionToken, updatedProject);
        setIsEditing(false);
        setProject(updatedProject);
      } else {
        console.error("No token found in local session");
      }
    } catch (error) {
      console.error("Error updating project:", error);
    }
  };

  const handleDeleteProject = async () => {
    try {
      const sessionToken = localStorage.getItem("token");
      if (sessionToken) {
        const projectID = project._id;
        await deleteProject(sessionToken, projectID);
        // Redirect to projects page or home page after deletion
        window.location.href = "/projects"; // Assuming projects page route
      } else {
        console.error("No token found in local session");
      }
    } catch (error) {
      console.error("Error deleting project:", error);
    }
  };

  const addTask = async () => {
    try {
      const sessionToken = localStorage.getItem("token");
      if (sessionToken) {
        const newTask = {
          taskName: "New Task",
          description: "Task Description",
          state: true,
          inReview: false,
          projectID: project._id,
        };
        const createdTask = await createTask(sessionToken, newTask);
        setTasks([...tasks, createdTask]);
      } else {
        console.error("No token found in local session");
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  return (
    <div className={styles.projectsContainer}>
      <div className={styles.projectCard}>
        <ProjectCard title={""}>
          {isEditing ? (
            <div>
              <input
                type="text"
                value={editedProjectName}
                onChange={e => setEditedProjectName(e.target.value)}
              />
              <textarea
                value={editedProjectDescription}
                onChange={e => setEditedProjectDescription(e.target.value)}
              />
              <Button onClick={handleSaveEdit} type="success">
                Save
              </Button>
              <Button onClick={handleCancelEdit} type="danger">
                Cancel
              </Button>
            </div>
          ) : (
            <div>
              <p className={styles.title}>{project.projectName}</p>
              <p className={styles.description}>{project.description}</p>

              <div className={styles.buttonContainer}>
                <Button onClick={handleEditClick} type="success">
                  Edit
                </Button>
                <Button onClick={handleDeleteProject} type="danger">
                  Delete
                </Button>
                <Button onClick={addTask} type="success">
                  Add Task
                </Button>
              </div>
            </div>
          )}
        </ProjectCard>
      </div>

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

export default ProjectsProjectManager;
