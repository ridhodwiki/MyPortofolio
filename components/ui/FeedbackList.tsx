"use client";

import { useEffect, useState } from "react";
import { MessageSquare } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/i18n";

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
    <section aria-labelledby="feedback-heading" className="flex flex-col gap-4">
      <div className="flex items-baseline justify-between gap-3">
        <h3
          id="feedback-heading"
          className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted"
        >
          {t(locale, "contact.feedbackTitle")}
        </h3>
        {state === "ready" && items.length > 0 && (
          <span className="font-mono text-[10px] tracking-[0.14em] text-text-muted/70">
            {items.length}
          </span>
        )}
      </div>

      {state === "loading" && (
        <div className="flex flex-col gap-3" aria-busy="true" aria-live="polite">
          {SKELETON_ROWS.map((row) => (
            <div key={row} className="h-[86px] animate-pulse rounded-xl border border-line bg-surface/60" />
          ))}
        </div>
      )}

      {state === "error" && (
        <p role="status" className="text-xs text-hue-rose">
          {t(locale, "contact.feedbackError")}
        </p>
      )}

      {state === "ready" && items.length === 0 && (
        <div className="flex flex-col items-center gap-2 rounded-xl border border-dashed border-line px-5 py-8 text-center">
          <MessageSquare size={16} aria-hidden className="text-text-muted" />
          <p className="text-sm text-text-secondary">{t(locale, "contact.feedbackEmpty")}</p>
        </div>
      )}

      {state === "ready" && items.length > 0 && (
        <ul className="flex flex-col gap-3">
          {items.map((item) => {
            const initial = item.name.trim().charAt(0).toUpperCase() || "?";

            return (
              <li
                key={item.id}
                className="flex gap-3 rounded-xl border border-line bg-surface p-4 transition-colors hover:border-primary/40"
              >
                <span
                  aria-hidden
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary/15 font-mono text-xs font-semibold text-primary"
                >
                  {initial}
                </span>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                    <p className="truncate text-sm font-semibold text-text">{item.name}</p>
                    <time
                      dateTime={item.createdAt}
                      className="font-mono text-[10px] uppercase tracking-[0.14em] text-text-muted"
                    >
                      {dateFormat.format(new Date(item.createdAt))}
                    </time>
                  </div>
                  <p className="mt-1.5 whitespace-pre-wrap break-words text-sm leading-relaxed text-text-secondary">
                    {item.message}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
