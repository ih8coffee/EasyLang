// DashboardPage.jsx

import DashboardCard from "../components/Dashboard/DashboardCard";
import "../components/Dashboard/Dashboard.module.css";

const DashboardWorker = () => {
  // Placeholder data

  return (
    <div>
      <h2>Worker Dashboard</h2>
      <div className="container">
        <div className="dashboard-container">
          <DashboardCard title="My Project">
            {/* Placeholder data */}
            <p>Project 1</p>
          </DashboardCard>
          <DashboardCard title="My Tasks">
            {/* Placeholder data */}
            <p>Task 1</p>
            <p>Task 2</p>
            <p>Task 3</p>
          </DashboardCard>
          <DashboardCard title="My Performance">
            {/* Placeholder data */}
            <p>Performance 1</p>
            <p>Performance 2</p>
            <p>Performance 3</p>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
};

export default DashboardWorker;
