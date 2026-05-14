"use client";
import { motion } from "framer-motion";
import { Calendar, BarChart3, Users, Activity, CreditCard, Shield } from "lucide-react";
import { useT } from "@/hooks/use-t";

const featureIcons = [Calendar, Users, BarChart3, Activity, CreditCard, Shield];
const featureStyles = [
  { color: "text-teal-600", bg: "bg-teal-50", border: "border-teal-100" },
  { color: "text-cyan-600", bg: "bg-cyan-50", border: "border-cyan-100" },
  { color: "text-indigo-600", bg: "bg-indigo-50", border: "border-indigo-100" },
  { color: "text-violet-600", bg: "bg-violet-50", border: "border-violet-100" },
  { color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-100" },
  { color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-100" },
];
const useCaseIcons = ["🏥", "⚡", "💆"];

export function Features() {
  const t = useT();

  return (
    <>
      {/* Problem / Solution */}
      <section className="py-20 sm:py-28 bg-[#0f172a] relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(13,148,136,0.15),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(6,182,212,0.08),transparent_50%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xs font-semibold text-teal-400 uppercase tracking-widest"
            >
              {t.features.problemBadge}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-3 text-3xl sm:text-4xl font-black text-white leading-tight"
            >
              {t.features.problemTitle}{" "}
              <span className="text-teal-400">{t.features.problemTitleHighlight}</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-slate-400 text-lg max-w-2xl mx-auto"
            >
              {t.features.problemSubtitle}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
            {t.features.problems.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-4"
              >
                <div className="flex-1 p-4 bg-red-500/8 border border-red-400/15 rounded-xl">
                  <p className="text-xs font-semibold text-red-400 mb-1">{t.features.before}</p>
                  <p className="text-sm text-slate-300">{item.before}</p>
                </div>
                <div className="flex items-center shrink-0">
                  <span className="text-teal-400 text-xl">→</span>
                </div>
                <div className="flex-1 p-4 bg-teal-500/8 border border-teal-400/15 rounded-xl">
                  <p className="text-xs font-semibold text-teal-400 mb-1">{t.features.after}</p>
                  <p className="text-sm text-slate-300">{item.after}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features grid */}
      <section className="py-20 sm:py-28 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <motion.span
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-xs font-semibold text-primary uppercase tracking-widest"
            >
              {t.features.featuresBadge}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-3 text-3xl sm:text-4xl font-black text-foreground leading-tight"
            >
              {t.features.featuresTitle}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="mt-4 text-muted-foreground text-lg max-w-2xl mx-auto"
            >
              {t.features.featuresSubtitle}
            </motion.p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {t.features.items.map((feature, i) => {
              const Icon = featureIcons[i];
              const style = featureStyles[i];
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="group bg-card rounded-2xl border border-border/60 card-shadow p-6 hover:card-shadow-hover hover:-translate-y-1 transition-all duration-200"
                >
                  <div className={`w-11 h-11 rounded-2xl ${style.bg} border ${style.border} flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-200`}>
                    <Icon size={22} className={style.color} />
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Use cases */}
      <section className="py-20 sm:py-28 bg-secondary/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-black text-foreground"
            >
              {t.features.useCasesTitle}
            </motion.h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {t.features.useCases.map((useCase, i) => (
              <motion.div
                key={useCase.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl border border-border/60 card-shadow p-6"
              >
                <span className="text-3xl mb-4 block">{useCaseIcons[i]}</span>
                <h3 className="font-bold text-foreground text-lg mb-2">{useCase.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">{useCase.description}</p>
                <div className="flex flex-wrap gap-2">
                  {useCase.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-1 bg-primary/8 text-primary rounded-full font-medium border border-primary/12">{tag}</span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
