import { motion } from 'framer-motion';

const ease = [0.16, 1, 0.3, 1];

const roles = [
  {
    n: '02',
    period: 'May 2025 — Jun 2025',
    company: 'Volante Technologies',
    role: 'AI & Automation Testing Intern · Workflow Designer',
    points: [
      'Designed AI-driven automation workflows for enterprise financial systems.',
      'Built intelligent test cases that improved reliability and cut manual testing.',
      'Partnered with engineering to streamline workflow orchestration.',
    ],
  },
  {
    n: '01',
    period: 'Nov 2024 — Apr 2025',
    company: 'LiteThink AI',
    role: 'Product Tester · Front-End Developer',
    points: [
      'Ran functional and UI testing across AI SaaS products.',
      'Built responsive front-end components and sharpened the user experience.',
      'Tracked down and resolved issues to keep the platform stable.',
    ],
  },
];

export function Experience() {
  return (
    <section id="experience" className="py-24 md:py-36 border-t border-border">
      <div className="section-container">
        <div className="grid lg:grid-cols-12 gap-8 mb-14 md:mb-20">
          <div className="lg:col-span-7">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="marker mb-7"
            >
              03 / Experience
            </motion.p>
            <h2 className="display d-xl">
              <span className="clip-line">
                <motion.span
                  initial={{ y: '108%' }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.95, ease }}
                  className="block"
                >
                  In production<span className="dot">.</span>
                </motion.span>
              </span>
            </h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="lg:col-span-4 lg:col-start-9 body-text text-text-muted lg:pt-4"
          >
            Two internships where the work went out to real users — automation
            for financial systems, and the front-ends of AI SaaS products.
          </motion.p>
        </div>
      </div>

      {/* Rows read latest-first; the index counts the other way, like a log. */}
      <div className="border-t border-border">
        {roles.map((r, i) => (
          <motion.article
            key={r.company}
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.75, delay: i * 0.06, ease }}
            className="group relative border-b border-border"
          >
            <span className="absolute top-0 left-0 h-full w-[2px] bg-accent origin-top scale-y-0
                             group-hover:scale-y-100 transition-transform duration-[700ms]
                             ease-[cubic-bezier(0.16,1,0.3,1)]" />

            <div className="section-container py-10 md:py-16">
              <div className="grid lg:grid-cols-12 gap-y-7 gap-x-12">
                <div className="lg:col-span-5">
                  <div className="flex items-center gap-4 mb-4">
                    <span className="font-mono text-[10px] text-accent tabular-nums">{r.n}</span>
                    <span className="w-8 h-px bg-border" />
                    <span className="mono-xs text-text-muted">{r.period}</span>
                  </div>
                  <h3 className="display text-3xl md:text-5xl leading-[0.9] transition-colors
                                 duration-500 group-hover:text-accent">
                    {r.company}
                  </h3>
                </div>

                <div className="lg:col-span-7">
                  <p className="display-wide text-text-bright text-sm md:text-base mb-6">
                    {r.role}
                  </p>
                  <ul className="max-w-2xl border-t border-border">
                    {r.points.map((p) => (
                      <li
                        key={p}
                        className="flex gap-4 py-3.5 border-b border-border text-sm md:text-[0.95rem]
                                   text-text-main font-light leading-relaxed"
                      >
                        <span className="mt-2 h-1 w-1 shrink-0 bg-accent-muted" aria-hidden />
                        <span>{p}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
