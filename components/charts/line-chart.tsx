"use client";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

interface SimpleLineChartProps {
  data: Array<Record<string, string | number | undefined>>;
  dataKey: string;
  secondaryKey?: string;
  height?: number;
  color?: string;
  secondaryColor?: string;
  valueFormatter?: (v: number) => string;
  xKey?: string;
}

export function SimpleLineChart({ data, dataKey, secondaryKey, height = 200, color = "#0d9488", secondaryColor = "#06b6d4", valueFormatter, xKey = "name" }: SimpleLineChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" vertical={false} />
        <XAxis dataKey={xKey} tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={valueFormatter} />
        <Tooltip
          contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: "12px", fontSize: 12 }}
          formatter={(v) => [valueFormatter && typeof v === "number" ? valueFormatter(v) : v]}
        />
        <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={2.5} dot={false} />
        {secondaryKey && <Line type="monotone" dataKey={secondaryKey} stroke={secondaryColor} strokeWidth={2} dot={false} strokeDasharray="4 4" />}
      </LineChart>
    </ResponsiveContainer>
  );
}
