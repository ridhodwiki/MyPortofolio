# Ridho Dwiki Zakaria — Portofolio

Portfolio pribadi modern, premium, dan responsive dibangun dengan Next.js 14 (App Router), React, TypeScript, Tailwind CSS, dan Framer Motion.

## ✨ Fitur

- Single Page Portfolio: Hero, About, Skills, Projects, Journey Timeline, Certificates, Contact
- Halaman detail project dinamis: `/projects/[slug]`
- Interactive 3D Profile Card (mouse tilt di desktop, touch gesture di mobile)
- Animasi menyeluruh dengan Framer Motion (fade, slide, scale, stagger, scroll reveal, parallax progress line)
- Sticky navbar dengan active-section indicator & smooth scroll
- Dark, glassmorphism design system sesuai brief (`#050816` / `#6C63FF` / `#00E5FF` / `#FF4D9D`)
- SEO: metadata, Open Graph, `sitemap.xml`, `robots.txt`
- Aksesibilitas: skip-to-content link, visible focus ring, `prefers-reduced-motion` dihormati
- Custom cursor ringan (nonaktif otomatis di touch device / reduced motion)
- Loading screen, page transition, scroll progress bar
- Custom 404 page

## 🚀 Menjalankan secara lokal

Prasyarat: Node.js 18.18+ (disarankan 20+).

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

## 📦 Build untuk production

```bash
npm run build
npm run start
```

## 🌐 Deploy

Project ini sudah "deploy-ready" untuk [Vercel](https://vercel.com):

1. Push repository ini ke GitHub.
2. Import project di Vercel.
3. Vercel akan otomatis mendeteksi Next.js dan men-deploy tanpa konfigurasi tambahan.

## 🛠️ Yang perlu kamu ganti sebelum publish

| Item | Lokasi |
|---|---|
| File CV asli (PDF) | `public/cv/` — ganti dengan file bernama `Davin-Yoga-Ardiyansyah-CV.pdf` |
| Link GitHub, LinkedIn, email asli | `lib/data.ts` → object `profile` |
| Link repo & demo tiap project | `lib/data.ts` → array `projects` |
| Thumbnail & screenshot project (saat ini placeholder SVG) | `public/images/projects/` |
| Gambar sertifikat asli (saat ini placeholder SVG) | `public/images/certificates/` |
| Domain untuk SEO (`metadataBase`, sitemap, robots) | `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts` |
| API key Resend untuk form contact | `.env.local` → `RESEND_API_KEY` (sudah terhubung via `app/api/contact/route.ts`) |

## 📁 Struktur folder

```
app/
  layout.tsx          → root layout, SEO metadata, font, global chrome
  page.tsx             → halaman utama (menyusun semua section)
  globals.css          → design tokens & utility classes
  projects/[slug]/     → halaman detail project
  sitemap.ts, robots.ts

components/
  layout/              → Navbar, Footer, ScrollProgress, CustomCursor, LoadingScreen, PageTransition
  sections/             → Hero, About, Skills, Projects, Timeline, Certificates, Contact, ProjectDetailView
  ui/                  → SectionHeading, ProfileCard3D, ProjectCard, CertificateModal

lib/
  data.ts              → seluruh konten (profile, skills, projects, timeline, certificates)
  types.ts             → TypeScript interfaces
  utils.ts             → helper & shared Framer Motion variants
```

## 🎨 Design tokens

| Token | Value |
|---|---|
| Background | `#050816` |
| Primary | `#6C63FF` |
| Secondary | `#00E5FF` |
| Accent | `#FF4D9D` |
| Text | `#FFFFFF` |
| Text Secondary | `#B5B5B5` |
| Font | Inter (loaded via Google Fonts CDN) |

Semua token ada di `tailwind.config.ts` dan `app/globals.css`, jadi mudah untuk disesuaikan lebih lanjut.
