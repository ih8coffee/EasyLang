// DashboardCard.jsx

import PropTypes from "prop-types";
import styles from "./DashboardCard.module.css";

const DashboardCard = ({ title, children }) => {
  return (
    <div className={styles.dashboardCard}>
      <h3>{title}</h3>
      {children}
    </div>
  );
};

DashboardCard.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default DashboardCard;
