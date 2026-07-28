import { Certificate, Project, Skill, TimelineItem } from "./types";

export const profile = {
  name: "Davin Yoga Ardiyansyah",
  title: "Information Systems Student",
  university: "Universitas Islam Negeri Sunan Ampel Surabaya",
  universityShort: "UINSA Surabaya",
  start: "2026 - Present",
  background: "SMK Rajasa Surabaya",
  major: "Teknik Komputer dan Jaringan",
  email: "davinyoga.prv@gmail.com",
  github: "https://github.com/DexVanScientia",
  linkedin: "https://www.linkedin.com/in/davin-yoga-ardiyansyah-ab40b7416/",
  cvUrl: "/cv/Davin-Yoga-Ardiyansyah-CV.pdf",
  heroDescription:
    "Mahasiswa Sistem Informasi Universitas Islam Negeri Sunan Ampel Surabaya dengan latar belakang Teknik Komputer dan Jaringan yang memiliki minat dalam pengembangan aplikasi, artificial intelligence, web development, dan teknologi digital.",
  aboutDescription:
    "Saya adalah mahasiswa Sistem Informasi Universitas Islam Negeri Sunan Ampel Surabaya dengan latar belakang Teknik Komputer dan Jaringan. Saya memiliki ketertarikan dalam membangun aplikasi digital, mengeksplorasi AI, dan menciptakan solusi teknologi dengan pengalaman pengguna yang baik.",
  interests: [
    "Software Development",
    "Web Development",
    "Mobile Development",
    "Artificial Intelligence",
    "UI/UX Design",
    "Database Management",
    "Information Technology",
  ],
};

export const skills: Skill[] = [
  // Programming
  { name: "JavaScript", category: "Programming" },
  { name: "TypeScript", category: "Programming" },
  { name: "PHP", category: "Programming" },
  { name: "Python", category: "Programming" },
  { name: "Dart", category: "Programming" },
  // Frontend
  { name: "HTML", category: "Frontend" },
  { name: "CSS", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "React", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  // Mobile
  { name: "Flutter", category: "Mobile" },
  // Backend
  { name: "Node.js", category: "Backend" },
  { name: "Express", category: "Backend" },
  // Database
  { name: "MySQL", category: "Database" },
  { name: "Supabase", category: "Database" },
  { name: "Firebase", category: "Database" },
  // Tools
  { name: "Git", category: "Tools" },
  { name: "GitHub", category: "Tools" },
  { name: "VS Code", category: "Tools" },
  { name: "Figma", category: "Tools" },
  { name: "XAMPP", category: "Tools" },
  { name: "Wokwi", category: "Tools" },
  // AI
  { name: "Artificial Intelligence Basic", category: "AI" },
  { name: "Prompt Engineering", category: "AI" },
];

export const skillCategories = [
  "Programming",
  "Frontend",
  "Mobile",
  "Backend",
  "Database",
  "Tools",
  "AI",
] as const;

export const projects: Project[] = [
  {
    slug: "dvapps",
    name: "DvApps",
    description:
      "Aplikasi produktivitas berbasis Flutter yang menggabungkan AI Chat, Notes, Checklist, Finance Tracker, Wishlist, Reminder, Authentication, Cloud Storage, Backup Restore, dan Dark Mode.",
    category: "Mobile Application",
    tech: ["Flutter", "Supabase", "AI API"],
    github: "https://github.com/davinyoga/dvapps",
    demo: undefined,
    thumbnail: "/images/2.png",
    detail: {
      overview:
        "DvApps adalah aplikasi produktivitas all-in-one yang dirancang untuk membantu penggunanya mengatur catatan, keuangan, checklist, dan pengingat dalam satu platform mobile yang terintegrasi dengan AI.",
      problem:
        "Pengguna sering harus berpindah-pindah antar aplikasi terpisah untuk mencatat, mengelola keuangan, dan mengingat tugas, sehingga produktivitas menjadi tidak efisien dan data tersebar di banyak tempat.",
      solution:
        "Membangun satu aplikasi Flutter terpadu dengan modul Notes, Checklist, Finance Tracker, Wishlist, dan Reminder yang didukung AI Chat sebagai asisten produktivitas, serta sinkronisasi cloud melalui Supabase.",
      features: [
        "AI Chat Assistant untuk membantu produktivitas harian",
        "Notes dengan rich text dan pengelompokan kategori",
        "Checklist dan task management",
        "Finance Tracker untuk pemasukan dan pengeluaran",
        "Wishlist dan target keuangan",
        "Reminder dengan notifikasi terjadwal",
        "Authentication yang aman dengan Supabase Auth",
        "Cloud Storage untuk sinkronisasi data lintas perangkat",
        "Backup & Restore data pengguna",
        "Dark Mode untuk kenyamanan visual",
      ],
      stack: ["Flutter", "Dart", "Supabase", "PostgreSQL", "AI API"],
      process: [
        "Riset kebutuhan dan studi kompetitor aplikasi produktivitas",
        "Wireframing dan UI/UX design menggunakan Figma",
        "Implementasi arsitektur aplikasi dengan Flutter dan state management",
        "Integrasi Supabase untuk auth, database, dan storage",
        "Integrasi AI API untuk fitur chat assistant",
        "Testing, refinement, dan optimasi performa",
      ],
      challenges: [
        "Menyatukan banyak modul berbeda tanpa membuat aplikasi terasa berat",
        "Mendesain sinkronisasi data yang konsisten antara mode online dan offline",
        "Mengoptimalkan respons AI Chat agar tetap cepat dan relevan",
      ],
      gallery: [
        "/images/3.png",
        "/images/4.png",
        "/images/5.png",
      ],
      result:
        "DvApps berhasil menyatukan lima kebutuhan produktivitas utama dalam satu aplikasi dengan pengalaman pengguna yang konsisten dan sinkronisasi data yang andal di cloud.",
    },
  },
  {
    slug: "luminar-bot",
    name: "Luminar Bot",
    description:
      "WhatsApp automation bot menggunakan Node.js dan whatsapp-web.js untuk menjalankan fitur otomatisasi pesan dan interaksi.",
    category: "Automation / Backend",
    tech: ["Node.js", "Express", "whatsapp-web.js"],
    github: "https://github.com/davinyoga/luminar-bot",
    demo: undefined,
    thumbnail: "/images/6.png",
    detail: {
      overview:
        "Luminar Bot adalah automation bot WhatsApp yang membantu mengotomatisasi balasan pesan, perintah interaktif, dan alur komunikasi tanpa perlu operator manual.",
      problem:
        "Pengelolaan pesan WhatsApp secara manual memakan waktu, terutama untuk pertanyaan berulang atau perintah rutin yang seharusnya bisa direspons secara otomatis.",
      solution:
        "Mengembangkan bot berbasis Node.js dan whatsapp-web.js yang mampu mendeteksi perintah, memproses logika bisnis di sisi server, dan membalas pesan secara otomatis dan konsisten.",
      features: [
        "Sistem command handler yang modular",
        "Auto-reply untuk pesan masuk",
        "Session management multi-perangkat",
        "Logging aktivitas dan riwayat interaksi",
        "Integrasi dengan REST API menggunakan Express",
      ],
      stack: ["Node.js", "Express", "whatsapp-web.js", "JavaScript"],
      process: [
        "Analisis kebutuhan otomatisasi pesan",
        "Setup whatsapp-web.js dengan session persistence",
        "Membangun command handler dan routing pesan",
        "Integrasi Express untuk API tambahan",
        "Testing pada skenario penggunaan nyata",
      ],
      challenges: [
        "Menjaga stabilitas koneksi WhatsApp Web dalam jangka panjang",
        "Mendesain command handler yang mudah dikembangkan",
        "Menangani rate limiting agar akun tidak terindikasi spam",
      ],
      gallery: [
        "/images/7.png",
        "/images/8.png",
        "/images/9.png",
      ],
      result:
        "Luminar Bot berhasil mengotomatisasi respons pesan secara stabil, mengurangi beban operasional, dan menyediakan interaksi yang lebih cepat kepada pengguna.",
    },
  },
  {
    slug: "esp32-smart-mascot",
    name: "ESP32 Smart Mascot",
    description:
      "Project IoT berupa maskot digital menggunakan ESP32 dengan OLED SSD1306, sensor suhu, sensor cahaya, LCD, dan animasi ekspresi wajah.",
    category: "Internet of Things",
    tech: ["ESP32", "Arduino", "OLED SSD1306", "DHT Sensor", "LCD"],
    github: "https://github.com/davinyoga/esp32-smart-mascot",
    demo: undefined,
    thumbnail: "/images/10.png",
    detail: {
      overview:
        "ESP32 Smart Mascot adalah maskot digital interaktif yang menampilkan ekspresi wajah animasi di layar OLED sekaligus memantau kondisi lingkungan sekitar seperti suhu dan cahaya.",
      problem:
        "Perangkat IoT edukatif sering terasa kaku dan kurang menarik secara visual, sehingga sulit digunakan sebagai media pembelajaran interaktif tentang sensor dan mikrokontroler.",
      solution:
        "Merancang maskot digital berbasis ESP32 yang menampilkan animasi ekspresi wajah di OLED SSD1306 yang bereaksi terhadap data sensor suhu dan cahaya secara real-time, dilengkapi tampilan tambahan di LCD.",
      features: [
        "Animasi ekspresi wajah dinamis di OLED SSD1306",
        "Monitoring suhu secara real-time dengan sensor DHT",
        "Deteksi kondisi cahaya sekitar",
        "Tampilan data pendukung di LCD",
        "Reaksi ekspresi otomatis berdasarkan kondisi lingkungan",
      ],
      stack: ["ESP32", "Arduino IDE", "C++", "OLED SSD1306", "DHT Sensor", "LCD I2C"],
      process: [
        "Perancangan skematik rangkaian dan pemilihan komponen",
        "Simulasi awal menggunakan Wokwi",
        "Pemrograman ESP32 untuk membaca data sensor",
        "Pembuatan aset animasi wajah untuk OLED",
        "Perakitan hardware dan pengujian akhir",
      ],
      challenges: [
        "Mengoptimalkan memori ESP32 untuk animasi wajah yang halus",
        "Sinkronisasi pembacaan sensor dengan refresh rate layar",
        "Merancang ekspresi yang natural dari data sensor sederhana",
      ],
      gallery: [
        "/images/11.png",
        "/images/12.png",
        "/images/13.png",
      ],
      result:
        "ESP32 Smart Mascot berhasil menghadirkan perangkat IoT yang interaktif dan ekspresif, menjadikan pembelajaran sensor dan mikrokontroler lebih menarik.",
    },
  },
];

export const timeline: TimelineItem[] = [
  {
    id: "smk-rajasa",
    icon: "graduation",
    period: "2023 - 2026",
    title: "Teknik Komputer dan Jaringan",
    org: "SMK Rajasa Surabaya",
    description:
      "Mempelajari jaringan komputer, server, troubleshooting, pemrograman, database, dan teknologi IT.",
    skills: ["Networking", "MikroTik", "Linux", "Server Management", "Web Development"],
  },
  {
    id: "btn-internship",
    icon: "briefcase",
    period: "July 2025 - September 2025",
    duration: "3 Months",
    title: "Credit Administration Intern",
    org: "Bank Tabungan Negara (BTN) — Record Center Surabaya",
    description:
      "Melaksanakan internship selama 3 bulan dengan tugas verifikasi dokumen kredit, digital archiving, pengecekan data, stock opname, dan administrasi menggunakan Microsoft Excel.",
    skills: [
      "Microsoft Excel",
      "Document Management",
      "Data Validation",
      "Administration",
    ],
  },
  {
    id: "uinsa",
    icon: "university",
    period: "2026 - Present",
    title: "Information Systems Student",
    org: "Universitas Islam Negeri Sunan Ampel Surabaya",
    description:
      "Mahasiswa Sistem Informasi dengan fokus software development, AI, web development, mobile application, dan teknologi informasi.",
    skills: ["Software Development", "AI", "Database", "UI/UX Design"],
  },
];

export const certificates: Certificate[] = [
  {
    id: "cert-1",
    name: "Start Writing Prompts like a Pro",
    institution: "Google",
    year: "2026",
    description:
      "Menyelesaikan kursus untuk memahami dan menulis prompt yang efektif pada berbagai model AI.",
    skills: ["Prompt Engineering", "Artificial Intelligence Basic"],
    image: "/images/14.png",
  },
  {
    id: "cert-2",
    name: "AI Foundations",
    institution: "OpenAI Academy",
    year: "2026",
    description:
      "Mempelajari dasar-dasar kecerdasan buatan dan kapabilitas dari model AI.",
    skills: ["Artificial Intelligence Basic", "AI"],
    image: "/images/15.png",
  },
  {
    id: "cert-3",
    name: "Belajar Dasar AI",
    institution: "Dicoding",
    year: "2025",
    description:
      "Memahami konsep dasar kecerdasan buatan, machine learning, dan penerapannya di berbagai industri.",
    skills: ["Artificial Intelligence Basic", "AI"],
    image: "/images/16.png",
  },
  {
    id: "cert-4",
    name: "Introduction to Artificial Intelligence (AI)",
    institution: "IBM",
    year: "2026",
    description:
      "Mempelajari pengantar kecerdasan buatan, sejarah, dan konsep fundamental AI.",
    skills: ["Artificial Intelligence Basic", "AI"],
    image: "/images/17.png",
  },
  {
    id: "cert-5",
    name: "AI Fluency for students",
    institution: "Anthropic",
    year: "2026",
    description: "Mengembangkan pemahaman dan kefasihan dalam menggunakan teknologi AI untuk pendidikan.",
    skills: ["Artificial Intelligence Basic", "AI"],
    image: "/images/18.png",
  },
  {
    id: "cert-6",
    name: "HTML: How to Build a Website",
    institution: "University of London",
    year: "2026",
    description: "Mempelajari cara membuat, menyusun, dan mengembangkan struktur halaman web menggunakan HTML.",
    skills: ["HTML", "Web Development"],
    image: "/images/19.png",
  },
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#journey" },
  { label: "Certificates", href: "#certificates" },
  { label: "Contact", href: "#contact" },
];
