"use client";

import { submitForm } from "../actions/action";
import SingleForm from "../Components/SingleForm";
import { useActionState, useState, useEffect } from "react";

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

  const [dateString, setDateString] = useState("");

  useEffect(() => {
    setDateString(new Date().toLocaleDateString("en-GB"));
  }, []);

  return (
    <>
      <h1 className="text-2xl font-bold text-center m-10">
        Date for submission: {dateString}
      </h1>
      {options.map((option, i) => (
        <SingleForm key={i} option={option} />
      ))}
    </>
  );
}
