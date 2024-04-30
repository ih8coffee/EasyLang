import { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Button from "../components/Button/Button";
import ProfileCard from "../components/Profile/ProfileCard";
import styles from "../components/Profile/Profile.module.css";

const Profile = () => {
  const [editMode, setEditMode] = useState(false);
  const [phone, setPhone] = useState("123-456-7890");
  const [email, setEmail] = useState("johndoe@example.com");

  const handleEditProfile = () => {
    setEditMode(true);
  };

  const handleSaveChanges = () => {
    setEditMode(false);
    // Here you can add logic to save changes to the backend
  };

  const handleCancelEdit = () => {
    setEditMode(false);

    // Reset the input fields
    setPhone("123-456-7890");
    setEmail("johndoe@example.com");
  };

  //Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const changePassword = () => {
    // Here you can add logic to change the password
  };

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <h1>Profile</h1>
        <div className={styles.profileContainer}>
          <ProfileCard title="Employee Information">
            <p className={styles.title}>First Name</p>
            <p className={styles.content}>John</p>
            <p className={styles.title}>Last Name</p>
            <p className={styles.content}>Doe</p>
            <p className={styles.title}>Role</p>
            <p className={styles.content}>Worker</p>
          </ProfileCard>

          <ProfileCard title="Contact Information">
            {editMode ? (
              <>
                <label>Phone Number</label>
                <input
                  type="text"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                />
                <label>Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />{" "}
              </>
            ) : (
              <>
                <p className={styles.title}>Phone</p>
                <p className={styles.content}>{phone}</p>
                <p className={styles.title}>Email</p>
                <p className={styles.content}>{email}</p>
              </>
            )}
            <br />
            {editMode ? (
              <>
                <Button type={"success"} onClick={handleSaveChanges}>
                  Save Changes
                </Button>
                <Button type={"danger"} onClick={handleCancelEdit}>
                  Cancel
                </Button>
              </>
            ) : (
              <Button type={"info"} onClick={handleEditProfile}>
                Edit Profile
              </Button>
            )}
          </ProfileCard>

          <ProfileCard title="Performance Metrics">
            <p className={styles.title}>Tasks Completed</p>
            <p className={styles.content}>0</p>
            <p className={styles.title}>Projects Completed</p>
            <p className={styles.content}>0</p>
          </ProfileCard>

          <ProfileCard title="Profile Actions">
            <Button type={"warning"} onClick={changePassword}>
              Change Password
            </Button>
            <Button type={"danger"} onClick={handleLogout}>
              Log Out
            </Button>
          </ProfileCard>
        </div>
      </div>
    </div>
  );
};

export default Profile;
