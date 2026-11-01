export type Locale = "id" | "en";

export type TranslationKey =
  | "nav.home"
  | "nav.about"
  | "nav.skills"
  | "nav.projects"
  | "nav.journey"
  | "nav.certificates"
  | "nav.contact"
  | "hero.welcome"
  | "hero.title"
  | "hero.role"
  | "hero.description"
  | "hero.downloadCV"
  | "hero.github"
  | "hero.linkedin"
  | "hero.instagram"
  | "hero.contactMe"
  | "hero.locationLabel"
  | "hero.locationValue"
  | "hero.statusLabel"
  | "hero.statusValue"
  | "hero.focusLabel"
  | "hero.focusValue"
  | "about.title"
  | "about.description"
  | "about.interests"
  | "about.bio"
  | "about.university"
  | "about.eduDegree"
  | "about.background"
  | "about.eduMajor"
  | "about.eduLabel"
  | "about.bgLabel"
  | "skills.title"
  | "skills.description"
  | "skills.filterAll"
  | "projects.title"
  | "projects.description"
  | "timeline.title"
  | "timeline.description"
  | "certificates.title"
  | "certificates.description"
  | "contact.title"
  | "contact.description"
  | "contact.nameLabel"
  | "contact.namePlaceholder"
  | "contact.emailLabel"
  | "contact.emailPlaceholder"
  | "contact.messageLabel"
  | "contact.messagePlaceholder"
  | "contact.sendMessage"
  | "contact.sending"
  | "contact.messageSent"
  | "contact.tryAgain"
  | "contact.error"
  | "footer.copyright"
  | "footer.build"
  | "project.backToProjects"
  | "project.viewCode"
  | "project.liveDemo"
  | "project.preview"
  | "project.overview"
  | "project.problem"
  | "project.solution"
  | "project.features"
  | "project.stack"
  | "project.process"
  | "project.challenges"
  | "project.gallery"
  | "project.result"
  | "404.title"
  | "404.description"
  | "404.backHome";

const translations: Record<Locale, Record<TranslationKey, string>> = {
  id: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.journey": "Experience",
    "nav.certificates": "Certificates",
    "nav.contact": "Contact",
    "hero.welcome": "whoami",
    "hero.title": "Hi, I'm",
    "hero.role": "Mahasiswa Teknik Informatika · UPGRIS",
    "hero.description":
      "Mahasiswa Teknik Informatika Universitas PGRI Semarang dengan latar belakang Matematika dan IPA yang memiliki minat dalam pengembangan aplikasi, artificial intelligence, web development, dan teknologi digital.",
    "hero.downloadCV": "Download CV",
    "hero.github": "GitHub",
    "hero.linkedin": "LinkedIn",
    "hero.instagram": "Instagram",
    "hero.contactMe": "Contact Me",
    "hero.locationLabel": "Location",
    "hero.locationValue": "Semarang, Indonesia",
    "hero.statusLabel": "Status",
    "hero.statusValue": "Terbuka untuk kolaborasi",
    "hero.focusLabel": "Focus",
    "hero.focusValue": "Web · Mobile · IoT",
    "about.title": "About Me",
    "about.description":
      "Sedikit cerita tentang latar belakang dan minat saya di dunia teknologi.",
    "about.interests": "Interests",
    "about.bio":
      "Saya adalah mahasiswa Universitas PGRI Semarang Program Studi Teknik Informatika Fakultas Teknik dan Informatika. Saya memiliki minat besar dalam dunia teknologi informasi, terutama di bidang pemrograman dan pengembangan sistem. Saya senang mengeksplorasi hal baru yang berkaitan dengan desain antarmuka, sistem digital, dan teknologi kreatif.",
    "about.university": "Universitas PGRI Semarang",
    "about.eduDegree": "Infomatics Engineering · 2024 - Present",
    "about.background": "SMA Muhammadiyah 2 Pemalang",
    "about.eduMajor": "Matematika dan IPA",
    "about.eduLabel": "Pendidikan",
    "about.bgLabel": "Latar belakang",
    "skills.title": "Skills & Technologies",
    "skills.description":
      "Kumpulan bahasa, framework, tools, dan bidang yang saya pelajari dan gunakan.",
    "skills.filterAll": "All",
    "projects.title": "Projects",
    "projects.description":
      "Beberapa project yang telah saya kembangkan, mulai dari aplikasi mobile, automation, hingga Internet of Things.",
    "timeline.title": "Journey Timeline",
    "timeline.description":
      "Perjalanan pendidikan dan yang membentuk kemampuan saya saat ini.",
    "certificates.title": "Certificates",
    "certificates.description":
      "Sertifikat pembelajaran yang telah saya selesaikan dari berbagai platform dan institusi.",
    "contact.title": "Contact Me",
    "contact.description":
      "Punya project, pertanyaan, atau ingin berkolaborasi? Jangan ragu untuk menghubungi saya.",
    "contact.nameLabel": "Name",
    "contact.namePlaceholder": "Nama lengkap kamu",
    "contact.emailLabel": "Email",
    "contact.emailPlaceholder": "email@contoh.com",
    "contact.messageLabel": "Message",
    "contact.messagePlaceholder": "Ceritakan tentang project atau pesanmu...",
    "contact.sendMessage": "Send Message",
    "contact.sending": "Sending...",
    "contact.messageSent": "Message Sent",
    "contact.tryAgain": "Try Again",
    "contact.error": "Gagal mengirim pesan. Coba lagi.",
    "footer.copyright": "All rights reserved.",
    "footer.build": "build v8",
    "project.backToProjects": "Back to Projects",
    "project.viewCode": "View Code",
    "project.liveDemo": "Live Demo",
    "project.preview": "Preview",
    "project.overview": "Overview",
    "project.problem": "Problem",
    "project.solution": "Solution",
    "project.features": "Features",
    "project.stack": "Technology Stack",
    "project.process": "Development Process",
    "project.challenges": "Challenges",
    "project.gallery": "Screenshot Gallery",
    "project.result": "Result",
    "404.title": "Halaman tidak ditemukan",
    "404.description":
      "Halaman yang kamu cari mungkin sudah dipindahkan atau tidak pernah ada.",
    "404.backHome": "Kembali ke Home",
  },
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.journey": "Experience",
    "nav.certificates": "Certificates",
    "nav.contact": "Contact",
    "hero.welcome": "whoami",
    "hero.title": "Hi, I'm",
    "hero.role": "Informatics Engineering Student · UPGRIS",
    "hero.description":
      "Informatics Engineering student at Universitas PGRI Semarang with a background in Mathematics and Science, interested in application development, artificial intelligence, web development, and digital technology.",
    "hero.downloadCV": "Download CV",
    "hero.github": "GitHub",
    "hero.linkedin": "LinkedIn",
    "hero.instagram": "Instagram",
    "hero.contactMe": "Contact Me",
    "hero.locationLabel": "Location",
    "hero.locationValue": "Semarang, Indonesia",
    "hero.statusLabel": "Status",
    "hero.statusValue": "Open for collaboration",
    "hero.focusLabel": "Focus",
    "hero.focusValue": "Web · Mobile · IoT",
    "about.title": "About Me",
    "about.description": "A little story about my background and interests in technology.",
    "about.interests": "Interests",
    "about.bio":
      "I am an Informatics Engineering student at Universitas PGRI Semarang, Faculty of Engineering and Informatics. I have a great interest in the world of information technology, especially in programming and system development. I enjoy exploring new things related to interface design, digital systems, and creative technology.",
    "about.university": "Universitas PGRI Semarang",
    "about.eduDegree": "Informatics Engineering · 2024 - Present",
    "about.background": "SMA Muhammadiyah 2 Pemalang",
    "about.eduMajor": "Mathematics and Science",
    "about.eduLabel": "Education",
    "about.bgLabel": "Background",
    "skills.title": "Skills & Technologies",
    "skills.description":
      "Collection of languages, frameworks, tools, and fields I learn and use.",
    "skills.filterAll": "All",
    "projects.title": "Projects",
    "projects.description":
      "Several projects I have developed, from mobile applications, automation, to Internet of Things.",
    "timeline.title": "Journey Timeline",
    "timeline.description":
      "Educational journey and experiences that shaped my current skills.",
    "certificates.title": "Certificates",
    "certificates.description":
      "Learning certificates I have completed from various platforms and institutions.",
    "contact.title": "Contact Me",
    "contact.description":
      "Have a project, question, or want to collaborate? Don't hesitate to contact me.",
    "contact.nameLabel": "Name",
    "contact.namePlaceholder": "Your full name",
    "contact.emailLabel": "Email",
    "contact.emailPlaceholder": "email@example.com",
    "contact.messageLabel": "Message",
    "contact.messagePlaceholder": "Tell me about your project or message...",
    "contact.sendMessage": "Send Message",
    "contact.sending": "Sending...",
    "contact.messageSent": "Message Sent",
    "contact.tryAgain": "Try Again",
    "contact.error": "Failed to send message. Try again.",
    "footer.copyright": "All rights reserved.",
    "footer.build": "build v8",
    "project.backToProjects": "Back to Projects",
    "project.viewCode": "View Code",
    "project.liveDemo": "Live Demo",
    "project.preview": "Preview",
    "project.overview": "Overview",
    "project.problem": "Problem",
    "project.solution": "Solution",
    "project.features": "Features",
    "project.stack": "Technology Stack",
    "project.process": "Development Process",
    "project.challenges": "Challenges",
    "project.gallery": "Screenshot Gallery",
    "project.result": "Result",
    "404.title": "Page not found",
    "404.description":
      "The page you are looking for may have been moved or never existed.",
    "404.backHome": "Back to Home",
  },
};

export function t(locale: Locale, key: TranslationKey): string {
  return translations[locale]?.[key] ?? translations["id"][key] ?? key;
}
