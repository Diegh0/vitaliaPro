"use client";
import { useLanguageStore } from "@/store/language-store";
import { es, en } from "@/lib/i18n";

export function useT() {
  const locale = useLanguageStore((s) => s.locale);
  return locale === "es" ? es : en;
}
