"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import { Briefcase, GraduationCap, Building2 } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { timeline } from "@/lib/data";
import { fadeUp } from "@/lib/utils";

const icons = {
  graduation: GraduationCap,
  briefcase: Briefcase,
  university: Building2,
};

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 60%"],
  });
  const lineHeight = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
  });

  return (
    <section id="journey" className="section-padding relative">
      <div className="section-container">
        <SectionHeading
          eyebrow="My path so far"
          title="Journey Timeline"
          description="Perjalanan pendidikan dan pengalaman kerja yang membentuk kemampuan saya saat ini."
        />

        <div ref={containerRef} className="relative mx-auto max-w-3xl">
          {/* Base line */}
          <div className="absolute left-5 top-0 h-full w-px bg-white/10 sm:left-1/2 sm:-translate-x-1/2" />
          {/* Animated progress line */}
          <motion.div
            style={{ scaleY: lineHeight }}
            className="absolute left-5 top-0 h-full w-px origin-top bg-[linear-gradient(180deg,#6C63FF,#00E5FF,#FF4D9D)] sm:left-1/2 sm:-translate-x-1/2"
          />

          <div className="flex flex-col gap-14">
            {timeline.map((item, index) => {
              const Icon = icons[item.icon];
              const isEven = index % 2 === 0;
              return (
                <motion.div
                  key={item.id}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.4 }}
                  variants={fadeUp}
                  className="relative flex flex-col gap-4 pl-14 sm:grid sm:grid-cols-2 sm:gap-10 sm:pl-0"
                >
                  <span
                    className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-surface text-primary shadow-glow sm:left-1/2 sm:-translate-x-1/2"
                  >
                    <Icon size={18} />
                  </span>

                  <div
                    className={`glass-card p-6 sm:mt-0 ${
                      isEven ? "sm:mr-8 sm:text-right" : "sm:order-2 sm:ml-8"
                    }`}
                  >
                    <span className="eyebrow !text-[10px]">
                      {item.period}
                      {item.duration ? ` · ${item.duration}` : ""}
                    </span>
                    <h3 className="mt-2 text-lg font-bold text-white">{item.title}</h3>
                    {item.org && (
                      <p className="mt-1 text-sm font-medium text-secondary">
                        {item.org}
                      </p>
                    )}
                    <p className="mt-3 text-sm leading-relaxed text-text-secondary">
                      {item.description}
                    </p>
                    <div
                      className={`mt-4 flex flex-wrap gap-2 ${
                        isEven ? "sm:justify-end" : ""
                      }`}
                    >
                      {item.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-[11px] text-text-secondary"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="hidden sm:block" aria-hidden />
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
