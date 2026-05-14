import { cn } from "@/lib/utils";

interface ProgressProps {
  value: number;
  max?: number;
  className?: string;
  barClassName?: string;
  size?: "xs" | "sm" | "md";
  color?: "primary" | "success" | "warning" | "danger" | "gradient";
  showLabel?: boolean;
}

const colorStyles = {
  primary: "bg-primary",
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  danger: "bg-red-500",
  gradient: "bg-gradient-to-r from-teal-500 to-cyan-500",
};

const heights = { xs: "h-1", sm: "h-1.5", md: "h-2" };

export function Progress({ value, max = 100, className, barClassName, size = "sm", color = "primary", showLabel }: ProgressProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className={cn("flex-1 bg-secondary rounded-full overflow-hidden", heights[size])}>
        <div
          className={cn("h-full rounded-full transition-all duration-500", colorStyles[color], barClassName)}
          style={{ width: `${pct}%` }}
        />
      </div>
      {showLabel && (
        <span className="text-xs font-medium text-muted-foreground w-8 text-right">{Math.round(pct)}%</span>
      )}
    </div>
  );
}
