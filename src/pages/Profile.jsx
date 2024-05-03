import { useState, useEffect } from "react";
import Navbar from "../components/Navbar/Navbar";
import Button from "../components/Button/Button";
import ProfileCard from "../components/Profile/ProfileCard";
import styles from "../components/Profile/Profile.module.css";
import { fetchOwnProfile, updateUserProfile } from "../services/users";

const Profile = () => {
  //email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  //phone regex
  const phoneRegex = /^\d{10}$/;
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState("");

  //Fetch user profile
  const fetchProfile = async () => {
    try {
      const sessionToken = localStorage.getItem("token");
      if (sessionToken) {
        const profileData = await fetchOwnProfile(sessionToken);
        setUser(profileData);
      } else {
        console.error("No token found in local session");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch profile data when the component mounts
  useEffect(() => {
    fetchProfile();
    setPhone(user.phone);
    setEmail(user.email);
  }, []);

  // Edit contact info
  const handleEditProfile = () => {
    setEditMode(true);
  };

  // Save changes
  const handleSaveChanges = async () => {
    // Here you can add logic to save changes
    if (!phone.match(phoneRegex) || !email.match(emailRegex)) {
      alert("Invalid phone or email");
      return;
    }
    const updatedProfile = {
      ...user,
      phone: phone,
      email: email,
    };

    const sessionToken = localStorage.getItem("token");
    await updateUserProfile(sessionToken, updatedProfile);

    setUser(updatedProfile);

    setEditMode(false);
  };

  //cancel {
  const handleCancel = () => {
    setEditMode(false);
    fetchProfile();
  };

  //Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  return (
    <div>
      <Navbar />
      <div className={styles.container}>
        <h1>Profile</h1>
        <div className={styles.profileContainer}>
          <ProfileCard title="Employee Information">
            <p className={styles.title}>First Name</p>
            <p className={styles.content}>{user.name}</p>
            <p className={styles.title}>Last Name</p>
            <p className={styles.content}>{user.surname}</p>
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
                <p className={styles.content}>{user.phone}</p>
                <p className={styles.title}>Email</p>
                <p className={styles.content}>{user.email}</p>
              </>
            )}
            <br />
            {editMode ? (
              <>
                <Button type={"success"} onClick={handleSaveChanges}>
                  Save Changes
                </Button>
                <Button type={"danger"} onClick={handleCancel}>
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
