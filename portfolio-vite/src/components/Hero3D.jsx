import { lazy, Suspense, useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Ticker } from './Ticker';

// three + fiber + drei is the heaviest thing on the page. Split it out so the
// headline paints on the first chunk and the head arrives a beat later.
const RobotScene = lazy(() =>
  import('../three/RobotScene').then((m) => ({ default: m.RobotScene }))
);

const ease = [0.16, 1, 0.3, 1];

const STACK = [
  'React', 'Next.js', 'Spring Boot', 'PostgreSQL', 'TensorFlow',
  'OpenCV', 'Ollama', 'Docker', 'Supabase', 'Java',
];

function LocalClock() {
  const [now, setNow] = useState('');
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit', minute: '2-digit', second: '2-digit',
      hour12: false, timeZone: 'Asia/Kolkata',
    });
    const tick = () => setNow(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return <span className="tabular-nums">{now} IST</span>;
}

export function Hero3D() {
  const host = useRef(null);
  const { scrollYProgress } = useScroll({
    target: host,
    offset: ['start start', 'end start'],
  });
  // The headline sinks and dims as you leave — the hero hands off, it doesn't cut.
  const typeY = useTransform(scrollYProgress, [0, 1], ['0%', '-22%']);
  const typeOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section
      id="hero"
      ref={host}
      className="relative w-full min-h-[100svh] overflow-hidden flex flex-col justify-end"
    >
      <Suspense fallback={<div className="absolute inset-0 -z-10 bg-primary" />}>
        <RobotScene />
      </Suspense>

      {/* Scrim. Angled and left-weighted on desktop so the head stays exposed
          on the right; bottom-up on mobile, where the head is centred. */}
      <div
        className="absolute inset-0 -z-[5] pointer-events-none hidden lg:block"
        style={{
          background:
            'linear-gradient(100deg, #0A0A0C 0%, rgba(10,10,12,0.94) 26%, rgba(10,10,12,0.55) 52%, rgba(10,10,12,0) 78%)',
        }}
      />
      <div
        className="absolute inset-0 -z-[5] pointer-events-none lg:hidden"
        style={{
          background:
            'linear-gradient(to top, #0A0A0C 0%, rgba(10,10,12,0.96) 34%, rgba(10,10,12,0.55) 56%, rgba(10,10,12,0) 74%)',
        }}
      />

      {/* --- Left vertical rail ------------------------------------------- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.9 }}
        className="hidden lg:flex absolute left-5 top-1/2 -translate-y-1/2 z-10 flex-col items-center gap-6"
      >
        <span className="w-px h-20 bg-border" />
        <span
          className="mono-xs text-text-muted"
          style={{ writingMode: 'vertical-rl' }}
        >
          17.3850°N&nbsp; 78.4867°E
        </span>
        <span className="w-px h-20 bg-border" />
      </motion.div>

      {/* --- Right status block ------------------------------------------- */}
      <motion.div
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.9, ease }}
        className="hidden md:block absolute right-5 lg:right-8 top-1/2 -translate-y-1/2 z-10 text-right"
      >
        <div className="border-r-2 border-accent pr-4 py-1">
          <p className="mono-xs text-text-muted mb-2">Status</p>
          <p className="mono-xs text-text-bright mb-1">Open · 2026</p>
          <p className="mono-xs text-text-muted"><LocalClock /></p>
        </div>
      </motion.div>

      {/* --- Type block ---------------------------------------------------- */}
      <motion.div
        style={{ y: typeY, opacity: typeOpacity }}
        className="relative z-10 section-container w-full pt-32 pb-10 md:pb-14 pointer-events-none"
      >
        {/* Spec header */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="flex flex-wrap items-center gap-x-6 gap-y-2 mb-7 md:mb-10"
        >
          <span className="mono-xs text-accent font-bold">Rohit Munamarthi</span>
          <span className="hidden sm:block w-16 h-px bg-border" />
          <span className="mono-xs text-text-muted">AI/ML &amp; Full-Stack Engineer</span>
          <span className="hidden sm:block w-16 h-px bg-border" />
          <span className="mono-xs text-text-muted">Hyderabad, IN</span>
        </motion.div>

        {/* THE headline. Compressed, uppercase, cut tight, third line hollowed
            out so the head reads through it — one layer, not two graphics. */}
        <h1 className="display d-hero mb-8 md:mb-10 -ml-[0.02em]">
          {[
            { text: 'Building', hollow: false },
            { text: 'software', hollow: false },
            { text: 'that learns', hollow: true },
          ].map((line, i) => (
            <span key={line.text} className="clip-line">
              <motion.span
                initial={{ y: '108%' }}
                animate={{ y: 0 }}
                transition={{ duration: 1, delay: 0.12 + i * 0.085, ease }}
                className="block"
              >
                <span className={line.hollow ? 'outline-type' : undefined}>{line.text}</span>
                {i === 2 && <span className="dot">.</span>}
              </motion.span>
            </span>
          ))}
        </h1>

        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-end">
          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease }}
            className="md:col-span-6 lg:col-span-5 body-text max-w-lg"
          >
            CS undergrad shipping AI-powered products end to end — locally-run
            LLM tooling, emotion-aware computer vision, and multi-tenant SaaS.
            <span className="text-text-bright"> I build the model and the product around it.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.62, ease }}
            className="md:col-span-6 lg:col-span-5 lg:col-start-8 flex flex-wrap items-center gap-x-8 gap-y-3 pointer-events-auto"
          >
            <a href="#projects" className="btn-blade">
              <span>Selected work</span>
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                <path strokeLinecap="square" d="M4 12h15m0 0l-5-5m5 5l-5 5" />
              </svg>
            </a>
            <a href="/resume.pdf" target="_blank" rel="noreferrer" className="btn-ghost">
              Résumé
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* --- Bottom instrument strip -------------------------------------- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 0.8 }}
        className="relative z-10 border-t border-border bg-primary/70 backdrop-blur-sm"
      >
        <div className="flex items-stretch">
          <div className="hidden sm:flex items-center gap-3 px-5 md:px-12 border-r border-border shrink-0">
            <span className="w-1.5 h-1.5 bg-accent" style={{ animation: 'pulse-signal 2s ease-in-out infinite' }} />
            <span className="mono-xs text-text-muted">Stack</span>
          </div>
          <Ticker
            items={STACK}
            className="flex-1 py-3.5"
            itemClassName="mono-xs text-text-main"
          />
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-24 left-5 sm:left-8 md:left-12 lg:left-16 z-10 hidden md:flex items-center gap-3"
      >
        <div className="w-16 h-px bg-border relative overflow-hidden">
          <motion.span
            className="absolute inset-0 bg-accent origin-left"
            animate={{ scaleX: [0, 1, 1], x: ['0%', '0%', '100%'] }}
            transition={{ repeat: Infinity, duration: 2.2, ease: 'easeInOut' }}
          />
        </div>
        <span className="mono-xs text-text-muted">Scroll</span>
      </motion.div>
    </section>
  );
}
