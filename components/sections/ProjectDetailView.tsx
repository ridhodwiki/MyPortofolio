"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
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
} from "lucide-react";
import { Project } from "@/lib/types";
import { fadeUp, staggerContainer } from "@/lib/utils";

const blocks = [
  { key: "overview", label: "Overview", icon: Layers },
  { key: "problem", label: "Problem", icon: Target },
  { key: "solution", label: "Solution", icon: Lightbulb },
] as const;

export default function ProjectDetailView({ project }: { project: Project }) {
  return (
    <article className="relative pb-24 pt-32 sm:pt-40">
      <div className="section-container">
        <motion.div initial="hidden" animate="show" variants={fadeUp}>
          <Link
            href="/#projects"
            className="inline-flex items-center gap-2 text-sm font-medium text-text-secondary transition-colors hover:text-white"
          >
            <ArrowLeft size={16} />
            Back to Projects
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
                View Code
              </a>
            )}
            {project.demo && (
              <a href={project.demo} target="_blank" rel="noreferrer" className="btn-primary">
                <ExternalLink size={16} />
                Live Demo
              </a>
            )}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7 }}
          className="relative mt-12 aspect-video w-full overflow-hidden rounded-3xl border border-white/10"
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
                <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
                  {label}
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
              <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
                Features
              </h2>
            </motion.div>
            <ul className="space-y-3">
              {project.detail.features.map((feature) => (
                <motion.li
                  key={feature}
                  variants={fadeUp}
                  className="flex items-start gap-3 text-sm text-text-secondary"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-secondary" />
                  {feature}
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <motion.div variants={fadeUp} className="mb-5 flex items-center gap-2 text-accent">
              <Wrench size={18} />
              <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
                Technology Stack
              </h2>
            </motion.div>
            <motion.div variants={fadeUp} className="flex flex-wrap gap-2">
              {project.detail.stack.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-text-secondary"
                >
                  {tech}
                </span>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} className="mb-5 mt-10 flex items-center gap-2 text-primary">
              <GitBranch size={18} />
              <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
                Development Process
              </h2>
            </motion.div>
            <ol className="space-y-3">
              {project.detail.process.map((step, i) => (
                <motion.li
                  key={step}
                  variants={fadeUp}
                  className="flex items-start gap-3 text-sm text-text-secondary"
                >
                  <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/15 text-[10px] font-semibold text-primary">
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
          <div className="flex items-center gap-2 text-[#FF9F43]">
            <AlertTriangle size={18} />
            <h2 className="text-sm font-semibold uppercase tracking-wider text-white">
              Challenges
            </h2>
          </div>
          <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {project.detail.challenges.map((challenge) => (
              <li
                key={challenge}
                className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm text-text-secondary"
              >
                {challenge}
              </li>
            ))}
          </ul>
        </motion.div>

        <div className="mt-16">
          <motion.h2
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeUp}
            className="mb-6 text-sm font-semibold uppercase tracking-wider text-white"
          >
            Screenshot Gallery
          </motion.h2>
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.1 }}
            variants={staggerContainer(0.1)}
            className="grid grid-cols-1 gap-4 sm:grid-cols-3"
          >
            {project.detail.gallery.map((image, i) => (
              <motion.div
                key={`${image}-${i}`}
                variants={fadeUp}
                whileHover={{ scale: 1.03 }}
                className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10"
              >
                <Image
                  src={image}
                  alt={`${project.name} screenshot ${i + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-500 hover:scale-110"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
          variants={fadeUp}
          className="mt-16 glass-card p-8 text-center"
        >
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-secondary/15 text-secondary">
            <Trophy size={20} />
          </div>
          <h2 className="mt-4 text-sm font-semibold uppercase tracking-wider text-white">
            Result
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm leading-relaxed text-gray-300 sm:text-base" style={{ color: '#D1D5DB' }}>
            {project.detail.result}
          </p>
        </motion.div>
      </div>
    </article>
  );
}
