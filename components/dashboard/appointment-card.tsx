"use client";
import { Appointment } from "@/types";
import { Avatar } from "@/components/ui/avatar";
import { AppointmentStatusBadge } from "@/components/ui/badge";
import { Clock, MapPin, Stethoscope } from "lucide-react";
import { motion } from "framer-motion";

interface AppointmentCardProps {
  appointment: Appointment;
  delay?: number;
  compact?: boolean;
}

export function AppointmentCard({ appointment, delay = 0, compact = false }: AppointmentCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay }}
      className="flex items-center gap-3 py-3 border-b border-border/40 last:border-0 hover:bg-secondary/40 rounded-xl px-2 -mx-2 transition-colors"
    >
      <Avatar name={appointment.patientName} size="sm" />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-medium text-sm text-foreground truncate">{appointment.patientName}</p>
          <AppointmentStatusBadge status={appointment.status} />
        </div>
        <div className="flex items-center gap-3 mt-0.5 text-xs text-muted-foreground flex-wrap">
          <span className="flex items-center gap-1">
            <Clock size={10} />
            {appointment.time} · {appointment.duration}min
          </span>
          {!compact && (
            <>
              <span className="flex items-center gap-1">
                <Stethoscope size={10} />
                {appointment.service}
              </span>
              {appointment.room && (
                <span className="flex items-center gap-1">
                  <MapPin size={10} />
                  {appointment.room}
                </span>
              )}
            </>
          )}
        </div>
      </div>
      {!compact && (
        <div className="text-right shrink-0">
          <p className="text-xs font-medium text-muted-foreground">{appointment.professional.split(" ").slice(-1)[0]}</p>
        </div>
      )}
    </motion.div>
  );
}
