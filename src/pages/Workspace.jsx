import { useEffect, useState } from "react";
import { fetchOwnTasks } from "../services/tasks";

const Workspace = () => {
  const [tasks, setTasks] = useState([]);
  // Removed the declaration and assignment of the 'token' variable
  const [token, setToken] = useState("");

  useEffect(() => {
    // Fetch tasks when the component mounts
    async function fetchTasks() {
      try {
        // Retrieve token from local session
        const sessionToken = localStorage.getItem("token");
        if (sessionToken) {
          setToken(sessionToken);
          const tasksData = await fetchOwnTasks(token);
          setTasks(tasksData);
        } else {
          console.error("No token found in local session");
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    }

    fetchTasks();
  }, []); // Empty dependency array ensures useEffect runs only once

  return (
    <div>
      <h2>Workspace</h2>
      <h3>Current Task</h3>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            <h4>{task.taskName}</h4>
            <p>{task.description}</p>
            <p>Progress: {task.progress}%</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Workspace;
