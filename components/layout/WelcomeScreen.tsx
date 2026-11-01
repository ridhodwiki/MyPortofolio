"use client";

import { motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/i18n";

export const READY_EVENT = "portfolio:ready";

const COUNT_MS = 1600;
const HOLD_MS = 250;
const EXIT_MS = 700;

export default function WelcomeScreen() {
  const { locale } = useLanguage();
  const [count, setCount] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [visible, setVisible] = useState(true);
  const announced = useRef(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const unlock = () => {
      document.body.style.overflow = previousOverflow;
    };

    const announceReady = () => {
      if (announced.current) return;
      announced.current = true;
      document.documentElement.dataset.appReady = "true";
      window.dispatchEvent(new Event(READY_EVENT));
    };

    if (prefersReduced) {
      // No counter, no exit animation: reveal the page on the first paint.
      setVisible(false);
      announceReady();
      unlock();
      return unlock;
    }

    const started = performance.now();
    const tick = window.setInterval(() => {
      const progress = Math.min(
        Math.floor(((performance.now() - started) / COUNT_MS) * 95),
        95
      );
      setCount(progress);
    }, 50);

    let hold: number | undefined;
    let hide: number | undefined;
    const finish = window.setTimeout(() => {
      window.clearInterval(tick);
      setCount(100);
      hold = window.setTimeout(() => {
        announceReady();
        unlock();
        setLeaving(true);
        hide = window.setTimeout(() => setVisible(false), EXIT_MS);
      }, HOLD_MS);
    }, COUNT_MS);

    return () => {
      window.clearInterval(tick);
      window.clearTimeout(finish);
      if (hold) window.clearTimeout(hold);
      if (hide) window.clearTimeout(hide);
      unlock();
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[300] grid place-items-center bg-canvas transition-transform duration-[700ms] ease-[cubic-bezier(0.83,0,0.17,1)] motion-reduce:transition-none ${
        leaving ? "pointer-events-none -translate-y-full" : "translate-y-0"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.65, ease: [0.2, 0.75, 0.25, 1] }}
        className="flex w-[min(320px,70vw)] flex-col items-center gap-6"
      >
        <span
          role="status"
          aria-live="polite"
          aria-label={`${t(locale, "welcome.loading")} ${count}%`}
          className="text-[clamp(4rem,14vw,9rem)] font-extrabold leading-[0.9] tracking-[-0.075em] tabular-nums text-text"
        >
          {count}
          <span className="ml-[0.08em] text-[0.42em] font-medium tracking-[-0.04em] text-primary">
            %
          </span>
        </span>

        <div className="h-[2px] w-full overflow-hidden bg-line" aria-hidden="true">
          <span
            className="block h-full origin-left bg-primary transition-transform duration-100 ease-linear"
            style={{ transform: `scaleX(${count / 100})` }}
          />
        </div>

        <span className="text-xs tracking-wide text-text-muted">
          {t(locale, "welcome.loading")}...
        </span>
      </motion.div>
    </div>
  );
}
