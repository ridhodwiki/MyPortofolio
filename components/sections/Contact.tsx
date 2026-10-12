"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Send, CheckCircle2 } from "lucide-react";
import SectionHeading from "@/components/ui/SectionHeading";
import InstagramIcon from "@/components/ui/InstagramIcon";
import { profile } from "@/lib/data";
import { fadeUp, staggerContainer } from "@/lib/utils";

type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [focused, setFocused] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>("");

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
    { id: "visitor-fullname", label: "Name", type: "text", placeholder: "Nama lengkap kamu" },
    { id: "visitor-emailaddr", label: "Email", type: "email", placeholder: "email@contoh.com" },
  ];

  return (
    <section id="contact" className="section-padding relative">
      <div className="section-container">
        <SectionHeading
          eyebrow="Let's connect"
          title="Contact Me"
          description="Punya project, pertanyaan, atau ingin berkolaborasi? Jangan ragu untuk menghubungi saya."
        />

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-5 lg:gap-16">
          <motion.div
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.3 }}
            variants={staggerContainer(0.12)}
            className="flex flex-col gap-4 lg:col-span-2"
          >
            {contactLinks.map(({ icon: Icon, label, value, href }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noreferrer" : undefined}
                variants={fadeUp}
                whileHover={{ y: -4, x: 2 }}
                className="glass-card flex items-center gap-4 p-5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <Icon size={18} />
                </span>
                <span>
                  <span className="block text-xs text-text-secondary">{label}</span>
                  <span className="block text-sm font-medium text-white">{value}</span>
                </span>
              </motion.a>
            ))}
          </motion.div>

          <motion.form
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            variants={staggerContainer(0.1)}
            onSubmit={handleSubmit}
            autoComplete="off"
            className="glass-card flex flex-col gap-5 p-6 sm:p-8 lg:col-span-3"
          >
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              {fields.map((field) => (
                <motion.div key={field.id} variants={fadeUp} className="relative">
                  <label
                    htmlFor={field.id}
                    className="mb-2 block text-xs font-medium text-text-secondary"
                  >
                    {field.label}
                  </label>
                  <motion.input
                    id={field.id}
                    name={field.id}
                    type={field.type}
                    required
                    autoComplete="off"
                    data-lpignore="true"
                    data-1p-ignore="true"
                    placeholder={field.placeholder}
                    onFocus={() => setFocused(field.id)}
                    onBlur={() => setFocused(null)}
                    animate={{
                      borderColor:
                        focused === field.id
                          ? "rgba(108,99,255,0.7)"
                          : "rgba(255,255,255,0.1)",
                      boxShadow:
                        focused === field.id
                          ? "0 0 0 4px rgba(108,99,255,0.15)"
                          : "0 0 0 0px rgba(108,99,255,0)",
                    }}
                    transition={{ duration: 0.25 }}
                    className="w-full rounded-xl border bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-text-secondary/50"
                  />
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeUp} className="relative">
              <label
                htmlFor="message"
                className="mb-2 block text-xs font-medium text-text-secondary"
              >
                Message
              </label>
              <motion.textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="Ceritakan tentang project atau pesanmu..."
                onFocus={() => setFocused("message")}
                onBlur={() => setFocused(null)}
                animate={{
                  borderColor:
                    focused === "message"
                      ? "rgba(108,99,255,0.7)"
                      : "rgba(255,255,255,0.1)",
                  boxShadow:
                    focused === "message"
                      ? "0 0 0 4px rgba(108,99,255,0.15)"
                      : "0 0 0 0px rgba(108,99,255,0)",
                }}
                transition={{ duration: 0.25 }}
                className="w-full resize-none rounded-xl border bg-white/[0.03] px-4 py-3 text-sm text-white outline-none placeholder:text-text-secondary/50"
              />
            </motion.div>

            <motion.button
              variants={fadeUp}
              type="submit"
              disabled={status !== "idle"}
              whileHover={{ scale: status === "idle" ? 1.02 : 1 }}
              whileTap={{ scale: status === "idle" ? 0.97 : 1 }}
              className="btn-primary mt-2 w-full sm:w-fit"
            >
              {status === "idle" && (
                <>
                  <Send size={16} />
                  Send Message
                </>
              )}
              {status === "loading" && (
                <>
                  <motion.span
                    animate={{ rotate: 360 }}
                    transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                    className="h-4 w-4 rounded-full border-2 border-white/30 border-t-white"
                  />
                  Sending...
                </>
              )}
              {status === "success" && (
                <>
                  <CheckCircle2 size={16} />
                  Message Sent
                </>
              )}
              {status === "error" && (
                <>
                  <Send size={16} />
                  Try Again
                </>
              )}
            </motion.button>
            {status === "error" && (
              <motion.p
                variants={fadeUp}
                className="text-sm text-red-400/80"
              >
                {errorMessage}
              </motion.p>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
