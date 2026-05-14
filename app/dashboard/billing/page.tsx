"use client";
import { PageHeader } from "@/components/dashboard/page-header";
import { ChartCard } from "@/components/dashboard/chart-card";
import { MetricCard } from "@/components/dashboard/metric-card";
import { InvoiceStatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { invoices } from "@/data/invoices";
import { formatDate } from "@/lib/utils";
import { DollarSign, TrendingUp, AlertCircle, CheckCircle, Download, Plus, Zap, Crown, Shield } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Starter",
    price: 79,
    description: "For solo practitioners",
    features: ["Up to 50 patients", "Basic scheduling", "Email support", "1 professional"],
    icon: Shield,
    color: "text-slate-600",
    bg: "bg-slate-50",
  },
  {
    name: "Professional",
    price: 189,
    description: "For growing clinics",
    features: ["Up to 300 patients", "Advanced analytics", "Priority support", "5 professionals", "Custom branding"],
    icon: Zap,
    color: "text-primary",
    bg: "bg-primary/8",
    current: true,
  },
  {
    name: "Enterprise",
    price: 449,
    description: "For large centers",
    features: ["Unlimited patients", "Full analytics suite", "24/7 dedicated support", "Unlimited professionals", "API access", "SSO"],
    icon: Crown,
    color: "text-amber-600",
    bg: "bg-amber-50",
  },
];

const totalRevenue = invoices.reduce((sum, inv) => sum + inv.amount, 0);
const paidRevenue = invoices.filter((inv) => inv.status === "paid").reduce((sum, inv) => sum + inv.amount, 0);
const overdueRevenue = invoices.filter((inv) => inv.status === "overdue").reduce((sum, inv) => sum + inv.amount, 0);

export default function BillingPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Billing"
        description="Manage subscriptions, invoices and payments"
        action={
          <Button icon={<Plus size={15} />}>Create Invoice</Button>
        }
      />

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <MetricCard title="Total Invoiced" value={totalRevenue.toLocaleString("es-ES")} prefix="€" change={8.2} icon={DollarSign} iconBg="bg-teal-50" iconColor="text-teal-600" delay={0} />
        <MetricCard title="Amount Collected" value={paidRevenue.toLocaleString("es-ES")} prefix="€" change={6.1} icon={CheckCircle} iconBg="bg-emerald-50" iconColor="text-emerald-600" delay={0.06} />
        <MetricCard title="Overdue Balance" value={overdueRevenue.toLocaleString("es-ES")} prefix="€" change={-2.4} icon={AlertCircle} iconBg="bg-red-50" iconColor="text-red-500" delay={0.12} changeLabel="vs last month" />
      </div>

      {/* Current plan */}
      <div className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(13,148,136,0.3),transparent_60%)]" />
        <div className="relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Zap size={16} className="text-teal-400" />
                <span className="text-xs font-semibold text-teal-400 uppercase tracking-wider">Current Plan</span>
              </div>
              <h2 className="text-2xl font-bold">Professional</h2>
              <p className="text-slate-400 mt-1">€189/month · Renews June 1, 2026</p>
            </div>
            <div className="flex flex-col sm:items-end gap-2">
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold">€189</span>
                <span className="text-slate-400">/mo</span>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="secondary" size="sm" className="bg-white/10 text-white hover:bg-white/20 border-white/10">
                  Change Plan
                </Button>
                <Button variant="secondary" size="sm" className="bg-white/10 text-white hover:bg-white/20 border-white/10">
                  Manage
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Active Patients", used: 289, max: 300 },
              { label: "Professionals", used: 3, max: 5 },
              { label: "Storage", used: 12, max: 50, unit: "GB" },
              { label: "API Calls", used: 8420, max: 50000 },
            ].map(({ label, used, max, unit }) => (
              <div key={label} className="bg-white/6 rounded-xl p-3">
                <p className="text-xs text-slate-400">{label}</p>
                <p className="text-sm font-bold text-white mt-0.5">
                  {used.toLocaleString("es-ES")}{unit || ""} / {max.toLocaleString("es-ES")}{unit || ""}
                </p>
                <div className="mt-1.5 h-1 bg-white/10 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-teal-500 to-cyan-400 rounded-full"
                    style={{ width: `${(used / max) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Pricing cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className={cn(
              "bg-card rounded-2xl border p-5 relative",
              plan.current ? "border-primary/30 shadow-lg shadow-primary/8" : "border-border/60 card-shadow"
            )}
          >
            {plan.current && (
              <div className="absolute -top-2.5 left-1/2 -translate-x-1/2">
                <span className="px-3 py-1 bg-primary text-white text-xs font-semibold rounded-full">Current Plan</span>
              </div>
            )}
            <div className={cn("w-9 h-9 rounded-xl flex items-center justify-center mb-4", plan.bg)}>
              <plan.icon size={18} className={plan.color} />
            </div>
            <h3 className="font-bold text-foreground">{plan.name}</h3>
            <p className="text-xs text-muted-foreground mt-0.5 mb-4">{plan.description}</p>
            <div className="flex items-baseline gap-1 mb-5">
              <span className="text-3xl font-bold text-foreground">€{plan.price}</span>
              <span className="text-muted-foreground text-sm">/mo</span>
            </div>
            <ul className="space-y-2 mb-5">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <CheckCircle size={13} className="text-primary shrink-0" />
                  {f}
                </li>
              ))}
            </ul>
            <Button
              variant={plan.current ? "outline" : "primary"}
              className="w-full"
              size="sm"
            >
              {plan.current ? "Current Plan" : plan.price > 189 ? "Upgrade" : "Downgrade"}
            </Button>
          </motion.div>
        ))}
      </div>

      {/* Invoices table */}
      <ChartCard
        title="Invoice History"
        description={`${invoices.length} invoices`}
        action={<Button variant="outline" size="sm" icon={<Download size={13} />}>Export</Button>}
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border/60">
              <tr>
                {["Invoice", "Patient", "Service", "Date", "Due Date", "Amount", "Status", ""].map((h) => (
                  <th key={h} className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider pb-3 pr-4 whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {invoices.map((inv, i) => (
                <motion.tr
                  key={inv.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                  className="hover:bg-secondary/30 transition-colors"
                >
                  <td className="py-3 pr-4">
                    <p className="text-xs font-mono text-primary font-semibold">{inv.invoiceNumber}</p>
                  </td>
                  <td className="py-3 pr-4">
                    <p className="text-sm font-medium text-foreground whitespace-nowrap">{inv.patientName}</p>
                  </td>
                  <td className="py-3 pr-4">
                    <p className="text-sm text-muted-foreground max-w-[160px] truncate">{inv.service}</p>
                  </td>
                  <td className="py-3 pr-4 text-sm text-muted-foreground whitespace-nowrap">{formatDate(inv.date)}</td>
                  <td className="py-3 pr-4 text-sm text-muted-foreground whitespace-nowrap">{formatDate(inv.dueDate)}</td>
                  <td className="py-3 pr-4">
                    <p className="text-sm font-bold text-foreground">€{inv.amount.toLocaleString("es-ES")}</p>
                  </td>
                  <td className="py-3 pr-4"><InvoiceStatusBadge status={inv.status} /></td>
                  <td className="py-3">
                    <Button variant="ghost" size="sm" icon={<Download size={12} />}>PDF</Button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartCard>
    </div>
  );
}
