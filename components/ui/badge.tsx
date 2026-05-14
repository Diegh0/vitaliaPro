import { cn } from "@/lib/utils";
import { AppointmentStatus, RiskLevel, PatientStatus, InvoiceStatus } from "@/types";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning" | "danger" | "info" | "neutral";
  size?: "sm" | "md";
  className?: string;
  dot?: boolean;
}

const variantStyles = {
  default: "bg-primary/10 text-primary border-primary/20",
  success: "bg-emerald-50 text-emerald-700 border-emerald-200",
  warning: "bg-amber-50 text-amber-700 border-amber-200",
  danger: "bg-red-50 text-red-700 border-red-200",
  info: "bg-cyan-50 text-cyan-700 border-cyan-200",
  neutral: "bg-slate-100 text-slate-600 border-slate-200",
};

const dotStyles = {
  default: "bg-primary",
  success: "bg-emerald-500",
  warning: "bg-amber-500",
  danger: "bg-red-500",
  info: "bg-cyan-500",
  neutral: "bg-slate-400",
};

export function Badge({ children, variant = "default", size = "sm", className, dot }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 font-medium border rounded-full",
        size === "sm" ? "px-2 py-0.5 text-xs" : "px-3 py-1 text-sm",
        variantStyles[variant],
        className
      )}
    >
      {dot && (
        <span className={cn("w-1.5 h-1.5 rounded-full", dotStyles[variant])} />
      )}
      {children}
    </span>
  );
}

export function AppointmentStatusBadge({ status }: { status: AppointmentStatus }) {
  const config: Record<AppointmentStatus, { variant: BadgeProps["variant"]; label: string }> = {
    confirmed: { variant: "success", label: "Confirmed" },
    pending: { variant: "warning", label: "Pending" },
    completed: { variant: "info", label: "Completed" },
    cancelled: { variant: "danger", label: "Cancelled" },
  };
  const { variant, label } = config[status];
  return <Badge variant={variant} dot>{label}</Badge>;
}

export function RiskBadge({ level }: { level: RiskLevel }) {
  const config: Record<RiskLevel, { variant: BadgeProps["variant"]; label: string }> = {
    low: { variant: "success", label: "Low Risk" },
    medium: { variant: "warning", label: "Medium Risk" },
    high: { variant: "danger", label: "High Risk" },
  };
  const { variant, label } = config[level];
  return <Badge variant={variant} dot>{label}</Badge>;
}

export function PatientStatusBadge({ status }: { status: PatientStatus }) {
  const config: Record<PatientStatus, { variant: BadgeProps["variant"]; label: string }> = {
    active: { variant: "success", label: "Active" },
    discharged: { variant: "neutral", label: "Discharged" },
    "on-hold": { variant: "warning", label: "On Hold" },
  };
  const { variant, label } = config[status];
  return <Badge variant={variant} dot>{label}</Badge>;
}

export function InvoiceStatusBadge({ status }: { status: InvoiceStatus }) {
  const config: Record<InvoiceStatus, { variant: BadgeProps["variant"]; label: string }> = {
    paid: { variant: "success", label: "Paid" },
    pending: { variant: "warning", label: "Pending" },
    overdue: { variant: "danger", label: "Overdue" },
  };
  const { variant, label } = config[status];
  return <Badge variant={variant} dot>{label}</Badge>;
}
