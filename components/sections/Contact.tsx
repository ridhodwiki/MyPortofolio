"use client";

import { useState, FormEvent } from "react";
import { motion } from "motion/react";
import { Mail, Github, Linkedin, Send, CheckCircle2, ArrowUpRight, Copy, Check } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import InstagramIcon from "@/components/ui/InstagramIcon";
import { profile } from "@/lib/data";
import { fadeUp, staggerContainer } from "@/lib/utils";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/i18n";

type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [copied, setCopied] = useState(false);
  const { locale } = useLanguage();

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback if clipboard API is unavailable
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const formEl = e.currentTarget;
    const formData = new FormData(formEl);
    const data = {
      name: formData.get("visitor-fullname") as string,
      email: formData.get("visitor-emailaddr") as string,
      message: formData.get("message") as string,
      website: formData.get("website") as string,
    };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setStatus("success");
        formEl.reset();
        setTimeout(() => setStatus("idle"), 2500);
      } else {
        const payload = await response.json().catch(() => null);
        setStatus("error");
        setErrorMessage(payload?.error || t(locale, "contact.error"));
        setTimeout(() => setStatus("idle"), 3000);
      }
    } catch {
      setStatus("error");
      setErrorMessage(t(locale, "contact.error"));
      setTimeout(() => setStatus("idle"), 3000);
    }
  };

  const contactLinks = [
    { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}`, isEmail: true },
    { icon: Github, label: "GitHub", value: "@ridhodwiki", href: profile.github, isEmail: false },
    { icon: Linkedin, label: "LinkedIn", value: "Ridho Dwiki Zakaria", href: profile.linkedin, isEmail: false },
    { icon: InstagramIcon, label: "Instagram", value: "@ridho.dwikiii", href: "https://instagram.com/ridho.dwikiii", isEmail: false },
  ];

  const fields = [
    {
      id: "visitor-fullname",
      label: t(locale, "contact.nameLabel"),
      type: "text",
      autoComplete: "name",
      maxLength: 100,
      placeholder: t(locale, "contact.namePlaceholder"),
    },
    {
      id: "visitor-emailaddr",
      label: t(locale, "contact.emailLabel"),
      type: "email",
      autoComplete: "email",
      maxLength: 150,
      placeholder: t(locale, "contact.emailPlaceholder"),
    },
  ];

  return (
    <section id="contact" className="section-padding relative">
      <div className="section-container">
        <SectionHeading
          eyebrow={t(locale, "contact.eyebrow")}
          title={t(locale, "contact.title")}
          description={t(locale, "contact.description")}
          hue="blue"
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer(0.06)}
            className="border-t border-line lg:col-span-4"
          >
            {contactLinks.map(({ icon: Icon, label, value, href, isEmail }) => (
              <motion.div
                key={label}
                variants={fadeUp}
                className="flex items-center justify-between gap-2 border-b border-line py-4"
              >
                <a
                  href={href}
                  target={href.startsWith("http") ? "_blank" : undefined}
                  rel={href.startsWith("http") ? "noreferrer" : undefined}
                  className="group flex min-w-0 flex-1 items-center justify-between gap-3"
                >
                  <span className="min-w-0">
                    <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
                      <Icon size={12} />
                      {label}
                    </span>
                    <span className="mt-1 block truncate text-sm text-text-secondary transition-colors group-hover:text-primary">
                      {value}
                    </span>
                  </span>
                  {!isEmail && (
                    <ArrowUpRight
                      size={14}
                      aria-hidden
                      className="shrink-0 text-text-muted transition-colors group-hover:text-primary"
                    />
                  )}
                </a>

                {isEmail && (
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    aria-label={copied ? t(locale, "contact.copied") : t(locale, "contact.copyEmail")}
                    className="inline-flex min-h-9 shrink-0 items-center gap-1.5 rounded-lg border border-line bg-surface px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-wider text-text-secondary transition-colors hover:border-primary hover:text-primary"
                  >
                    {copied ? (
                      <>
                        <Check size={12} className="text-hue-emerald" />
                        <span className="text-hue-emerald">{t(locale, "contact.copied")}</span>
                      </>
                    ) : (
                      <>
                        <Copy size={12} />
                        <span>{t(locale, "contact.copyEmail")}</span>
                      </>
                    )}
                  </button>
                )}
              </motion.div>
            ))}
          </motion.div>

          <motion.form
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer(0.06)}
            onSubmit={handleSubmit}
            className="flex flex-col gap-5 rounded-2xl border border-line bg-surface p-5 shadow-[var(--shadow-card)] sm:p-7 lg:col-span-8"
          >
            {/* Honeypot anti-spam field */}
            <div className="sr-only" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {fields.map((field) => (
                <motion.div key={field.id} variants={fadeUp}>
                  <label
                    htmlFor={field.id}
                    className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted"
                  >
                    {field.label}
                  </label>
                  <input
                    id={field.id}
                    name={field.id}
                    type={field.type}
                    required
                    maxLength={field.maxLength}
                    autoComplete={field.autoComplete}
                    placeholder={field.placeholder}
                    className="w-full rounded-lg border border-line bg-canvas px-3 py-2.5 text-sm text-text transition-colors placeholder:text-text-muted focus:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
                  />
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeUp}>
              <label
                htmlFor="message"
                className="mb-1.5 block font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted"
              >
                {t(locale, "contact.messageLabel")}
              </label>
              <textarea
                id="message"
                name="message"
                required
                maxLength={2000}
                rows={5}
                placeholder={t(locale, "contact.messagePlaceholder")}
                className="w-full resize-none rounded-lg border border-line bg-canvas px-3 py-2.5 text-sm text-text transition-colors placeholder:text-text-muted focus:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50"
              />
            </motion.div>

            <motion.button
              variants={fadeUp}
              type="submit"
              disabled={status === "loading"}
              className="btn-primary mt-1 min-h-11 w-full sm:w-fit disabled:opacity-70"
            >
              {status === "idle" && (
                <>
                  <Send size={14} />
                  {t(locale, "contact.sendMessage")}
                </>
              )}
              {status === "loading" && (
                <>
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    className="h-3.5 w-3.5 rounded-full border border-current border-t-transparent"
                  />
                  {t(locale, "contact.sending")}
                </>
              )}
              {status === "success" && (
                <>
                  <CheckCircle2 size={14} />
                  {t(locale, "contact.messageSent")}
                </>
              )}
              {status === "error" && (
                <>
                  <Send size={14} />
                  {t(locale, "contact.tryAgain")}
                </>
              )}
            </motion.button>
            {status === "error" && (
              <motion.p role="alert" variants={fadeUp} className="text-xs text-hue-rose">
                {errorMessage}
              </motion.p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
