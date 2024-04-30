import DashboardCard from "../components/Dashboard/DashboardCard";
import styles from "../components/Dashboard/Dashboard.module.css";
import Button from "../components/Button/Button";
import UsersAdmin from "./UsersAdmin";

const DashboardAdmin = () => {
  return (
    <div>
      <h2>Admin Dashboard</h2>
      <div className={styles.dashboardContainer}>
        <DashboardCard title="Users">
          <UsersAdmin />
        </DashboardCard>

        <DashboardCard title="System Logs">
          <p>View logs of system activities and errors.</p>
        </DashboardCard>

        <DashboardCard title="Personel Management">
          <Button type={"info"}>Manage Users</Button>
          <Button type={"info"}>Manage Roles</Button>
          <Button type={"info"}>Manage Permissions</Button>
        </DashboardCard>

        <DashboardCard title="Database Management">
          <p>Manage database backups and maintenance.</p>{" "}
        </DashboardCard>
      </div>
    </div>
  );
};

export default DashboardAdmin;
