// Navbar.jsx

import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import profileIcon from "../../assets/images/icons/profile-icon.svg";

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarBrand}>
        <Link to="/">EasyLang</Link>
      </div>
      <ul className={styles.navbarNav}>
        <li className={styles.navItem}>
          <Link to="/dashboard" className={styles.navLink}>
            Dashboard
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link to="/projects" className={styles.navLink}>
            Projects
          </Link>
        </li>
      </ul>
      <div className={styles.profileIcon}>
        <img src={profileIcon} alt="Profile" />
      </div>
    </nav>
  );
};

export default Navbar;
