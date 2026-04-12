import { useState, useEffect, useRef, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Stars, OrbitControls } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { Planet } from './components/Planet';
import * as data from './data';

const INTRO_DURATION_MS = 2200;
const PLANET_DISTORT_MIN = 0.35;
const PLANET_DISTORT_MAX = 1;

function HeroScene({ distort }) {
  return (
    <Canvas camera={{ position: [0, 0, 10] }}>
      <Stars radius={100} depth={50} count={5000} factor={4} fade />
      <Suspense fallback={null}>
        <Planet position={[3, 0, 0]} size={2.5} color="#10b981" speed={0.2} distort={distort} />
      </Suspense>
      <OrbitControls enableZoom={false} autoRotate />
    </Canvas>
  );
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [planetDistort, setPlanetDistort] = useState(PLANET_DISTORT_MAX);
  const introDoneRef = useRef(false);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (introDoneRef.current) return;
    let start = null;
    let rafId;
    const tick = (now) => {
      if (start === null) start = now;
      const elapsed = now - start;
      const progress = Math.min(elapsed / INTRO_DURATION_MS, 1);
      setPlanetDistort(PLANET_DISTORT_MAX - progress * (PLANET_DISTORT_MAX - PLANET_DISTORT_MIN));
      if (progress < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        introDoneRef.current = true;
      }
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  useEffect(() => {
    if (!introDoneRef.current) return;
    const heroH = typeof window !== 'undefined' ? window.innerHeight : 800;
    const scrollProgress = Math.min(scrollY / heroH, 1);
    setPlanetDistort(PLANET_DISTORT_MIN + scrollProgress * (PLANET_DISTORT_MAX - PLANET_DISTORT_MIN));
  }, [scrollY]);

  return (
    <div className="bg-[#0a0e14] text-[#e6edf3] font-sans selection:bg-emerald-500/30 min-h-screen overflow-x-hidden">
      {/* NAVBAR — responsive: hamburger + overlay nav di mobile (standar industri) */}
      <header className="fixed top-0 left-0 right-0 z-[100] bg-[#0a0e14]/90 backdrop-blur-md border-b border-white/5 px-4 sm:px-6 md:px-16 py-3 sm:py-4 flex justify-between items-center safe-area-inset-top">
        <a href="#home" className="text-lg sm:text-xl font-bold text-emerald-500 tracking-tighter truncate max-w-[180px] sm:max-w-none">
          HUSAIN ABDUL GHANI PORTFOLIO.
        </a>
        <nav className="hidden md:flex gap-6 lg:gap-8">
          {data.navLinks.map(link => (
            <a key={link} href={`#${link.toLowerCase()}`} className="text-xs font-medium hover:text-emerald-400 transition-colors uppercase tracking-[0.2em] py-2 min-h-[44px] inline-flex items-center">{link}</a>
          ))}
        </nav>
        {/* Hamburger — min 44px touch target (WCAG / Apple HIG) */}
        <button
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden w-11 h-11 min-w-[44px] min-h-[44px] flex flex-col justify-center items-center gap-1.5 rounded-lg text-emerald-500 hover:bg-white/5 active:bg-white/10 transition-colors"
          aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'}
          aria-expanded={menuOpen}
        >
          <span className={`w-5 h-0.5 bg-current rounded-full transition-transform ${menuOpen ? 'rotate-45 translate-y-1' : ''}`} />
          <span className={`w-5 h-0.5 bg-current rounded-full transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`w-5 h-0.5 bg-current rounded-full transition-transform ${menuOpen ? '-rotate-45 -translate-y-1' : ''}`} />
        </button>
      </header>

      {/* Mobile nav overlay — full screen, tap outside or link to close */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[99] bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setMenuOpen(false)}
              aria-hidden
            />
            <motion.nav
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              className="fixed top-0 right-0 bottom-0 z-[100] w-full max-w-[280px] bg-[#0a0e14] border-l border-white/10 py-6 px-6 md:hidden flex flex-col"
            >
              <div className="flex justify-end mb-8">
                <button type="button" onClick={() => setMenuOpen(false)} className="w-11 h-11 min-h-[44px] flex items-center justify-center rounded-lg text-slate-400 hover:text-white hover:bg-white/5" aria-label="Tutup menu">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              {data.navLinks.map(link => (
                <a
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  className="py-3.5 px-2 min-h-[44px] flex items-center text-slate-300 hover:text-emerald-400 hover:bg-white/5 rounded-lg transition-colors uppercase tracking-wider text-sm font-medium border-b border-white/5 last:border-0"
                >
                  {link}
                </a>
              ))}
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      <main className="overflow-x-hidden">
        {/* HERO — responsive padding, typography, touch-friendly buttons */}
        <section id="home" className="min-h-screen relative flex items-center px-4 sm:px-6 md:px-16 pt-[72px] sm:pt-20 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <HeroScene distort={planetDistort} />
          </div>
          
          <div className="relative z-10 max-w-4xl w-full">
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-emerald-500 font-mono mb-2 text-xs sm:text-sm tracking-widest">{"// WELCOME TO MY UNIVERSE"}</motion.p>
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-black mb-3 sm:mb-4 leading-tight">{data.personalInfo.name}</h1>
            <p className="text-lg sm:text-xl md:text-2xl text-slate-400 italic font-light">{data.personalInfo.role}</p>
            <p className="text-sm md:text-base text-emerald-500/90 mt-2 font-mono tracking-wide">{data.personalInfo.locationTagline}</p>
            
            <div className="mt-8 sm:mt-10 flex flex-wrap gap-3 sm:gap-4">
              <a href="#contact" className="min-h-[48px] inline-flex items-center justify-center bg-emerald-500 text-black px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold hover:bg-emerald-400 active:scale-[0.98] transition-all text-base">Get In Touch</a>
              <a href={data.assets.cvFile} download className="min-h-[48px] inline-flex items-center justify-center border border-emerald-500/50 text-emerald-500 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full font-bold hover:bg-emerald-500/10 active:scale-[0.98] transition-all text-base">Download CV</a>
            </div>
          </div>
        </section>

        {/* ABOUT — responsive: foto, summary, icons (touch 44px+), education */}
        <section id="about" className="py-20 sm:py-24 md:py-32 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-10 sm:mb-12 text-white">About <span className="text-emerald-500">Me</span></h2>

          <div className="flex flex-col md:flex-row gap-10 sm:gap-12 md:gap-16 mb-14 sm:mb-16 items-start">
            <div className="shrink-0 w-full max-w-[280px] sm:max-w-xs md:w-72 mx-auto md:mx-0 aspect-square rounded-2xl overflow-hidden border border-white/10 shadow-xl ring-2 ring-emerald-500/20">
              <img src={data.assets.profileImg} alt={data.personalInfo.name} className="w-full h-full object-cover" loading="lazy" />
            </div>
            <div className="flex-1 min-w-0 w-full">
              <p className="text-slate-400 leading-relaxed text-base sm:text-lg text-justify mb-6 sm:mb-8">{data.personalInfo.summary}</p>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                <a href={`mailto:${data.personalInfo.email}`} className="min-h-[44px] inline-flex items-center gap-2 py-2.5 pr-2 text-slate-400 hover:text-emerald-400 transition-colors rounded-lg hover:bg-white/5" aria-label="Email">
                  <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  <span className="text-sm font-mono">{data.personalInfo.email}</span>
                </a>
                <a href={`tel:${data.personalInfo.phone?.replace(/\s/g, '')}`} className="min-h-[44px] inline-flex items-center gap-2 py-2.5 pr-2 text-slate-400 hover:text-emerald-400 transition-colors rounded-lg hover:bg-white/5" aria-label="Telepon">
                  <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  <span className="text-sm font-mono">{data.personalInfo.phone?.replace(/(\+62)(\d{3})(\d{4})(\d{4})/, '$1 $2 $3 $4')}</span>
                </a>
                <a href={data.personalInfo.linkedinUrl} target="_blank" rel="noreferrer" className="min-h-[44px] inline-flex items-center gap-2 py-2.5 pr-2 text-slate-400 hover:text-emerald-400 transition-colors rounded-lg hover:bg-white/5" aria-label="LinkedIn">
                  <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  <span className="text-sm">LinkedIn</span>
                </a>
                <a href={data.personalInfo.githubUrl} target="_blank" rel="noreferrer" className="min-h-[44px] inline-flex items-center gap-2 py-2.5 pr-2 text-slate-400 hover:text-emerald-400 transition-colors rounded-lg hover:bg-white/5" aria-label="GitHub">
                  <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/></svg>
                  <span className="text-sm">GitHub</span>
                </a>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 md:gap-16">
            <div className="space-y-8 sm:space-y-10">
              <h3 className="text-xl sm:text-2xl font-bold text-white">Education</h3>
              {data.education.map((edu, i) => (
                <div key={i} className="relative pl-8 border-l border-emerald-500/30">
                  <div className="absolute w-3 h-3 bg-emerald-500 rounded-full -left-[6.5px] top-2 shadow-[0_0_10px_#10b981]" />
                  <h4 className="font-bold text-xl">{edu.school}</h4>
                  {edu.location && <p className="text-slate-500 text-sm mt-0.5">{edu.location}</p>}
                  <p className="text-emerald-400 font-mono text-sm mt-1">{edu.period}</p>
                  <p className="text-slate-400 mt-2">{edu.major}</p>
                  <p className="text-slate-500 text-xs mt-1">Status: {edu.status}</p>
                </div>
              ))}
            </div>
            <div className="space-y-8 sm:space-y-10">
              <h3 className="text-xl sm:text-2xl font-bold text-white">Core Competencies</h3>
              <ul className="space-y-3">
                {data.coreCompetencies.map((item, i) => (
                  <li key={i} className="text-slate-400 text-sm leading-relaxed flex gap-2">
                    <span className="text-emerald-500 mt-1.5">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <h3 className="text-xl sm:text-2xl font-bold text-white pt-4">Languages</h3>
              <ul className="space-y-2">
                {data.languagesSpoken.map((lang, i) => (
                  <li key={i} className="text-slate-400 flex gap-2">
                    <span className="text-emerald-500 font-mono text-sm">{lang.language}:</span>
                    <span>{lang.level}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* SKILLS — responsive padding & grid */}
        <section id="skills" className="py-20 sm:py-24 md:py-32 px-4 sm:px-6 md:px-16 bg-white/[0.02]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-12 sm:mb-16 text-center">Technical <span className="text-emerald-500">Skills</span></h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {data.skills.map((group, i) => (
                <div key={i} className="bg-slate-900/40 p-5 sm:p-6 md:p-8 rounded-2xl border border-white/5 hover:border-emerald-500/50 transition-all">
                  <h3 className="text-emerald-500 font-bold text-lg mb-4 uppercase tracking-wider">{group.category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item, j) => (
                      <span key={j} className="text-xs font-mono text-slate-300 bg-white/5 px-3 py-1.5 rounded-full">{item}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* EXPERIENCE — responsive padding & typography */}
        <section id="experience" className="py-20 sm:py-24 md:py-32 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 sm:mb-16 text-white">Professional <span className="text-emerald-500">Experience</span></h2>
          <div className="space-y-10 sm:space-y-12">
            {data.experiences.map((exp, i) => (
              <div key={i} className="relative pl-8 border-l border-emerald-500/30">
                <div className="absolute w-3 h-3 bg-emerald-500 rounded-full -left-[6.5px] top-1 shadow-[0_0_10px_#10b981]" />
                <h3 className="font-bold text-xl sm:text-2xl">{exp.company}</h3>
                <p className="text-emerald-400 font-mono text-sm mt-1">{exp.period}</p>
                <ul className="mt-4 sm:mt-6 space-y-2 text-slate-400 text-sm sm:text-base">
                  {exp.desc.map((item, j) => (
                    <li key={j} className="flex gap-2">
                      <span className="text-emerald-500 shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* PROJECTS — responsive grid & touch-friendly */}
        <section id="projects" className="py-20 sm:py-24 md:py-32 px-4 sm:px-6 md:px-16 bg-white/[0.02]">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-bold mb-12 sm:mb-16 text-center">Featured <span className="text-emerald-500">Missions</span></h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
              {data.projects.map((p, i) => (
                <motion.div whileHover={{ y: -10 }} key={i} className="group bg-slate-900/40 rounded-2xl sm:rounded-3xl overflow-hidden border border-white/5 hover:border-emerald-500/50 transition-all backdrop-blur-sm">
                  <div className="h-48 sm:h-56 md:h-64 overflow-hidden">
                    <img src={p.img} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={p.title} loading="lazy" />
                  </div>
                  <div className="p-5 sm:p-6 md:p-8">
                    <h3 className="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">{p.title}</h3>
                    {p.subtitle && (
                      <p className="text-emerald-500/90 text-xs font-mono tracking-wide mb-2">{p.subtitle}</p>
                    )}
                    {p.description && (
                      <p className="text-slate-500 text-xs sm:text-sm leading-relaxed mb-4 text-left">{p.description}</p>
                    )}
                    {p.techStack ? (
                      <div className="space-y-4 mb-4 text-left">
                        {Object.entries(p.techStack).map(([category, items]) => (
                          <div key={category}>
                            <h4 className="text-emerald-500 text-[10px] sm:text-xs font-bold uppercase tracking-[0.15em] mb-2">{category}</h4>
                            <ul className="space-y-1.5">
                              {items.map((item) => (
                                <li key={item} className="text-slate-400 text-xs sm:text-sm leading-snug flex gap-2">
                                  <span className="text-emerald-500/80 shrink-0 mt-1">•</span>
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="flex flex-wrap gap-2 mb-4">
                        {p.tech.map(t => <span key={t} className="text-[10px] font-mono border border-emerald-500/30 text-emerald-400 px-2.5 sm:px-3 py-1 rounded-full uppercase tracking-tighter">{t}</span>)}
                      </div>
                    )}
                    {p.link && (
                      <a
                        href={p.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="min-h-[44px] inline-flex items-center text-emerald-500 text-xs font-bold tracking-widest hover:text-emerald-400 transition-colors uppercase"
                      >
                        Lihat Project →
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CERTIFICATE — responsive grid, touch-friendly links */}
        <section id="certificate" className="py-20 sm:py-24 md:py-32 px-4 sm:px-6 md:px-16 max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 sm:mb-16 text-center">Certificates</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {data.certificates.map((c, i) => (
              <div key={i} className="group bg-slate-900/40 rounded-2xl border border-white/5 hover:border-emerald-500/50 transition-all overflow-hidden">
                <div className="aspect-[3/4] min-h-[220px] bg-slate-900/80 border-b border-white/5 overflow-hidden">
                  <object data={c.file} type="application/pdf" title={c.title} className="w-full h-full min-h-[220px] pointer-events-none">
                    <div className="flex h-full min-h-[220px] flex-col items-center justify-center gap-2 p-4 text-slate-500 text-sm">
                      <span>Pratinjau PDF tidak tersedia di browser ini.</span>
                    </div>
                  </object>
                </div>
                <div className="p-4 sm:p-5">
                  <h3 className="font-bold text-base sm:text-lg mb-1">{c.title}</h3>
                  <p className="text-slate-500 text-xs sm:text-sm mb-1">{c.issuer}</p>
                  {c.year && <p className="text-slate-600 text-xs font-mono mb-3 sm:mb-4">{c.year}</p>}
                  <a href={c.file} target="_blank" rel="noopener noreferrer" className="min-h-[44px] inline-flex items-center text-emerald-500 text-xs font-bold tracking-widest hover:text-emerald-400 transition-colors uppercase py-2">Lihat Sertifikat →</a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CONTACT — responsive padding, touch-friendly form & links (WCAG 44px+) */}
        <section id="contact" className="py-20 sm:py-24 md:py-32 px-4 sm:px-6 md:px-16 max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-4 sm:mb-6 italic">Ready to <span className="text-emerald-500 font-sans not-italic tracking-tighter">Launch?</span></h2>
          <p className="text-slate-400 mb-8 sm:mb-10 text-base sm:text-lg">Let's build something amazing together.</p>
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 mb-10 sm:mb-12 text-sm">
            <a href={`mailto:${data.personalInfo.email}`} className="min-h-[44px] inline-flex items-center justify-center gap-2 py-2.5 px-3 text-slate-400 hover:text-emerald-400 transition-colors rounded-lg" aria-label="Email">
                  <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  <span className="text-sm font-mono">{data.personalInfo.email}</span>
                </a>
                <a href={`tel:${data.personalInfo.phone?.replace(/\s/g, '')}`} className="min-h-[44px] inline-flex items-center justify-center gap-2 py-2.5 px-3 text-slate-400 hover:text-emerald-400 transition-colors rounded-lg" aria-label="Telepon">
                  <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  <span className="text-sm font-mono">{data.personalInfo.phone?.replace(/(\+62)(\d{3})(\d{4})(\d{4})/, '$1 $2 $3 $4')}</span>
                </a>
                <a href={data.personalInfo.linkedinUrl} target="_blank" rel="noreferrer" className="min-h-[44px] inline-flex items-center justify-center gap-2 py-2.5 px-3 text-slate-400 hover:text-emerald-400 transition-colors rounded-lg" aria-label="LinkedIn">
                  <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  <span className="text-sm">LinkedIn</span>
                </a>
                <a href={data.personalInfo.githubUrl} target="_blank" rel="noreferrer" className="min-h-[44px] inline-flex items-center justify-center gap-2 py-2.5 px-3 text-slate-400 hover:text-emerald-400 transition-colors rounded-lg" aria-label="GitHub">
                  <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/></svg>
                  <span className="text-sm">GitHub</span>
                </a>
          </div>
          <form action="https://formspree.io/f/mojlejge" method="POST" className="grid gap-4 sm:gap-6 text-left max-w-xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <input name="name" placeholder="Name" className="min-h-[48px] bg-slate-900/50 border border-white/10 px-4 py-3.5 sm:p-5 rounded-2xl outline-none focus:border-emerald-500 transition-all text-base" required />
              <input name="email" type="email" placeholder="Email" className="min-h-[48px] bg-slate-900/50 border border-white/10 px-4 py-3.5 sm:p-5 rounded-2xl outline-none focus:border-emerald-500 transition-all text-base" required />
            </div>
            <textarea name="message" rows="5" placeholder="Your Message" className="min-h-[120px] bg-slate-900/50 border border-white/10 px-4 py-3.5 sm:p-5 rounded-2xl outline-none focus:border-emerald-500 transition-all text-base resize-y" required></textarea>
            <button type="submit" className="min-h-[48px] bg-emerald-500 text-black font-black py-3.5 sm:py-5 rounded-2xl hover:bg-emerald-400 hover:scale-[1.02] active:scale-95 transition-all shadow-[0_0_20px_rgba(16,185,129,0.3)] text-base">SEND MESSAGE</button>
          </form>
        </section>
      </main>

      <footer className="relative border-t border-white/5 bg-gradient-to-b from-transparent to-black/20 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent" aria-hidden />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-16 py-12 sm:py-14 md:py-20">
          {/* Brand & tagline — responsive typography */}
          <div className="text-center mb-10 sm:mb-14">
            <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white tracking-tight">{data.personalInfo.name}</h3>
            <p className="text-slate-400 mt-2 text-xs sm:text-sm md:text-base px-2">
              {data.personalInfo.role} · {data.personalInfo.location}
            </p>
            <p className="text-emerald-500/90 text-xs sm:text-sm font-mono mt-2 tracking-wide">{data.personalInfo.locationTagline}</p>
          </div>

          {/* Quick Links & Connect — responsive grid, touch targets */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 sm:gap-12 md:gap-16 mb-10 sm:mb-14">
            <div>
              <h4 className="text-emerald-500 font-bold text-xs uppercase tracking-[0.2em] mb-4 sm:mb-6">Quick Links</h4>
              <nav className="flex flex-wrap justify-center md:justify-start gap-x-4 sm:gap-x-6 gap-y-2">
                {data.navLinks.map((link) => (
                  <a key={link} href={`#${link.toLowerCase()}`} className="min-h-[44px] inline-flex items-center text-slate-400 hover:text-emerald-400 text-sm transition-colors py-2">
                    {link}
                  </a>
                ))}
              </nav>
            </div>
            <div>
              <h4 className="text-emerald-500 font-bold text-xs uppercase tracking-[0.2em] mb-4 sm:mb-6">Connect</h4>
              <div className="flex flex-wrap justify-center md:justify-start gap-3 sm:gap-4">
                <a href={`mailto:${data.personalInfo.email}`} className="inline-flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors" aria-label="Email">
                  <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  <span className="text-sm font-mono">{data.personalInfo.email}</span>
                </a>
                <a href={`tel:${data.personalInfo.phone?.replace(/\s/g, '')}`} className="inline-flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors" aria-label="Telepon">
                  <svg className="w-5 h-5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  <span className="text-sm font-mono">{data.personalInfo.phone?.replace(/(\+62)(\d{3})(\d{4})(\d{4})/, '$1 $2 $3 $4')}</span>
                </a>
                <a href={data.personalInfo.linkedinUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors" aria-label="LinkedIn">
                  <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  <span className="text-sm">LinkedIn</span>
                </a>
                <a href={data.personalInfo.githubUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-slate-400 hover:text-emerald-400 transition-colors" aria-label="GitHub">
                  <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24"><path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"/></svg>
                  <span className="text-sm">GitHub</span>
                </a>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="pt-8 border-t border-white/5 text-center">
            <p className="text-slate-600 text-xs font-mono tracking-widest uppercase">
              © {new Date().getFullYear()} {data.personalInfo.name}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;