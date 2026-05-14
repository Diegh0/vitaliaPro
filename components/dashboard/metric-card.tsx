"use client";
import { cn } from "@/lib/utils";
import { TrendingUp, TrendingDown, LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface MetricCardProps {
  title: string;
  value: string | number;
  change: number;
  changeLabel?: string;
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  prefix?: string;
  suffix?: string;
  className?: string;
  delay?: number;
}

export function MetricCard({
  title,
  value,
  change,
  changeLabel = "vs last month",
  icon: Icon,
  iconColor = "text-primary",
  iconBg = "bg-primary/10",
  prefix = "",
  suffix = "",
  className,
  delay = 0,
}: MetricCardProps) {
  const isPositive = change >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className={cn(
        "bg-card rounded-2xl border border-border/60 card-shadow p-5 group hover:card-shadow-hover hover:-translate-y-0.5 transition-all duration-200",
        className
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center shrink-0", iconBg)}>
          <Icon className={cn("w-4.5 h-4.5", iconColor)} size={18} />
        </div>
      </div>

      <div className="mb-2">
        <span className="text-2xl font-bold text-foreground tracking-tight">
          {prefix}{typeof value === "number" ? value.toLocaleString("es-ES") : value}{suffix}
        </span>
      </div>

      <div className="flex items-center gap-1.5">
        <span
          className={cn(
            "inline-flex items-center gap-0.5 text-xs font-medium px-1.5 py-0.5 rounded-md",
            isPositive ? "text-emerald-700 bg-emerald-50" : "text-red-600 bg-red-50"
          )}
        >
          {isPositive ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
          {isPositive ? "+" : ""}{change}%
        </span>
        <span className="text-xs text-muted-foreground">{changeLabel}</span>
      </div>
    </motion.div>
  );
}
