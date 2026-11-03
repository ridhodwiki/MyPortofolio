"use client";

import { useEffect, useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import {
  Search,
  ExternalLink,
  FolderGit2,
  FileText,
  Languages,
  Sun,
  Moon,
  Mail,
  Home,
  User,
  Wrench,
  Award,
  History,
  X,
} from "lucide-react";
import { profile, getProjects } from "@/lib/data";
import { useLanguage } from "@/context/LanguageContext";

interface CommandItem {
  id: string;
  category: "Navigation" | "Actions" | "Projects";
  title: string;
  subtitle?: string;
  icon: typeof Search;
  action: () => void;
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const { locale, setLocale } = useLanguage();
  const router = useRouter();

  // Listen for Ctrl+K / Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Lock body scroll when open
  useEffect(() => {
    if (!isOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  const toggleTheme = () => {
    const isDark = !document.documentElement.classList.contains("light");
    if (isDark) {
      document.documentElement.classList.add("light");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    }
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
  };

  const commands = useMemo<CommandItem[]>(() => {
    const navItems: CommandItem[] = [
      {
        id: "nav-home",
        category: "Navigation",
        title: locale === "id" ? "Beranda" : "Home",
        subtitle: "#home",
        icon: Home,
        action: () => router.push("/#home"),
      },
      {
        id: "nav-about",
        category: "Navigation",
        title: locale === "id" ? "Tentang Saya" : "About Me",
        subtitle: "#about",
        icon: User,
        action: () => router.push("/#about"),
      },
      {
        id: "nav-skills",
        category: "Navigation",
        title: "Skills & Technologies",
        subtitle: "#skills",
        icon: Wrench,
        action: () => router.push("/#skills"),
      },
      {
        id: "nav-projects",
        category: "Navigation",
        title: "Projects",
        subtitle: "#projects",
        icon: FolderGit2,
        action: () => router.push("/#projects"),
      },
      {
        id: "nav-journey",
        category: "Navigation",
        title: "Experience / Timeline",
        subtitle: "#journey",
        icon: History,
        action: () => router.push("/#journey"),
      },
      {
        id: "nav-cert",
        category: "Navigation",
        title: "Certificates",
        subtitle: "#certificates",
        icon: Award,
        action: () => router.push("/#certificates"),
      },
      {
        id: "nav-contact",
        category: "Navigation",
        title: locale === "id" ? "Kontak" : "Contact",
        subtitle: "#contact",
        icon: Mail,
        action: () => router.push("/#contact"),
      },
    ];

    const actionItems: CommandItem[] = [
      {
        id: "act-lang",
        category: "Actions",
        title: locale === "id" ? "Ganti Bahasa ke English" : "Switch Language to Bahasa",
        subtitle: locale === "id" ? "Toggle ID -> EN" : "Toggle EN -> ID",
        icon: Languages,
        action: () => setLocale(locale === "id" ? "en" : "id"),
      },
      {
        id: "act-theme",
        category: "Actions",
        title: locale === "id" ? "Ganti Tema (Gelap / Terang)" : "Toggle Theme (Dark / Light)",
        icon: Sun,
        action: toggleTheme,
      },
      {
        id: "act-cv",
        category: "Actions",
        title: "Download CV (PDF)",
        subtitle: "Ridho-Dwiki-Zakaria-CV.pdf",
        icon: FileText,
        action: () => window.open(profile.cvUrl, "_blank"),
      },
      {
        id: "act-copy-email",
        category: "Actions",
        title: locale === "id" ? "Salin Alamat Email" : "Copy Email Address",
        subtitle: profile.email,
        icon: Mail,
        action: copyEmail,
      },
    ];

    const projectItems: CommandItem[] = getProjects(locale).map((p) => ({
      id: `proj-${p.slug}`,
      category: "Projects",
      title: p.name,
      subtitle: p.category,
      icon: ExternalLink,
      action: () => {
        if (p.detail) {
          router.push(`/projects/${p.slug}`);
        } else if (p.externalLink) {
          window.open(p.externalLink, "_blank");
        }
      },
    }));

    return [...navItems, ...actionItems, ...projectItems];
  }, [locale, router, setLocale]);

  const filteredCommands = useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return commands;
    return commands.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.subtitle?.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
    );
  }, [query, commands]);

  return (
    <>
      {/* Listen globally for custom events from navbar trigger button */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[120] flex items-start justify-center bg-canvas/80 p-4 pt-16 sm:pt-24 backdrop-blur-sm"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -16 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="glass-card w-full max-w-lg overflow-hidden p-0 shadow-2xl"
            >
              {/* Search input header */}
              <div className="relative flex items-center border-b border-line px-4">
                <Search size={16} className="text-text-muted" />
                <input
                  type="text"
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder={
                    locale === "id"
                      ? "Ketik perintah, seksi, atau proyek..."
                      : "Type a command, section, or project..."
                  }
                  className="h-12 w-full bg-transparent px-3 text-sm text-text placeholder:text-text-muted focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="rounded p-1 text-text-muted hover:text-text"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Command lists grouped by category */}
              <div className="max-h-80 overflow-y-auto p-2">
                {filteredCommands.length > 0 ? (
                  filteredCommands.map((item) => {
                    const Icon = item.icon;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => {
                          item.action();
                          setIsOpen(false);
                        }}
                        className="group flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition-colors hover:bg-surface hover:text-primary"
                      >
                        <div className="flex items-center gap-3">
                          <Icon size={16} className="text-text-muted group-hover:text-primary" />
                          <span className="font-medium text-text group-hover:text-primary">
                            {item.title}
                          </span>
                        </div>
                        {item.subtitle && (
                          <span className="font-mono text-[10px] text-text-muted">
                            {item.subtitle}
                          </span>
                        )}
                      </button>
                    );
                  })
                ) : (
                  <p className="p-4 text-center text-xs text-text-muted">
                    {locale === "id"
                      ? "Tidak ada perintah yang cocok."
                      : "No matching commands found."}
                  </p>
                )}
              </div>

              {/* Modal footer shortcut badge */}
              <div className="flex items-center justify-between border-t border-line bg-surface/50 px-4 py-2 font-mono text-[10px] text-text-muted">
                <span>Navigation & Actions</span>
                <span className="flex items-center gap-1">
                  <kbd className="rounded border border-line bg-canvas px-1.5 py-0.5">ESC</kbd> to close
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
