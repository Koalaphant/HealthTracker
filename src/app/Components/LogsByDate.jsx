"use client";

import { useState } from "react";
import { getLogsByDate } from "../actions/action";

export default function LogsByDate({ dates }) {
  const [selectedDate, setSelectedDate] = useState("");
  const [logs, setLogs] = useState([]);

  async function handleChange(e) {
    const date = e.target.value;
    setSelectedDate(date);
    const result = await getLogsByDate(date);
    setLogs(result);
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Select a date</h2>
      <select
        value={selectedDate}
        onChange={handleChange}
        className="mb-6 rounded border px-3 py-2"
      >
        <option value="">Select date</option>
        {dates.map((d) => (
          <option key={d} value={d}>
            {new Date(d).toLocaleDateString("en-GB")}
          </option>
        ))}
      </select>

      {logs.length > 0 && (
        <div className="space-y-4">
          {logs.map((log) => (
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
