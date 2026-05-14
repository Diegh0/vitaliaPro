"use client";
import { useState } from "react";
import { PageHeader } from "@/components/dashboard/page-header";
import { ChartCard } from "@/components/dashboard/chart-card";
import { MetricCard } from "@/components/dashboard/metric-card";
import { RevenueChart } from "@/components/charts/revenue-chart";
import { SimpleBarChart } from "@/components/charts/bar-chart";
import { SimpleLineChart } from "@/components/charts/line-chart";
import { DonutChart } from "@/components/charts/donut-chart";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  monthlyRevenue, patientGrowth, cancellationData,
  serviceBreakdown, adherenceData
} from "@/data/revenue";
import { teamMembers } from "@/data/team";
import { DollarSign, Users, TrendingDown, Activity, Download, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { useT } from "@/hooks/use-t";

export default function AnalyticsPage() {
  const t = useT();
  const [dateRange, setDateRange] = useState(t.analytics.dateRanges[3]);

  return (
    <div className="space-y-6">
      <PageHeader
        title={t.analytics.title}
        description={t.analytics.description}
        action={
          <div className="flex items-center gap-2">
            {/* Date range selector */}
            <div className="hidden sm:flex items-center gap-1 bg-secondary border border-border rounded-xl p-1">
              {t.analytics.dateRangeShort.map((short, i) => (
                <button
                  key={short}
                  onClick={() => setDateRange(t.analytics.dateRanges[i])}
                  className={cn(
                    "px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                    dateRange === t.analytics.dateRanges[i] ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  {short}
                </button>
              ))}
            </div>
            <Button variant="outline" size="sm" icon={<Download size={14} />}>
              {t.analytics.export}
            </Button>
          </div>
        }
      />

      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <MetricCard title={t.analytics.metrics.totalRevenue} value="342.800" prefix="€" change={18.4} icon={DollarSign} iconBg="bg-teal-50" iconColor="text-teal-600" delay={0} />
        <MetricCard title={t.analytics.metrics.patientGrowth} value={312} change={22.1} icon={Users} iconBg="bg-cyan-50" iconColor="text-cyan-600" delay={0.06} />
        <MetricCard title={t.analytics.metrics.cancellationRate} value={6.2} suffix="%" change={-2.4} icon={TrendingDown} iconBg="bg-red-50" iconColor="text-red-500" delay={0.12} changeLabel={t.analytics.metrics.improvement} />
        <MetricCard title={t.analytics.metrics.adherenceRate} value={92} suffix="%" change={4.1} icon={Activity} iconBg="bg-emerald-50" iconColor="text-emerald-600" delay={0.18} />
      </div>

      {/* Revenue + Patient growth */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <ChartCard
          title={t.analytics.charts.revenueTrend}
          description={t.analytics.charts.revenueTrendDesc}
          delay={0.1}
          action={
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-0.5 bg-teal-500 rounded-full inline-block" />{t.analytics.revenue}</span>
              <span className="flex items-center gap-1.5"><span className="w-2.5 h-0.5 bg-cyan-400 rounded-full inline-block" />{t.analytics.net}</span>
            </div>
          }
        >
          <RevenueChart data={monthlyRevenue} height={220} />
        </ChartCard>

        <ChartCard title={t.analytics.charts.patientGrowth} description={t.analytics.charts.patientGrowthDesc} delay={0.15}>
          <SimpleLineChart
            data={patientGrowth}
            dataKey="value"
            height={220}
            color="#06b6d4"
            valueFormatter={(v: number) => `${v}`}
          />
        </ChartCard>
      </div>

      {/* Service breakdown + Cancellations */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <ChartCard title={t.analytics.charts.serviceDistribution} description={t.analytics.charts.serviceDistributionDesc} delay={0.2}>
          <DonutChart data={serviceBreakdown} height={200} />
          <div className="mt-4 space-y-2">
            {serviceBreakdown.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: item.color }} />
                  <span className="text-muted-foreground">{item.name}</span>
                </div>
                <span className="font-semibold text-foreground">{item.value}%</span>
              </div>
            ))}
          </div>
        </ChartCard>

        <ChartCard title={t.analytics.charts.cancellationRate} description={t.analytics.charts.cancellationRateDesc} delay={0.25}>
          <SimpleBarChart
            data={cancellationData}
            height={180}
            color="#f59e0b"
            valueFormatter={(v: number) => `${v}`}
          />
        </ChartCard>

        <ChartCard title={t.analytics.charts.adherence} description={t.analytics.charts.adherenceDesc} delay={0.3}>
          <SimpleBarChart
            data={adherenceData}
            height={180}
            color="#10b981"
            valueFormatter={(v: number) => `${v}%`}
          />
        </ChartCard>
      </div>

      {/* Professional performance */}
      <ChartCard title={t.analytics.charts.professionalPerformance} description={t.analytics.charts.professionalPerformanceDesc} delay={0.2}>
        <div className="space-y-4">
          {teamMembers.filter((m) => m.activePatients > 0).map((member) => (
            <div key={member.id} className="flex items-center gap-4">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center shrink-0">
                <span className="text-white text-xs font-bold">
                  {member.name.split(" ").slice(-1)[0][0]}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-foreground truncate">{member.name}</span>
                  <div className="flex items-center gap-1 text-amber-500 shrink-0 ml-2">
                    <Star size={12} className="fill-amber-400" />
                    <span className="text-xs font-semibold text-foreground">{member.rating}</span>
                  </div>
                </div>
                <Progress value={member.rating * 20} color="gradient" size="sm" />
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-bold text-foreground">{member.activePatients}</p>
                <p className="text-xs text-muted-foreground">{t.analytics.patients}</p>
              </div>
            </div>
          ))}
        </div>
      </ChartCard>

      {/* Top services table */}
      <ChartCard title={t.analytics.charts.topServices} description={t.analytics.charts.thisPeriod} delay={0.25}>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border/60">
              <tr>
                {[t.analytics.table.service, t.analytics.table.sessions, t.analytics.table.revenue, t.analytics.table.growth, t.analytics.table.satisfaction].map((h) => (
                  <th key={h} className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider pb-3 pr-4">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {[
                { service: "Manual Therapy", sessions: 312, revenue: 93600, growth: 12.4, satisfaction: 4.9 },
                { service: "Sports Rehabilitation", sessions: 214, revenue: 74900, growth: 18.2, satisfaction: 4.8 },
                { service: "Aquatic Therapy", sessions: 186, revenue: 65100, growth: 8.7, satisfaction: 4.7 },
                { service: "Performance Assessment", sessions: 142, revenue: 56800, growth: 24.1, satisfaction: 4.9 },
                { service: "Electrotherapy", sessions: 128, revenue: 38400, growth: 5.2, satisfaction: 4.6 },
              ].map((row) => (
                <tr key={row.service} className="hover:bg-secondary/30 transition-colors">
                  <td className="py-3 pr-4">
                    <p className="text-sm font-medium text-foreground">{row.service}</p>
                  </td>
                  <td className="py-3 pr-4 text-sm text-foreground">{row.sessions.toLocaleString("es-ES")}</td>
                  <td className="py-3 pr-4 text-sm font-semibold text-foreground">€{row.revenue.toLocaleString("es-ES")}</td>
                  <td className="py-3 pr-4">
                    <span className="text-xs font-medium text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded-md">+{row.growth}%</span>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center gap-1">
                      <Star size={12} className="fill-amber-400 text-amber-400" />
                      <span className="text-sm font-medium text-foreground">{row.satisfaction}</span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </ChartCard>
    </div>
  );
}
