"use client";

import dynamic from "next/dynamic";
import { motion } from "motion/react";

const LanyardScene = dynamic(() => import("@/components/ui/LanyardScene"), {
  ssr: false,
});

export default function LanyardCard({ photoSrc = "/images/ridho.webp" }: { photoSrc?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="relative z-0 flex w-full items-center justify-center h-[420px] sm:h-[520px] md:h-[580px] lg:h-[640px] xl:h-[700px] hd:h-[750px] fhd:h-[850px] 2k:h-[1000px] 4k:h-[1400px]"
    >
      {/* Ambient glow behind the 3D scene */}
      <motion.div
        aria-hidden
        animate={{ opacity: [0.4, 0.75, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute inset-6 -z-10 rounded-[3rem] bg-[linear-gradient(135deg,rgba(108,99,255,0.3),rgba(0,229,255,0.2),rgba(255,77,157,0.2))] blur-3xl"
      />

      <LanyardScene photoSrc={photoSrc} />
    </motion.div>
  );
}
