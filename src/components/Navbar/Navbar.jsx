import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./Navbar.module.css";
import profileIcon from "../../assets/images/icons/profile-icon.svg";

const Navbar = () => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const navigate = useNavigate();

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };

  // Handle logout logic here
  const handleLogout = () => {
    // Clear user data from local storage

    // Redirect to login page
    navigate("/login");
  };

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
      <div className={styles.profileIcon} onClick={toggleDropdown}>
        <img src={profileIcon} alt="Profile" />
        {isDropdownVisible && (
          <div className={styles.dropdownMenu}>
            <button onClick={handleLogout} className={styles.dropdownItem}>
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
