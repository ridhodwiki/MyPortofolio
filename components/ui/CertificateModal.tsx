"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { X, Award } from "lucide-react";
import { Certificate } from "@/lib/types";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/i18n";

export default function CertificateModal({
  certificate,
  onClose,
}: {
  certificate: Certificate | null;
  onClose: () => void;
}) {
  const { locale } = useLanguage();
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previousFocusRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    if (!certificate) return;
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => closeButtonRef.current?.focus(), 50);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
      previousFocusRef.current?.focus?.();
    };
  }, [certificate]);

  return (
    <AnimatePresence>
      {certificate && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-canvas/85 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="certificate-title"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 24 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            className="glass-card relative w-full max-w-lg overflow-hidden p-0"
          >
            <button
              ref={closeButtonRef}
              type="button"
              onClick={onClose}
              aria-label={t(locale, "certificates.closePreview")}
              className="absolute right-3 top-3 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface/95 text-text shadow-sm transition-colors hover:border-primary hover:text-primary"
            >
              <X size={16} />
            </button>

            {/* White plate behind certificate so dark-text artwork stays readable in both themes */}
            <div className="relative aspect-[4/3] w-full bg-white">
              <Image
                src={certificate.image}
                alt={certificate.name}
                fill
                sizes="(max-width: 768px) 100vw, 32rem"
                className="object-contain p-6"
              />
            </div>

            <div className="p-6">
              <div className="flex items-center gap-2 text-hue-emerald">
                <Award size={16} />
                <span className="font-mono text-[10px] uppercase tracking-[0.18em]">
                  {certificate.year}
                </span>
              </div>
              <h3
                id="certificate-title"
                className="mt-2 text-xl font-bold text-text"
              >
                {certificate.name}
              </h3>
              <p className="mt-1 text-sm font-medium text-secondary">
                {certificate.institution}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                {certificate.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {certificate.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md border border-line bg-surface px-2.5 py-1 text-[11px] text-text-secondary"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
