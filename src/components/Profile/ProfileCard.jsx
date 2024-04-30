import PropTypes from "prop-types";
import styles from "./ProfileCard.module.css";

const ProfileCard = ({ title, children }) => {
  return (
    <div className={styles.profileCard}>
      <h3>{title}</h3>
      {children}
    </div>
  );
};

ProfileCard.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
};

export default ProfileCard;
