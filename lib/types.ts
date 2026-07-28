export type SkillCategory =
  | "Programming"
  | "Frontend"
  | "Mobile"
  | "Backend"
  | "Database"
  | "Tools"
  | "AI";

export interface Skill {
  name: string;
  category: SkillCategory;
}

export interface Project {
  slug: string;
  name: string;
  description: string;
  category: string;
  tech: string[];
  github?: string;
  demo?: string;
  thumbnail: string;
  detail: {
    overview: string;
    problem: string;
    solution: string;
    features: string[];
    stack: string[];
    process: string[];
    challenges: string[];
    gallery: string[];
    result: string;
  };
}

export interface TimelineItem {
  id: string;
  icon: "graduation" | "briefcase" | "university";
  period: string;
  duration?: string;
  title: string;
  org?: string;
  description: string;
  skills: string[];
}

export interface Certificate {
  id: string;
  name: string;
  institution: string;
  year: string;
  description: string;
  skills: string[];
  image: string;
}
