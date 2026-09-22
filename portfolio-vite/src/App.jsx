import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero3D } from './components/Hero3D';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Experience } from './components/Experience';
import { Projects } from './components/Projects';
import { Statement } from './components/Statement';
import { Ticker } from './components/Ticker';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { CursorGlow } from './components/CursorGlow';
import { initPointer } from './lib/pointer';

const BOOT_MS = 1050;

/** Cold-start plate. A counter, a name, then it leaves upward with the seam lit. */
function Boot() {
  const [n, setN] = useState(0);
  const raf = useRef(0);

  useEffect(() => {
    const t0 = performance.now();
    const step = (t) => {
      const p = Math.min(1, (t - t0) / (BOOT_MS - 120));
      // ease-out so the count decelerates into 100 instead of ticking linearly
      setN(Math.round((1 - Math.pow(1 - p, 2.2)) * 100));
      if (p < 1) raf.current = requestAnimationFrame(step);
    };
    raf.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf.current);
  }, []);

  return (
    <motion.div
      key="boot"
      exit={{ y: '-100%' }}
      transition={{ duration: 0.78, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[100] bg-void flex flex-col justify-between p-5 sm:p-8 md:p-12"
    >
      <div className="flex items-start justify-between">
        <span className="mono-xs text-text-muted">Rohit Munamarthi</span>
        <span className="mono-xs text-text-muted tabular-nums">
          {String(n).padStart(3, '0')}
        </span>
      </div>

      <div className="overflow-hidden">
        <motion.h1
          initial={{ y: '110%' }}
          animate={{ y: 0 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="display d-xl"
        >
          AI/ML &amp; Full-stack<span className="dot">.</span>
        </motion.h1>
      </div>

      <div>
        <div className="h-[2px] w-full bg-border relative overflow-hidden mb-4">
          <motion.span
            className="absolute inset-0 bg-accent origin-left"
            style={{ transform: `scaleX(${n / 100})` }}
          />
        </div>
        <div className="flex items-center justify-between">
          <span className="mono-xs text-text-muted">Hyderabad, IN</span>
          <span className="mono-xs text-text-muted">Loading experience</span>
        </div>
      </div>
    </motion.div>
  );
}

function App() {
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    const dispose = initPointer();
    // Warm the WebGL chunk while the plate is still up, so the head is there
    // the instant the curtain lifts — the boot beat pays for the download.
    import('./three/RobotScene');
    const id = setTimeout(() => setBooting(false), BOOT_MS);
    return () => {
      clearTimeout(id);
      dispose();
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence mode="wait">{booting && <Boot />}</AnimatePresence>

      {/* Film grain — one static tile, composited once, never animated */}
      <div
        aria-hidden
        className="grain fixed inset-0 z-[85] pointer-events-none opacity-[0.05] mix-blend-overlay"
      />

      {!booting && (
        <div className="relative">
          <CursorGlow />
          <Navbar />

          <main>
            <Hero3D />

            <div className="relative z-10 bg-primary border-t border-border">
              <About />
              <Skills />
              <Experience />

              {/* The impact beat: a held breath before the work itself */}
              <Statement
                primary="Train the model"
                accent="—"
                secondary="then earn the trust"
                caption="Local inference where data shouldn't travel. A consent gate before a single frame is read. The unglamorous half is the half that ships."
              />

              <Projects />

              {/* Kinetic hand-off into contact — big type, always running */}
              <div className="border-b border-border bg-void py-6 md:py-9">
                <Ticker
                  items={['Open to 2026 internships', 'AI / ML', 'Full-stack', 'Hyderabad or remote']}
                  reverse
                  separator="✦"
                  className="w-full"
                  itemClassName="display text-[9vw] md:text-[6.5vw] leading-none text-text-bright"
                />
              </div>

              <Contact />
              <Footer />
            </div>
          </main>
        </div>
      )}
    </MotionConfig>
  );
}

export default App;
