"use client";

import type { ComponentType, CSSProperties } from "react";
import {
  SiJavascript,
  SiTypescript,
  SiPhp,
  SiPython,
  SiDart,
  SiHtml5,
  SiCss,
  SiTailwindcss,
  SiReact,
  SiNextdotjs,
  SiFlutter,
  SiNodedotjs,
  SiMysql,
  SiSupabase,
  SiGit,
  SiGithub,
  SiFigma,
  SiXampp,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { BrainCircuit, Cpu, Sparkles } from "lucide-react";

type IconComponent = ComponentType<{ size?: number; style?: CSSProperties }>;

interface SkillIconEntry {
  Icon: IconComponent;
  color: string;
  lightColor?: string;
}

const TEXT = "rgb(var(--c-text))";

/** Brand logo + official brand colour, keyed by the skill name used in lib/data.ts.
 * Includes lightColor fallback where default brand color has < 3:1 contrast against #FAFAF8 light canvas.
 */
export const skillIcons: Record<string, SkillIconEntry> = {
  JavaScript: { Icon: SiJavascript, color: "#F7DF1E", lightColor: "#B59400" },
  TypeScript: { Icon: SiTypescript, color: "#3178C6" },
  PHP: { Icon: SiPhp, color: "#777BB4", lightColor: "#5B5FA8" },
  Python: { Icon: SiPython, color: "#3776AB" },
  Dart: { Icon: SiDart, color: "#0175C2" },
  HTML: { Icon: SiHtml5, color: "#E34F26" },
  CSS: { Icon: SiCss, color: "#1572B6" },
  "Tailwind CSS": { Icon: SiTailwindcss, color: "#06B6D4", lightColor: "#0284C7" },
  React: { Icon: SiReact, color: "#61DAFB", lightColor: "#0284C7" },
  "Next.js": { Icon: SiNextdotjs, color: TEXT },
  Flutter: { Icon: SiFlutter, color: "#02569B" },
  "Node.js": { Icon: SiNodedotjs, color: "#5FA04E", lightColor: "#3B7A2E" },
  MySQL: { Icon: SiMysql, color: "#5C9BC9", lightColor: "#2A729E" },
  Supabase: { Icon: SiSupabase, color: "#3FCF8E", lightColor: "#15803D" },
  Git: { Icon: SiGit, color: "#F05032" },
  GitHub: { Icon: SiGithub, color: TEXT },
  "VS Code": { Icon: VscVscode, color: "#007ACC" },
  Figma: { Icon: SiFigma, color: "#F24E1E" },
  XAMPP: { Icon: SiXampp, color: "#FB7A24", lightColor: "#C2570A" },
  Wokwi: { Icon: Cpu, color: "rgb(var(--c-violet))" },
  "Artificial Intelligence Basic": { Icon: BrainCircuit, color: "#A78BFA", lightColor: "#7C3AED" },
  "Prompt Engineering": { Icon: Sparkles, color: "#EC4899", lightColor: "#BE185D" },
};

export default function SkillIcon({ name }: { name: string }) {
  const entry = skillIcons[name];
  const Icon = entry?.Icon ?? Cpu;
  const darkColor = entry?.color ?? "rgb(var(--c-text-muted))";
  const lightColor = entry?.lightColor ?? darkColor;

  return (
    <span
      aria-hidden
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-canvas text-[18px]"
    >
      {/* Light mode: uses high-contrast lightColor token */}
      <span className="flex items-center justify-center dark:hidden">
        <Icon size={18} style={{ color: lightColor }} />
      </span>
      {/* Dark mode: uses vibrant brand color */}
      <span className="hidden items-center justify-center dark:flex">
        <Icon size={18} style={{ color: darkColor }} />
      </span>
    </span>
  );
}
