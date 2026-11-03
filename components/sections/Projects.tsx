"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { Search, X } from "lucide-react";
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
  const [searchQuery, setSearchQuery] = useState("");
  const localizedProjects = useMemo(() => getProjects(locale), [locale]);

  const filtered = useMemo(() => {
    return localizedProjects.filter((p) => {
      const matchCategory = filter === "All" || p.category === filter;
      const q = searchQuery.toLowerCase().trim();
      const matchSearch =
        !q ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tech.some((t) => t.toLowerCase().includes(q));
      return matchCategory && matchSearch;
    });
  }, [filter, searchQuery, localizedProjects]);

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

        {/* Controls: Category tabs + keyword search */}
        <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
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

          <div className="relative w-full sm:w-64">
            <Search
              size={14}
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-text-muted"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={locale === "id" ? "Cari teknologi / nama..." : "Search tech / title..."}
              className="h-9 w-full rounded-lg border border-line bg-surface pl-9 pr-8 font-mono text-xs text-text placeholder:text-text-muted/60 focus:border-primary focus:outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-text-muted hover:text-text"
              >
                <X size={13} />
              </button>
            )}
          </div>
        </div>

        <motion.div
          key={`${locale}-${filter}-${searchQuery}`}
          variants={staggerContainer(0.08)}
          initial="hidden"
          animate="show"
          className="border-t border-line"
        >
          {filtered.length > 0 ? (
            filtered.map((project, i) => (
              <ProjectCard key={project.slug} project={project} index={i} />
            ))
          ) : (
            <div className="py-16 text-center">
              <p className="text-sm text-text-muted">
                {locale === "id"
                  ? "Tidak ada proyek yang cocok dengan pencarian."
                  : "No projects matched your search criteria."}
              </p>
              <button
                type="button"
                onClick={() => {
                  setFilter("All");
                  setSearchQuery("");
                }}
                className="mt-3 font-mono text-xs text-primary underline underline-offset-4"
              >
                {locale === "id" ? "Reset filter" : "Reset filters"}
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
