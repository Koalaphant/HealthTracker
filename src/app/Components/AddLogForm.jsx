"use client";

import { useState } from "react";
import SingleForm from "../Components/SingleForm";

export default function AddLogForm() {
  const options = [
    "Bone Profile",
    "Liver Serum Bilirubin",
    "AST Serum",
    "Serum Alanine",
    "Serum Protein Profile",
    "Serum Albubin",
    "Serum Globulin",
    "Serum Cholesterol",
    "Serum Trigycerides",
    "Serum HDL Cholesterol",
    "Serum LDL Cholesterol",
    "Thyroid",
  ];

  const [rawDate, setRawDate] = useState("");

  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const [year, month, day] = dateStr.split("-");
    return `${day}-${month}-${year}`;
  };

  return (
    <>
      <label htmlFor="date">Date for submission:</label>
      <input
        type="date"
        id="date"
        name="date"
        onChange={(e) => setRawDate(e.target.value)}
      />

      <h1 className="text-2xl font-bold text-center m-10">
        Date for submission: {formatDate(rawDate)}
      </h1>

      {options.map((option, i) => (
        <SingleForm key={i} option={option} date={rawDate} />
      ))}
    </>
  );
}
