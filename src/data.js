// Import Assets dari folder assets (sesuaikan nama file jika ada perbedaan)
import profileImg from './assets/2.jpg';
import project1 from './assets/Expense & Budget Visualizer.png';
import project2 from './assets/E-Commerce ShopKu.png';
import project3 from './assets/explore indonesia.jpg';
import project4 from './assets/Blog Website.webp';
import partnerNdgLinuxUnhatched from './assets/Partner-_NDG_Linux_Unhatched_certificate.pdf';
import partnerNdgLinuxEssentials from './assets/Partner-_NDG_Linux_Essentials_certificate.pdf';
import certBuildAiBatch from './assets/Build_Your_First_AI_Apps_Batch_Certificate.pdf';
import certRevou from './assets/CCSE.pdf';
import cvFile from './assets/Husain_Abdul_Ghani.pdf';

export const assets = { profileImg, cvFile };

export const navLinks = ["Home", "About", "Skills", "Experience", "Projects", "Certificate", "Contact"];

// Data Pribadi & Summary — sesuai Husain_Abdul_Ghani.pdf
export const personalInfo = {
  name: "Husain Abdul Ghani",
  role: "Frontend / Fullstack Developer",
  location: "Bandung Barat, Indonesia",
  locationTagline: "Open to Remote Worldwide",
  email: "Pasatba@gmail.com",
  phone: "+6282119300188",
  linkedin: "Husain Abdul Ghani",
  linkedinUrl: "https://www.linkedin.com/in/husain-abdul-ghani-7677243bb/",
  github: "HusainAbdulGhani",
  githubUrl: "https://github.com/HusainAbdulGhani",
  summary: "Results-driven Frontend Developer with a strong foundation in building responsive, interactive, and high-performance user interfaces. Experienced in modern web development, including seamless frontend-backend integration and database management (SQL & NoSQL). Passionate about optimizing user experience and scalable web architectures using the Laravel and JavaScript ecosystems."
};

// Data Pendidikan — sesuai PDF (Politeknik TEDC Bandung)
export const education = [
  {
    school: "Politeknik TEDC Bandung",
    location: "Bandung, Indonesia",
    period: "2023 – 2027 (Expected)",
    major: "Bachelor of Computer Science (Informatics Engineering)",
    status: "Active Student"
  }
];

// Data Pengalaman Kerja — sesuai PDF
export const experiences = [
  {
    company: "Freelance Web Developer",
    role: "Web Developer",
    period: "2023 – Present",
    desc: [
      "Architected and deployed custom web applications using Laravel, ensuring robust and scalable backend logic.",
      "Developed highly responsive and dynamic user interfaces using React.js and Vue.js, improving cross-device compatibility.",
      "Designed and managed complex data structures using MySQL and MongoDB based on specific project requirements.",
      "Integrated frontend components with backend services via RESTful APIs to ensure efficient data flow and system synchronization.",
      "Leveraged Git/GitHub for version control and collaborative development, maintaining clean and documented codebases.",
      "Collaborated directly with clients to translate business requirements into functional, high-quality technical solutions."
    ]
  }
];

// Data Skill Teknis — sesuai PDF
export const skills = [
  { category: "Languages", items: ["PHP", "JavaScript (ES6+)", "TypeScript", "Python","Java","C++"] },
  { category: "Frontend", items: ["React.js", "Next.js", "Vue.js", "Vite", "Tailwind CSS", "HTML5", "CSS3"] },
  { category: "Backend", items: ["Laravel (MVC, RESTful API, Eloquent ORM)"] },
  { category: "Databases", items: ["MySQL (Relational)", "MongoDB (NoSQL)"] }
];

// Core Competencies — dari PDF
export const coreCompetencies = [
  "UI/UX Design: Ability to create intuitive and user-centered web layouts.",
  "Responsive Development: Expert in Mobile-First design approaches.",
  "System Integration: Deep understanding of frontend-backend communication and API lifecycle."
];

// Bahasa — dari PDF
export const languagesSpoken = [
  { language: "Indonesian", level: "Native" },
  { language: "English", level: "Intermediate (Professional Working Proficiency)" }
];

// Project lo tetap dipertahankan
export const projects = [
  {
    title: "Expense & Budget Visualizer (Expensio)",
    subtitle: "CodingCamp · 30 Mar 2026",
    description:
      "SPA pelacak pengeluaran harian: input nama, nominal, dan kategori; total real-time; diagram donat per kategori. Tanpa backend atau framework — Vanilla JS, data persisten di localStorage, UI dark-first glassmorphism + aurora, responsif desktop & mobile.",
    img: project1,
    link: "https://husainabdulghani.github.io/CodingCamp-30Mar26-HusainAbdulGhani/",
    techStack: {
      "Struktur & UI": [
        "HTML5 — struktur semantik, satu entry `index.html` (GitHub Pages)",
        "CSS3 — glassmorphism, CSS variables, grid responsif, dark/light mode (preferensi di localStorage)",
      ],
      Aplikasi: [
        "Vanilla JavaScript (ES6+) — logika SPA, manipulasi DOM, state klien",
        "Tanpa build step — satu file `css/style.css`, satu file `js/app.js`",
      ],
      "Data & visualisasi": [
        "LocalStorage API — persistensi transaksi di browser (tetap ada setelah refresh)",
        "Chart.js v4.4.0 (CDN) — doughnut spending per kategori, update via `chart.update()`",
      ],
      Tipografi: ["Inter (Google Fonts)"],
      Fitur: [
        "Form input + validasi inline; daftar transaksi scrollable + hapus; total berjalan + micro-animation",
        "Opsional: sort (terbaru, nominal, kategori), highlight pengeluaran > $500, toggle tema gelap/terang",
      ],
    },
  },
  {
    title: "E-Commerce ShopKu",
    img: project2,
    link: "https://e-commerce-ebon-kappa-70.vercel.app/",
    techStack: {
      Backend: [
        "Laravel 11 + PHP 8.2",
        "Laravel Sanctum (autentikasi token)",
        "PostgreSQL via Neon (database)",
        "PHPUnit (testing)",
      ],
      Frontend: [
        "Next.js 15 + TypeScript",
        "Tailwind CSS (styling)",
        "Zustand (cart state management)",
        "TanStack Query (server state & caching)",
        "Axios (HTTP client)",
        "Vitest (testing)",
      ],
      Deploy: [
        "Railway (backend Laravel)",
        "Vercel (frontend Next.js)",
        "Neon (PostgreSQL cloud database)",
      ],
      Tools: ["Lucide React (icons)", "GitHub (version control)"],
    },
  },
  { title: "Explore Indonesia", img: project3, tech: ["React", "Tailwind"] },
  { title: "Blog Website", img: project4, tech: ["HTML", "CSS", "JS"] },
];

// Sertifikat — semua file PDF di src/assets 
export const certificates = [
  { title: "Partner NDG Linux Essentials", issuer: "Linux Indonesia", year: "2024", file: partnerNdgLinuxEssentials },
  { title: "Partner NDG Linux Unhatched", issuer: "Linux Indonesia", year: "2024", file: partnerNdgLinuxUnhatched },
  { title: "Build Your First AI Apps", issuer: "Build Your First AI Apps", year: "2025", file: certBuildAiBatch },
  { title: "Into Software Engineering", issuer: "Revou", year: "2026", file: certRevou },
];