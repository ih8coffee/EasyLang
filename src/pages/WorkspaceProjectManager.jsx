import styles from "../components/Workspace/Workspace.module.css";
import DashboardCard from "../components/Dashboard/DashboardCard";
import Button from "../components/Button/Button";
import { useState } from "react";
import { createTask, updateTask, deleteTask } from "../services/tasks";
import {
  createProject,
  updateProject,
  deleteProject,
} from "../services/projects";

const WorkspaceManager = () => {
  const [task, setTask] = useState({});
  const [project, setProject] = useState({});

  return (
    <div>
      <h2>Workspace</h2>
      <div className={styles.workspaceContainer}>
        <h2>Workspace</h2>
        <DashboardCard title="Current Task">
          <p className={styles.title}>{task.taskName}</p>
          <p className={styles.details}>{`Description: ${task.description}`}</p>
          <p className={styles.text}>{task.bodyInitial}</p>
          <textarea
            className={styles.textEditor}
            rows={10}
            cols={50}
            value={task.bodyFinal}
            onChange={e => setTask({ ...task, bodyFinal: e.target.value })}
          ></textarea>
          <Button onClick={submitForReview}>Submit for Review</Button>
          <Button onClick={cancel}>Cancel</Button>
        </DashboardCard>
      </div>
    </div>
  );
};

export default WorkspaceManager;
