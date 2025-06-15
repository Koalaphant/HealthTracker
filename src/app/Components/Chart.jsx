"use client";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Legend,
  Tooltip,
} from "chart.js";

ChartJS.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Legend,
  Tooltip
);

export default function LogChart({ logs }) {
  const grouped = logs.reduce((acc, log) => {
    const date = new Date(log.createdAt).toISOString().split("T")[0];
    if (!acc[log.option]) acc[log.option] = {};
    acc[log.option][date] = log.value;
    return acc;
  }, {});

  const labels = Array.from(
    new Set(
      logs.map((log) => new Date(log.createdAt).toISOString().split("T")[0])
    )
  ).sort();

  const datasets = Object.entries(grouped).map(([option, dateMap]) => ({
    label: option,
    data: labels.map((date) => dateMap[date] ?? null),
    fill: false,
    borderColor: `hsl(${Math.random() * 360}, 70%, 50%)`,
    tension: 0.3,
  }));

  const data = {
    labels,
    datasets,
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <Line data={data} />
    </div>
  );
}
