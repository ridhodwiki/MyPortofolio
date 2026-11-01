"use client";

import { motion } from "motion/react";
import SectionHeading from "@/components/ui/SectionHeading";
import { profile } from "@/lib/data";
import { fadeUp, staggerContainer } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/i18n";

export default function About() {
  const { locale } = useLanguage();

  const records = [
    {
      label: t(locale, "about.eduLabel"),
      value: t(locale, "about.university"),
      detail: t(locale, "about.eduDegree"),
    },
    {
      label: t(locale, "about.bgLabel"),
      value: t(locale, "about.background"),
      detail: t(locale, "about.eduMajor"),
    },
  ];

  return (
    <section id="about" className="section-padding relative">
      <div className="section-container">
        <SectionHeading
          eyebrow="Get to know me"
          title={t(locale, "about.title")}
          description={t(locale, "about.description")}
          hue="violet"
        />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer(0.08)}
            className="lg:col-span-7"
          >
            <motion.p
              variants={fadeUp}
              className="text-sm leading-relaxed text-text-secondary sm:text-base"
            >
              {t(locale, "about.bio")}
            </motion.p>

            <dl className="mt-8 border-t border-line">
              {records.map((record) => (
                <motion.div
                  key={record.label}
                  variants={fadeUp}
                  className="grid grid-cols-1 gap-1 border-b border-line py-4 sm:grid-cols-[10rem_1fr] sm:gap-6"
                >
                  <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
                    {record.label}
                  </dt>
                  <dd>
                    <span className="block text-sm">{record.value}</span>
                    <span className="mt-0.5 block text-xs text-text-muted">
                      {record.detail}
                    </span>
                  </dd>
                </motion.div>
              ))}
            </dl>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer(0.04)}
            className="lg:col-span-5"
          >
            <h3 className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
              {t(locale, "about.interests")}
            </h3>

            <ul className="mt-3 border-t border-line">
              {profile.interests.map((interest, i) => (
                <motion.li
                  key={interest}
                  variants={fadeUp}
                  className="flex items-center gap-3 border-b border-line py-2.5"
                >
                  <span className="w-2 shrink-0">
                    <span
                      aria-hidden
                      className={`block h-1.5 w-1.5 rounded-full ${[
                        "bg-hue-violet",
                        "bg-hue-blue",
                        "bg-hue-cyan",
                        "bg-hue-emerald",
                        "bg-hue-amber",
                        "bg-hue-rose",
                      ][i % 6]}`}
                    />
                  </span>
                  <span className="text-sm text-text-secondary">{interest}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
