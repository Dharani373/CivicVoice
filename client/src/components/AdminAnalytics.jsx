import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Doughnut, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export default function AdminAnalytics({ stats, reports }) {
  const categories = {};

  reports.forEach((report) => {
    categories[report.category] = (categories[report.category] || 0) + 1;
  });

  const categoryChart = {
    labels: Object.keys(categories),
    datasets: [
      {
        data: Object.values(categories),
        backgroundColor: [
          "#2563eb",
          "#22c55e",
          "#f59e0b",
          "#ef4444",
          "#8b5cf6",
          "#06b6d4",
        ],
      },
    ],
  };

  const statusChart = {
    labels: ["Open", "In Progress", "Resolved"],
    datasets: [
      {
        label: "Complaints",
        data: [
          stats.openReports,
          stats.inProgressReports,
          stats.resolvedReports,
        ],
        backgroundColor: ["#ef4444", "#f59e0b", "#22c55e"],
      },
    ],
  };

  return (
    <div className="analytics-grid">
      <div className="chart-card">
        <h2>Complaints by Category</h2>
        <Doughnut
          data={categoryChart}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            cutout: "65%",
            plugins: {
              legend: {
                position: "bottom",
              },
            },
          }}
        />
      </div>

      <div className="chart-card">
        <h2>Status Distribution</h2>
        <Bar
          data={statusChart}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: false,
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                ticks: {
                  stepSize: 1,
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
}
