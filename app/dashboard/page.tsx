"use client";
import { MetricCard } from "@/components/dashboard/metric-card";
import { ChartCard } from "@/components/dashboard/chart-card";
import { PageHeader } from "@/components/dashboard/page-header";
import { AppointmentCard } from "@/components/dashboard/appointment-card";
import { PatientCard } from "@/components/dashboard/patient-card";
import { RevenueChart } from "@/components/charts/revenue-chart";
import { SimpleBarChart } from "@/components/charts/bar-chart";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Avatar } from "@/components/ui/avatar";
import { monthlyRevenue, appointmentTrend, adherenceData } from "@/data/revenue";
import { appointments } from "@/data/appointments";
import { patients } from "@/data/patients";
import {
  DollarSign, Users, CalendarCheck, TrendingUp,
  AlertCircle, CheckCircle2, Clock, ArrowRight
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useT } from "@/hooks/use-t";

const todayAppointments = appointments.filter((a) => a.date === "2026-05-12");
const activePatients = patients.filter((p) => p.status === "active");

export default function DashboardPage() {
  const t = useT();

  return (
    <div className="space-y-6">
      <PageHeader
        title={t.dashboard.greeting}
        description={t.dashboard.description}
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <MetricCard
          title={t.dashboard.metrics.revenue}
          value="41.500"
          change={8.2}
          prefix="€"
          icon={DollarSign}
          iconBg="bg-teal-50"
          iconColor="text-teal-600"
          delay={0}
        />
        <MetricCard
          title={t.dashboard.metrics.patients}
          value={289}
          change={6.4}
          icon={Users}
          iconBg="bg-cyan-50"
          iconColor="text-cyan-600"
          delay={0.06}
        />
        <MetricCard
          title={t.dashboard.metrics.appointments}
          value={todayAppointments.length}
          change={12.5}
          icon={CalendarCheck}
          iconBg="bg-indigo-50"
          iconColor="text-indigo-600"
          delay={0.12}
        />
        <MetricCard
          title={t.dashboard.metrics.adherence}
          value={92}
          suffix="%"
          change={3.1}
          icon={TrendingUp}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
          delay={0.18}
        />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <ChartCard
          title={t.dashboard.charts.revenueOverview}
          description={t.dashboard.charts.revenueDesc}
          className="xl:col-span-2"
          delay={0.1}
          action={
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-0.5 bg-teal-500 rounded-full inline-block" />{t.dashboard.charts.revenue}
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-0.5 bg-cyan-400 rounded-full inline-block" />{t.dashboard.charts.net}
              </span>
            </div>
          }
        >
          <RevenueChart data={monthlyRevenue} height={220} />
        </ChartCard>

        <ChartCard title={t.dashboard.charts.todaySchedule} description={`${todayAppointments.length} ${t.appointments.title.toLowerCase()}`} delay={0.15}>
          <div className="space-y-0">
            {todayAppointments.slice(0, 5).map((apt, i) => (
              <AppointmentCard key={apt.id} appointment={apt} delay={i * 0.05} compact />
            ))}
          </div>
          <Link href="/dashboard/appointments">
            <div className="mt-3 text-xs text-primary font-medium hover:underline flex items-center gap-1 cursor-pointer">
              {t.dashboard.viewAllAppointments} <ArrowRight size={12} />
            </div>
          </Link>
        </ChartCard>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <ChartCard title={t.dashboard.charts.appointmentVolume} description={t.dashboard.charts.appointmentVolumeDesc} delay={0.2}>
          <SimpleBarChart data={appointmentTrend} height={180} color="#0d9488" />
        </ChartCard>

        <ChartCard title={t.dashboard.charts.adherence} description={t.dashboard.charts.adherenceDesc} delay={0.25}>
          <SimpleBarChart
            data={adherenceData}
            height={180}
            color="#818cf8"
            valueFormatter={(v: number) => `${v}%`}
          />
        </ChartCard>

        <ChartCard title={t.dashboard.charts.alerts} delay={0.3}>
          <div className="space-y-3">
            {t.dashboard.alerts.map((alert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: 8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                className={`flex items-start gap-3 p-3 rounded-xl text-sm ${
                  i === 0
                    ? "bg-amber-50 border border-amber-100"
                    : i === 2
                    ? "bg-emerald-50 border border-emerald-100"
                    : "bg-blue-50 border border-blue-100"
                }`}
              >
                {i === 0 && <AlertCircle size={16} className="text-amber-500 mt-0.5 shrink-0" />}
                {i === 2 && <CheckCircle2 size={16} className="text-emerald-500 mt-0.5 shrink-0" />}
                {i === 1 && <Clock size={16} className="text-blue-500 mt-0.5 shrink-0" />}
                <div>
                  <p className="text-xs font-medium text-foreground leading-snug">{alert.message}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{alert.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </ChartCard>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold text-foreground">{t.dashboard.recentPatients}</h2>
          <Link href="/dashboard/patients">
            <span className="text-xs text-primary font-medium hover:underline flex items-center gap-1 cursor-pointer">
              {t.dashboard.viewAll} <ArrowRight size={12} />
            </span>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {activePatients.slice(0, 4).map((patient, i) => (
            <PatientCard key={patient.id} patient={patient} delay={i * 0.06} />
          ))}
        </div>
      </div>

      <ChartCard title={t.dashboard.treatmentProgress} description={t.dashboard.activePlans} delay={0.2}>
        <div className="space-y-4">
          {activePatients.slice(0, 5).map((patient) => (
            <div key={patient.id} className="flex items-center gap-4">
              <Avatar name={patient.name} size="sm" />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-foreground truncate">{patient.name}</span>
                  <span className="text-xs font-semibold text-foreground ml-2 shrink-0">{patient.recoveryScore}%</span>
                </div>
                <Progress
                  value={patient.recoveryScore}
                  color={patient.recoveryScore >= 80 ? "success" : patient.recoveryScore >= 60 ? "gradient" : "warning"}
                  size="sm"
                />
              </div>
              <Badge
                variant={patient.riskLevel === "low" ? "success" : patient.riskLevel === "medium" ? "warning" : "danger"}
                size="sm"
              >
                {patient.riskLevel}
              </Badge>
            </div>
          ))}
        </div>
      </ChartCard>
    </div>
  );
}
