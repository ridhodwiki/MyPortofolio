"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/lib/types";
import { fadeUp } from "@/lib/utils";

export default function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const isExternal = !!project.externalLink;
  const href = isExternal ? project.externalLink! : `/projects/${project.slug}`;

  return (
    <motion.article variants={fadeUp} className="group border-b border-line">
      <Link
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noreferrer" : undefined}
        className="flex flex-col gap-4 py-6 sm:flex-row sm:items-start sm:gap-7 sm:py-7"
      >
        <span className="relative aspect-[16/10] w-full shrink-0 overflow-hidden rounded-xl border border-line bg-canvas sm:w-52">
          <Image
            src={project.thumbnail}
            alt={`${project.name} preview`}
            fill
            sizes="(max-width: 640px) 100vw, 208px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </span>

        <span className="min-w-0 flex-1">
          <span className="flex items-start justify-between gap-4">
            <span className="flex items-baseline gap-3">
              <span className="font-mono text-[10px] tabular-nums text-text-muted">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span className="text-lg font-semibold tracking-tight transition-colors group-hover:text-primary sm:text-xl">
                {project.name}
              </span>
            </span>
            <ArrowUpRight
              size={18}
              aria-hidden
              className="mt-1 shrink-0 text-text-muted transition-colors group-hover:text-primary"
            />
          </span>

          <span className="mt-2 inline-block rounded-full border border-hue-rose/30 bg-hue-rose/10 px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-hue-rose">
            {project.category}
          </span>

          <span className="mt-3 block max-w-2xl text-sm leading-relaxed text-text-secondary">
            {project.description}
          </span>

          <span className="mt-3 block font-mono text-[11px] text-text-muted">
            {project.tech.join("  ·  ")}
          </span>
        </span>
      </Link>
    </motion.article>
  );
}
