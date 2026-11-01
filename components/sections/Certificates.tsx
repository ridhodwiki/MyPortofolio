"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { Award, ZoomIn } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import CertificateModal from "@/components/ui/CertificateModal";
import { certificates } from "@/lib/data";
import { Certificate } from "@/lib/types";
import { fadeUp, staggerContainer } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/i18n";

export default function Certificates() {
  const [active, setActive] = useState<Certificate | null>(null);
  const { locale } = useLanguage();

  return (
    <section id="certificates" className="section-padding relative">
      <div className="section-container">
        <SectionHeading
          eyebrow="Proof of learning"
          title={t(locale, "certificates.title")}
          description={t(locale, "certificates.description")}
          hue="emerald"
        />

        <motion.div
          variants={staggerContainer(0.06)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {certificates.map((cert) => (
            <motion.button
              type="button"
              key={cert.id}
              variants={fadeUp}
              onClick={() => setActive(cert)}
              className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-surface text-left shadow-[var(--shadow-card)] transition-colors duration-200 hover:border-hue-emerald/60"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden border-b border-line bg-white">
                <Image
                  src={cert.image}
                  alt={cert.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-contain p-4"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-canvas/80 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                  <span className="flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-text">
                    <ZoomIn size={12} />
                    Preview
                  </span>
                </div>
              </div>

              <div className="flex flex-1 flex-col p-4">
                <div className="flex items-center gap-2 text-hue-emerald">
                  <Award size={12} />
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em]">
                    {cert.year}
                  </span>
                </div>
                <h3 className="mt-2 text-sm font-semibold leading-snug">
                  {cert.name}
                </h3>
                <p className="mt-1.5 text-[11px] text-text-muted">
                  {cert.institution}
                </p>
              </div>
            </motion.button>
          ))}
        </motion.div>
      </div>

      <CertificateModal certificate={active} onClose={() => setActive(null)} />
    </section>
  );
}
