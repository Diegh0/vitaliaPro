"use client";
import { useLanguageStore } from "@/store/language-store";
import { cn } from "@/lib/utils";

interface LanguageToggleProps {
  className?: string;
  variant?: "dark" | "light";
}

export function LanguageToggle({ className, variant = "light" }: LanguageToggleProps) {
  const { locale, setLocale } = useLanguageStore();

  return (
    <div
      className={cn(
        "flex items-center rounded-lg border text-xs font-semibold overflow-hidden",
        variant === "dark"
          ? "border-white/15 bg-white/5"
          : "border-border/60 bg-secondary/50",
        className
      )}
    >
      <button
        onClick={() => setLocale("es")}
        className={cn(
          "px-2.5 py-1 transition-colors",
          locale === "es"
            ? variant === "dark"
              ? "bg-white/15 text-white"
              : "bg-card text-foreground shadow-sm"
            : variant === "dark"
            ? "text-slate-400 hover:text-white"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        ES
      </button>
      <button
        onClick={() => setLocale("en")}
        className={cn(
          "px-2.5 py-1 transition-colors",
          locale === "en"
            ? variant === "dark"
              ? "bg-white/15 text-white"
              : "bg-card text-foreground shadow-sm"
            : variant === "dark"
            ? "text-slate-400 hover:text-white"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        EN
      </button>
    </div>
  );
}
