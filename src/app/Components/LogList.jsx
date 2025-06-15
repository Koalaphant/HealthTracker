"use client";

import { useState } from "react";
import { findLog, findLogByOptionAndDate } from "../actions/action";
import LogChart from "./Chart";

export default function LogList({ logs }) {
  const [selectedOption, setSelectedOption] = useState("");
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [logDetails, setLogDetails] = useState(null);

  const logOptions = [...new Set(logs.map((log) => log.option))];

  async function handleOptionChange(e) {
    const option = e.target.value;
    setSelectedOption(option);
    setSelectedDate("");
    setLogDetails(null);

    const data = await findLog(option);

    const uniqueDates = [
      ...new Set(data.map((log) => log.createdAt.toISOString().split("T")[0])),
    ];

    setDates(uniqueDates);
  }

  async function handleDateChange(e) {
    const date = e.target.value;
    setSelectedDate(date);

    const data = await findLogByOptionAndDate(selectedOption, date);

    setLogDetails(data);
  }

  return (
    <>
      <div className="flex flex-col items-center p-4">
        <h3>Select your blood profile:</h3>
        <select
          onChange={handleOptionChange}
          value={selectedOption}
          className="mb-4 w-full max-w-xs rounded border border-purple-500 bg-white px-3 py-2 text-purple-700 focus:border-purple-700 focus:ring-2 focus:ring-purple-300"
        >
          <option value="" disabled>
            Select option
          </option>
          {logOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <h3>Select the date of the test:</h3>
        <select
          onChange={handleDateChange}
          value={selectedDate}
          className="mb-6 w-full max-w-xs rounded border border-purple-500 bg-white px-3 py-2 text-purple-700 focus:border-purple-700 focus:ring-2 focus:ring-purple-300"
        >
          <option value="" disabled>
            Select date
          </option>
          {dates.map((date) => (
            <option key={date} value={date}>
              {new Date(date).toLocaleDateString("en-GB")}
            </option>
          ))}
        </select>

        {logDetails && (
          <div className="fade-in w-full max-w-xs p-6 rounded bg-purple-100 text-purple-900 text-center">
            <h1 className="text-3xl font-semibold">{logDetails.option}</h1>
            <h2 className="text-2xl">{logDetails.value}</h2>
          </div>
        )}

        <LogChart logs={logs} />
      </div>
    </>
  );
}
