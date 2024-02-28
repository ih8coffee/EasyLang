// DashboardPage.jsx

import DashboardCard from "../components/Dashboard/DashboardCard";
import "../components/Dashboard/Dashboard.module.css";

const DashboardManager = () => {
  // Placeholder data
  const outputsPerHourData = [10, 20, 30, 25, 35, 40, 45];
  const dayByDayData = [
    { day: "Mon", value: 20 },
    { day: "Tue", value: 30 },
    { day: "Wed", value: 25 },
    { day: "Thu", value: 35 },
    { day: "Fri", value: 40 },
    { day: "Sat", value: 45 },
    { day: "Sun", value: 50 },
  ];
  const personnel = [
    { name: "John Doe", role: "Developer" },
    { name: "Jane Smith", role: "Designer" },
    { name: "Tom Brown", role: "Manager" },
  ];

  return (
    <div>
      <h2>Chief Editor Dashboard</h2>
      <div className="container">
        <div className="dashboard-container">
          <DashboardCard title="Personnel">
            {/* Placeholder data */}
            <ul>
              {personnel.map((person, index) => (
                <li key={index}>
                  {person.name} - {person.role}
                </li>
              ))}
            </ul>
          </DashboardCard>
          <DashboardCard title="Outputs per Hour">
            {/* Placeholder chart or data */}
            <ul>
              {outputsPerHourData.map((output, index) => (
                <li key={index}>
                  Hour {index + 1}: {output}
                </li>
              ))}
            </ul>
          </DashboardCard>
          <DashboardCard title="Day-by-Day Graph">
            {/* Placeholder chart or data */}
            <ul>
              {dayByDayData.map((dayData, index) => (
                <li key={index}>
                  {dayData.day}: {dayData.value}
                </li>
              ))}
            </ul>
          </DashboardCard>
        </div>
      </div>
    </div>
  );
};

export default DashboardManager;
