import { useCallback, useEffect, useMemo, useState } from "react";
import { parseExcel } from "../utils/excelParser";
import excelFile from "../data/portfolio.xlsx";
import EquityDrawdownChart from "../components/EquityDrawdownChart";
import {
  calculateYearlyReturns,
  getMonthlyReturns,
  groupReturnsByYear,
} from "../utils/yearlyReturns";
import MonthlyYearlyReturnsTable from "../components/MonthlyYearlyReturnsTable";

export default function Portfolio() {
  const [navData, setNavData] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [fullChartData, setFullChartData] = useState([]);
  const [filteredChartData, setFilteredChartData] = useState([]);

  const applyDateFilter = useCallback(
    (fromDate, toDate) => {
      console.log("fromDate, toDate", fromDate, toDate);
      if (!fromDate && !toDate) {
        setFilteredChartData(fullChartData);
        return;
      }
      let data = [...fullChartData];
      console.log("data", typeof data[0]?.date);
      data = data.filter((d) => d.date >= fromDate && d.date <= toDate);
      setFilteredChartData(data || []);
    },
    [fullChartData]
  );

  const equityAndDrawdownData = useMemo(() => {
    if (!navData.length) return [];

    const baseNav = navData[0].nav;
    let peak = 0;

    return navData.map((d) => {
      const equity = (d.nav / baseNav) * 100;
      peak = Math.max(peak, equity);

      return {
        date: d.date.toISOString().slice(0, 10),
        equity, // number
        drawdown: ((equity - peak) / peak) * 100, // number
      };
    });
  }, [navData]);

  const monthlyAndYearlyData = useMemo(() => {
    if (!navData.length) {
      return { grouped: {}, yearlyReturns: {} };
    }

    const monthlyReturns = getMonthlyReturns(navData);
    return {
      grouped: groupReturnsByYear(monthlyReturns),
      yearlyReturns: calculateYearlyReturns(monthlyReturns),
    };
  }, [navData]);

  useEffect(() => {
    setTableData(monthlyAndYearlyData);
  }, [monthlyAndYearlyData]);

  useEffect(() => {
    setFullChartData(equityAndDrawdownData);
    setFilteredChartData(equityAndDrawdownData);
  }, [equityAndDrawdownData]);

  useEffect(() => {
    fetch(excelFile)
      .then((res) => res.blob())
      .then(parseExcel)
      .then((data) => {
        if (!data?.length) return;
        setNavData(data);
      })
      .catch(console.error);
  }, []);

  return (
    <>
      <h1 className="text-2xl font-semibold mb-6">Portfolio</h1>
      <div className="container mx-auto px-4">
        <MonthlyYearlyReturnsTable data={tableData} />
        <br />
        <EquityDrawdownChart
          data={filteredChartData || {}}
          applyDateFilter={applyDateFilter}
        />
      </div>
    </>
  );
}
