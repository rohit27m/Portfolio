import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/**
 * The impact beat between chapters. Two oversized lines shear past each other
 * as you scroll — the solid one left, the hollow one right. Scroll-linked
 * transform only, so it costs nothing but a composited layer.
 */
export function Statement({ primary, secondary, caption, accent }) {
  const host = useRef(null);
  const { scrollYProgress } = useScroll({
    target: host,
    offset: ['start end', 'end start'],
  });

  const xa = useTransform(scrollYProgress, [0, 1], ['12%', '-26%']);
  const xb = useTransform(scrollYProgress, [0, 1], ['-24%', '14%']);
  const fade = useTransform(scrollYProgress, [0.12, 0.4, 0.72, 0.95], [0, 1, 1, 0]);

  return (
    <section
      ref={host}
      aria-label={`${primary} ${secondary}`}
      className="relative py-24 md:py-36 overflow-hidden border-y border-border bg-void"
    >
      <div className="ticks h-3 w-full opacity-70" />

      <div className="py-14 md:py-24">
        <motion.div style={{ x: xa }} className="display d-xl whitespace-nowrap will-change-transform">
          {primary}
          {accent && <span className="text-accent"> {accent}</span>}
        </motion.div>
        <motion.div
          style={{ x: xb }}
          className="display d-xl whitespace-nowrap outline-type will-change-transform"
        >
          {secondary}
        </motion.div>
      </div>

      <div className="ticks h-3 w-full opacity-70" />

      {caption && (
        <motion.p
          style={{ opacity: fade }}
          className="section-container mono-xs text-text-muted mt-10 md:mt-14 max-w-md"
        >
          {caption}
        </motion.p>
      )}
    </section>
  );
}
