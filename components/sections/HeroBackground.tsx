"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "motion/react";

const PARTICLE_COUNT = 90;
const METEOR_INTERVAL = 2200;

function useThemeLight() {
  const [light, setLight] = useState(false);
  useEffect(() => {
    const update = () => setLight(document.documentElement.classList.contains("light"));
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    const mql = window.matchMedia("(prefers-color-scheme: light)");
    mql.addEventListener?.("change", update);
    return () => {
      observer.disconnect();
      mql.removeEventListener?.("change", update);
    };
  }, []);
  return light;
}

function useParticles() {
  return useMemo(() => {
    const next = (seed: number) => {
      const x = Math.sin(seed * 12.9898 + 78.233) * 43758.5453;
      return x - Math.floor(x);
    };
    return Array.from({ length: PARTICLE_COUNT }).map((_, i) => {
      const s = i + 1;
      const x = next(s * 1.13) * 100;
      const y = next(s * 3.77) * 100;
      const r = next(s * 6.21) * 1.6 + 0.4;
      const duration = next(s * 9.43) * 14 + 12;
      const delay = next(s * 2.15) * 10;
      const drift = next(s * 5.61) * 40 - 20;
      return { x, y, r, duration, delay, drift };
    });
  }, []);
}

export default function HeroBackground({ pause = false }: { pause?: boolean }) {
  const reducedMotion = useReducedMotion();
  const light = useThemeLight();
  const particles = useParticles();
  const [meteors, setMeteors] = useState<{ id: number; left: number; delay: number; duration: number }[]>([]);
  const id = useRef(0);
  const [paused, setPaused] = useState(pause);

  const anim = reducedMotion || paused;

  const particleColor = light ? "rgba(52,64,84,0.22)" : "rgba(203,213,235,0.28)";
  const meteorColor = light ? "rgba(48,86,211,0.22)" : "rgba(169,190,255,0.28)";
  const glowColor = light ? "rgba(48,86,211,0.10)" : "rgba(108,140,255,0.12)";

  useEffect(() => {
    if (anim) return;
    const visible = () => !document.hidden;
    let alive = true;
    const tick = () => {
      if (!alive || !visible()) return;
      setMeteors((prev) => {
        const next = [
          ...prev.slice(-1),
          {
            id: ++id.current,
            left: Math.random() * 110 - 10,
            delay: 0,
            duration: Math.random() * 1.2 + 1.4,
          },
        ];
        return next;
      });
    };
    const interval = setInterval(tick, METEOR_INTERVAL);
    return () => {
      alive = false;
      clearInterval(interval);
    };
  }, [anim]);

  useEffect(() => {
    const handler = () => {
      if (document.hidden) setMeteors([]);
    };
    document.addEventListener("visibilitychange", handler);
    return () => document.removeEventListener("visibilitychange", handler);
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="absolute inset-0">
        {particles.map((p, i) => (
          <motion.span
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.r,
              height: p.r,
              backgroundColor: particleColor,
              boxShadow: `0 0 ${p.r * 3}px ${particleColor}`,
            }}
            animate={
              anim
                ? {}
                : {
                    x: [0, p.drift, 0],
                    y: [0, -p.drift * 0.6, 0],
                    opacity: [0.2, 0.9, 0.2],
                  }
            }
            transition={
              anim
                ? {}
                : {
                    duration: p.duration,
                    repeat: Infinity,
                    delay: p.delay,
                    ease: "linear",
                  }
            }
          />
        ))}
      </div>

      {!anim &&
        meteors.map((m) => (
          <motion.span
            key={m.id}
            className="absolute h-px"
            style={{
              left: `${m.left}%`,
              top: "-10%",
              width: 90,
              background: `linear-gradient(90deg, ${meteorColor}, transparent)`,
              boxShadow: `0 0 12px ${meteorColor}`,
              rotate: -18,
            }}
            initial={{ x: 0, y: 0, opacity: 0 }}
            animate={{ x: 180, y: 140, opacity: [0, 0.9, 0] }}
            transition={{
              duration: m.duration,
              ease: "easeOut",
            }}
          />
        ))}

      <motion.div
        className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: `radial-gradient(circle, ${glowColor}, transparent 70%)` }}
        animate={anim ? {} : { opacity: [0.35, 0.7, 0.35], scale: [0.95, 1.05, 0.95] }}
        transition={anim ? {} : { duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <button
        type="button"
        onClick={() => setPaused((p) => !p)}
        className="absolute bottom-4 right-4 pointer-events-auto rounded-full border border-line bg-surface/80 px-3 py-1 text-xs text-text backdrop-blur"
        aria-label={paused ? "Resume background animation" : "Pause background animation"}
      >
        {paused ? "▶" : "⏸"}
      </button>
    </div>
  );
}
