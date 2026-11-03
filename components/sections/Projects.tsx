"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "@/components/ui/ProjectCard";
import { getProjects, projectCategories } from "@/lib/data";
import { cn, staggerContainer } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/i18n";

type ProjectFilter = "All" | (typeof projectCategories)[number];

export default function Projects() {
  const { locale } = useLanguage();
  const [filter, setFilter] = useState<ProjectFilter>("All");
  const localizedProjects = useMemo(() => getProjects(locale), [locale]);

  const filtered = useMemo(
    () =>
      filter === "All"
        ? localizedProjects
        : localizedProjects.filter((p) => p.category === filter),
    [filter, localizedProjects]
  );

  const tabs: ProjectFilter[] = ["All", ...projectCategories];

  return (
    <section id="projects" className="section-padding relative">
      <div className="section-container">
        <SectionHeading
          eyebrow={t(locale, "projects.eyebrow")}
          title={t(locale, "projects.title")}
          description={t(locale, "projects.description")}
          hue="rose"
        />

        <div className="mb-8 flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setFilter(tab)}
              aria-pressed={filter === tab}
              className={cn(
                "min-h-9 rounded-lg border px-3.5 py-2 font-mono text-[10px] uppercase tracking-[0.16em] transition-colors duration-150",
                filter === tab
                  ? "border-primary bg-primary"
                  : "border-line bg-surface text-text-secondary hover:border-primary hover:text-primary"
              )}
              style={filter === tab ? { color: "rgb(var(--c-on-primary))" } : undefined}
            >
              {tab === "All" ? t(locale, "projects.filterAll") : tab}
            </button>
          ))}
        </div>

        <motion.div
          key={`${locale}-${filter}`}
          variants={staggerContainer(0.08)}
          initial="hidden"
          animate="show"
          className="border-t border-line"
        >
          {filtered.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
