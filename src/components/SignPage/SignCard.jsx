// SignCard.jsx

import PropTypes from "prop-types";
import styles from "./SignCard.module.css";

const SignCard = ({ title, children }) => {
  return (
    <div className={styles.card}>
      <h1>{title}</h1>
      {children}
    </div>
  );
};

SignCard.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default SignCard;
