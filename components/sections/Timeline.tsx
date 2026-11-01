"use client";

import { motion } from "motion/react";
import SectionHeading from "@/components/ui/SectionHeading";
import { timeline } from "@/lib/data";
import { fadeUp, staggerContainer } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/i18n";

export default function Timeline() {
  const { locale } = useLanguage();

  return (
    <section id="journey" className="section-padding relative">
      <div className="section-container">
        <SectionHeading
          eyebrow="My path so far"
          title={t(locale, "timeline.title")}
          description={t(locale, "timeline.description")}
          hue="amber"
        />

        <motion.ol
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer(0.08)}
          className="border-t border-line"
        >
          {timeline.map((item, index) => (
            <motion.li
              key={item.id}
              variants={fadeUp}
              className="grid grid-cols-1 gap-3 border-b border-line py-7 sm:grid-cols-[11rem_1fr] sm:gap-10"
            >
              <div className="font-mono text-[10px] uppercase tracking-[0.18em]">
                <span className="flex items-center gap-2 text-hue-amber">
                  <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-hue-amber" />
                  {item.period}
                </span>
                <span className="mt-1 block pl-3.5 text-text-muted">
                  {item.duration ?? `entry ${String(index + 1).padStart(2, "0")}`}
                </span>
              </div>

              <div>
                <h3 className="text-base font-semibold tracking-tight sm:text-lg">
                  {item.title}
                </h3>
                {item.org && (
                  <p className="mt-1 text-[11px] uppercase tracking-[0.12em] text-text-secondary">
                    {item.org}
                  </p>
                )}
                <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text-secondary">
                  {item.description}
                </p>
                <p className="mt-3 font-mono text-[11px] text-text-muted">
                  {item.skills.join("  ·  ")}
                </p>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
