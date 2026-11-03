import { Certificate, Project, Skill, TimelineItem } from "./types";
import type { Locale } from "./i18n";

export const profile = {
  name: "Ridho Dwiki Zakaria",
  title: "Teknik Informatika",
  university: "Universitas PGRI Semarang",
  universityShort: "UPGRIS",
  start: "2024 - Present",
  background: "SMA Muhammadiyah 2 Pemalang",
  major: "Matematika dan IPA",
  email: "ridhodwiki768@gmail.com",
  github: "https://github.com/ridhodwiki",
  linkedin: "https://www.linkedin.com/in/ridho-dwikii-650777391",
  cvUrl: "/cv/Ridho-Dwiki-Zakaria-CV.pdf",
  heroDescription:
    "Mahasiswa Teknik Informatika Universitas PGRI Semarang dengan latar belakang Matematika dan IPA yang memiliki minat dalam pengembangan aplikasi, artificial intelligence, web development, dan teknologi digital.",
  aboutDescription:
    "Saya adalah mahasiswa Universitas PGRI Semarang Program Studi Teknik Informatika Fakultas Teknik dan Informatika. Saya memiliki minat besar dalam dunia teknologi informasi, terutama di bidang pemrograman dan pengembangan sistem. Saya senang mengeksplorasi hal baru yang berkaitan dengan desain antarmuka, sistem digital, dan teknologi kreatif.",
  interests: [
    "Software Development",
    "Web Development",
    "Mobile Development",
    "Artificial Intelligence",
    "UI/UX Design",
    "Information Technology",
  ],
};

export function getInterests(locale: Locale = "id"): string[] {
  if (locale === "en") {
    return [
      "Software Development",
      "Web Engineering",
      "Mobile Applications",
      "Artificial Intelligence",
      "UI/UX Interface Design",
      "Information Systems",
    ];
  }
  return profile.interests;
}

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
  // Database
  { name: "MySQL", category: "Database" },
  { name: "Supabase", category: "Database" },
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

export const projectCategories = [
  "Mobile Application",
  "Web Application",
  "Internet of Things",
] as const;

export const projects: Project[] = [
  {
    slug: "moticket",
    name: "MoTicket",
    description:
      "Perancangan antarmuka dan prototipe interaktif aplikasi pemesanan tiket bioskop modern bergaya futuristik menggunakan Figma.",
    category: "Mobile Application",
    tech: ["Figma", "UI/UX Design", "Mobile App Design", "Prototyping"],
    github: undefined,
    demo: undefined,
    externalLink:
      "https://www.figma.com/proto/5b8Q3Uku1GMl7RAPbLx7ke/MoTicket?node-id=97-698&starting-point-node-id=97%3A698&t=AvPDGfG5LWHc4wmU-1",
    thumbnail: "/images/iPhone 16.webp",
    detail: {
      overview:
        "MoTicket adalah prototipe aplikasi mobile pemesanan tiket bioskop dan hiburan yang dirancang di Figma dengan fokus pada kemudahan pemilihan kursi, eksplorasi jadwal tayang, dan pengalaman checkout yang ringkas.",
      problem:
        "Banyak aplikasi pemesanan tiket memiliki alur pemilihan jadwal dan kursi yang padat serta membingungkan di layar ponsel, sehingga pengguna membutuhkan waktu lebih lama saat memesan tiket.",
      solution:
        "Merancang antarmuka mobile berkonsep dark-futuristic dengan hierarki visual yang jelas, peta kursi interaktif yang mudah dipindai, serta alur pembayaran hingga e-ticket dalam langkah minimal.",
      features: [
        "Eksplorasi film yang sedang tayang dan akan datang dengan filter genre",
        "Pemilihan lokasi bioskop, tanggal, dan jam tayang secara instan",
        "Visualisasi denah kursi bioskop interaktif dengan indikator ketersediaan jelas",
        "Ringkasan pesanan dan metode pembayaran digital terintegrasi",
        "Tampilan e-ticket digital lengkap dengan kode QR untuk pemindaian cepat",
      ],
      stack: ["Figma", "Interactive Prototyping", "Design System", "Auto Layout", "Mobile UI/UX"],
      process: [
        "Riset alur pengguna aplikasi tiket bioskop populer dan identifikasi titik friksi",
        "Penyusunan user flow dari eksplorasi film hingga penerbitan e-ticket",
        "Pembuatan wireframe dan sistem token warna serta tipografi di Figma",
        "Perancangan komponen high-fidelity untuk halaman utama, detail film, dan kursi",
        "Pengujian prototipe interaktif dengan transisi antar-layar di Figma",
      ],
      challenges: [
        "Menyajikan denah kursi berkapasitas besar agar tetap nyaman dipilih di layar mobile",
        "Menjaga kontras teks dan status kursi di atas tema gelap bernuansa neon",
        "Menyederhanakan informasi tiket agar semua detail penting terbaca dalam satu layar",
      ],
      gallery: ["/images/iPhone 16.webp"],
      result:
        "Menghasilkan prototipe aplikasi MoTicket yang interaktif dan siap diuji, memotong langkah pemesanan tiket menjadi lebih intuitif dan nyaman digunakan di perangkat mobile.",
    },
  },
  {
    slug: "pt-yellowroll",
    name: "PT YellowRoll Website",
    description:
      "Pengembangan website profil usaha UMKM PT YellowRoll yang menyajikan informasi produk piscok premium, galeri, dan fitur pemesanan interaktif.",
    category: "Web Application",
    tech: ["HTML5", "CSS3", "JavaScript", "Vercel"],
    github: undefined,
    demo: "https://24670007uasdesainweb.vercel.app/index.html",
    externalLink: "https://24670007uasdesainweb.vercel.app/index.html",
    thumbnail: "/images/Yellowroll.webp",
    detail: {
      overview:
        "PT YellowRoll Website adalah situs profil dan katalog digital untuk usaha kuliner UMKM piscok (pisang cokelat) premium yang membantu pelanggan mengenal varian rasa, melihat galeri produk, dan melakukan pemesanan secara langsung.",
      problem:
        "Pelaku UMKM kuliner sering kali hanya mengandalkan media sosial tanpa halaman katalog terpusat, sehingga calon pembeli kesulitan melihat daftar varian lengkap, harga, dan cara pemesanan yang terstruktur.",
      solution:
        "Membangun website profil usaha yang cepat, responsif, dan menggugah selera menggunakan HTML5, CSS3, dan JavaScript, dilengkapi katalog produk interaktif serta integrasi alur pemesanan.",
      features: [
        "Halaman utama dengan identitas visual brand kuliner YellowRoll yang hangat",
        "Katalog varian produk piscok premium beserta deskripsi rasa dan harga",
        "Galeri foto produk yang responsif untuk perangkat mobile maupun desktop",
        "Formulir dan alur pemesanan interaktif yang memudahkan pelanggan",
        "Informasi profil usaha, lokasi, dan kontak yang mudah dijangkau",
      ],
      stack: ["HTML5", "CSS3", "JavaScript", "Responsive Web Design", "Vercel"],
      process: [
        "Pengumpulan informasi produk, identitas visual, dan kebutuhan katalog UMKM",
        "Perancangan struktur halaman (Hero, Tentang Kami, Katalog Produk, Galeri, Kontak)",
        "Implementasi layout responsif menggunakan semantic HTML5 dan CSS3 modern",
        "Penambahan interaksi katalog dan validasi pemesanan dengan JavaScript",
        "Deployment ke Vercel dan pengujian tampilan lintas perangkat",
      ],
      challenges: [
        "Menata foto dan kartu produk agar tetap ringan dimuat di koneksi mobile",
        "Membuat tata letak katalog yang tetap rapi di berbagai ukuran layar tanpa framework berat",
        "Menyusun alur CTA pemesanan yang jelas bagi pengunjung baru",
      ],
      gallery: ["/images/Yellowroll.webp"],
      result:
        "Website PT YellowRoll berhasil dipublikasikan secara online dan memberikan kehadiran digital profesional bagi UMKM untuk menampilkan produk serta menerima pesanan pelanggan.",
    },
  },
  {
    slug: "esp32-smart-mascot",
    name: "ESP32 Smart Mascot",
    description:
      "Project IoT berupa maskot digital menggunakan ESP32 dengan OLED SSD1306, sensor suhu, sensor cahaya, LCD, dan animasi ekspresi wajah.",
    category: "Internet of Things",
    tech: ["ESP32", "Arduino", "OLED SSD1306", "DHT Sensor", "LCD"],
    github: "https://github.com/ridhodwiki/esp32-smart-mascot",
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

const projectsEn: Project[] = [
  {
    ...projects[0],
    description:
      "Modern, futuristic cinema ticket booking mobile interface and interactive prototype designed in Figma.",
    detail: {
      overview:
        "MoTicket is a mobile cinema and entertainment ticket booking prototype designed in Figma, focusing on effortless seat selection, showtime discovery, and a streamlined checkout flow.",
      problem:
        "Many ticket booking apps suffer from cluttered showtime and seat-selection screens on mobile devices, slowing users down when booking seats.",
      solution:
        "Designed a dark-futuristic mobile interface with clear visual hierarchy, an easy-to-scan interactive seat map, and a minimal-step payment to e-ticket flow.",
      features: [
        "Now showing and upcoming movie discovery with genre filtering",
        "Instant cinema location, date, and showtime selection",
        "Interactive theater seat map with clear availability states",
        "Integrated order summary and digital payment selection",
        "Digital e-ticket screen with a scannable QR code",
      ],
      stack: ["Figma", "Interactive Prototyping", "Design System", "Auto Layout", "Mobile UI/UX"],
      process: [
        "Researched popular cinema booking flows and identified key friction points",
        "Mapped user flows from movie discovery to e-ticket generation",
        "Built wireframes alongside color and typography tokens in Figma",
        "Crafted high-fidelity components for home, movie details, and seat selection",
        "Validated interactive screen transitions in Figma prototype mode",
      ],
      challenges: [
        "Presenting a high-capacity theater seat map that stays easy to tap on mobile screens",
        "Maintaining strong text and seat-state contrast over a neon-accented dark theme",
        "Condensing ticket metadata so all essential details fit cleanly in one view",
      ],
      gallery: ["/images/iPhone 16.webp"],
      result:
        "Delivered an interactive, test-ready MoTicket prototype that streamlines mobile ticket booking into an intuitive experience.",
    },
  },
  {
    ...projects[1],
    description:
      "Company profile and interactive product ordering website for PT YellowRoll, a premium banana-chocolate culinary SME.",
    detail: {
      overview:
        "PT YellowRoll Website is a digital company profile and product catalog for a premium banana-chocolate (piscok) culinary SME, enabling customers to explore flavors, browse the gallery, and place orders directly.",
      problem:
        "Local culinary SMEs often rely solely on social media feeds without a centralized catalog, making it hard for buyers to compare flavors, check pricing, and order smoothly.",
      solution:
        "Built a fast, responsive, and appetizing web presence using HTML5, CSS3, and JavaScript, complete with an interactive product catalog and ordering workflow.",
      features: [
        "Brand-aligned hero and landing experience for YellowRoll",
        "Premium product catalog with flavor descriptions and pricing",
        "Responsive product photo gallery optimized for mobile and desktop",
        "Interactive customer ordering flow",
        "Accessible business profile, location, and contact details",
      ],
      stack: ["HTML5", "CSS3", "JavaScript", "Responsive Web Design", "Vercel"],
      process: [
        "Collected product catalog data, brand assets, and business requirements",
        "Structured page architecture (Hero, About, Product Catalog, Gallery, Contact)",
        "Implemented responsive layouts using semantic HTML5 and modern CSS3",
        "Added interactive catalog behaviors and form validation in JavaScript",
        "Deployed to Vercel and verified responsiveness across viewports",
      ],
      challenges: [
        "Optimizing product imagery for fast loading on mobile networks",
        "Building a flexible catalog grid across screen sizes without heavy frameworks",
        "Designing a clear ordering CTA path for first-time visitors",
      ],
      gallery: ["/images/Yellowroll.webp"],
      result:
        "Successfully launched PT YellowRoll's online presence, giving the SME a professional showcase to attract and convert customers.",
    },
  },
  {
    ...projects[2],
    description:
      "IoT digital mascot built on ESP32 featuring an SSD1306 OLED face display, temperature and light sensors, and an auxiliary LCD.",
    detail: {
      overview:
        "ESP32 Smart Mascot is an interactive digital desktop mascot that renders animated facial expressions on an OLED screen while monitoring ambient temperature and light in real time.",
      problem:
        "Educational IoT kits often feel rigid and visually plain, making it harder to engage students when demonstrating microcontroller and sensor concepts.",
      solution:
        "Engineered an ESP32-powered mascot that displays real-time animated facial expressions on an SSD1306 OLED reacting to DHT temperature and light sensor readings, paired with live telemetry on an I2C LCD.",
      features: [
        "Dynamic facial expression animations on an SSD1306 OLED display",
        "Real-time ambient temperature monitoring via DHT sensor",
        "Ambient light level detection",
        "Live sensor telemetry readout on an auxiliary I2C LCD",
        "Automatic emotional reactions triggered by environmental changes",
      ],
      stack: ["ESP32", "Arduino IDE", "C++", "OLED SSD1306", "DHT Sensor", "LCD I2C"],
      process: [
        "Designed circuit schematics and selected hardware components",
        "Prototyped and simulated the circuit in Wokwi",
        "Programmed ESP32 firmware in C++ to poll sensors reliably",
        "Created custom bitmap facial animation frames for the OLED screen",
        "Assembled physical hardware and calibrated sensor thresholds",
      ],
      challenges: [
        "Optimizing ESP32 memory usage for smooth OLED frame animations",
        "Synchronizing sensor polling intervals with display refresh rates",
        "Mapping simple sensor thresholds to natural-feeling mascot expressions",
      ],
      gallery: [
        "/images/11.png",
        "/images/12.png",
        "/images/13.png",
      ],
      result:
        "ESP32 Smart Mascot delivered an expressive, interactive hardware showcase that makes learning sensors and microcontrollers engaging.",
    },
  },
];

export const timeline: TimelineItem[] = [
  {
    id: "sma-muhammadiyah",
    icon: "graduation",
    period: "2021 - 2024",
    title: "Matematika dan IPA",
    org: "SMA Muhammadiyah 2 Pemalang",
    description:
      "Menempuh pendidikan SMA jurusan Matematika dan IPA, membangun fondasi kuat di bidang sains dan logika yang menjadi dasar minat di dunia teknologi dan informatika.",
    skills: ["Matematika", "Fisika", "Kimia", "Biologi", "Logika"],
  },
  {
    id: "UPGRIS",
    icon: "university",
    period: "2024 - Present",
    title: "Informatics Engineering Student",
    org: "Universitas PGRI Semarang",
    description:
      "Mahasiswa Teknik Informatika dengan fokus software development, AI, web development, mobile application, dan teknologi informasi.",
    skills: ["Software Development", "AI", "Database", "UI/UX Design"],
  },
];

const timelineEn: TimelineItem[] = [
  {
    id: "sma-muhammadiyah",
    icon: "graduation",
    period: "2021 - 2024",
    title: "Mathematics and Natural Sciences",
    org: "SMA Muhammadiyah 2 Pemalang",
    description:
      "Completed high school majoring in Mathematics and Natural Sciences, building a strong analytical and logical foundation for computer science and engineering.",
    skills: ["Mathematics", "Physics", "Chemistry", "Biology", "Logic"],
  },
  {
    id: "UPGRIS",
    icon: "university",
    period: "2024 - Present",
    title: "Informatics Engineering Student",
    org: "Universitas PGRI Semarang",
    description:
      "Undergraduate Informatics Engineering student focusing on software development, artificial intelligence, web and mobile applications, and information technology.",
    skills: ["Software Development", "AI", "Database", "UI/UX Design"],
  },
];

export const certificates: Certificate[] = [
  {
    id: "cert-1",
    name: "Creative Mobile Design: Menguasai UI/UX Modern dengan Figma",
    institution: "Himpunan Mahasiswa Informatika Universitas PGRI Semarang",
    year: "2024",
    description:
      "Menyelesaikan pelatihan UI/UX untuk merancang desain aplikasi mobile modern menggunakan aplikasi Figma.",
    skills: ["UI/UX Design", "Figma", "Mobile App Design", "User Interface", "User Experience"],
    image: "/images/14.webp",
  },
  {
    id: "cert-2",
    name: "Laravel For Beginners: Developing Backend From The Basic",
    institution: "Himpunan Mahasiswa Informatika Universitas PGRI Semarang",
    year: "2024",
    description:
      "Menyelesaikan pelatihan pemrograman backend menggunakan framework Laravel tingkat dasar.",
    skills: ["Laravel", "PHP", "Backend Development", "MVC", "Web Development"],
    image: "/images/Ridho Dwiki.webp",
  },
  {
    id: "cert-3",
    name: "Next-Gen Web Engineering: Build Smart Company Profile with AI Workflow",
    institution: "Himpunan Mahasiswa Informatika Universitas PGRI Semarang",
    year: "2026",
    description:
      "Menyelesaikan pelatihan pengembangan web untuk membangun website company profile interaktif dengan integrasi workflow AI.",
    skills: ["Web Development", "UI/UX Design", "Frontend Development", "Backend Development", "AI Integration"],
    image: "/images/Sertifikat Ridho Dwiki Zakaria-1.webp",
  },
  {
    id: "cert-4",
    name: "Event Online - Cyber Security",
    institution: "Dibimbing.id",
    year: "2026",
    description:
      "Berpartisipasi aktif dalam sesi webinar online yang membahas konsep dasar dan prinsip utama Cyber Security.",
    skills: ["Cyber Security", "Information Security", "Network Security"],
    image: "/images/Ridho Dwiki Zakaria - Dibimbing Sertifikat.webp",
  },
  {
    id: "cert-5",
    name: "Maximize Productivity With AI Tools",
    institution: "Google (via Coursera)",
    year: "2026",
    description:
      "Menyelesaikan kursus untuk memaksimalkan produktivitas kerja dengan memanfaatkan berbagai tools berbasis kecerdasan buatan.",
    skills: ["Artificial Intelligence", "AI Tools", "Productivity", "Generative AI"],
    image: "/images/Coursera 4SNADBCYIIBH.webp",
  },
  {
    id: "cert-6",
    name: "Introduction to AI",
    institution: "Google (via Coursera)",
    year: "2026",
    description:
      "Menyelesaikan kursus untuk memahami konsep dasar kecerdasan buatan, penerapannya, serta prinsip kerja AI modern.",
    skills: ["Artificial Intelligence", "Machine Learning Fundamentals", "AI Applications"],
    image: "/images/Coursera SFUW524KVQWO.webp",
  },
  {
    id: "cert-7",
    name: "Dicoding Event #1: Roadmap Belajar Coding Praktis di Era Gempuran AI",
    institution: "Dicoding Indonesia",
    year: "2026",
    description:
      "Menghadiri sesi webinar untuk memahami alur dan strategi belajar pemrograman secara praktis di tengah perkembangan teknologi AI.",
    skills: ["Coding Roadmap", "Software Development", "Artificial Intelligence"],
    image: "/images/dicoding-event-1-roadmap-belajar-coding-praktis-di-era-gempuran-ai-certificate.webp",
  },
];

const certificatesEn: Certificate[] = [
  {
    ...certificates[0],
    description:
      "Completed intensive UI/UX training on designing modern mobile application interfaces using Figma.",
  },
  {
    ...certificates[1],
    description:
      "Completed foundational backend development training using the Laravel PHP framework and MVC architecture.",
  },
  {
    ...certificates[2],
    description:
      "Completed web engineering training on building interactive company profile websites integrated with AI workflows.",
  },
  {
    ...certificates[3],
    description:
      "Actively participated in an online seminar covering core cybersecurity principles and information security practices.",
  },
  {
    ...certificates[4],
    description:
      "Completed Google's course on maximizing workplace productivity with generative AI tools.",
  },
  {
    ...certificates[5],
    description:
      "Completed Google's course covering artificial intelligence fundamentals, real-world applications, and modern AI concepts.",
  },
  {
    ...certificates[6],
    description:
      "Attended Dicoding's practical coding roadmap session on effective software learning strategies in the AI era.",
  },
];

export function getProjects(locale: Locale): Project[] {
  return locale === "en" ? projectsEn : projects;
}

export function getProjectBySlug(slug: string, locale: Locale = "id"): Project | undefined {
  return getProjects(locale).find((p) => p.slug === slug);
}

export function getTimeline(locale: Locale): TimelineItem[] {
  return locale === "en" ? timelineEn : timeline;
}

export function getCertificates(locale: Locale): Certificate[] {
  return locale === "en" ? certificatesEn : certificates;
}

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#journey" },
  { label: "Certificates", href: "#certificates" },
  { label: "Contact", href: "#contact" },
];
