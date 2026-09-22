import { useEffect, useRef } from 'react';
import { pointer } from '../lib/pointer';

/**
 * Two-part cursor: a lagging ring and an exact-tracking signal dot.
 * The native cursor stays visible — this reads as instrumentation on top of it,
 * not a replacement for it. Written straight to style in one rAF; no state.
 */
export function CursorGlow() {
  const ring = useRef(null);
  const dot = useRef(null);

  useEffect(() => {
    if (!pointer.fine) return;

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let s = 1;
    let raf = 0;

    const tick = () => {
      x += (pointer.cx - x) * 0.16;
      y += (pointer.cy - y) * 0.16;
      const target = pointer.interactive ? 2 : 1;
      s += (target - s) * 0.14;

      if (ring.current) {
        ring.current.style.transform = `translate3d(${x - 15}px, ${y - 15}px, 0) scale(${s.toFixed(3)})`;
        ring.current.style.borderColor = pointer.interactive ? 'var(--color-accent)' : 'var(--color-bone)';
      }
      if (dot.current) {
        dot.current.style.transform = `translate3d(${pointer.cx - 2}px, ${pointer.cy - 2}px, 0)`;
        dot.current.style.opacity = pointer.interactive ? '0' : '1';
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <>
      <div
        ref={ring}
        aria-hidden
        className="fixed top-0 left-0 w-[30px] h-[30px] border rounded-full pointer-events-none
                   z-[90] hidden md:block will-change-transform"
        style={{ borderColor: 'var(--color-bone)', transition: 'border-color .25s ease' }}
      />
      <div
        ref={dot}
        aria-hidden
        className="fixed top-0 left-0 w-1 h-1 bg-accent pointer-events-none z-[91]
                   hidden md:block will-change-transform"
      />
    </>
  );
}
