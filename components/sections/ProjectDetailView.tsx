"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Github,
  ExternalLink,
  Layers,
  Target,
  Lightbulb,
  ListChecks,
  Wrench,
  GitBranch,
  AlertTriangle,
  Trophy,
  Share2,
  Check,
} from "lucide-react";
import { Project } from "@/lib/types";
import { getProjectBySlug, getProjects } from "@/lib/data";
import { fadeUp, staggerContainer } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/i18n";

type ProjectWithDetail = Project & { detail: NonNullable<Project["detail"]> };

const blocks = [
  { key: "overview", label: "project.overview", icon: Layers },
  { key: "problem", label: "project.problem", icon: Target },
  { key: "solution", label: "project.solution", icon: Lightbulb },
] as const;

export default function ProjectDetailView({ project: initialProject }: { project: ProjectWithDetail }) {
  const { locale } = useLanguage();
  const [copiedLink, setCopiedLink] = useState(false);
  const localized = getProjectBySlug(initialProject.slug, locale);
  const project = (localized?.detail ? localized : initialProject) as ProjectWithDetail;

  const liveUrl = project.demo ?? project.externalLink;
  const isPrototype = !project.demo && !!project.externalLink;

  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${project.name} · Ridho Dwiki Zakaria`,
          text: project.description,
          url,
        });
        return;
      } catch {
        // Fallback to clipboard
      }
    }
    await navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <article className="relative pb-24 pt-32 sm:pt-40">
      <div className="section-container">
        <motion.div initial="hidden" animate="show" variants={fadeUp}>
          <Link
            href="/#projects"
            className="inline-flex min-h-11 items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em] text-text-secondary transition-colors hover:text-primary"
          >
            <ArrowLeft size={16} />
            {t(locale, "project.backToProjects")}
          </Link>
        </motion.div>

        <motion.div
          initial="hidden"
          animate="show"
          variants={staggerContainer(0.1)}
          className="mt-8 flex flex-col gap-4"
        >
          <motion.span variants={fadeUp} className="eyebrow">
            {project.category}
          </motion.span>
          <motion.h1
            variants={fadeUp}
            className="text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
          >
            {project.name}
          </motion.h1>
          <motion.p
            variants={fadeUp}
            className="max-w-2xl text-base text-text-secondary sm:text-lg"
          >
            {project.description}
          </motion.p>

          <motion.div variants={fadeUp} className="mt-2 flex flex-wrap gap-3">
            {project.github && (
              <a href={project.github} target="_blank" rel="noreferrer" className="btn-ghost">
                <Github size={16} />
                {t(locale, "project.viewCode")}
              </a>
            )}
            {liveUrl && (
              <a href={liveUrl} target="_blank" rel="noreferrer" className="btn-primary">
                <ExternalLink size={16} />
                {isPrototype ? t(locale, "project.openPrototype") : t(locale, "project.liveDemo")}
              </a>
            )}
            <button
              type="button"
              onClick={handleShare}
              aria-label="Share case study"
              className="btn-ghost"
            >
              {copiedLink ? (
                <>
                  <Check size={16} className="text-hue-emerald" />
                  <span className="text-hue-emerald">
                    {locale === "id" ? "Tautan Disalin" : "Link Copied"}
                  </span>
                </>
              ) : (
                <>
                  <Share2 size={16} />
                  <span>{locale === "id" ? "Bagikan" : "Share"}</span>
                </>
              )}
            </button>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="relative mt-12 aspect-video w-full overflow-hidden rounded-2xl border border-line bg-surface"
        >
          <Image
            src={project.thumbnail}
            alt={`${project.name} preview`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {blocks.map(({ key, label, icon: Icon }) => (
            <motion.div
              key={key}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              className="glass-card p-6"
            >
              <div className="flex items-center gap-2 text-primary">
                <Icon size={18} />
                <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-text">
                  {t(locale, label)}
                </h2>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                {project.detail[key as "overview" | "problem" | "solution"]}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer(0.08)}
          className="mt-16 grid grid-cols-1 gap-16 lg:grid-cols-2"
        >
          <div>
            <motion.div variants={fadeUp} className="mb-5 flex items-center gap-2 text-secondary">
              <ListChecks size={18} />
              <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-text">
                {t(locale, "project.features")}
              </h2>
            </motion.div>
            <ul className="space-y-3">
              {project.detail.features.map((feature) => (
                <motion.li
                  key={feature}
                  variants={fadeUp}
                  className="flex items-start gap-3 text-sm text-text-secondary"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {feature}
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <motion.div variants={fadeUp} className="mb-5 flex items-center gap-2 text-accent">
              <Wrench size={18} />
              <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-text">
                {t(locale, "project.stack")}
              </h2>
            </motion.div>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
              {project.detail.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-line bg-surface px-3 py-1.5 font-mono text-[11px] text-text-secondary"
                >
                  {tech}
                </span>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="mb-5 mt-10 flex items-center gap-2 text-primary">
              <GitBranch size={18} />
              <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-text">
                {t(locale, "project.process")}
              </h2>
            </motion.div>
            <ol className="space-y-3">
              {project.detail.process.map((step, i) => (
                <motion.li
                  key={step}
                  variants={fadeUp}
                  className="flex items-start gap-3 text-sm text-text-secondary"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-primary/40 font-mono text-[10px] font-semibold text-primary">
                    {i + 1}
                  </span>
                  {step}
                </motion.li>
              ))}
            </ol>
          </div>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="mt-16 glass-card p-6"
        >
          <div className="flex items-center gap-2 text-hue-amber">
            <AlertTriangle size={18} />
            <h2 className="font-mono text-[10px] uppercase tracking-[0.18em] text-text">
              {t(locale, "project.challenges")}
            </h2>
          </div>
          <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {project.detail.challenges.map((challenge) => (
              <li
                key={challenge}
                className="rounded-xl border border-line bg-canvas p-4 text-sm text-text-secondary"
              >
                {challenge}
              </li>
            ))}
          </ul>
        </motion.div>

        {project.detail.gallery.length > 0 && (
          <div className="mt-16">
            <motion.h2
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              className="mb-6 font-mono text-[10px] uppercase tracking-[0.18em] text-text"
            >
              {t(locale, "project.gallery")}
            </motion.h2>
            <motion.div
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.1 }}
              variants={staggerContainer(0.1)}
              className={
                project.detail.gallery.length === 1
                  ? "grid grid-cols-1 max-w-3xl"
                  : "grid grid-cols-1 gap-4 sm:grid-cols-3"
              }
            >
              {project.detail.gallery.map((image, i) => (
                <motion.div
                  key={`${image}-${i}`}
                  variants={fadeUp}
                  whileHover={{ scale: 1.02 }}
                  className="relative aspect-[4/3] overflow-hidden rounded-xl border border-line bg-surface"
                >
                  <Image
                    src={image}
                    alt={`${project.name} screenshot ${i + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 hover:scale-105"
                  />
                </motion.div>
              ))}
            </motion.div>
          </div>
        )}

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="mt-16 glass-card p-8 text-center"
        >
          <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl border border-primary/40 bg-primary/10 text-primary">
            <Trophy size={20} />
          </div>
          <h2 className="mt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-text">
            {t(locale, "project.result")}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-text-secondary sm:text-base">
            {project.detail.result}
          </p>
        </motion.div>

        {/* Previous & Next Project Navigation */}
        {(() => {
          const detailProjects = getProjects(locale).filter(
            (p): p is ProjectWithDetail => Boolean(p.slug && p.detail)
          );
          const currentIndex = detailProjects.findIndex((p) => p.slug === project.slug);
          const prevProj = currentIndex > 0 ? detailProjects[currentIndex - 1] : null;
          const nextProj =
            currentIndex >= 0 && currentIndex < detailProjects.length - 1
              ? detailProjects[currentIndex + 1]
              : null;

          return (
            <nav
              aria-label="Case study navigation"
              className="mt-12 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                {prevProj ? (
                  <Link
                    href={`/projects/${prevProj.slug}`}
                    className="group flex flex-col items-start gap-1 p-2 rounded-lg transition-colors hover:text-primary"
                  >
                    <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-text-secondary group-hover:text-primary">
                      <ArrowLeft size={14} />
                      {locale === "id" ? "Proyek Sebelumnya" : "Previous Project"}
                    </span>
                    <span className="text-sm font-semibold text-text group-hover:text-primary">
                      {prevProj.name}
                    </span>
                  </Link>
                ) : (
                  <div />
                )}
              </div>

              <div>
                {nextProj ? (
                  <Link
                    href={`/projects/${nextProj.slug}`}
                    className="group flex flex-col items-end gap-1 p-2 rounded-lg transition-colors hover:text-primary text-right"
                  >
                    <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-text-secondary group-hover:text-primary">
                      {locale === "id" ? "Proyek Berikutnya" : "Next Project"}
                      <ArrowRight size={14} />
                    </span>
                    <span className="text-sm font-semibold text-text group-hover:text-primary">
                      {nextProj.name}
                    </span>
                  </Link>
                ) : (
                  <div />
                )}
              </div>
            </nav>
          );
        })()}
      </div>
    </article>
  );
}
