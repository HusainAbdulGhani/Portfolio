// Import Assets dari folder assets (sesuaikan nama file jika ada perbedaan)
import profileImg from './assets/2.jpg';
import project1 from './assets/Portfolio Website.png';
import project2 from './assets/E-Commerce Website.png';
import project3 from './assets/explore indonesia.jpg';
import project4 from './assets/Blog Website.webp';
import certLinux from './assets/sertifikat linux.jpg';
import certLinux2 from './assets/sertifikat linux2.jpg';
import certAI from './assets/sertifikat AI.jpg';
import certBuildAI from './assets/Build Your First Ai APP.png';
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
  linkedinUrl: "https://linkedin.com/in/husainabdulghani",
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
  { title: "Portfolio Website", img: project1, tech: ["HTML", "CSS", "JS"] },
  { title: "E-Commerce Website", img: project2, tech: ["HTML", "CSS", "JS"] },
  { title: "Explore Indonesia", img: project3, tech: ["React", "Tailwind"] },
  { title: "Blog Website", img: project4, tech: ["HTML", "CSS", "JS"] },
];

// Sertifikat — gambar dari src/assets, sesuai portfolio referensi
export const certificates = [
  { title: "LINUX", issuer: "Linux Indonesia", year: "2023", img: certLinux },
  { title: "LINUX", issuer: "Linux Indonesia", year: "2023", img: certLinux2 },
  { title: "Build Your First AI App", issuer: "Build Your First AI App", year: "2025", img: certAI },
  { title: "Build Your First AI Apps", issuer: "Build Your First AI Apps", year: "2025", img: certBuildAI },
];