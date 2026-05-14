"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useT } from "@/hooks/use-t";

export function CTA() {
  const t = useT();

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-[#0f172a]">
      {/* Glow effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(13,148,136,0.2),transparent_60%)]" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-teal-500/40" />

      <div className="relative max-w-3xl mx-auto px-4 sm:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 bg-teal-500/10 border border-teal-500/20 rounded-full text-xs font-semibold text-teal-400">
            <span className="w-1.5 h-1.5 rounded-full bg-teal-400" />
            {t.cta.badge}
          </span>

          <h2 className="text-4xl sm:text-5xl font-black text-white leading-tight">
            {t.cta.headline}{" "}
            <span className="gradient-text">{t.cta.headlineGradient}</span>
          </h2>

          <p className="mt-6 text-lg text-slate-400 max-w-xl mx-auto">
            {t.cta.description}
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/dashboard">
              <Button
                size="lg"
                icon={<ArrowRight size={16} />}
                iconPosition="right"
                className="bg-gradient-to-r from-teal-600 to-cyan-500 hover:from-teal-700 hover:to-cyan-600 border-0 shadow-lg shadow-teal-500/30 text-base"
              >
                {t.cta.primary}
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button
                size="lg"
                variant="outline"
                className="border-white/15 text-white hover:bg-white/6"
              >
                {t.cta.secondary}
              </Button>
            </Link>
          </div>

          <p className="mt-5 text-sm text-slate-500">
            {t.cta.footer}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
