import styles from "./ProjectCard.module.css";
import PropTypes from "prop-types";

const ProjectCard = ({ title, children }) => {
  return (
    <div className={styles.projectCard}>
      <h3>{title}</h3>
      {children}
    </div>
  );
};

ProjectCard.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default ProjectCard;
