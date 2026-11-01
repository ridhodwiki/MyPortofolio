"use client";

import { motion } from "motion/react";
import { Download, Github, Linkedin, Mail } from "lucide-react";
import { useState, useEffect } from "react";

import InstagramIcon from "@/components/ui/InstagramIcon";
import LanyardCard from "@/components/ui/LanyardCard";
import { READY_EVENT } from "@/components/layout/WelcomeScreen";
import { profile } from "@/lib/data";
import { scrollToSection, EASE } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/i18n";

// Staggered entrance plays only after the welcome screen reports it is done,
// so both transitions never overlap.
const heroContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};
const heroItem = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE } },
};

export default function Hero() {
  const { locale } = useLanguage();
  const [entered, setEntered] = useState(false);

  useEffect(() => {
    if (document.documentElement.dataset.appReady === "true") {
      setEntered(true);
      return;
    }
    const onReady = () => setEntered(true);
    window.addEventListener(READY_EVENT, onReady);
    return () => window.removeEventListener(READY_EVENT, onReady);
  }, []);

  const entrance = entered ? "show" : "hidden";

  return (
    <section
      id="home"
      className="relative min-h-screen overflow-hidden lg:overflow-visible w-full"
      style={{ clipPath: 'none' }}
    >
      <div className="relative flex flex-col lg:grid lg:grid-cols-2 min-h-screen items-center gap-4 lg:gap-8 overflow-visible lg:overflow-hidden">
        {/* Text content - left side desktop, top/centered mobile; all buttons on every size */}
        <motion.div className="flex flex-col justify-center items-center text-center relative z-10 w-full px-4 pt-20 pb-4 lg:items-start lg:text-left lg:pl-16 lg:pr-0 lg:pt-0 lg:translate-x-16" variants={heroContainer} initial="hidden" animate={entrance}>
          <motion.div className="w-full max-w-xl" variants={heroContainer} initial="hidden" animate={entrance}>
            <motion.span variants={heroItem} className="eyebrow mb-5">
              {t(locale, "hero.welcome")}
            </motion.span>

            <motion.h1 variants={heroItem} className="text-4xl font-extrabold leading-[1.1] tracking-tight sm:text-5xl lg:text-6xl">
              {t(locale, "hero.title")}{" "}
              <span className="gradient-text">{profile.name}</span>
            </motion.h1>

            <motion.p variants={heroItem} className="mt-5 text-lg font-medium text-secondary sm:text-xl">
              {t(locale, "hero.role")}
            </motion.p>

            <motion.p variants={heroItem} className="mt-5 text-sm leading-relaxed sm:text-base" style={{ color: "var(--color-text)", opacity: 1 }}>
              {t(locale, "hero.description")}
            </motion.p>

            <motion.div variants={heroItem} className="mt-9 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            <motion.a
              href={profile.cvUrl}
              download
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="btn-primary"
            >
              <Download size={16} />
              {t(locale, "hero.downloadCV")}
            </motion.a>

            <motion.a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="btn-ghost"
            >
              <Github size={16} />
              {t(locale, "hero.github")}
            </motion.a>

            <motion.a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="btn-ghost"
            >
              <Linkedin size={16} />
              {t(locale, "hero.linkedin")}
            </motion.a>

            <motion.a
              href="https://instagram.com/ridho.dwikiii"
              target="_blank"
              rel="noreferrer"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="btn-ghost"
            >
              <InstagramIcon size={16} />
              {t(locale, "hero.instagram")}
            </motion.a>

            <motion.button
              type="button"
              onClick={() => scrollToSection("#contact")}
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.96 }}
              className="btn-ghost"
            >
              <Mail size={16} />
              {t(locale, "hero.contactMe")}
            </motion.button>
          </motion.div>
        </motion.div>
        </motion.div>

        {/* Canvas - right side desktop, below text mobile */}
        <div className="flex justify-center items-start lg:items-center w-full order-2 lg:order-2 overflow-visible">
          <LanyardCard />
        </div>
      </div>

    </section>
  );
}
