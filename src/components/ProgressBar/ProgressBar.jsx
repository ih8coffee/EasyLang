import styles from "./ProgressBar.module.css";
import propTypes from "prop-types";

const ProgressBar = ({ progress }) => {
  return (
    <div className={styles.progressBarContainer}>
      <div className={styles.progressBarBackground}>
        <div
          className={styles.progressBar}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
    </div>
  );
};

ProgressBar.propTypes = {
  progress: propTypes.number.isRequired,
};

export default ProgressBar;
