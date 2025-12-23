import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import ChartFilterForm from "./ChartFilterForm";

export default function EquityDrawdownChart({ data = [], applyDateFilter }) {
  return (
    <>
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:justify-between sm:items-center">
        <h3 className="py-2 font-semibold text-gray-800 text-base sm:text-lg">
          Equity Curve (Indexed to 100)
        </h3>

        <ChartFilterForm applyDateFilter={applyDateFilter} />
      </div>

      {/* Empty State */}
      {!data || data.length === 0 ? (
        <div className="flex items-center justify-center h-[260px] sm:h-[320px] text-sm text-gray-500">
          No data available
        </div>
      ) : (
        <div className="bg-white p-3 sm:p-4 w-full rounded-xl border border-gray-200">
          {/* Equity Curve */}
          <div className="w-full aspect-[4/3] sm:aspect-[16/6]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={data}
                syncId="portfolioSync"
                margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
              >
                <XAxis dataKey="date" hide />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="equity"
                  stroke="#16a34a"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Drawdown */}
          <div className="w-full aspect-[4/2] sm:aspect-[16/3] mt-6">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={data}
                syncId="portfolioSync"
                margin={{ top: 10, right: 20, left: 10, bottom: 20 }}
              >
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Area
                  type="monotone"
                  dataKey="drawdown"
                  stroke="#ef4444"
                  fill="#fee2e2"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </>
  );
}
