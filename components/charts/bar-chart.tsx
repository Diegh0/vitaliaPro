"use client";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from "recharts";

interface SimpleBarChartProps {
  data: Array<{ name: string; value: number; secondary?: number }>;
  height?: number;
  color?: string;
  secondaryColor?: string;
  valueFormatter?: (v: number) => string;
  unit?: string;
}

const CustomTooltip = ({ active, payload, label, valueFormatter, unit }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-card border border-border/60 rounded-xl p-3 card-shadow text-xs">
        <p className="font-medium text-foreground mb-1">{label}</p>
        {payload.map((p: any) => (
          <p key={p.dataKey} style={{ color: p.fill }} className="font-semibold">
            {valueFormatter ? valueFormatter(p.value) : p.value}{unit || ""}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export function SimpleBarChart({ data, height = 200, color = "#0d9488", secondaryColor, valueFormatter, unit }: SimpleBarChartProps) {
  return (
    <ResponsiveContainer width="100%" height={height}>
      <BarChart data={data} margin={{ top: 4, right: 4, left: -20, bottom: 0 }} barSize={secondaryColor ? 8 : 12}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.04)" vertical={false} />
        <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
        <YAxis tick={{ fontSize: 11, fill: "#94a3b8" }} axisLine={false} tickLine={false} tickFormatter={valueFormatter} />
        <Tooltip content={<CustomTooltip valueFormatter={valueFormatter} unit={unit} />} />
        <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]}>
          {data.map((_, index) => (
            <Cell key={index} fill={color} fillOpacity={0.85} />
          ))}
        </Bar>
        {secondaryColor && (
          <Bar dataKey="secondary" fill={secondaryColor} radius={[4, 4, 0, 0]}>
            {data.map((_, index) => (
              <Cell key={index} fill={secondaryColor} fillOpacity={0.7} />
            ))}
          </Bar>
        )}
      </BarChart>
    </ResponsiveContainer>
  );
}
