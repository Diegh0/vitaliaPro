"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Play, TrendingUp, Users, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useT } from "@/hooks/use-t";

export function Hero() {
  const t = useT();

  const floatingCards = [
    {
      icon: TrendingUp,
      label: t.hero.cards.retention,
      value: "+32%",
      color: "text-teal-600",
      bg: "bg-teal-50",
      delay: 0.8,
      position: "top-8 -right-4 sm:right-0",
    },
    {
      icon: Users,
      label: t.hero.cards.patientsToday,
      value: "18",
      color: "text-cyan-600",
      bg: "bg-cyan-50",
      delay: 1.0,
      position: "bottom-24 -left-4 sm:-left-8",
    },
    {
      icon: Calendar,
      label: t.hero.cards.adherence,
      value: "92%",
      color: "text-indigo-600",
      bg: "bg-indigo-50",
      delay: 1.2,
      position: "bottom-8 right-8",
    },
  ];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-mesh bg-background">
      {/* Background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-teal-400/8 blur-2xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full bg-indigo-400/6 blur-2xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-28 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Copy */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 bg-primary/8 border border-primary/15 rounded-full"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary pulse-ring" />
              <span className="text-xs font-semibold text-primary">{t.hero.badge}</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black text-foreground leading-tight tracking-tight"
            >
              {t.hero.headline}{" "}
              <span className="gradient-text">{t.hero.headlineGradient}</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-lg"
            >
              {t.hero.subtitle}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mt-8 flex flex-wrap items-center gap-3"
            >
              <Link href="/dashboard">
                <Button size="lg" icon={<ArrowRight size={16} />} iconPosition="right"
                  className="bg-gradient-to-r from-teal-600 to-cyan-500 hover:from-teal-700 hover:to-cyan-600 border-0 shadow-lg shadow-teal-500/25 text-base"
                >
                  {t.hero.ctaPrimary}
                </Button>
              </Link>
              <button className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-primary transition-colors group">
                <span className="w-9 h-9 rounded-full border border-border flex items-center justify-center group-hover:border-primary group-hover:bg-primary/6 transition-all">
                  <Play size={14} className="ml-0.5 text-muted-foreground group-hover:text-primary" />
                </span>
                {t.hero.ctaSecondary}
              </button>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-10 flex items-center gap-4"
            >
              <div className="flex -space-x-2">
                {["EC", "MF", "AT", "JL"].map((initials, i) => (
                  <div key={initials} className={`w-8 h-8 rounded-full border-2 border-card flex items-center justify-center text-xs font-bold ${["bg-teal-100 text-teal-700", "bg-cyan-100 text-cyan-700", "bg-indigo-100 text-indigo-700", "bg-violet-100 text-violet-700"][i]}`}>
                    {initials}
                  </div>
                ))}
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">{t.hero.socialProof}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  {"★★★★★".split("").map((star, i) => (
                    <span key={i} className="text-amber-400 text-xs">{star}</span>
                  ))}
                  <span className="text-xs text-muted-foreground ml-1">{t.hero.rating}</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Dashboard mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="relative hidden lg:block"
          >
            <div className="relative">
              {/* Main dashboard card */}
              <div className="bg-[#0f172a] rounded-3xl p-4 shadow-2xl shadow-slate-900/40 border border-white/8 gradient-border">
                {/* Mockup header */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full bg-red-400/60" />
                    <span className="w-3 h-3 rounded-full bg-amber-400/60" />
                    <span className="w-3 h-3 rounded-full bg-emerald-400/60" />
                  </div>
                  <div className="flex-1 h-5 bg-white/6 rounded-md mx-2" />
                </div>

                {/* Mockup KPIs */}
                <div className="grid grid-cols-3 gap-2 mb-4">
                  {[
                    { label: t.hero.kpis.revenue, value: "€41.5k", change: "+8.2%" },
                    { label: t.hero.kpis.patients, value: "289", change: "+6.4%" },
                    { label: t.hero.kpis.adherence, value: "92%", change: "+3.1%" },
                  ].map((kpi) => (
                    <div key={kpi.label} className="bg-white/4 rounded-xl p-3">
                      <p className="text-[10px] text-slate-400">{kpi.label}</p>
                      <p className="text-base font-bold text-white mt-0.5">{kpi.value}</p>
                      <p className="text-[10px] text-emerald-400 font-semibold">{kpi.change}</p>
                    </div>
                  ))}
                </div>

                {/* Mockup chart */}
                <div className="bg-white/4 rounded-xl p-3 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-xs font-semibold text-white">{t.hero.revenueTrend}</p>
                      <p className="text-[10px] text-slate-400">{t.hero.monthlyOverview}</p>
                    </div>
                  </div>
                  <div className="flex items-end gap-1.5 h-16">
                    {[35, 55, 45, 68, 72, 58, 80, 85, 78, 92, 96, 100].map((h, i) => (
                      <div key={i} className="flex-1 rounded-sm" style={{
                        height: `${h}%`,
                        background: i >= 10 ? "linear-gradient(to top, #0d9488, #06b6d4)" : `rgba(13,148,136,${0.2 + h * 0.003})`
                      }} />
                    ))}
                  </div>
                  <div className="flex justify-between mt-2">
                    {["J", "A", "S", "O", "N", "D", "J", "F", "M", "A", "M", "J"].map((m, i) => (
                      <span key={i} className="text-[9px] text-slate-500">{m}</span>
                    ))}
                  </div>
                </div>

                {/* Mockup list */}
                <div className="space-y-2">
                  {[
                    { name: "Elena Martínez", service: "Manual Therapy", time: "09:00", color: "bg-emerald-400" },
                    { name: "Marcos Fernández", service: "Sports Rehab", time: "10:00", color: "bg-cyan-400" },
                    { name: "Lucía García", service: "Aquatic Therapy", time: "11:00", color: "bg-amber-400" },
                  ].map((apt) => (
                    <div key={apt.name} className="flex items-center gap-2.5 p-2.5 bg-white/4 rounded-xl">
                      <span className={`w-2 h-2 rounded-full shrink-0 ${apt.color}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-[11px] font-semibold text-white truncate">{apt.name}</p>
                        <p className="text-[10px] text-slate-400">{apt.service}</p>
                      </div>
                      <p className="text-[10px] text-slate-300 font-medium shrink-0">{apt.time}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Floating metric cards */}
              {floatingCards.map((card, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: card.delay, duration: 0.4 }}
                  className={`absolute ${card.position} glass rounded-2xl p-3 shadow-xl shadow-black/10 card-shadow border border-white/70 float-delayed`}
                  style={{ animationDelay: `${i * 0.8}s` }}
                >
                  <div className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-xl ${card.bg} flex items-center justify-center shrink-0`}>
                      <card.icon size={16} className={card.color} />
                    </div>
                    <div>
                      <p className="text-base font-black text-foreground leading-none">{card.value}</p>
                      <p className="text-[10px] text-muted-foreground mt-0.5 whitespace-nowrap">{card.label}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
