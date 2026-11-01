"use client";

import { motion } from "motion/react";
import { fadeUp } from "@/lib/utils";

type Hue = "violet" | "blue" | "cyan" | "emerald" | "amber" | "rose";

export const HUES: Record<Hue, string> = {
  violet: "var(--c-violet)",
  blue: "var(--c-blue)",
  cyan: "var(--c-cyan)",
  emerald: "var(--c-emerald)",
  amber: "var(--c-amber)",
  rose: "var(--c-rose)",
};

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  hue?: Hue;
}

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  hue = "violet",
}: SectionHeadingProps) {
  return (
    <motion.div
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: 0.08 } },
      }}
      style={{ "--section-hue": HUES[hue] } as React.CSSProperties}
      className={`mb-10 flex flex-col gap-3 sm:mb-12 ${
        align === "center" ? "items-center text-center" : "items-start text-left"
      }`}
    >
      <motion.span variants={fadeUp} className="eyebrow">
        {eyebrow}
      </motion.span>
      <motion.h2
        variants={fadeUp}
        className="text-2xl font-bold tracking-tight text-text sm:text-3xl lg:text-4xl"
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          variants={fadeUp}
          className="max-w-2xl text-sm leading-relaxed text-text-secondary sm:text-base"
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  );
}
