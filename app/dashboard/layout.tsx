import { DashboardLayout } from "@/components/layout/dashboard-layout";

export const metadata = {
  title: "Dashboard — Vitalia Pro",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
