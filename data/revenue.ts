import { ChartDataPoint } from "@/types";

export const monthlyRevenue: ChartDataPoint[] = [
  { name: "Jul", value: 18400, secondary: 14200 },
  { name: "Aug", value: 21600, secondary: 16800 },
  { name: "Sep", value: 19800, secondary: 15600 },
  { name: "Oct", value: 24200, secondary: 18400 },
  { name: "Nov", value: 26800, secondary: 20200 },
  { name: "Dec", value: 22400, secondary: 17800 },
  { name: "Jan", value: 28600, secondary: 21400 },
  { name: "Feb", value: 31200, secondary: 23600 },
  { name: "Mar", value: 29800, secondary: 22400 },
  { name: "Apr", value: 34600, secondary: 26200 },
  { name: "May", value: 38200, secondary: 28800 },
  { name: "Jun", value: 41500, secondary: 31200 },
];

export const appointmentTrend: ChartDataPoint[] = [
  { name: "Mon", value: 18, secondary: 2 },
  { name: "Tue", value: 22, secondary: 1 },
  { name: "Wed", value: 19, secondary: 3 },
  { name: "Thu", value: 25, secondary: 0 },
  { name: "Fri", value: 21, secondary: 2 },
  { name: "Sat", value: 14, secondary: 1 },
  { name: "Sun", value: 8, secondary: 0 },
];

export const patientGrowth: ChartDataPoint[] = [
  { name: "Jul", value: 142 },
  { name: "Aug", value: 158 },
  { name: "Sep", value: 167 },
  { name: "Oct", value: 181 },
  { name: "Nov", value: 196 },
  { name: "Dec", value: 189 },
  { name: "Jan", value: 214 },
  { name: "Feb", value: 238 },
  { name: "Mar", value: 252 },
  { name: "Apr", value: 271 },
  { name: "May", value: 289 },
  { name: "Jun", value: 312 },
];

export const adherenceData: ChartDataPoint[] = [
  { name: "Week 1", value: 94 },
  { name: "Week 2", value: 88 },
  { name: "Week 3", value: 91 },
  { name: "Week 4", value: 96 },
  { name: "Week 5", value: 89 },
  { name: "Week 6", value: 93 },
  { name: "Week 7", value: 97 },
  { name: "Week 8", value: 92 },
];

export const serviceBreakdown = [
  { name: "Manual Therapy", value: 34, color: "#0d9488" },
  { name: "Sports Rehab", value: 22, color: "#06b6d4" },
  { name: "Aquatic Therapy", value: 18, color: "#818cf8" },
  { name: "Electrotherapy", value: 14, color: "#f59e0b" },
  { name: "Other", value: 12, color: "#10b981" },
];

export const professionalPerformance: ChartDataPoint[] = [
  { name: "Dr. Carlos Ruiz", value: 96, secondary: 48 },
  { name: "Dra. Ana Torres", value: 94, secondary: 42 },
  { name: "Dr. J.M. López", value: 91, secondary: 38 },
];

export const cancellationData: ChartDataPoint[] = [
  { name: "Jan", value: 8 },
  { name: "Feb", value: 6 },
  { name: "Mar", value: 10 },
  { name: "Apr", value: 5 },
  { name: "May", value: 7 },
  { name: "Jun", value: 4 },
];

export const painProgressData = [
  { session: "S1", pain: 8, mobility: 30 },
  { session: "S2", pain: 7, mobility: 38 },
  { session: "S3", pain: 7, mobility: 42 },
  { session: "S4", pain: 6, mobility: 50 },
  { session: "S5", pain: 5, mobility: 58 },
  { session: "S6", pain: 5, mobility: 63 },
  { session: "S7", pain: 4, mobility: 71 },
  { session: "S8", pain: 3, mobility: 78 },
  { session: "S9", pain: 3, mobility: 82 },
  { session: "S10", pain: 2, mobility: 88 },
  { session: "S11", pain: 2, mobility: 91 },
  { session: "S12", pain: 2, mobility: 95 },
];
