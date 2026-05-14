import { Invoice } from "@/types";

export const invoices: Invoice[] = [
  { id: "inv1", invoiceNumber: "INV-2026-0089", patientName: "Elena Martínez", date: "2026-05-01", dueDate: "2026-05-31", amount: 480, status: "paid", service: "Monthly Physiotherapy Pack" },
  { id: "inv2", invoiceNumber: "INV-2026-0090", patientName: "Marcos Fernández", date: "2026-05-01", dueDate: "2026-05-31", amount: 720, status: "pending", service: "Sports Rehabilitation Program" },
  { id: "inv3", invoiceNumber: "INV-2026-0091", patientName: "Lucía García", date: "2026-04-01", dueDate: "2026-04-30", amount: 960, status: "overdue", service: "Comprehensive Fibromyalgia Program" },
  { id: "inv4", invoiceNumber: "INV-2026-0092", patientName: "Andrés Domínguez", date: "2026-05-01", dueDate: "2026-05-31", amount: 540, status: "paid", service: "Shoulder Recovery Protocol" },
  { id: "inv5", invoiceNumber: "INV-2026-0093", patientName: "Sofía Romero", date: "2026-05-01", dueDate: "2026-05-31", amount: 360, status: "paid", service: "Postpartum Recovery Package" },
  { id: "inv6", invoiceNumber: "INV-2026-0094", patientName: "Isabel Moreno", date: "2026-05-01", dueDate: "2026-05-31", amount: 890, status: "pending", service: "Elite Performance Program" },
  { id: "inv7", invoiceNumber: "INV-2026-0085", patientName: "Fernando Alves", date: "2026-04-01", dueDate: "2026-04-30", amount: 420, status: "paid", service: "Cervical Physiotherapy Pack" },
  { id: "inv8", invoiceNumber: "INV-2026-0086", patientName: "Roberto Jiménez", date: "2026-04-01", dueDate: "2026-04-30", amount: 680, status: "overdue", service: "Knee Osteoarthritis Management" },
];
