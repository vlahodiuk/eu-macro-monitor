import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

const GdpChart = ({ data, loading, error, isDark }) => {
  const axisColor = isDark ? "#94a3b8" : "#64748b";
  const gridColor = isDark ? "#334155" : "#e2e8f0";
  const tooltipBackground = isDark ? "#0f172a" : "#ffffff";
  const tooltipText = isDark ? "#f8fafc" : "#0f172a";
  if (loading) {
    return (
      <div className="bg-slate-800 border border-slate-700 rounded-lg p-4 animate-pulse">
        <div className="h-4 w-24 bg-slate-700 rounded mb-4" />
        <div className="h-8 w-32 bg-slate-700 rounded mb-3" />
        <div className="h-3 w-20 bg-slate-700 rounded" />
      </div>
    );
  }
  if (error) {
    return (
      <div className="bg-slate-800 border border-red-900 rounded-lg p-4">
        <h2 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">
          GDP Growth Trend
        </h2>
        <p className="text-red-400 mt-3 text-sm">Unable to load data</p>
      </div>
    );
  }
  if (data.length === 0) {
    return (
      <div
        className="mt-8 rounded-lg border border-slate-200 bg-white p-6
           dark:border-slate-700 dark:bg-slate-800"
      >
        <h2 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">
          GDP Growth Trend
        </h2>

        <p className="text-slate-400 mt-4">
          No GDP data available for the selected country.
        </p>
      </div>
    );
  }
  return (
    <div
      className="mt-8 rounded-lg border border-slate-200 bg-white p-6
           dark:border-slate-700 dark:bg-slate-800"
    >
      <h2 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">
        GDP Growth Trend
      </h2>

      <LineChart data={data} responsive style={{ width: "100%", height: 320 }}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke={gridColor}
          vertical={false}
        />

        <XAxis
          dataKey="year"
          stroke={axisColor}
          tickLine={false}
          axisLine={false}
        />

        <YAxis
          width="auto"
          stroke={axisColor}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}%`}
        />

        <Tooltip
          formatter={(value) => [`${Number(value).toFixed(1)}%`, "GDP Growth"]}
          contentStyle={{
            backgroundColor: tooltipBackground,
            border: `1px solid ${gridColor}`,
            borderRadius: "8px",
            color: tooltipText,
          }}
          labelStyle={{ color: tooltipText }}
          itemStyle={{ color: "#0891b2" }}
        />

        <Line
          type="monotone"
          dataKey="value"
          stroke={isDark ? "#22d3ee" : "#0891b2"}
          strokeWidth={3}
          dot={false}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </div>
  );
};

export default GdpChart;
