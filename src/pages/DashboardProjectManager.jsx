import PropTypes from "prop-types";
import DashboardCard from "../components/Dashboard/DashboardCard";
import styles from "../components/Dashboard/Dashboard.module.css";
import { Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

const OutputsPerHourGraph = ({ data }) => {
  const chartData = {
    labels: Array.from({ length: data.length }, (_, i) => i + 1),
    datasets: [
      {
        label: "Outputs per Hour",
        data: data,
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "category",
        labels: chartData.labels,
      },
      y: {
        type: "linear",
        min: 0,
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

OutputsPerHourGraph.propTypes = {
  data: PropTypes.arrayOf(PropTypes.number).isRequired,
};

const DayByDayGraph = ({ data }) => {
  const chartData = {
    labels: data.map(dayData => dayData.day),
    datasets: [
      {
        label: "Day by Day",
        data: data.map(dayData => dayData.value),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        type: "category",
        labels: chartData.labels,
      },
      y: {
        type: "linear",
        min: 0,
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

DayByDayGraph.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      day: PropTypes.string.isRequired,
      value: PropTypes.number.isRequired,
    })
  ).isRequired,
};

const DashboardProjectManager = () => {
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
  const projectOverview = {
    totalProjects: 10,
    activeProjects: 5,
    completedProjects: 3,
  };
  const personnel = [
    { name: "John Doe", role: "Developer" },
    { name: "Jane Smith", role: "Designer" },
    { name: "Tom Brown", role: "Manager" },
  ];

  return (
    <div>
      <h2>Project Manager Dashboard</h2>
      <div>
        <div className={styles.dashboardContainer}>
          <DashboardCard title="Project Overview">
            <p>Total Projects: {projectOverview.totalProjects}</p>
            <p>Active Projects: {projectOverview.activeProjects}</p>
            <p>Completed Projects: {projectOverview.completedProjects}</p>
          </DashboardCard>

          <DashboardCard title="Personnel">
            <ul>
              {personnel.map((person, index) => (
                <li key={index}>
                  {person.name} - {person.role}
                </li>
              ))}
            </ul>
          </DashboardCard>

          <DashboardCard title="Outputs per Hour">
            <OutputsPerHourGraph data={outputsPerHourData} />
          </DashboardCard>

          <DashboardCard title="Day-by-Day Graph">
            <DayByDayGraph data={dayByDayData} />
          </DashboardCard>
        </div>
      </div>
    </div>
  );
};

// Ensure that Chart.js registers the required scales
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export default DashboardProjectManager;
