"use client";

import { motion } from "framer-motion";
import {
  GraduationCap,
  MapPin,
  Sparkles,
  Code,
  Smartphone,
  BrainCircuit,
  Palette,
  Database,
  Cpu,
} from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import { profile } from "@/lib/data";
import { fadeUp, staggerContainer } from "@/lib/utils";

const interestIcons: Record<string, React.ElementType> = {
  "Software Development": Code,
  "Web Development": Code,
  "Mobile Development": Smartphone,
  "Artificial Intelligence": BrainCircuit,
  "UI/UX Design": Palette,
  "Database Management": Database,
  "Information Technology": Cpu,
};

export default function About() {
  return (
    <section id="about" className="section-padding relative">
      <div className="section-container">
        <SectionHeading
          eyebrow="Get to know me"
          title="About Me"
          description="Sedikit cerita tentang latar belakang dan minat saya di dunia teknologi."
        />

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-5 lg:gap-16">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer(0.12)}
            className="lg:col-span-3"
          >
            <motion.p
              variants={fadeUp}
              className="text-base leading-relaxed text-text-secondary sm:text-lg"
            >
              {profile.aboutDescription}
            </motion.p>

            <motion.div variants={fadeUp} className="mt-8 space-y-4">
              <div className="glass-card flex items-start gap-4 p-5">
                <div className="rounded-xl bg-primary/15 p-2.5 text-primary">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    {profile.university}
                  </p>
                  <p className="text-xs text-text-secondary">
                    Information Systems &middot; {profile.start}
                  </p>
                </div>
              </div>

              <div className="glass-card flex items-start gap-4 p-5">
                <div className="rounded-xl bg-secondary/15 p-2.5 text-secondary">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-white">
                    {profile.background}
                  </p>
                  <p className="text-xs text-text-secondary">{profile.major}</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer(0.08)}
            className="lg:col-span-2"
          >
            <motion.div variants={fadeUp} className="mb-4 flex items-center gap-2">
              <Sparkles size={16} className="text-accent" />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
                Interests
              </h3>
            </motion.div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {profile.interests.map((interest) => {
                const Icon = interestIcons[interest] ?? Code;
                return (
                  <motion.div
                    key={interest}
                    variants={fadeUp}
                    whileHover={{ y: -4, borderColor: "rgba(108,99,255,0.5)" }}
                    className="glass-card flex items-center gap-3 p-4"
                  >
                    <Icon size={18} className="shrink-0 text-primary" />
                    <span className="text-sm text-text-secondary">{interest}</span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
