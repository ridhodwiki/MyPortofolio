"use client";

import { motion } from "motion/react";
import SectionHeading from "@/components/ui/SectionHeading";
import ProjectCard from "@/components/ui/ProjectCard";
import { projects } from "@/lib/data";
import { staggerContainer } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/i18n";

export default function Projects() {
  const { locale } = useLanguage();

  return (
    <section id="projects" className="section-padding relative">
      <div className="section-container">
        <SectionHeading
          eyebrow="Selected work"
          title={t(locale, "projects.title")}
          description={t(locale, "projects.description")}
        />

        <motion.div
          variants={staggerContainer(0.15)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} index={i} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
