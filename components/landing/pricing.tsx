"use client";
import { motion } from "framer-motion";
import { Check, Zap, Shield, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useT } from "@/hooks/use-t";

const planIcons = [Shield, Zap, Crown];
const planStyles = [
  { color: "text-slate-600", bg: "bg-slate-50", popular: false },
  { color: "text-primary", bg: "bg-primary/8", popular: true },
  { color: "text-amber-600", bg: "bg-amber-50", popular: false },
];
const planPrices = [
  { monthly: 79, annual: 63 },
  { monthly: 189, annual: 151 },
  { monthly: 449, annual: 359 },
];

export function Pricing() {
  const t = useT();
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="py-20 sm:py-28 bg-secondary/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-14">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-semibold text-primary uppercase tracking-widest"
          >
            {t.pricing.badge}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-3xl sm:text-4xl font-black text-foreground"
          >
            {t.pricing.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-4 text-muted-foreground text-lg"
          >
            {t.pricing.subtitle}
          </motion.p>

          {/* Toggle */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="mt-6 inline-flex items-center gap-3"
          >
            <span className={cn("text-sm font-medium", !annual ? "text-foreground" : "text-muted-foreground")}>{t.pricing.monthly}</span>
            <button
              onClick={() => setAnnual((v) => !v)}
              className={cn("w-11 h-6 rounded-full transition-colors relative", annual ? "bg-primary" : "bg-border")}
            >
              <span className={cn("absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-all", annual ? "left-5.5" : "left-0.5")} />
            </button>
            <span className={cn("text-sm font-medium", annual ? "text-foreground" : "text-muted-foreground")}>
              {t.pricing.annual} <span className="text-xs font-semibold text-emerald-600 ml-1">{t.pricing.save20}</span>
            </span>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {t.pricing.plans.map((plan, i) => {
            const Icon = planIcons[i];
            const style = planStyles[i];
            const price = planPrices[i];
            return (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className={cn(
                  "bg-card rounded-2xl p-6 relative",
                  style.popular
                    ? "border-2 border-primary shadow-xl shadow-primary/10"
                    : "border border-border/60 card-shadow"
                )}
              >
                {style.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 bg-gradient-to-r from-teal-600 to-cyan-500 text-white text-xs font-bold rounded-full shadow-lg">
                      {t.pricing.mostPopular}
                    </span>
                  </div>
                )}

                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-5", style.bg)}>
                  <Icon size={20} className={style.color} />
                </div>

                <h3 className="text-xl font-bold text-foreground">{plan.name}</h3>
                <p className="text-sm text-muted-foreground mt-1 mb-5">{plan.description}</p>

                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-black text-foreground">€{annual ? price.annual : price.monthly}</span>
                    <span className="text-muted-foreground">{t.pricing.perMonth}</span>
                  </div>
                  {annual && (
                    <p className="text-xs text-emerald-600 font-medium mt-1">
                      €{(price.annual * 12).toLocaleString("es-ES")}/{t.pricing.saveYear} €{((price.monthly - price.annual) * 12).toLocaleString("es-ES")}
                    </p>
                  )}
                </div>

                <Link href="/dashboard">
                  <Button
                    variant={style.popular ? "primary" : "outline"}
                    className={cn("w-full mb-6", style.popular && "bg-gradient-to-r from-teal-600 to-cyan-500 hover:from-teal-700 hover:to-cyan-600 border-0")}
                  >
                    {plan.cta}
                  </Button>
                </Link>

                <ul className="space-y-2.5">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm">
                      <Check size={15} className="text-primary mt-0.5 shrink-0" />
                      <span className="text-muted-foreground">{f}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            );
          })}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm text-muted-foreground mt-10"
        >
          {t.pricing.footerNote}
        </motion.p>
      </div>
    </section>
  );
}
