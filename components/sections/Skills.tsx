"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code2 } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { skillCategories, skills } from "@/lib/data";
import { cn, fadeUp, staggerContainer } from "@/lib/utils";

type Filter = "All" | (typeof skillCategories)[number];

export default function Skills() {
  const [filter, setFilter] = useState<Filter>("All");

  const filtered = useMemo(
    () => (filter === "All" ? skills : skills.filter((s) => s.category === filter)),
    [filter]
  );

  const tabs: Filter[] = ["All", ...skillCategories];

  return (
    <section id="skills" className="section-padding relative">
      <div className="section-container">
        <SectionHeading
          eyebrow="What I work with"
          title="Skills & Technologies"
          description="Kumpulan bahasa, framework, tools, dan bidang yang saya pelajari dan gunakan."
        />

        <div className="mb-10 flex flex-wrap justify-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setFilter(tab)}
              className={cn(
                "rounded-full border px-4 py-2 text-xs font-medium transition-all duration-300 sm:text-sm",
                filter === tab
                  ? "border-primary/60 bg-primary/20 text-white shadow-glow"
                  : "border-white/10 bg-white/[0.02] text-text-secondary hover:border-white/25 hover:text-white"
              )}
            >
              {tab}
            </button>
          ))}
        </div>

        <motion.div
          variants={staggerContainer(0.05)}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={filter}
              variants={staggerContainer(0.04)}
              initial="hidden"
              animate="show"
              exit={{ opacity: 0, transition: { duration: 0.2, ease: "easeOut" } }}
              className="contents"
            >
              {filtered.map((skill) => (
                <motion.div
                  key={skill.name}
                  variants={fadeUp}
                  whileHover={{ y: -6 }}
                  className="group relative flex flex-col items-center gap-3 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] px-4 py-6 text-center transition-colors duration-300 hover:border-primary/50"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    style={{
                      background:
                        "radial-gradient(circle at 50% 0%, rgba(108,99,255,0.25), transparent 70%)",
                    }}
                  />
                  <span className="relative flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary transition-transform duration-300 group-hover:scale-110">
                    <Code2 size={20} />
                  </span>
                  <span className="relative text-xs font-medium text-white sm:text-sm">
                    {skill.name}
                  </span>
                  <span className="relative text-[10px] uppercase tracking-wider text-text-secondary">
                    {skill.category}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
