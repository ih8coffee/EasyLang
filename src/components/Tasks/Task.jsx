import TaskCard from "./TaskCard";
import propTypes from "prop-types";

const Task = ({ title, children }) => {
  return (
    <div>
      <TaskCard title={title}>{children}</TaskCard>
    </div>
  );
};

Task.propTypes = {
  title: propTypes.string.isRequired,
  children: propTypes.node.isRequired,
};

export default Task;
