"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/i18n";

export default function NotFound() {
  const { locale } = useLanguage();

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
      <span className="text-sm uppercase tracking-[0.3em] text-text-secondary">
        404
      </span>
      <h1 className="text-3xl font-bold sm:text-4xl">
        {t(locale, "404.title")} <span className="gradient-text">{locale === "id" ? "ditemukan" : "found"}</span>
      </h1>
      <p className="max-w-md text-sm text-text-secondary sm:text-base">
        {t(locale, "404.description")}
      </p>
      <Link href="/" className="btn-primary">
        {t(locale, "404.backHome")}
      </Link>
    </div>
  );
}
