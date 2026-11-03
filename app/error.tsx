"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertCircle, RotateCcw } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { locale } = useLanguage();

  useEffect(() => {
    // Log error to console for debugging
    console.error("Uncaught application error:", error);
  }, [error]);

  return (
    <div className="section-container flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-hue-rose/40 bg-hue-rose/10 text-hue-rose">
        <AlertCircle size={24} />
      </div>

      <span className="eyebrow mt-6">Application Error</span>

      <h1 className="mt-3 text-2xl font-bold tracking-tight sm:text-4xl">
        {locale === "id" ? "Terjadi kesalahan sistem" : "Something went wrong"}
      </h1>

      <p className="mt-3 max-w-md text-sm leading-relaxed text-text-secondary">
        {locale === "id"
          ? "Halaman mengalami kendala tak terduga. Silakan muat ulang atau kembali ke beranda."
          : "An unexpected error occurred while loading this page. Please try refreshing or return home."}
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <button
          type="button"
          onClick={() => reset()}
          className="btn-primary"
        >
          <RotateCcw size={16} />
          {locale === "id" ? "Coba Lagi" : "Try Again"}
        </button>

        <Link href="/" className="btn-ghost">
          {locale === "id" ? "Ke Beranda" : "Go Home"}
        </Link>
      </div>
    </div>
  );
}
