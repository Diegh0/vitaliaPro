"use client";
import { Patient } from "@/types";
import { Avatar } from "@/components/ui/avatar";
import { PatientStatusBadge, RiskBadge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { formatDate } from "@/lib/utils";
import { Calendar, Clock, User } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export function PatientCard({ patient, delay = 0 }: { patient: Patient; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay }}
    >
      <Link href={`/dashboard/patients/${patient.id}`}>
        <div className="bg-card rounded-2xl border border-border/60 card-shadow p-5 hover:card-shadow-hover hover:-translate-y-0.5 transition-all duration-200 cursor-pointer group">
          <div className="flex items-start gap-3 mb-4">
            <Avatar name={patient.name} size="md" />
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors truncate">
                {patient.name}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">{patient.treatmentPlan}</p>
            </div>
            <PatientStatusBadge status={patient.status} />
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Recovery Progress</span>
              <span className="font-semibold text-foreground">{patient.recoveryScore}%</span>
            </div>
            <Progress value={patient.recoveryScore} color="gradient" size="sm" />
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <User size={11} />
              <span className="truncate">{patient.assignedProfessional.split(" ").slice(-1)[0]}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock size={11} />
              <span>{patient.sessionCount} sessions</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar size={11} />
              <span>{formatDate(patient.lastVisit)}</span>
            </div>
            <div>
              <RiskBadge level={patient.riskLevel} />
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
