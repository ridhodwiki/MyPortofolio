"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { Project } from "@/lib/types";
import { fadeUp } from "@/lib/utils";

export default function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.article
      variants={fadeUp}
      custom={index * 0.1}
      whileHover={{ y: -8 }}
      className="group glass-card flex h-full flex-col overflow-hidden transition-shadow duration-500 hover:shadow-glow"
    >
      <Link href={`/projects/${project.slug}`} className="relative aspect-video w-full overflow-hidden">
        <Image
          src={project.thumbnail}
          alt={`${project.name} thumbnail`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-base/90 via-base/10 to-transparent" />
        <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/30 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-md">
          {project.category}
        </span>
      </Link>

      <div className="flex flex-1 flex-col p-6">
        <Link href={`/projects/${project.slug}`}>
          <h3 className="text-lg font-bold text-white transition-colors group-hover:text-primary">
            {project.name}
          </h3>
        </Link>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-text-secondary">
          {project.description}
        </p>

        <div className="mt-4 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <span
              key={t}
              className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] text-text-secondary"
            >
              {t}
            </span>
          ))}
        </div>

        <div className="mt-6 flex items-center gap-3">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              aria-label={`${project.name} GitHub repository`}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-text-secondary transition-colors hover:border-white/30 hover:text-white"
            >
              <Github size={15} />
            </a>
          )}
          {project.demo && (
            <a
              href={project.demo}
              target="_blank"
              rel="noreferrer"
              aria-label={`${project.name} live demo`}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 text-text-secondary transition-colors hover:border-white/30 hover:text-white"
            >
              <ExternalLink size={15} />
            </a>
          )}
        </div>
      </div>
    </motion.article>
  );
}
