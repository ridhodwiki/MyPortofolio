"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { X, Award } from "lucide-react";
import { Certificate } from "@/lib/types";

export default function CertificateModal({
  certificate,
  onClose,
}: {
  certificate: Certificate | null;
  onClose: () => void;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = certificate ? "hidden" : "";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [certificate, onClose]);

  return (
    <AnimatePresence>
      {certificate && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
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
              type="button"
              onClick={onClose}
              aria-label="Close certificate preview"
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/40 text-white transition-colors hover:bg-black/60"
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
              <div className="flex items-center gap-2 text-accent">
                <Award size={16} />
                <span className="text-xs font-medium uppercase tracking-wider">
                  {certificate.year}
                </span>
              </div>
              <h3
                id="certificate-title"
                className="mt-2 text-xl font-bold"
                style={{ color: "var(--color-text)" }}
              >
                {certificate.name}
              </h3>
              <p className="mt-1 text-sm font-medium text-secondary">
                {certificate.institution}
              </p>
              <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--color-text-secondary)" }}>
                {certificate.description}
              </p>
              <div className="mt-4 flex flex-wrap gap-2">
                {certificate.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-full border px-2.5 py-1 text-[11px]"
                    style={{
                      color: "var(--color-text-secondary)",
                      borderColor: "var(--color-border)",
                      backgroundColor: "var(--color-glass-bg)",
                    }}
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
