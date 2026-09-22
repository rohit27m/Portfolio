import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const ease = [0.16, 1, 0.3, 1];
const EMAIL = 'rohit27m@hotmail.com';

const links = [
  { label: 'GitHub', handle: '/rohit27m', href: 'https://github.com/rohit27m', Icon: FaGithub },
  { label: 'LinkedIn', handle: '/rohitmunamarthi', href: 'https://linkedin.com/in/rohitmunamarthi', Icon: FaLinkedin },
  { label: 'Résumé', handle: 'PDF ↗', href: '/resume.pdf', Icon: null },
];

/** Per-character lift on hover — the one place letters are allowed to move. */
function KineticEmail() {
  return (
    <a
      href={`mailto:${EMAIL}`}
      className="group inline-flex flex-wrap w-fit display-wide text-text-bright
                 text-[clamp(1.5rem,5.2vw,4.2rem)] leading-none tracking-tight
                 hover:text-accent transition-colors duration-500"
      aria-label={`Email ${EMAIL}`}
    >
      {EMAIL.split('').map((ch, i) => (
        <span
          key={`${ch}-${i}`}
          className="inline-block transition-transform duration-[420ms] ease-[cubic-bezier(0.16,1,0.3,1)]
                     group-hover:-translate-y-[0.11em]"
          style={{ transitionDelay: `${i * 16}ms` }}
        >
          {ch}
        </span>
      ))}
    </a>
  );
}

export function Contact() {
  return (
    <section id="contact" className="relative py-24 md:py-36 border-t border-border">
      <div className="section-container">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="marker mb-8"
        >
          05 / Contact
        </motion.p>

        <h2 className="display d-hero mb-14 md:mb-20">
          {['Let’s build', 'something'].map((line, i) => (
            <span key={line} className="clip-line">
              <motion.span
                initial={{ y: '108%' }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: '-90px' }}
                transition={{ duration: 0.95, delay: i * 0.07, ease }}
                className="block"
              >
                <span className={i === 1 ? 'outline-type' : undefined}>{line}</span>
                {i === 1 && <span className="dot">.</span>}
              </motion.span>
            </span>
          ))}
        </h2>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease }}
            >
              <div className="inline-flex items-center gap-3 border border-border pl-3 pr-4 py-2 mb-8">
                <span
                  className="w-1.5 h-1.5 bg-accent"
                  style={{ animation: 'pulse-signal 2s ease-in-out infinite' }}
                />
                <span className="mono-xs text-text-bright">Available · 2026 internships</span>
              </div>

              <p className="body-text text-text-main max-w-md mb-10">
                Looking for AI/ML and full-stack roles — Hyderabad or remote. If
                you have an opening, a hard problem, or just want to compare
                notes, the inbox is open and I reply.
              </p>

              <a href={`mailto:${EMAIL}`} className="btn-blade">
                <span>Send a message</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                  <path strokeLinecap="square" d="M4 12h15m0 0l-5-5m5 5l-5 5" />
                </svg>
              </a>
            </motion.div>
          </div>

          <motion.div
            className="lg:col-span-7 lg:col-start-6"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75, delay: 0.12, ease }}
          >
            <p className="mono-xs text-text-muted mb-5">Direct</p>
            <div className="mb-14 overflow-hidden">
              <KineticEmail />
            </div>

            <div className="border-t border-border">
              {links.map(({ label, handle, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="group flex items-center justify-between gap-6 py-5 border-b border-border"
                >
                  <span className="flex items-center gap-3">
                    {Icon && (
                      <Icon
                        size={15}
                        className="text-text-muted group-hover:text-accent transition-colors duration-300"
                      />
                    )}
                    <span className="display-wide text-base text-text-bright">{label}</span>
                  </span>
                  <span className="flex items-center gap-4">
                    <span className="font-mono text-xs text-text-muted">{handle}</span>
                    <span className="inline-block text-accent transition-transform duration-500
                                     ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-2">
                      →
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
