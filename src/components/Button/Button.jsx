import PropTypes from "prop-types";
import styles from "./Button.module.css";

const Button = ({ children, onClick, type }) => {
  // type determines the color of the button and therefore the style
  // Success, Danger, Warning, Info

  return (
    <button onClick={onClick} className={`${styles.button} ${styles[type]}`}>
      {children}
    </button>
  );
};

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(["success", "danger", "warning", "info"]),
};

export default Button;
