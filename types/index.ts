export type AppointmentStatus = "confirmed" | "pending" | "completed" | "cancelled";
export type RiskLevel = "low" | "medium" | "high";
export type PatientStatus = "active" | "discharged" | "on-hold";
export type InvoiceStatus = "paid" | "pending" | "overdue";
export type PlanTier = "starter" | "professional" | "enterprise";

export interface Patient {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  age: number;
  gender: "male" | "female";
  status: PatientStatus;
  riskLevel: RiskLevel;
  assignedProfessional: string;
  lastVisit: string;
  nextAppointment?: string;
  treatmentPlan: string;
  recoveryScore: number;
  sessionCount: number;
  joinedDate: string;
  tags: string[];
  medicalSummary: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  patientAvatar?: string;
  professional: string;
  service: string;
  date: string;
  time: string;
  duration: number;
  status: AppointmentStatus;
  notes?: string;
  room?: string;
}

export interface Treatment {
  id: string;
  patientId: string;
  name: string;
  startDate: string;
  endDate?: string;
  progress: number;
  sessions: number;
  totalSessions: number;
  professional: string;
  status: "active" | "completed" | "paused";
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  specialty: string;
  avatar?: string;
  email: string;
  phone: string;
  activePatients: number;
  rating: number;
  joinedDate: string;
}

export interface Invoice {
  id: string;
  patientName: string;
  date: string;
  dueDate: string;
  amount: number;
  status: InvoiceStatus;
  service: string;
  invoiceNumber: string;
}

export interface MetricData {
  label: string;
  value: number;
  change: number;
  changeType: "increase" | "decrease";
  unit?: string;
  prefix?: string;
}

export interface ChartDataPoint {
  name: string;
  value: number;
  secondary?: number;
  tertiary?: number;
  [key: string]: string | number | undefined;
}

export interface SessionHistoryEntry {
  id: string;
  date: string;
  professional: string;
  notes: string;
  painLevel: number;
  mobilityScore: number;
  duration: number;
}
