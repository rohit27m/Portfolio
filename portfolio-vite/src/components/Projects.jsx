import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { HintStack, TenantGrid, ScanReticle } from './ProjectVisual';

const ease = [0.16, 1, 0.3, 1];

const projects = [
  {
    number: '01',
    title: 'AI Study Assistant',
    year: '2026',
    type: 'Local LLM · Full-stack',
    sig: '#FF4A17',
    Visual: HintStack,
    what: 'A learning assistant running Ollama Phi-3 entirely on-device. It answers with graded hints instead of solutions, so a student is walked to the answer rather than handed it.',
    role: 'Designed the hint-grading prompt chain, built the Next.js client, modelled sessions and progress in Supabase/Postgres, shipped on Vercel.',
    why: 'Nothing leaves the machine, so it can be used where student data cannot be sent to a third-party API.',
    metric: { value: 'Hint-first', label: 'coaches, never spoon-feeds' },
    stack: ['Ollama', 'Phi-3', 'Next.js', 'Supabase', 'PostgreSQL'],
    href: 'https://github.com/rohit27m',
  },
  {
    number: '02',
    title: 'RestoManagement',
    year: '2026',
    type: 'SaaS · Multi-tenant',
    sig: '#F5A524',
    Visual: TenantGrid,
    what: 'A subscription restaurant platform covering order tracking, table booking and invoicing — architected multi-tenant so many businesses run against one deployment with scoped data.',
    role: 'Owned the tenant-scoping model and Postgres schema, built the ordering and booking flows in Next.js, wired the Node service layer and billing states.',
    why: 'Onboarding a new restaurant is a row, not a redeploy — the difference between a demo and something sellable.',
    metric: { value: 'Multi-tenant', label: 'one deploy, N businesses' },
    stack: ['Next.js', 'Node.js', 'PostgreSQL', 'Docker'],
    href: 'https://github.com/rohit27m',
  },
  {
    number: '03',
    title: 'Coconut AI',
    year: '2024',
    type: 'Computer vision',
    sig: '#5FD3C4',
    Visual: ScanReticle,
    what: 'An emotion-aware chatbot that reads facial expression through DeepFace and OpenCV and shapes its reply tone accordingly — behind an explicit consent gate before any frame is captured.',
    role: 'Built the capture and inference pipeline, tuned the classifier for webcam-grade frames, mapped valence to response tone, and designed the consent flow.',
    why: 'Affective input changes how a reply should land; the consent gate is the part most demos skip.',
    metric: { value: '73%', label: 'emotion-classification accuracy' },
    stack: ['Python', 'OpenCV', 'DeepFace'],
    href: 'https://github.com/rohit27m',
  },
];

function Project({ project, index }) {
  const host = useRef(null);
  const { scrollYProgress } = useScroll({
    target: host,
    offset: ['start end', 'end start'],
  });
  const panelY = useTransform(scrollYProgress, [0, 1], ['6%', '-6%']);
  const flip = index % 2 === 1;
  const { Visual } = project;

  return (
    <article
      ref={host}
      style={{ '--sig': project.sig }}
      className="group relative border-t border-border"
    >
      {/* signal rule that draws across on hover */}
      <span
        className="absolute -top-px left-0 h-[2px] w-full origin-left scale-x-0
                   group-hover:scale-x-100 transition-transform duration-[900ms]
                   ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ background: 'var(--sig)' }}
      />
      {/* the project's hue bleeding into the environment */}
      <span
        aria-hidden
        className="sig-wash absolute inset-0 opacity-0 group-hover:opacity-[0.07]
                   transition-opacity duration-700 pointer-events-none"
      />

      <div className="section-container relative py-14 md:py-24">
        {/* --- header: hollow index behind the title -------------------- */}
        <div className="relative mb-10 md:mb-16">
          <span
            aria-hidden
            className="display select-none absolute -top-6 md:-top-12 -left-2 leading-none
                       outline-type opacity-60 group-hover:opacity-100 transition-opacity duration-700"
            style={{ fontSize: 'clamp(6rem, 17vw, 15rem)' }}
          >
            {project.number}
          </span>

          <div className="relative pt-10 md:pt-20 pl-0 md:pl-[7vw]">
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-4">
              <span className="mono-xs text-text-muted">{project.year}</span>
              <span className="w-8 h-px bg-border" />
              <span className="mono-xs" style={{ color: 'var(--sig)' }}>{project.type}</span>
            </div>
            <h3 className="display d-lg transition-colors duration-500 group-hover:text-[color:var(--sig)]">
              {project.title}
            </h3>
          </div>
        </div>

        {/* --- body: drawn panel + copy ---------------------------------- */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <motion.div
            style={{ y: panelY }}
            className={`lg:col-span-5 ${flip ? 'lg:order-2 lg:col-start-8' : ''}`}
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-void border border-border">
              <motion.span
                initial={{ scaleY: 1 }}
                whileInView={{ scaleY: 0 }}
                viewport={{ once: true, margin: '-90px' }}
                transition={{ duration: 1.05, ease }}
                className="absolute inset-0 bg-primary z-10 origin-top"
              />
              <Visual />
            </div>
          </motion.div>

          <div className={`lg:col-span-6 ${flip ? 'lg:order-1 lg:col-start-1' : 'lg:col-start-7'}`}>
            <motion.div
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-90px' }}
              transition={{ duration: 0.8, ease }}
            >
              <p className="body-text text-text-main max-w-xl mb-9">{project.what}</p>

              <dl className="border-t border-border">
                <div className="grid grid-cols-1 sm:grid-cols-[7rem_1fr] gap-1 sm:gap-6 py-5 border-b border-border">
                  <dt className="mono-xs text-text-muted pt-1">My role</dt>
                  <dd className="text-sm md:text-[0.95rem] text-text-bright font-light leading-relaxed">
                    {project.role}
                  </dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-[7rem_1fr] gap-1 sm:gap-6 py-5 border-b border-border">
                  <dt className="mono-xs text-text-muted pt-1">Why it matters</dt>
                  <dd className="text-sm md:text-[0.95rem] text-text-main font-light leading-relaxed">
                    {project.why}
                  </dd>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-[7rem_1fr] gap-2 sm:gap-6 py-5 border-b border-border">
                  <dt className="mono-xs text-text-muted pt-1">Built with</dt>
                  <dd className="flex flex-wrap gap-x-4 gap-y-2">
                    {project.stack.map((tech) => (
                      <span key={tech} className="font-mono text-xs text-text-main">
                        {tech}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>

              <div className="flex flex-wrap items-end justify-between gap-8 mt-10">
                <div>
                  <p
                    className="display-wide text-3xl md:text-4xl mb-1 tabular-nums"
                    style={{ color: 'var(--sig)' }}
                  >
                    {project.metric.value}
                  </p>
                  <p className="mono-xs text-text-muted">{project.metric.label}</p>
                </div>

                <a
                  href={project.href}
                  target="_blank"
                  rel="noreferrer"
                  className="btn-ghost text-text-bright!"
                >
                  Source
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  return (
    <section id="projects" className="relative pt-24 md:pt-32">
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
              04 / Selected work
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
                  Three builds<span className="dot">.</span>
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
            A local language model, a computer-vision pipeline, and a
            multi-tenant product. Each one shipped end to end.
          </motion.p>
        </div>
      </div>

      <div className="border-b border-border">
        {projects.map((p, i) => (
          <Project key={p.number} project={p} index={i} />
        ))}
      </div>
    </section>
  );
}
