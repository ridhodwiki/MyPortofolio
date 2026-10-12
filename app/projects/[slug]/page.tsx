import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { projects } from "@/lib/data";
import ProjectDetailView from "@/components/sections/ProjectDetailView";

interface ProjectPageProps {
  params: { slug: string };
}

export function generateStaticParams() {
  return projects
    .filter((project) => !!project.detail)
    .map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: ProjectPageProps): Metadata {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project) return {};

  return {
    title: `${project.name} — Project Detail`,
    description: project.description,
    openGraph: {
      title: project.name,
      description: project.description,
      images: [{ url: project.thumbnail }],
    },
  };
}

export default function ProjectPage({ params }: ProjectPageProps) {
  const project = projects.find((p) => p.slug === params.slug);
  if (!project || !project.detail) notFound();

  return <ProjectDetailView project={project as Parameters<typeof ProjectDetailView>[0]["project"]} />;
}
