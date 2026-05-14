"use client";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useT } from "@/hooks/use-t";

export function Footer() {
  const t = useT();

  return (
    <footer className="bg-[#0f172a] border-t border-white/6 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-teal-500 to-cyan-500 flex items-center justify-center">
                <Heart size={16} className="text-white" />
              </div>
              <div>
                <span className="font-bold text-white">Vitalia</span>
                <span className="font-bold text-teal-400"> Pro</span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed mb-4">
              {t.footer.brandDescription}
            </p>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-xs text-emerald-400 font-medium">{t.footer.systemsOk}</span>
            </div>
          </div>

          {/* Links */}
          {t.footer.categories.map((category, ci) => (
            <div key={category}>
              <h4 className="text-white font-semibold text-sm mb-4">{category}</h4>
              <ul className="space-y-2">
                {t.footer.links[ci].map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm hover:text-white transition-colors">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/6 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-500">{t.footer.copyright}</p>
          <p className="text-xs text-slate-500">
            {t.footer.builtWith}{" "}
            <span className="text-teal-400">Next.js</span> ·{" "}
            <span className="text-teal-400">TypeScript</span> ·{" "}
            <span className="text-teal-400">Tailwind CSS</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
