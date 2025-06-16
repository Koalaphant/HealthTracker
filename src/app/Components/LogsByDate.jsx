"use client";

import { useEffect, useState } from "react";
import {
  getAllLogsByDate,
  getLogsByDate,
  getAllUniqueLogDates,
} from "../actions/action";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

export default function LogsByDate() {
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [logsByDate, setLogsByDate] = useState([]);
  const [allLogs, setAllLogs] = useState([]);

  useEffect(() => {
    async function fetchDates() {
      const uniqueDates = await getAllUniqueLogDates();
      setDates(uniqueDates);
    }
    fetchDates();
  }, []);

  useEffect(() => {
    async function fetchAllLogs() {
      const result = await getAllLogsByDate();
      setAllLogs(result);
    }
    fetchAllLogs();
  }, []);

  async function handleChange(e) {
    const date = e.target.value;
    setSelectedDate(date);
    const result = await getLogsByDate(date);
    setLogsByDate(result);
  }

  const grouped = allLogs.reduce((acc, log) => {
    const date = new Date(log.createdAt).toISOString().split("T")[0];
    if (!acc[log.option]) acc[log.option] = {};
    acc[log.option][date] = log.value;
    return acc;
  }, {});

  const allDates = Array.from(
    new Set(
      allLogs.map((log) => new Date(log.createdAt).toISOString().split("T")[0])
    )
  ).sort((a, b) => new Date(a) - new Date(b));

  const chartData = {
    labels: allDates,
    datasets: Object.entries(grouped).map(([option, values], i) => ({
      label: option,
      data: allDates.map((d) => values[d] ?? null),
      borderColor: `hsl(${(i * 45) % 360}, 70%, 50%)`,
      fill: false,
    })),
  };

  return (
    <div className="p-4 sm:p-6">
      <div className="mb-6 flex items-center gap-2">
        <label className="font-semibold">Select a date:</label>
        <select
          value={selectedDate}
          onChange={handleChange}
          className="w-full max-w-xs rounded border border-purple-500 px-3 py-2 bg-white text-black"
        >
          <option value="">Select date</option>
          {dates.map((d) => (
            <option key={d} value={d}>
              {new Date(d).toLocaleDateString("en-GB")}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-8 bg-white rounded p-4">
        <div className="relative w-full h-[500px] sm:h-[400px]">
          <Line
            data={chartData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                x: { ticks: { maxRotation: 45, minRotation: 0 } },
                y: { beginAtZero: true },
              },
              plugins: {
                legend: { position: "bottom" },
                tooltip: { mode: "index", intersect: false },
              },
            }}
          />
        </div>
      </div>

      {logsByDate.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {logsByDate.map((log) => (
            <div key={log.id} className="bg-purple-100 p-4 rounded">
              <p className="font-semibold">{log.option}</p>
              <p>{log.value}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
