import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1];

const metrics = [
  { value: '7.91', label: 'CGPA · B.Tech CSE' },
  { value: '140+', label: 'LeetCode solved' },
  { value: '02', label: 'Dev internships' },
  { value: '1.5K', label: 'HP PowerLab rank / 1.3M' },
];

export function About() {
  const host = useRef(null);
  const { scrollYProgress } = useScroll({
    target: host,
    offset: ['start end', 'end start'],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], ['8%', '-8%']);

  return (
    <section id="about" ref={host} className="py-24 md:py-36">
      <div className="section-container">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="marker mb-8"
        >
          01 / Profile
        </motion.p>

        {/* Heading, set large and left, third line hollowed for layering */}
        <h2 className="display d-xl mb-14 md:mb-20">
          {['Equal parts', 'ML engineer', '& builder'].map((line, i) => (
            <span key={line} className="clip-line">
              <motion.span
                initial={{ y: '108%' }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: '-90px' }}
                transition={{ duration: 0.95, delay: i * 0.07, ease }}
                className="block"
              >
                <span className={i === 2 ? 'outline-type' : undefined}>{line}</span>
                {i === 2 && <span className="dot">.</span>}
              </motion.span>
            </span>
          ))}
        </h2>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Portrait — hard-cut mask reveal, duotone until you look at it */}
          <motion.div style={{ y: portraitY }} className="lg:col-span-4">
            <div className="relative aspect-[4/5] overflow-hidden bg-surface group">
              <motion.span
                initial={{ scaleY: 1 }}
                whileInView={{ scaleY: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ duration: 1.1, ease }}
                className="absolute inset-0 bg-primary z-20 origin-top"
              />
              <span className="absolute inset-0 z-10 bg-accent opacity-[0.14] mix-blend-color
                               group-hover:opacity-0 transition-opacity duration-700 pointer-events-none" />
              <img
                src="/profile.jpg"
                alt="Rohit Munamarthi"
                loading="lazy"
                className="w-full h-full object-cover grayscale contrast-125 scale-[1.04]
                           group-hover:grayscale-0 group-hover:scale-100
                           transition-all duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
              />
              <span className="absolute left-0 bottom-0 z-20 bg-void px-3 py-1.5 mono-xs text-text-muted">
                Hyderabad, IN
              </span>
            </div>
          </motion.div>

          {/* Copy + experience */}
          <div className="lg:col-span-7 lg:col-start-6">
            <motion.div
              className="space-y-6 body-text mb-14 max-w-2xl"
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.85, ease }}
            >
              <p className="text-text-bright">
                I'm a Computer Science undergrad at the Institute of Aeronautical
                Engineering, Hyderabad, graduating May 2027.
              </p>
              <p>
                I work in the seam between machine learning and the product around
                it. Training a model is half the job — the other half is the
                schema, the latency, the consent screen, and the interface that
                makes any of it usable. I'd rather ship a small honest system than
                demo a large fragile one.
              </p>
            </motion.div>

            {/* Where I've worked lives in its own section — this stays profile. */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7 }}
              className="border-t border-border"
            >
              <p className="mono-xs text-text-muted py-4">Currently</p>
              <div className="grid sm:grid-cols-[1fr_1.4fr] gap-x-8 gap-y-2 py-6 border-t border-border">
                <div>
                  <p className="display-wide text-text-bright text-lg">
                    B.Tech Computer Science
                  </p>
                  <p className="mono-xs text-text-muted mt-1.5">IARE Hyderabad · 2027</p>
                </div>
                <p className="text-sm text-text-main font-light leading-relaxed">
                  Final stretch of the degree, building AI products alongside it and
                  looking for a 2026 internship where the two meet.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Metrics — full-bleed band, ruler-edged */}
      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '-80px' }}
        variants={{ show: { transition: { staggerChildren: 0.07 } } }}
        className="mt-20 md:mt-28 border-y border-border bg-void"
      >
        <div className="ticks h-3 w-full opacity-60" />
        <div className="section-container grid grid-cols-2 lg:grid-cols-4 gap-y-10 py-10 md:py-14">
          {metrics.map((m) => (
            <motion.div
              key={m.label}
              variants={{ hidden: { opacity: 0, y: 14 }, show: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.6, ease }}
              className="pl-4 lg:pl-6 border-l border-border"
            >
              <span className="block w-3 h-[2px] bg-accent mb-4" />
              <p className="display text-4xl md:text-6xl mb-2 tabular-nums leading-none">
                {m.value}
              </p>
              <p className="mono-xs text-text-muted leading-snug">{m.label}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
