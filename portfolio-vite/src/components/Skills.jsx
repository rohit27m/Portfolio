import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1];

const groups = [
  {
    category: 'Languages',
    note: 'Java is the daily driver; JS for anything with a screen.',
    items: ['Java', 'JavaScript', 'Python', 'SQL'],
  },
  {
    category: 'AI / ML',
    note: 'Classical models for tabular work, CV for anything with a camera.',
    items: ['Scikit-Learn', 'TensorFlow', 'OpenCV', 'DeepFace', 'Ollama'],
  },
  {
    category: 'Web',
    note: 'React on the front, Spring Boot or Node behind it.',
    items: ['React', 'Next.js', 'Node.js', 'Spring Boot', 'Tailwind'],
  },
  {
    category: 'Data',
    note: 'Schema first — I model before I write a query.',
    items: ['PostgreSQL', 'MySQL', 'Supabase', 'Firebase'],
  },
  {
    category: 'Ship',
    note: 'Containerise, deploy, watch it, fix it.',
    items: ['Docker', 'Git', 'Vercel', 'Postman'],
  },
];

export function Skills() {
  const [active, setActive] = useState(null);
  const current = active !== null ? groups[active] : null;

  return (
    <section id="skills" className="py-24 md:py-36 border-t border-border">
      <div className="section-container">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">

          {/* Left — heading + the word the pointer is currently on */}
          <div className="lg:col-span-5 lg:sticky lg:top-32 lg:self-start">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="marker mb-7"
            >
              02 / Stack
            </motion.p>

            <h2 className="display d-xl mb-8">
              <span className="clip-line">
                <motion.span
                  initial={{ y: '108%' }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.9, ease }}
                  className="block"
                >
                  End to end<span className="dot">.</span>
                </motion.span>
              </span>
            </h2>

            {/* Reactive readout — replaces a paragraph nobody reads */}
            <div className="hidden lg:block h-28 relative border-l-2 border-accent pl-5">
              <AnimatePresence mode="wait">
                {current ? (
                  <motion.div
                    key={current.category}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.3, ease }}
                  >
                    <p className="display-wide text-text-bright text-2xl mb-2">{current.category}</p>
                    <p className="text-sm text-text-main font-light max-w-xs leading-relaxed">
                      {current.note}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="rest"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="mono-xs text-text-muted mb-2">Index</p>
                    <p className="text-sm text-text-main font-light max-w-xs leading-relaxed">
                      Five groups, no progress bars. Hover a row for what I
                      actually use it for.
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Right — the index itself */}
          <div
            className="lg:col-span-7 lg:pt-4"
            onMouseLeave={() => setActive(null)}
          >
            <div className="border-b border-border">
              {groups.map((group, i) => (
                <motion.div
                  key={group.category}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-50px' }}
                  transition={{ duration: 0.5, delay: i * 0.05, ease }}
                  onMouseEnter={() => setActive(i)}
                  className="relative border-t border-border py-6 md:py-7 overflow-hidden"
                >
                  {/* fill that wipes in behind the row */}
                  <span
                    className={`absolute inset-0 bg-surface origin-left transition-transform
                                duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]
                                ${active === i ? 'scale-x-100' : 'scale-x-0'}`}
                  />
                  <span
                    className={`absolute left-0 top-0 h-full w-[2px] bg-accent origin-top
                                transition-transform duration-500
                                ${active === i ? 'scale-y-100' : 'scale-y-0'}`}
                  />

                  <div className="relative grid md:grid-cols-[1.5rem_9rem_1fr] gap-x-6 gap-y-3 items-baseline px-0 md:px-5">
                    <span className="hidden md:block font-mono text-[11px] text-text-muted tabular-nums">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <h3
                      className={`display-wide text-base tracking-wide transition-colors duration-300
                                  ${active === i ? 'text-accent' : 'text-text-bright'}`}
                    >
                      {group.category}
                    </h3>
                    <ul className="flex flex-wrap gap-x-5 gap-y-2">
                      {group.items.map((item) => (
                        <li
                          key={item}
                          className={`text-sm font-light transition-colors duration-300
                                      ${active === i ? 'text-text-bright' : 'text-text-muted'}`}
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* on touch, the note is always visible instead of on hover */}
                  <p className="lg:hidden relative mono-xs text-text-muted mt-3 px-0 md:px-5">
                    {group.note}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
