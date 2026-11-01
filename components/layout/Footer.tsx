"use client";

import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { profile } from "@/lib/data";
import InstagramIcon from "@/components/ui/InstagramIcon";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/i18n";

export default function Footer() {
  const year = new Date().getFullYear();
  const { locale } = useLanguage();

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socials = [
    { icon: Github, href: profile.github, label: "GitHub" },
    { icon: Linkedin, href: profile.linkedin, label: "LinkedIn" },
    { icon: Mail, href: `mailto:${profile.email}`, label: "Email" },
    { icon: InstagramIcon, href: "https://instagram.com/ridho.dwikiii", label: "Instagram" },
  ];

  return (
    <footer className="border-t border-line">
      <div className="rainbow-rule w-full opacity-60" />
      <div className="section-container flex flex-col gap-5 py-8 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted">
          © {year} {profile.name} · {t(locale, "footer.copyright")}{" "}
          <span className="text-text-muted/70">{t(locale, "footer.build")}</span>
        </p>

        <div className="flex items-center gap-5">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noreferrer" : undefined}
              aria-label={label}
              className="text-text-secondary transition-colors hover:text-primary"
            >
              <Icon size={14} />
            </a>
          ))}
        </div>

        <button
          type="button"
          onClick={scrollTop}
          aria-label="Back to top"
          className="flex w-fit items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-text-muted transition-colors hover:text-primary"
        >
          <ArrowUp size={12} />
          top
        </button>
      </div>
    </footer>
  );
}
