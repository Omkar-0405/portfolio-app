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

export default function EquityDrawdownChart({ data }) {
  return (
    <div style={{ background: "#fff", padding: 16 }}>
      <h3 className="px-4">Equity Curve (Indexed to 100)</h3>
      {/* Equity Curve */}
      <div style={{ height: 320 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="date" hide />
            <YAxis
            //   label={{
            //     value: "Equity (Indexed to 100)",
            //     angle: -90,
            //     position: "insideLeft",
            //   }}
            />
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
      <div style={{ height: 160, marginTop: 24 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <XAxis
              dataKey="date"
            //   label={{
            //     value: "Date",
            //     position: "insideBottom",
            //     // offset: -35,
            //   }}
            />
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
  );
}
