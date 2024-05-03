import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import profileIcon from "../../assets/images/icons/profile-icon.svg";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarBrand}>
        <Link to="/">EasyLang</Link>
      </div>
      <div className={styles.profileIcon}>
        <Link to="/profile">
          <img src={profileIcon} alt="Profile" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
