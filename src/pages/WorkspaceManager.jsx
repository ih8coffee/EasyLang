import DashboardCard from "../components/Dashboard/DashboardCard";
import styles from "../components/Workspace/Workspace.module.css";
import Button from "../components/Button/Button";
import { useState, useEffect } from "react";
import { fetchTask, updateTask } from "../services/tasks";
import { fetchUserById } from "../services/users";

const WorkspaceManager = () => {
  const [task, setTask] = useState({});
  const [worker, setWorker] = useState({});

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const sessionToken = localStorage.getItem("token");
      if (sessionToken) {
        const taskId = window.location.pathname.split("/").pop();
        const taskData = await fetchTask(sessionToken, taskId);

        setTask(taskData);
        console.log(taskData);
        console.log(taskData.userAssigned);

        const workerData = await fetchUserById(
          sessionToken,
          taskData.userAssigned
        );
        console.log(workerData);
        setWorker(workerData);
      } else {
        console.error("No token found in local session");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const cancel = () => {
    window.location.href = "/dashboard";
  };

  const deny = async () => {
    try {
      const sessionToken = localStorage.getItem("token");
      const updatedTask = {
        ...task,
        bodyFinal: task.bodyInitial,
        inReview: false,
        state: true,
      };
      await updateTask(sessionToken, updatedTask);
    } catch (error) {
      console.error("Error denying task:", error);
    }
  };

  const approve = async () => {
    try {
      const sessionToken = localStorage.getItem("token");
      const updatedTask = {
        ...task,
        bodyInitial: task.bodyFinal,
        finishDate: new Date(),
        inReview: true,
        state: false,
      };
      await updateTask(sessionToken, updatedTask);
    } catch (error) {
      console.error("Error approving task:", error);
    }
  };

  return (
    <div>
      <div className={styles.workspaceContainer}>
        <h2>Workspace</h2>
        <DashboardCard title="Current Task">
          <p className={styles.title}>{task.taskName}</p>
          <p className={styles.details}>{`Description: ${task.description}`}</p>
          <p
            className={styles.details}
          >{`Assigned to: ${worker.name} ${worker.surname}`}</p>
          <p className={styles.text}>{task.bodyInitial}</p>
          <textarea
            className={styles.textEditor}
            rows={10}
            cols={50}
            value={task.bodyFinal} // Assuming task body is stored in state
            onChange={e => setTask({ ...task, bodyFinal: e.target.value })}
          ></textarea>
          <Button type={"success"} onClick={approve}>
            Approve
          </Button>
          <Button type={"danger"} onClick={deny}>
            Deny
          </Button>
          <Button type={"danger"} onClick={cancel}>
            Go Back
          </Button>
          <p className={styles.details}>{`Status: ${
            task.inReview && task.state
              ? "Pending"
              : task.inReview && !task.state
              ? "Approved"
              : "In Progress"
          }`}</p>
          <p className={styles.details}>{`Date Issued: ${new Date(
            task.date
          ).toLocaleDateString()}`}</p>
        </DashboardCard>
      </div>
    </div>
  );
};

export default WorkspaceManager;
