"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { navLinks } from "@/lib/data";
import { scrollToSection, cn } from "@/lib/utils";
import ThemeToggle from "@/components/layout/ThemeToggle";
import { useLanguage } from "@/context/LanguageContext";
import { t, type TranslationKey } from "@/lib/i18n";
import { READY_EVENT } from "@/components/layout/WelcomeScreen";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState("#home");
  const pathname = usePathname();
  const { locale, setLocale } = useLanguage();

  // Navbar stays hidden until the welcome screen reports ready; other routes
  // have no welcome screen, so they start visible.
  const [entered, setEntered] = useState(pathname !== "/");

  useEffect(() => {
    if (pathname !== "/") return;
    if (document.documentElement.dataset.appReady === "true") {
      setEntered(true);
      return;
    }
    const onReady = () => setEntered(true);
    window.addEventListener(READY_EVENT, onReady);
    return () => window.removeEventListener(READY_EVENT, onReady);
  }, [pathname]);

  const navLabels = navLinks.map((l) => ({
    ...l,
    label: t(locale, `nav.${l.href.replace("#", "")}` as TranslationKey),
  }));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (pathname !== "/") return;

    let observer: IntersectionObserver;
    let timeoutId: NodeJS.Timeout;

    const initObserver = () => {
      const sections = navLinks
        .map((l) => document.querySelector<HTMLElement>(l.href))
        .filter(Boolean) as HTMLElement[];

      if (sections.length === 0) {
        timeoutId = setTimeout(initObserver, 100);
        return;
      }

      // Fix for jumping/stuck hash navigation due to page transition animations
      if (window.location.hash) {
        const target = document.querySelector(window.location.hash);
        if (target) {
          target.scrollIntoView({ behavior: "smooth" });
        }
      }

      observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActive(`#${entry.target.id}`);
            }
          });
        },
        { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
      );

      sections.forEach((s) => observer.observe(s));
    };

    // Wait for the page transition to finish before selecting nodes,
    // to avoid attaching to dying elements.
    timeoutId = setTimeout(initObserver, 600);

    return () => {
      clearTimeout(timeoutId);
      if (observer) observer.disconnect();
    };
  }, [pathname]);

  const handleNavClick = useCallback((href: string) => {
    if (pathname !== "/") {
      window.location.href = `/${href}`;
      return;
    }
    setOpen(false);
    // Defer past the menu collapse: a scroll started in the same tick is
    // cancelled when the dropdown unmounts, leaving the page where it was.
    setTimeout(() => scrollToSection(href), 0);
  }, [pathname]);

  return (
    <motion.header
      initial={{ y: -32, opacity: 0 }}
      animate={entered ? { y: 0, opacity: 1 } : { y: -32, opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
        scrolled
          ? "border-line bg-canvas/85 shadow-[var(--shadow-card)] backdrop-blur-md"
          : "border-transparent bg-transparent"
      )}
    >
      <div className="section-container">
        <nav
          className="relative z-[60] flex h-16 items-center justify-between gap-4"
          aria-label="Primary"
        >
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#home");
            }}
            className="text-sm font-semibold tracking-tight"
          >
            <span className="gradient-text">Ridho</span>
            <span className="text-primary">_</span>
          </a>

          <ul className="hidden md:flex items-center">
            {navLabels.map((link) => {
              const isActive = active === link.href;
              return (
                <li key={link.href} className="relative">
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(link.href);
                    }}
                    className={cn(
                      "relative block px-3 py-2 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-200",
                      isActive ? "text-primary" : "text-text-secondary hover:text-text"
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-active-indicator"
                        className="absolute inset-x-3 bottom-0 h-px bg-primary"
                        transition={{ type: "spring", stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setLocale(locale === "id" ? "en" : "id")}
              aria-label={locale === "id" ? "Switch to English" : "Switch to Indonesian"}
              className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-surface font-mono text-[10px] font-semibold uppercase tracking-wider text-text-secondary transition-colors hover:border-primary hover:text-primary"
            >
              {locale === "id" ? "EN" : "ID"}
            </button>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-surface text-text-secondary transition-colors hover:border-primary hover:text-primary md:hidden"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
            >
              <AnimatePresence mode="wait" initial={false}>
                {open ? (
                  <motion.span
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <X size={18} />
                  </motion.span>
                ) : (
                  <motion.span
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.15 }}
                  >
                    <Menu size={18} />
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden md:hidden"
            >
              <ul className="mb-3 overflow-hidden rounded-xl border border-line bg-surface shadow-[var(--shadow-card)]">
                {navLabels.map((link) => (
                  <li
                    key={link.href}
                    className="border-b border-line last:border-b-0"
                  >
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(link.href);
                      }}
                      className={cn(
                        "flex items-center justify-between px-4 py-3 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors",
                        active === link.href
                          ? "text-primary"
                          : "text-text-secondary hover:text-text"
                      )}
                    >
                      {link.label}
                      <span aria-hidden className="text-text-muted">
                        /
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
}
