"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import SectionHeading from "@/components/ui/SectionHeading";
import SkillIcon from "@/components/ui/SkillIcon";
import { skillCategories, skills } from "@/lib/data";
import { cn, fadeUp, staggerContainer } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/i18n";

type Filter = "All" | (typeof skillCategories)[number];

const categoryStyles: Record<string, string> = {
  Programming: "text-hue-blue border-hue-blue/30 bg-hue-blue/10",
  Frontend: "text-hue-cyan border-hue-cyan/30 bg-hue-cyan/10",
  Mobile: "text-hue-emerald border-hue-emerald/30 bg-hue-emerald/10",
  Backend: "text-hue-amber border-hue-amber/30 bg-hue-amber/10",
  Database: "text-hue-violet border-hue-violet/30 bg-hue-violet/10",
  Tools: "text-hue-rose border-hue-rose/30 bg-hue-rose/10",
  AI: "text-accent border-accent/30 bg-accent/10",
};

export default function Skills() {
  const [filter, setFilter] = useState<Filter>("All");
  const { locale } = useLanguage();

  const filtered = useMemo(
    () => (filter === "All" ? skills : skills.filter((s) => s.category === filter)),
    [filter]
  );

  const tabs: Filter[] = ["All", ...skillCategories];

  return (
    <section id="skills" className="section-padding relative">
      <div className="section-container">
        <SectionHeading
          eyebrow="What I work with"
          title={t(locale, "skills.title")}
          description={t(locale, "skills.description")}
          hue="cyan"
        />

        <div className="mb-8 flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setFilter(tab)}
              aria-pressed={filter === tab}
              className={cn(
                "rounded-lg border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors duration-150",
                filter === tab
                  ? "border-primary bg-primary"
                  : "border-line bg-surface text-text-secondary hover:border-primary hover:text-primary"
              )}
              style={filter === tab ? { color: "rgb(var(--c-on-primary))" } : undefined}
            >
              {tab === "All" ? t(locale, "skills.filterAll") : tab}
            </button>
          ))}
        </div>

        <motion.div
          key={filter}
          variants={staggerContainer(0.03)}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 sm:grid-cols-2 sm:gap-x-10"
        >
          {filtered.map((skill, i) => (
            <motion.div
              key={skill.name}
              variants={fadeUp}
              className="flex items-center gap-3 border-b border-line py-3"
            >
              <span className="w-6 shrink-0 font-mono text-[10px] tabular-nums text-text-muted">
                {String(i + 1).padStart(2, "0")}
              </span>
              <SkillIcon name={skill.name} />
              <span className="flex-1 text-sm font-medium">{skill.name}</span>
              <span
                className={cn(
                  "rounded-full border px-2 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em]",
                  categoryStyles[skill.category] ?? "border-line text-text-muted"
                )}
              >
                {skill.category}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
