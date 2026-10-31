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
        />

        <motion.div
          variants={staggerContainer(0.1)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 gap-6 md:grid-cols-3"
        >
          {certificates.map((cert) => (
            <motion.button
              type="button"
              key={cert.id}
              variants={fadeUp}
              whileHover={{ y: -6 }}
              onClick={() => setActive(cert)}
              className="glass-card group relative flex flex-col overflow-hidden p-0 text-left transition-shadow duration-500 hover:shadow-glow"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-white">
                <Image
                  src={cert.image}
                  alt={cert.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-contain p-6 transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-xs font-medium text-white backdrop-blur-md">
                    <ZoomIn size={14} />
                    Preview
                  </span>
                </div>
              </div>
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-center gap-2 text-primary">
                  <Award size={14} />
                  <span className="text-[11px] font-medium uppercase tracking-wider text-text-secondary">
                    {cert.year}
                  </span>
                </div>
                <h3 className="mt-2 text-sm font-bold sm:text-base" style={{ color: "var(--color-text)" }}>
                  {cert.name}
                </h3>
                <p className="mt-1 text-xs font-medium text-secondary">
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
