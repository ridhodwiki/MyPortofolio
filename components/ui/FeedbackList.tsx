"use client";

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import { MessageSquare, Quote, AlertCircle } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/i18n";
import { fadeUp, staggerContainer } from "@/lib/utils";

type FeedbackItem = {
  id: string;
  name: string;
  message: string;
  createdAt: string;
};

type LoadState = "loading" | "ready" | "error";

const SKELETON_ROWS = [0, 1, 2];

export default function FeedbackList({ refreshKey = 0 }: { refreshKey?: number }) {
  const [items, setItems] = useState<FeedbackItem[]>([]);
  const [state, setState] = useState<LoadState>("loading");
  const { locale } = useLanguage();

  useEffect(() => {
    let cancelled = false;

    fetch("/api/feedback", { cache: "no-store" })
      .then((res) => {
        if (!res.ok) throw new Error("request failed");
        return res.json();
      })
      .then((payload) => {
        if (cancelled) return;
        setItems(Array.isArray(payload?.items) ? payload.items : []);
        setState("ready");
      })
      .catch(() => {
        if (!cancelled) setState("error");
      });

    return () => {
      cancelled = true;
    };
  }, [refreshKey]);

  const dateFormat = new Intl.DateTimeFormat(locale === "id" ? "id-ID" : "en-US", {
    dateStyle: "medium",
  });

  return (
    <section aria-labelledby="feedback-heading" className="mt-2 flex flex-col gap-5">
      <div className="flex items-center gap-3">
        <h3
          id="feedback-heading"
          className="font-mono text-[10px] uppercase tracking-[0.2em] text-text-muted"
        >
          {t(locale, "contact.feedbackTitle")}
        </h3>
        <span
          aria-hidden
          className="h-px flex-1 bg-gradient-to-r from-line via-line/60 to-transparent"
        />
        {state === "ready" && (
          <span className="rounded-full border border-line bg-surface px-2 py-0.5 font-mono text-[10px] tabular-nums text-text-secondary">
            {items.length}
          </span>
        )}
      </div>

      {state === "loading" && (
        <div className="flex flex-col gap-3" aria-busy="true" aria-live="polite">
          {SKELETON_ROWS.map((row) => (
            <div
              key={row}
              className="h-[106px] animate-pulse rounded-2xl border border-line bg-surface/50"
            />
          ))}
        </div>
      )}

      {state === "error" && (
        <div
          role="status"
          className="flex items-center gap-2.5 rounded-xl border border-hue-rose/30 bg-hue-rose/5 px-4 py-3"
        >
          <AlertCircle size={15} aria-hidden className="shrink-0 text-hue-rose" />
          <p className="text-xs text-hue-rose">{t(locale, "contact.feedbackError")}</p>
        </div>
      )}

      {state === "ready" && items.length === 0 && (
        <div className="relative overflow-hidden rounded-2xl border border-dashed border-line bg-surface/40 px-6 py-9 text-center">
          <span
            aria-hidden
            className="mx-auto flex h-11 w-11 items-center justify-center rounded-full border border-line bg-canvas text-text-muted"
          >
            <MessageSquare size={17} />
          </span>
          <p className="mt-3 text-sm text-text-secondary">
            {t(locale, "contact.feedbackEmpty")}
          </p>
        </div>
      )}

      {state === "ready" && items.length > 0 && (
        <motion.ul
          key={refreshKey}
          initial="hidden"
          animate="show"
          variants={staggerContainer(0.07)}
          className="flex flex-col gap-3"
        >
          {items.map((item) => {
            const initial = item.name.trim().charAt(0).toUpperCase() || "?";

            return (
              <motion.li
                key={item.id}
                variants={fadeUp}
                className="group relative overflow-hidden rounded-2xl border border-line bg-surface shadow-card transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-lift"
              >
                <span
                  aria-hidden
                  className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/70 to-transparent opacity-50 transition-opacity duration-300 group-hover:opacity-100"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute -right-12 -top-16 h-36 w-36 rounded-full bg-primary/15 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                />
                <Quote
                  aria-hidden
                  className="pointer-events-none absolute -bottom-3 right-3 hidden h-16 w-16 text-primary/[0.07] transition-colors duration-300 group-hover:text-primary/[0.12] sm:block"
                />

                <div className="relative flex gap-3.5 p-4 sm:p-5">
                  <span
                    aria-hidden
                    className="h-10 w-10 shrink-0 rounded-full bg-gradient-to-br from-primary/80 via-primary/25 to-accent/70 p-px"
                  >
                    <span className="flex h-full w-full items-center justify-center rounded-full bg-canvas text-[13px] font-semibold text-primary">
                      {initial}
                    </span>
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                      <p className="truncate text-sm font-semibold tracking-tight text-text">
                        {item.name}
                      </p>
                      <time
                        dateTime={item.createdAt}
                        className="font-mono text-[10px] uppercase tracking-[0.14em] tabular-nums text-text-muted"
                      >
                        {dateFormat.format(new Date(item.createdAt))}
                      </time>
                    </div>
                    <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-relaxed text-text-secondary">
                      {item.message}
                    </p>
                  </div>
                </div>
              </motion.li>
            );
          })}
        </motion.ul>
      )}
    </section>
  );
}
