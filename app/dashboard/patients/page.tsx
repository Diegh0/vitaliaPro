"use client";
import { useState } from "react";
import { patients } from "@/data/patients";
import { PageHeader } from "@/components/dashboard/page-header";
import { PatientCard } from "@/components/dashboard/patient-card";
import { Avatar } from "@/components/ui/avatar";
import { PatientStatusBadge, RiskBadge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input, Select } from "@/components/ui/input";
import { Patient, PatientStatus, RiskLevel } from "@/types";
import { Search, Plus, LayoutGrid, LayoutList, Calendar, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn, formatDate } from "@/lib/utils";
import Link from "next/link";
import { useT } from "@/hooks/use-t";

function PatientDrawer({ patient, onClose }: { patient: Patient; onClose: () => void }) {
  const t = useT();
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 40 }}
      transition={{ duration: 0.2 }}
      className="fixed right-0 top-0 h-full w-80 bg-card border-l border-border/60 z-50 overflow-y-auto shadow-2xl"
    >
      <div className="p-5 border-b border-border/60 flex items-center justify-between sticky top-0 bg-card">
        <h3 className="font-semibold text-sm">{t.patients.previewTitle}</h3>
        <button onClick={onClose} className="text-muted-foreground hover:text-foreground text-xl leading-none">×</button>
      </div>
      <div className="p-5 space-y-5">
        <div className="flex items-center gap-4">
          <Avatar name={patient.name} size="xl" />
          <div>
            <h2 className="font-bold text-foreground">{patient.name}</h2>
            <p className="text-sm text-muted-foreground">{patient.age} {t.patients.years} · {patient.gender}</p>
            <div className="flex items-center gap-2 mt-2">
              <PatientStatusBadge status={patient.status} />
              <RiskBadge level={patient.riskLevel} />
            </div>
          </div>
        </div>

        <div className="p-3 bg-secondary rounded-xl">
          <p className="text-xs text-muted-foreground mb-1">{t.patients.medicalSummary}</p>
          <p className="text-sm text-foreground leading-relaxed">{patient.medicalSummary}</p>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{t.patients.recoveryScore}</p>
            <span className="text-sm font-bold text-foreground">{patient.recoveryScore}%</span>
          </div>
          <Progress value={patient.recoveryScore} color="gradient" size="md" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            { label: t.patients.sessions, value: patient.sessionCount },
            { label: t.patients.lastVisit, value: formatDate(patient.lastVisit) },
            { label: t.patients.treatment, value: patient.treatmentPlan },
            { label: t.patients.professional, value: patient.assignedProfessional.split(" ").slice(-1)[0] },
          ].map(({ label, value }) => (
            <div key={label} className="bg-secondary rounded-xl p-3">
              <p className="text-xs text-muted-foreground">{label}</p>
              <p className="text-sm font-semibold text-foreground mt-0.5">{value}</p>
            </div>
          ))}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {patient.tags.map((tag) => (
            <span key={tag} className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full font-medium">{tag}</span>
          ))}
        </div>

        <Link href={`/dashboard/patients/${patient.id}`}>
          <Button className="w-full" icon={<ArrowRight size={15} />} iconPosition="right">
            {t.patients.viewProfile}
          </Button>
        </Link>
      </div>
    </motion.div>
  );
}

export default function PatientsPage() {
  const t = useT();
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<PatientStatus | "">("");
  const [filterRisk, setFilterRisk] = useState<RiskLevel | "">("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);

  const filtered = patients.filter((p) => {
    const matchSearch =
      !search ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.treatmentPlan.toLowerCase().includes(search.toLowerCase());
    const matchStatus = !filterStatus || p.status === filterStatus;
    const matchRisk = !filterRisk || p.riskLevel === filterRisk;
    return matchSearch && matchStatus && matchRisk;
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title={t.patients.title}
        description={t.patients.description}
        badge={`${patients.length} ${t.patients.total}`}
        action={
          <Button icon={<Plus size={15} />}>{t.patients.newPatient}</Button>
        }
      />

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-2">
        <Input
          placeholder={t.patients.search}
          leftIcon={<Search size={14} />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-64"
        />
        <Select
          options={[
            { value: "", label: t.patients.allStatuses },
            { value: "active", label: t.patients.status.active },
            { value: "discharged", label: t.patients.status.discharged },
            { value: "on-hold", label: t.patients.status.onHold },
          ]}
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value as PatientStatus | "")}
          className="w-36"
        />
        <Select
          options={[
            { value: "", label: t.patients.allRiskLevels },
            { value: "low", label: t.patients.risk.low },
            { value: "medium", label: t.patients.risk.medium },
            { value: "high", label: t.patients.risk.high },
          ]}
          value={filterRisk}
          onChange={(e) => setFilterRisk(e.target.value as RiskLevel | "")}
          className="w-36"
        />
        <div className="ml-auto flex items-center gap-1 border border-border rounded-xl p-1">
          <button
            onClick={() => setViewMode("grid")}
            className={cn("p-1.5 rounded-lg transition-colors", viewMode === "grid" ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground")}
          >
            <LayoutGrid size={15} />
          </button>
          <button
            onClick={() => setViewMode("list")}
            className={cn("p-1.5 rounded-lg transition-colors", viewMode === "list" ? "bg-secondary text-foreground" : "text-muted-foreground hover:text-foreground")}
          >
            <LayoutList size={15} />
          </button>
        </div>
      </div>

      {/* Patient grid */}
      {viewMode === "grid" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((patient, i) => (
            <div key={patient.id} onClick={() => setSelectedPatient(patient)}>
              <PatientCard patient={patient} delay={i * 0.04} />
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-card rounded-2xl border border-border/60 card-shadow overflow-hidden">
          <table className="w-full">
            <thead className="border-b border-border/60 bg-secondary/30">
              <tr>
                {[t.patients.table.patient, t.patients.table.status, t.patients.table.risk, t.patients.table.treatmentPlan, t.patients.table.recovery, t.patients.table.lastVisit, t.patients.table.professional, ""].map((h) => (
                  <th key={h} className="text-left text-xs font-semibold text-muted-foreground uppercase tracking-wider px-4 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              {filtered.map((patient, i) => (
                <motion.tr
                  key={patient.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.03 }}
                  className="hover:bg-secondary/30 transition-colors cursor-pointer"
                  onClick={() => setSelectedPatient(patient)}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar name={patient.name} size="sm" />
                      <div>
                        <p className="font-medium text-sm text-foreground">{patient.name}</p>
                        <p className="text-xs text-muted-foreground">{patient.age}a · {patient.gender}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3"><PatientStatusBadge status={patient.status} /></td>
                  <td className="px-4 py-3"><RiskBadge level={patient.riskLevel} /></td>
                  <td className="px-4 py-3 max-w-[180px]">
                    <p className="text-sm text-foreground truncate">{patient.treatmentPlan}</p>
                  </td>
                  <td className="px-4 py-3 w-32">
                    <div className="flex items-center gap-2">
                      <Progress value={patient.recoveryScore} size="xs" color="gradient" className="w-20" />
                      <span className="text-xs font-medium text-foreground">{patient.recoveryScore}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground whitespace-nowrap">
                    <div className="flex items-center gap-1.5">
                      <Calendar size={12} />
                      {formatDate(patient.lastVisit)}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm text-muted-foreground">{patient.assignedProfessional.split(" ").slice(-1)[0]}</td>
                  <td className="px-4 py-3">
                    <Link href={`/dashboard/patients/${patient.id}`} onClick={(e) => e.stopPropagation()}>
                      <Button variant="ghost" size="sm" icon={<ArrowRight size={13} />} iconPosition="right">
                        {t.patients.view}
                      </Button>
                    </Link>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Side drawer */}
      <AnimatePresence>
        {selectedPatient && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.3 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setSelectedPatient(null)}
            />
            <PatientDrawer patient={selectedPatient} onClose={() => setSelectedPatient(null)} />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
