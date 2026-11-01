"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/i18n";

export default function NotFound() {
  const { locale } = useLanguage();

  return (
    <div className="section-container flex min-h-screen flex-col justify-center py-24">
      <span className="eyebrow">error 404</span>
      <h1 className="mt-6 text-3xl font-bold tracking-tight sm:text-5xl">
        {t(locale, "404.title")}{" "}
        <span className="gradient-text">
          {locale === "id" ? "ditemukan" : "found"}
        </span>
      </h1>
      <p className="mt-4 max-w-md text-sm leading-relaxed text-text-secondary sm:text-base">
        {t(locale, "404.description")}
      </p>
      <Link href="/" className="btn-primary mt-8 w-fit">
        {t(locale, "404.backHome")}
      </Link>
    </div>
  );
}
