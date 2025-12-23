import React, { useEffect, useState } from "react";

const ChartFilterForm = ({
  // fromDate,
  // setFromDate,
  applyDateFilter,

  // toDate,
  // setToDate,
}) => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  return (
    <div className="flex flex-wrap gap-4 items-end mb-4">
      <div>
        <label className="block text-sm text-gray-600">From date</label>
        <input
          type="date"
          className="border rounded-md px-3 py-2 text-sm"
          value={fromDate || ""}
          onChange={(e) => {
            setFromDate(e.target.value);
            // applyDateFilter(e.target.value, toDate);
          }}
        />
      </div>

      <div>
        <label className="block text-sm text-gray-600">To date</label>
        <input
          type="date"
          className="border rounded-md px-3 py-2 text-sm"
          value={toDate || ""}
          onChange={(e) => {
            setToDate(e.target.value);
          }}
        />
      </div>

      <button
        className="text-sm px-4 py-2 rounded-md bg-blue-600 text-white
        hover:bg-blue-700 transition-colors
        focus:outline-none focus:ring-2 focus:ring-blue-400"
        onClick={() => {
          applyDateFilter(fromDate, toDate);
        }}
      >
        Submit
      </button>
      <button
        className="text-sm px-4 py-2 rounded-md border border-gray-300
        text-gray-700 hover:bg-gray-100
        transition-colors focus:outline-none"
        onClick={() => {
          setFromDate("");
          setToDate("");
          applyDateFilter("", "");
        }}
      >
        Reset
      </button>
    </div>
  );
};

export default ChartFilterForm;
