import PropTypes from "prop-types";
import styles from "./TaskCard.module.css";

const TaskCard = ({ title, children }) => {
  return (
    <div className={styles.taskCard}>
      <h3>{title}</h3>
      {children}
    </div>
  );
};

TaskCard.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default TaskCard;
