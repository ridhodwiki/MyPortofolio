"use client";

import { useState, FormEvent } from "react";
import { motion } from "motion/react";
import { Mail, Github, Linkedin, Send, CheckCircle2, ArrowUpRight } from "lucide-react";
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
  const { locale } = useLanguage();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    const formData = new FormData(e.currentTarget);
    const data = {
      name: formData.get("visitor-fullname") as string,
      email: formData.get("visitor-emailaddr") as string,
      message: formData.get("message") as string,
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
        (e.target as HTMLFormElement).reset();
        setTimeout(() => setStatus("idle"), 2500);
      } else {
        setStatus("error");
        setErrorMessage("Gagal mengirim pesan. Coba lagi.");
        setTimeout(() => setStatus("idle"), 2500);
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage("Terjadi kesalahan. Coba lagi.");
      setTimeout(() => setStatus("idle"), 2500);
    }
  };

  const contactLinks = [
    { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { icon: Github, label: "GitHub", value: "@ridhodwiki", href: profile.github },
    { icon: Linkedin, label: "LinkedIn", value: "Ridho Dwiki Zakaria", href: profile.linkedin },
    { icon: InstagramIcon, label: "Instagram", value: "@ridho.dwikiii", href: "https://instagram.com/ridho.dwikiii" },
  ];

  const fields = [
    { id: "visitor-fullname", label: t(locale, "contact.nameLabel"), type: "text", placeholder: t(locale, "contact.namePlaceholder") },
    { id: "visitor-emailaddr", label: t(locale, "contact.emailLabel"), type: "email", placeholder: t(locale, "contact.emailPlaceholder") },
  ];

  return (
    <section id="contact" className="section-padding relative">
      <div className="section-container">
        <SectionHeading
          eyebrow="Let's connect"
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
            {contactLinks.map(({ icon: Icon, label, value, href }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                variants={fadeUp}
                className="group flex items-center justify-between gap-4 border-b border-line py-4"
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
                <ArrowUpRight
                  size={14}
                  aria-hidden
                  className="shrink-0 text-text-muted transition-colors group-hover:text-primary"
                />
              </motion.a>
            ))}
          </motion.div>

          <motion.form
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer(0.06)}
            onSubmit={handleSubmit}
            autoComplete="off"
            className="flex flex-col gap-5 rounded-2xl border border-line bg-surface p-5 shadow-[var(--shadow-card)] sm:p-7 lg:col-span-8"
          >
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
                    autoComplete="off"
                    data-lpignore="true"
                    data-1p-ignore="true"
                    placeholder={field.placeholder}
                    className="w-full rounded-lg border border-line bg-canvas px-3 py-2.5 text-sm text-text outline-none transition-colors placeholder:text-text-muted focus:border-primary"
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
                rows={5}
                placeholder={t(locale, "contact.messagePlaceholder")}
                className="w-full resize-none rounded-lg border border-line bg-canvas px-3 py-2.5 text-sm text-text outline-none transition-colors placeholder:text-text-muted focus:border-primary"
              />
            </motion.div>

            <motion.button
              variants={fadeUp}
              type="submit"
              disabled={status !== "idle"}
              className="btn-primary mt-1 w-full sm:w-fit disabled:opacity-70"
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
                    className="h-3.5 w-3.5 border border-current border-t-transparent"
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
              <motion.p variants={fadeUp} className="text-xs text-hue-rose">
                {errorMessage}
              </motion.p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
