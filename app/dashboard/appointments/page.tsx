"use client";
import { useState } from "react";
import { appointments, professionals, services } from "@/data/appointments";
import { PageHeader } from "@/components/dashboard/page-header";
import { ChartCard } from "@/components/dashboard/chart-card";
import { Avatar } from "@/components/ui/avatar";
import { AppointmentStatusBadge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/input";
import { Appointment, AppointmentStatus } from "@/types";
import { Calendar, Clock, MapPin, Plus, Stethoscope, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useT } from "@/hooks/use-t";

const WEEK_DATES = ["2026-05-11", "2026-05-12", "2026-05-13", "2026-05-14", "2026-05-15", "2026-05-16", "2026-05-17"];

function AppointmentDetailPanel({ appointment, onClose }: { appointment: Appointment; onClose: () => void }) {
  const t = useT();
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ duration: 0.2 }}
      className="bg-card border-l border-border/60 w-80 shrink-0 overflow-y-auto"
    >
      <div className="p-5 border-b border-border/60 flex items-center justify-between">
        <h3 className="font-semibold text-sm">{t.appointments.detailTitle}</h3>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground text-lg leading-none">×</button>
      </div>
      <div className="p-5 space-y-5">
        <div className="flex items-center gap-3">
          <Avatar name={appointment.patientName} size="lg" />
          <div>
            <p className="font-semibold text-foreground">{appointment.patientName}</p>
            <AppointmentStatusBadge status={appointment.status} />
          </div>
        </div>

        <div className="space-y-3">
          {[
            { icon: Stethoscope, label: t.appointments.fields.service, value: appointment.service },
            { icon: Clock, label: t.appointments.fields.time, value: `${appointment.time} · ${appointment.duration} min` },
            { icon: Calendar, label: t.appointments.fields.date, value: appointment.date },
            { icon: MapPin, label: t.appointments.fields.location, value: appointment.room || "—" },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-secondary flex items-center justify-center shrink-0">
                <Icon size={14} className="text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">{label}</p>
                <p className="text-sm font-medium text-foreground">{value}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="p-3 bg-secondary rounded-xl">
          <p className="text-xs text-muted-foreground mb-1">{t.appointments.fields.professional}</p>
          <p className="text-sm font-medium">{appointment.professional}</p>
        </div>

        {appointment.notes && (
          <div>
            <p className="text-xs text-muted-foreground mb-1">{t.appointments.fields.notes}</p>
            <p className="text-sm text-foreground">{appointment.notes}</p>
          </div>
        )}

        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" size="sm" className="w-full">{t.appointments.reschedule}</Button>
          <Button variant="primary" size="sm" className="w-full">{t.appointments.edit}</Button>
        </div>
        {appointment.status !== "cancelled" && appointment.status !== "completed" && (
          <Button variant="danger" size="sm" className="w-full">{t.appointments.cancel}</Button>
        )}
      </div>
    </motion.div>
  );
}

export default function AppointmentsPage() {
  const t = useT();
  const [filterProfessional, setFilterProfessional] = useState("");
  const [filterService, setFilterService] = useState("");
  const [filterStatus, setFilterStatus] = useState<AppointmentStatus | "">("");
  const [selectedDay, setSelectedDay] = useState("2026-05-12");
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);

  const filtered = appointments.filter((a) => {
    if (filterProfessional && a.professional !== filterProfessional) return false;
    if (filterService && a.service !== filterService) return false;
    if (filterStatus && a.status !== filterStatus) return false;
    return true;
  });

  const dayAppointments = filtered.filter((a) => a.date === selectedDay);

  const statusCounts = {
    confirmed: dayAppointments.filter((a) => a.status === "confirmed").length,
    pending: dayAppointments.filter((a) => a.status === "pending").length,
    completed: dayAppointments.filter((a) => a.status === "completed").length,
    cancelled: dayAppointments.filter((a) => a.status === "cancelled").length,
  };

  return (
    <div className="space-y-6">
      <PageHeader
        title={t.appointments.title}
        description={t.appointments.description}
        badge={`${dayAppointments.length} ${t.appointments.today}`}
        action={
          <Button icon={<Plus size={15} />}>{t.appointments.newAppointment}</Button>
        }
      />

      {/* Summary chips */}
      <div className="flex items-center gap-2 flex-wrap">
        {[
          { label: t.appointments.status.confirmed, count: statusCounts.confirmed, color: "text-emerald-700 bg-emerald-50 border-emerald-200" },
          { label: t.appointments.status.pending, count: statusCounts.pending, color: "text-amber-700 bg-amber-50 border-amber-200" },
          { label: t.appointments.status.completed, count: statusCounts.completed, color: "text-cyan-700 bg-cyan-50 border-cyan-200" },
          { label: t.appointments.status.cancelled, count: statusCounts.cancelled, color: "text-red-700 bg-red-50 border-red-200" },
        ].map(({ label, count, color }) => (
          <div key={label} className={cn("flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium border", color)}>
            <span className="font-bold text-sm">{count}</span>
            <span>{label}</span>
          </div>
        ))}
      </div>

      {/* Week navigator */}
      <div className="bg-card border border-border/60 rounded-2xl card-shadow p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-sm">{t.appointments.weekOf}</h3>
          <div className="flex items-center gap-1">
            <button className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground">
              <ChevronLeft size={16} />
            </button>
            <button className="p-1.5 rounded-lg hover:bg-secondary transition-colors text-muted-foreground">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-7 gap-2">
          {t.appointments.weekDays.map((day, i) => {
            const date = WEEK_DATES[i];
            const count = filtered.filter((a) => a.date === date).length;
            const isSelected = date === selectedDay;
            const isToday = date === "2026-05-12";
            return (
              <button
                key={day}
                onClick={() => setSelectedDay(date)}
                className={cn(
                  "flex flex-col items-center gap-1.5 p-2.5 rounded-xl transition-all",
                  isSelected ? "bg-primary text-white shadow-sm shadow-primary/20" : "hover:bg-secondary text-foreground"
                )}
              >
                <span className={cn("text-xs font-medium", isSelected ? "text-white/80" : "text-muted-foreground")}>{day}</span>
                <span className={cn("text-base font-bold", isToday && !isSelected ? "text-primary" : "")}>{date.split("-")[2]}</span>
                {count > 0 && (
                  <span className={cn(
                    "w-5 h-5 rounded-full text-xs font-semibold flex items-center justify-center",
                    isSelected ? "bg-white/20 text-white" : "bg-primary/10 text-primary"
                  )}>
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Filters + List */}
      <div className="flex gap-4 items-start">
        <div className="flex-1 min-w-0">
          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-4">
            <Filter size={14} className="text-muted-foreground mt-2.5" />
            <Select
              options={[
                { value: "", label: t.appointments.allProfessionals },
                ...professionals.map((p) => ({ value: p, label: p })),
              ]}
              value={filterProfessional}
              onChange={(e) => setFilterProfessional(e.target.value)}
              className="w-44"
            />
            <Select
              options={[
                { value: "", label: t.appointments.allServices },
                ...services.map((s) => ({ value: s, label: s })),
              ]}
              value={filterService}
              onChange={(e) => setFilterService(e.target.value)}
              className="w-40"
            />
            <Select
              options={[
                { value: "", label: t.appointments.allStatuses },
                { value: "confirmed", label: t.appointments.status.confirmed },
                { value: "pending", label: t.appointments.status.pending },
                { value: "completed", label: t.appointments.status.completed },
                { value: "cancelled", label: t.appointments.status.cancelled },
              ]}
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as AppointmentStatus | "")}
              className="w-36"
            />
          </div>

          {/* Appointment list */}
          <ChartCard title={`${selectedDay} — ${dayAppointments.length} ${t.appointments.title.toLowerCase()}`}>
            {dayAppointments.length === 0 ? (
              <div className="text-center py-12 text-muted-foreground">
                <Calendar size={32} className="mx-auto mb-3 opacity-30" />
                <p className="text-sm">{t.appointments.noAppointments}</p>
              </div>
            ) : (
              <div className="space-y-2">
                {dayAppointments.map((apt, i) => (
                  <motion.div
                    key={apt.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    onClick={() => setSelectedAppointment(apt)}
                    className={cn(
                      "flex items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer",
                      selectedAppointment?.id === apt.id
                        ? "border-primary/30 bg-primary/4"
                        : "border-border/40 hover:border-border hover:bg-secondary/40"
                    )}
                  >
                    <div className="text-center shrink-0 w-12">
                      <p className="text-base font-bold text-foreground leading-none">{apt.time}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{apt.duration}m</p>
                    </div>
                    <div className="w-px h-10 bg-border/60" />
                    <Avatar name={apt.patientName} size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-foreground truncate">{apt.patientName}</p>
                      <p className="text-xs text-muted-foreground">{apt.service}</p>
                    </div>
                    <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
                      <MapPin size={11} />
                      <span>{apt.room}</span>
                    </div>
                    <AppointmentStatusBadge status={apt.status} />
                  </motion.div>
                ))}
              </div>
            )}
          </ChartCard>
        </div>

        {/* Detail panel */}
        <AnimatePresence>
          {selectedAppointment && (
            <AppointmentDetailPanel
              appointment={selectedAppointment}
              onClose={() => setSelectedAppointment(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
