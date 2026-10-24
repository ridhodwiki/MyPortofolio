# Ridho Dwiki Zakaria — Portofolio

Portfolio pribadi modern, premium, dan responsive dibangun dengan Next.js 14 (App Router), React, TypeScript, Tailwind CSS, dan Framer Motion.

## ✨ Fitur

- Single Page Portfolio: Hero, About, Skills, Projects, Journey Timeline, Certificates, Contact
- Halaman detail project dinamis: `/projects/[slug]`
- Interactive 3D Profile Card (mouse tilt di desktop, touch gesture di mobile)
- Animasi menyeluruh dengan Framer Motion (fade, slide, scale, stagger, scroll reveal, parallax progress line)
- Sticky navbar dengan active-section indicator & smooth scroll
- Dark, glassmorphism design system (`#050816` / `#6C63FF` / `#00E5FF` / `#FF4D9D`)
- SEO: metadata, Open Graph, `sitemap.xml`, `robots.txt`
- Aksesibilitas: skip-to-content link, visible focus ring, `prefers-reduced-motion` dihormati
- Custom cursor ringan (nonaktif otomatis di touch device / reduced motion)
- Loading screen, page transition, scroll progress bar
- Custom 404 page
- Form contact dengan email otomatis via Resend

## 🧰 Tech Stack

- Framework: Next.js 14.2.35 (App Router)
- UI: React 18.3.1, Tailwind CSS 3.4.14, Framer Motion 11.11.9
- 3D: Three.js 0.165, @react-three/fiber, @react-three/drei, @react-three/rapier
- Icon: lucide-react
- Email: Resend
- Type safety: TypeScript 5.6.3

## 🚀 Menjalankan Secara Lokal

Prasyarat: Node.js 18.18+ (disarankan 20+).

```bash
npm install
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000).

## 🔐 Environment Variables

Buat file `.env.local` di root project:

```env
RESEND_API_KEY=re_xxxxxxxxxxxxxxxx
```

Dapatkan API key di dashboard Resend → **API Keys** → Create API Key.

Variabel ini **tidak di-commit ke GitHub** (tercantum di `.gitignore`). Jika deploy ke Vercel, tambahkan `RESEND_API_KEY` di **Settings → Environment Variables** di dashboard Vercel.

## 📦 Build untuk Production

```bash
npm run build
npm run start
```

## 🌐 Deploy ke Vercel

1. Push repository ke GitHub.
2. Import project di Vercel.
3. Vercel otomatis mendeteksi Next.js dan men-deploy.
4. Tambahkan `RESEND_API_KEY` di **Settings → Environment Variables**.
5. Redeploy.

## 🛠️ Yang Perlu Diganti Sebelum Publish

| Item | Lokasi |
|---|---|
| File CV asli (PDF) | `public/cv/` — ganti dengan CV milikmu |
| Link GitHub, LinkedIn, email asli | `lib/data.ts` → object `profile` |
| Link repo & demo tiap project | `lib/data.ts` → array `projects` |
| Thumbnail & screenshot project | `public/images/projects/` |
| Gambar sertifikat asli | `public/images/certificates/` |
| Domain untuk SEO (`metadataBase`, sitemap, robots) | `app/layout.tsx`, `app/sitemap.ts`, `app/robots.ts` |
| API key Resend untuk form contact | `.env.local` → `RESEND_API_KEY` (diatur via dashboard Vercel saat deploy) |

## 📁 Struktur Folder

```
app/
  layout.tsx          → root layout, SEO metadata, font, global chrome
  page.tsx             → halaman utama (menyusun semua section)
  globals.css          → design tokens & utility classes
  projects/[slug]/     → halaman detail project
  sitemap.ts, robots.ts
  api/contact/route.ts → form contact, kirim email via Resend

components/
  layout/              → Navbar, Footer, ScrollProgress, CustomCursor, LoadingScreen, PageTransition
  sections/             → Hero, About, Skills, Projects, Timeline, Certificates, Contact, ProjectDetailView
  ui/                  → SectionHeading, ProjectCard, CertificateModal, LanyardScene, LanyardCard, InstagramIcon

lib/
  data.ts              → seluruh konten (profile, skills, projects, timeline, certificates)
  types.ts             → TypeScript interfaces
  utils.ts             → helper & shared Framer Motion variants
```

## 🎨 Design Tokens

| Token | Value |
|---|---|
| Background | `#050816` |
| Primary | `#6C63FF` |
| Secondary | `#00E5FF` |
| Accent | `#FF4D9D` |
| Text | `#FFFFFF` |
| Text Secondary | `#B5B5B5` |
| Font | Inter (loaded via Google Fonts CDN) |

Semua token ada di `tailwind.config.ts` dan `app/globals.css`.

## 🙏 Credits

Base template dari:

- **Davin Yoga Ardiyansyah** — [github.com/DexVanScientia/Portofolio](https://github.com/DexVanScientia/Portofolio)

Template ini diadaptasi dan dipersonalisasi menjadi portfolio milik Ridho Dwiki Zakaria.

## 📬 Kontak

- Email: ridhodwiki768@gmail.com
- GitHub: [github.com/ridhodwiki](https://github.com/ridhodwiki)
- LinkedIn: [linkedin.com/in/ridho-dwikii-650777391](https://www.linkedin.com/in/ridho-dwikii-650777391)
