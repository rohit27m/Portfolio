import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';

const LINKS = [
  { id: 'about', label: 'Profile', n: '01' },
  { id: 'skills', label: 'Stack', n: '02' },
  { id: 'experience', label: 'Experience', n: '03' },
  { id: 'projects', label: 'Work', n: '04' },
  { id: 'contact', label: 'Contact', n: '05' },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');

  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 260, damping: 40, mass: 0.3 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Which chapter am I in? One observer, no scroll math. The visible set is
  // tracked both ways so the index goes dark again over the hero and footer
  // instead of leaving the last section latched on.
  useEffect(() => {
    const sections = LINKS.map((l) => document.getElementById(l.id)).filter(Boolean);
    if (!sections.length) return;
    const visible = new Set();
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) visible.add(e.target.id);
          else visible.delete(e.target.id);
        });
        // Document order wins, so boundaries don't flicker between two ids.
        const next = LINKS.find((l) => visible.has(l.id));
        setActive(next ? next.id : '');
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      {/* Scroll progress — a single hairline of signal across the top */}
      <motion.div
        style={{ scaleX: progress }}
        className="fixed top-0 left-0 right-0 h-[2px] bg-accent origin-left z-[70]"
      />

      <motion.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
        className={`fixed top-0 left-0 w-full z-[60] transition-colors duration-500 ${
          scrolled
            ? 'bg-primary/85 backdrop-blur-md border-b border-border'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div
          className={`section-container flex justify-between items-center transition-[height] duration-500 ${
            scrolled ? 'h-16 md:h-[4.5rem]' : 'h-20 md:h-24'
          }`}
        >
          {/* Wordmark — a stamped plate, not a logo font */}
          <a href="#hero" className="group flex items-center gap-3 shrink-0" aria-label="Home">
            <span className="grid place-items-center w-7 h-7 bg-accent text-void font-mono text-[11px] font-bold
                             transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]
                             group-hover:rotate-90">
              RM
            </span>
            <span className="display-wide text-sm tracking-wide text-text-bright hidden sm:block">
              Rohit Munamarthi
            </span>
          </a>

          {/* Desktop index */}
          <div className="hidden md:flex items-center gap-1">
            {LINKS.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className="group relative flex items-baseline gap-2 px-4 py-2"
              >
                <span
                  className={`font-mono text-[9px] tabular-nums transition-colors duration-300 ${
                    active === l.id ? 'text-accent' : 'text-text-muted'
                  }`}
                >
                  {l.n}
                </span>
                <span
                  className={`mono-xs font-bold transition-colors duration-300 ${
                    active === l.id ? 'text-text-bright' : 'text-text-main group-hover:text-text-bright'
                  }`}
                >
                  {l.label}
                </span>
                <span
                  className={`absolute bottom-0 left-4 right-4 h-px bg-accent origin-left transition-transform
                              duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                    active === l.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}
                />
              </a>
            ))}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="btn-blade ml-6 py-3! pl-5! pr-4!"
            >
              <span>Résumé</span>
            </a>
          </div>

          {/* Mobile trigger */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="md:hidden relative w-11 h-11 -mr-2 flex flex-col items-center justify-center gap-[5px] z-[80]"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
          >
            <motion.span
              animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="block w-6 h-[2px] bg-text-bright origin-center"
            />
            <motion.span
              animate={open ? { opacity: 0, x: 8 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="block w-6 h-[2px] bg-accent"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3 }}
              className="block w-6 h-[2px] bg-text-bright origin-center"
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile overlay — a plate that drops, links rising inside it */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.62, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[75] bg-void md:hidden flex flex-col justify-between pt-28 pb-10 overflow-y-auto"
          >
            <nav className="section-container flex flex-col">
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.id}
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 26 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.16 + i * 0.06, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="flex items-baseline gap-4 py-3.5 border-b border-border"
                >
                  <span className="font-mono text-[10px] text-accent tabular-nums">{l.n}</span>
                  <span className="display text-[12vw] leading-none">{l.label}</span>
                </motion.a>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="section-container flex items-end justify-between gap-6 pt-10"
            >
              <div>
                <p className="mono-xs text-text-muted mb-2">Hyderabad, IN</p>
                <a href="mailto:rohit27m@hotmail.com" className="font-mono text-xs text-text-bright">
                  rohit27m@hotmail.com
                </a>
              </div>
              <a href="/resume.pdf" target="_blank" rel="noreferrer" className="btn-blade">
                <span>Résumé</span>
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
