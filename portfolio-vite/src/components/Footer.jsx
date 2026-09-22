import { motion } from 'framer-motion';

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border bg-void overflow-hidden">
      <div className="ticks h-3 w-full opacity-60" />

      <div className="section-container pt-14 md:pt-20">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-14 md:pb-20">
          <div>
            <p className="mono-xs text-text-muted mb-4">Practice</p>
            <ul className="space-y-1.5 font-mono text-xs text-text-main">
              <li>LeetCode — 140+ solved</li>
              <li>GeeksforGeeks — 40+</li>
              <li>CodeChef — 20+</li>
            </ul>
          </div>
          <div>
            <p className="mono-xs text-text-muted mb-4">Education</p>
            <ul className="space-y-1.5 font-mono text-xs text-text-main">
              <li>B.Tech CSE — IARE Hyderabad</li>
              <li>Graduating May 2027</li>
              <li>CGPA 7.91</li>
            </ul>
          </div>
          <div>
            <p className="mono-xs text-text-muted mb-4">This site</p>
            <ul className="space-y-1.5 font-mono text-xs text-text-main">
              <li>React · Vite · Tailwind</li>
              <li>Three.js · Framer Motion</li>
              <li>Type: Archivo / JetBrains Mono</li>
            </ul>
          </div>
          <div className="lg:text-right">
            <p className="mono-xs text-text-muted mb-4">Elsewhere</p>
            <div className="flex flex-col gap-1.5 lg:items-end">
              <a href="https://github.com/rohit27m" target="_blank" rel="noreferrer" className="font-mono text-xs text-text-bright link-underline">GitHub ↗</a>
              <a href="https://linkedin.com/in/rohitmunamarthi" target="_blank" rel="noreferrer" className="font-mono text-xs text-text-bright link-underline">LinkedIn ↗</a>
              <a href="mailto:rohit27m@hotmail.com" className="font-mono text-xs text-text-bright link-underline">Email ↗</a>
            </div>
          </div>
        </div>
      </div>

      {/* Closing wordmark — set oversized and deliberately cropped by the page edge */}
      <div className="section-container">
        <motion.div
          initial={{ y: '18%', opacity: 0 }}
          whileInView={{ y: '0%', opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="display leading-[0.78] select-none pointer-events-none"
          style={{ fontSize: 'clamp(3.4rem, 13.5vw, 13rem)', marginBottom: '-0.18em' }}
        >
          Rohit<span className="outline-type"> Munamarthi</span>
        </motion.div>
      </div>

      <div className="section-container border-t border-border py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="mono-xs text-text-muted">
          © {year} — Hyderabad, India
        </p>
        <a href="#hero" className="btn-ghost py-0!">
          Back to top
        </a>
      </div>
    </footer>
  );
}
