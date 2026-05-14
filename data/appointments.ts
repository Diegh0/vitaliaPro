import { Appointment } from "@/types";

export const appointments: Appointment[] = [
  { id: "a1", patientId: "p1", patientName: "Elena Martínez", professional: "Dr. Carlos Ruiz", service: "Manual Therapy", date: "2026-05-12", time: "09:00", duration: 60, status: "confirmed", room: "Room 1" },
  { id: "a2", patientId: "p2", patientName: "Marcos Fernández", professional: "Dra. Ana Torres", service: "Sports Rehabilitation", date: "2026-05-12", time: "10:00", duration: 45, status: "confirmed", room: "Gym" },
  { id: "a3", patientId: "p3", patientName: "Lucía García", professional: "Dr. José María López", service: "Aquatic Therapy", date: "2026-05-12", time: "11:00", duration: 60, status: "pending", room: "Pool" },
  { id: "a4", patientId: "p4", patientName: "Andrés Domínguez", professional: "Dr. Carlos Ruiz", service: "Electrotherapy", date: "2026-05-12", time: "12:00", duration: 30, status: "confirmed", room: "Room 2" },
  { id: "a5", patientId: "p5", patientName: "Sofía Romero", professional: "Dra. Ana Torres", service: "Pelvic Floor Therapy", date: "2026-05-12", time: "13:00", duration: 45, status: "completed", room: "Room 3" },
  { id: "a6", patientId: "p7", patientName: "Isabel Moreno", professional: "Dra. Ana Torres", service: "Performance Assessment", date: "2026-05-12", time: "16:00", duration: 90, status: "confirmed", room: "Gym" },
  { id: "a7", patientId: "p6", patientName: "Roberto Jiménez", professional: "Dr. José María López", service: "Hydrotherapy", date: "2026-05-12", time: "17:00", duration: 60, status: "cancelled", room: "Pool", notes: "Patient requested rescheduling" },
  { id: "a8", patientId: "p1", patientName: "Elena Martínez", professional: "Dr. Carlos Ruiz", service: "Manual Therapy", date: "2026-05-13", time: "09:30", duration: 60, status: "pending", room: "Room 1" },
  { id: "a9", patientId: "p2", patientName: "Marcos Fernández", professional: "Dra. Ana Torres", service: "Sports Rehabilitation", date: "2026-05-13", time: "11:00", duration: 45, status: "pending", room: "Gym" },
  { id: "a10", patientId: "p3", patientName: "Lucía García", professional: "Dr. José María López", service: "Manual Therapy", date: "2026-05-14", time: "10:00", duration: 60, status: "confirmed", room: "Room 1" },
  { id: "a11", patientId: "p5", patientName: "Sofía Romero", professional: "Dra. Ana Torres", service: "Pelvic Floor Therapy", date: "2026-05-14", time: "14:00", duration: 45, status: "pending", room: "Room 3" },
  { id: "a12", patientId: "p4", patientName: "Andrés Domínguez", professional: "Dr. Carlos Ruiz", service: "Shoulder Mobilization", date: "2026-05-15", time: "09:00", duration: 60, status: "confirmed", room: "Room 1" },
  { id: "a13", patientId: "p7", patientName: "Isabel Moreno", professional: "Dra. Ana Torres", service: "Performance Training", date: "2026-05-15", time: "16:00", duration: 90, status: "confirmed", room: "Gym" },
  { id: "a14", patientId: "p1", patientName: "Elena Martínez", professional: "Dr. Carlos Ruiz", service: "Manual Therapy", date: "2026-05-09", time: "10:00", duration: 60, status: "completed", room: "Room 1" },
  { id: "a15", patientId: "p2", patientName: "Marcos Fernández", professional: "Dra. Ana Torres", service: "Sports Rehabilitation", date: "2026-05-09", time: "11:30", duration: 45, status: "completed", room: "Gym" },
];

export const professionals = [
  "Dr. Carlos Ruiz",
  "Dra. Ana Torres",
  "Dr. José María López",
];

export const services = [
  "Manual Therapy",
  "Sports Rehabilitation",
  "Aquatic Therapy",
  "Electrotherapy",
  "Pelvic Floor Therapy",
  "Performance Assessment",
  "Hydrotherapy",
  "Shoulder Mobilization",
  "Performance Training",
];
