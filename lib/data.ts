import { Certificate, Project, Skill, TimelineItem } from "./types";

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

export const projects: Project[] = [
  {
    slug: "moticket",
    name: "MoTicket",
    description:
      "Membuat tampilan antarmuka mock-up modern dengan gaya futuristik menggunakan Website Figma.",
    category: "Mobile Application",
    tech: ["Figma", "UI/UX Design", "Mobile App Design", "Prototyping"],
    github: undefined,
    demo: undefined,
    externalLink: "https://www.figma.com/proto/5b8Q3Uku1GMl7RAPbLx7ke/MoTicket?node-id=97-698&starting-point-node-id=97%3A698&t=AvPDGfG5LWHc4wmU-1",
    thumbnail: "/images/iPhone 16.png",
  },
  {
    slug: "pt-yellowroll",
    name: "PT YellowRoll Website",
    description:
      "Pengembangan website profil usaha UMKM PT YellowRoll yang menyajikan informasi produk piscok premium, galeri, dan fitur pemesanan interaktif.",
    category: "Web Application",
    tech: ["HTML5", "CSS3", "JavaScript", "Vercel"],
    github: undefined,
    demo: undefined,
    externalLink: "https://24670007uasdesainweb.vercel.app/index.html",
    thumbnail: "/images/Yellowroll.png",
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

export const certificates: Certificate[] = [
  {
    id: "cert-1",
    name: "Creative Mobile Design: Menguasai UI/UX Modern dengan Figma",
    institution: "Himpunan Mahasiswa Informatika Universitas PGRI Semarang",
    year: "2024",
    description:
      "Menyelesaikan pelatihan UI/UX untuk merancang desain aplikasi mobile modern menggunakan aplikasi Figma.",
    skills: ["UI/UX Design", "Figma", "Mobile App Design", "User Interface", "User Experience"],
    image: "/images/14.jpeg",
  },
  {
    id: "cert-2",
    name: "Laravel For Beginners: Developing Backend From The Basic",
    institution: "Himpunan Mahasiswa Informatika Universitas PGRI Semarang",
    year: "2024",
    description:
      "Menyelesaikan pelatihan pemrograman backend menggunakan framework Laravel tingkat dasar.",
    skills: ["Laravel", "PHP", "Backend Development", "MVC", "Web Development"],
    image: "/images/Ridho Dwiki.png",
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
    image: "/images/Coursera 4SNADBCYIIBH.webp"
  },
  {
    id: "cert-6",
    name: "Introduction to AI",
    institution: "Google (via Coursera)",
    year: "2026",
    description:
      "Menyelesaikan kursus untuk memahami konsep dasar kecerdasan buatan, penerapannya, serta prinsip kerja AI modern.",
    skills: ["Artificial Intelligence", "Machine Learning Fundamentals", "AI Applications"],
    image: "/images/Coursera SFUW524KVQWO.webp"
  }
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
