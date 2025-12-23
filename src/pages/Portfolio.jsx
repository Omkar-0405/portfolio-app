import { useEffect, useState } from "react";
import { parseExcel } from "../utils/excelParser";
import excelFile from "../data/portfolio.xlsx";
import EquityDrawdownChart from "../components/EquityDrawdownChart";
import {
  calculateYearlyReturns,
  getMonthlyReturns,
  groupReturnsByYear,
} from "../utils/yearlyReturns";
import MonthlyReturnsTable from "../components/MonthlyReturnsTable";
import ChartFilterForm from "../components/ChartFilterForm";

export default function Portfolio() {
  const [tableData, setTableData] = useState([]);
  const [fullChartData, setFullChartData] = useState([]);
  const [filteredChartData, setFilteredChartData] = useState([]);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  function applyDateFilter(type) {
    console.log("fromDate, toDate", fromDate, toDate);
    if (type && type === "fullChartData") {
      setFilteredChartData(fullChartData);
    } else {
      let data = fullChartData;
      if (fromDate && toDate) {
        data = data.filter((d) => d.date >= fromDate && d.date <= toDate);
      }
      setFilteredChartData(data || []);
    }
  }

  useEffect(() => {
    fetch(excelFile)
      .then((res) => res.blob())
      .then(parseExcel)
      .then((navData) => {
        const baseNav = navData[0].nav;

        const equityCurve = navData.map((d) => ({
          date: d.date.toISOString().slice(0, 10),
          equity: ((d.nav / baseNav) * 100).toFixed(2),
        }));

        console.log("Equity Curve:", equityCurve.slice(0, 5));

        // Drawdown
        let peak = equityCurve[0].equity;

        const equityCurveDrawdownData = equityCurve.map((d) => {
          peak = Math.max(peak, d.equity);
          return {
            ...d,
            drawdown: (((d.equity - peak) / peak) * 100).toFixed(2),
          };
        });

        console.log("Drawdown Data:", equityCurveDrawdownData.slice(0, 5));

        // Monthly returns
        const monthlyReturns = getMonthlyReturns(navData);
        const grouped = groupReturnsByYear(monthlyReturns);
        //Yearly Returns
        const yearlyReturns = calculateYearlyReturns(monthlyReturns);
        setTableData({ grouped, yearlyReturns });

        setFullChartData(equityCurveDrawdownData);
        setFilteredChartData(equityCurveDrawdownData);
      })
      .catch((err) => console.error(err));
  }, []);

  console.log(" tableData", tableData);

  return (
    <div className="container mx-auto px-4">
      <MonthlyReturnsTable data={tableData} />
      <br />
      <div className="flex justify-end items-center">
        <ChartFilterForm
          applyDateFilter={applyDateFilter}
          fromDate={fromDate}
          setFromDate={setFromDate}
          toDate={toDate}
          setToDate={setToDate}
          setFilteredChartData={setFilteredChartData}
        />
      </div>
      <EquityDrawdownChart
        data={filteredChartData || {}}
        applyDateFilter={applyDateFilter}
        fromDate={fromDate}
        setFromDate={setFromDate}
        toDate={toDate}
        setToDate={setToDate}
      />
    </div>
  );
}
