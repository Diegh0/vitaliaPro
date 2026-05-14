"use client";
import { patients } from "@/data/patients";
import { painProgressData } from "@/data/revenue";
import { appointments } from "@/data/appointments";
import { Avatar } from "@/components/ui/avatar";
import { PatientStatusBadge, RiskBadge, AppointmentStatusBadge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { ChartCard } from "@/components/dashboard/chart-card";
import { SimpleLineChart } from "@/components/charts/line-chart";
import { formatDate } from "@/lib/utils";
import {
  ArrowLeft, Phone, Mail, Calendar, Clock, Activity,
  FileText, User, TrendingUp, Clipboard, Star
} from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import { notFound } from "next/navigation";

export default function PatientDetailPage({ params }: { params: { id: string } }) {
  const patient = patients.find((p) => p.id === params.id);
  if (!patient) notFound();

  const patientAppointments = appointments.filter((a) => a.patientId === patient.id);

  const sessionHistory = [
    { id: "s1", date: "2026-05-10", professional: patient.assignedProfessional, notes: "Good progress, mobility improving. Pain level reduced from 4 to 2.", duration: 60 },
    { id: "s2", date: "2026-04-30", professional: patient.assignedProfessional, notes: "Patient reporting reduced pain. Introduced new resistance exercises.", duration: 60 },
    { id: "s3", date: "2026-04-22", professional: patient.assignedProfessional, notes: "Initial assessment complete. Treatment plan established.", duration: 45 },
  ];

  const recoveryColor = patient.recoveryScore >= 80 ? "success" : patient.recoveryScore >= 60 ? "gradient" : "warning";

  return (
    <div className="space-y-6">
      {/* Back nav */}
      <Link href="/dashboard/patients">
        <div className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
          <ArrowLeft size={16} />
          Back to Patients
        </div>
      </Link>

      {/* Patient header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-card rounded-2xl border border-border/60 card-shadow p-6"
      >
        <div className="flex flex-col sm:flex-row sm:items-start gap-5">
          <Avatar name={patient.name} size="xl" />
          <div className="flex-1">
            <div className="flex flex-wrap items-start gap-3 justify-between">
              <div>
                <h1 className="text-2xl font-bold text-foreground">{patient.name}</h1>
                <p className="text-muted-foreground mt-0.5">{patient.treatmentPlan}</p>
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <PatientStatusBadge status={patient.status} />
                <RiskBadge level={patient.riskLevel} />
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-muted-foreground">Age</p>
                <p className="font-semibold text-foreground">{patient.age} years</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Gender</p>
                <p className="font-semibold text-foreground capitalize">{patient.gender}</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Sessions</p>
                <p className="font-semibold text-foreground">{patient.sessionCount} total</p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Member since</p>
                <p className="font-semibold text-foreground">{formatDate(patient.joinedDate)}</p>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap gap-3 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5"><Mail size={13} />{patient.email}</span>
              <span className="flex items-center gap-1.5"><Phone size={13} />{patient.phone}</span>
              <span className="flex items-center gap-1.5"><User size={13} />{patient.assignedProfessional}</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Recovery score + quick actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="sm:col-span-2 bg-card rounded-2xl border border-border/60 card-shadow p-5">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-sm font-semibold text-foreground">Recovery Score</p>
              <p className="text-xs text-muted-foreground mt-0.5">Overall treatment progress</p>
            </div>
            <span className="text-3xl font-bold text-foreground">{patient.recoveryScore}%</span>
          </div>
          <Progress value={patient.recoveryScore} color={recoveryColor} size="md" />
          <div className="mt-4 flex flex-wrap gap-2">
            {patient.tags.map((tag) => (
              <span key={tag} className="text-xs px-2.5 py-1 bg-primary/10 text-primary rounded-full font-medium">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <Button className="w-full" icon={<Calendar size={15} />}>Book Appointment</Button>
          <Button variant="outline" className="w-full" icon={<FileText size={15} />}>View Records</Button>
          <Button variant="ghost" className="w-full" icon={<Clipboard size={15} />}>Treatment Notes</Button>
        </div>
      </div>

      {/* Medical summary + progress chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-card rounded-2xl border border-border/60 card-shadow p-5">
          <div className="flex items-center gap-2 mb-3">
            <Activity size={16} className="text-primary" />
            <h3 className="font-semibold text-sm">Medical Summary</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{patient.medicalSummary}</p>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="p-3 bg-secondary rounded-xl">
              <p className="text-xs text-muted-foreground">Last Visit</p>
              <p className="text-sm font-semibold text-foreground mt-0.5">{formatDate(patient.lastVisit)}</p>
            </div>
            {patient.nextAppointment && (
              <div className="p-3 bg-primary/6 border border-primary/10 rounded-xl">
                <p className="text-xs text-primary/70">Next Appointment</p>
                <p className="text-sm font-semibold text-primary mt-0.5">{formatDate(patient.nextAppointment)}</p>
              </div>
            )}
          </div>
        </div>

        <ChartCard title="Pain & Mobility Progress" description="Per session evolution">
          <SimpleLineChart
            data={painProgressData}
            dataKey="mobility"
            secondaryKey="pain"
            xKey="session"
            height={200}
            color="#0d9488"
            secondaryColor="#f59e0b"
            valueFormatter={(v: number) => `${v}`}
          />
          <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-teal-500 rounded-full inline-block" />Mobility %</span>
            <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-amber-400 rounded-full inline-block border-dashed" />Pain (1–10)</span>
          </div>
        </ChartCard>
      </div>

      {/* Session history */}
      <div className="bg-card rounded-2xl border border-border/60 card-shadow p-5">
        <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
          <Clock size={16} className="text-primary" />
          Session History
        </h3>
        <div className="relative">
          <div className="absolute left-3 top-0 bottom-0 w-px bg-border/60" />
          <div className="space-y-4 pl-8">
            {sessionHistory.map((session, i) => (
              <motion.div
                key={session.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="relative"
              >
                <div className="absolute -left-5 top-1.5 w-4 h-4 rounded-full bg-card border-2 border-primary/60" />
                <div className="bg-secondary rounded-xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs font-semibold text-muted-foreground">{formatDate(session.date)}</p>
                    <p className="text-xs text-muted-foreground">{session.duration} min · {session.professional.split(" ").slice(-1)[0]}</p>
                  </div>
                  <p className="text-sm text-foreground">{session.notes}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Upcoming appointments */}
      <div className="bg-card rounded-2xl border border-border/60 card-shadow p-5">
        <h3 className="font-semibold text-sm mb-4 flex items-center gap-2">
          <Calendar size={16} className="text-primary" />
          Appointments
        </h3>
        {patientAppointments.length === 0 ? (
          <p className="text-sm text-muted-foreground">No appointments found</p>
        ) : (
          <div className="space-y-2">
            {patientAppointments.map((apt) => (
              <div key={apt.id} className="flex items-center gap-4 py-3 border-b border-border/40 last:border-0">
                <div className="text-center w-12 shrink-0">
                  <p className="text-sm font-bold text-foreground">{apt.time}</p>
                  <p className="text-xs text-muted-foreground">{apt.duration}m</p>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{apt.service}</p>
                  <p className="text-xs text-muted-foreground">{formatDate(apt.date)} · {apt.room}</p>
                </div>
                <AppointmentStatusBadge status={apt.status} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
