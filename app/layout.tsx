import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vitalia Pro — Plataforma de Gestión de Centros de Salud",
  description:
    "Gestiona tu centro de salud con la claridad de un SaaS premium. Centraliza citas, pacientes, tratamientos, analíticas y flujos de trabajo en una plataforma elegante.",
  keywords: ["centro de salud", "fisioterapia", "SaaS", "gestión de clínica", "gestión de pacientes"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} h-full`}>
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
