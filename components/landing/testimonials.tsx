"use client";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useT } from "@/hooks/use-t";

const testimonialMeta = [
  { name: "Dr. María González", role: "Directora, Clínica Rehabilita Madrid", avatar: "MG", color: "bg-teal-100 text-teal-700" },
  { name: "Carlos Peinado", role: "Fisioterapeuta y Propietario de Clínica", avatar: "CP", color: "bg-cyan-100 text-cyan-700" },
  { name: "Dra. Ana Beltrán", role: "Jefa de Medicina Deportiva, FC Valencia", avatar: "AB", color: "bg-indigo-100 text-indigo-700" },
  { name: "Javier Rueda", role: "Director de Centro de Bienestar", avatar: "JR", color: "bg-violet-100 text-violet-700" },
];

export function Testimonials() {
  const t = useT();

  return (
    <section className="py-20 sm:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-xs font-semibold text-primary uppercase tracking-widest"
          >
            {t.testimonials.badge}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="mt-3 text-3xl sm:text-4xl font-black text-foreground"
          >
            {t.testimonials.title}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="mt-4 text-muted-foreground text-lg"
          >
            {t.testimonials.subtitle}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {testimonialMeta.map((meta, i) => (
            <motion.div
              key={meta.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card rounded-2xl border border-border/60 card-shadow p-6 flex flex-col"
            >
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} size={14} className="fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed flex-1">{t.testimonials.items[i]}</p>
              <div className="flex items-center gap-3 mt-5 pt-4 border-t border-border/60">
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${meta.color}`}>
                  {meta.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{meta.name}</p>
                  <p className="text-xs text-muted-foreground">{meta.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6 bg-secondary/50 rounded-2xl border border-border/60 p-8"
        >
          {t.testimonials.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-black text-foreground gradient-text">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
