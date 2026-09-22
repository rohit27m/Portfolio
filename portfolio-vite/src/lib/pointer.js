/**
 * Single source of truth for pointer state.
 *
 * One passive listener for the whole app. Consumers (the robot's eyes, the
 * cursor ring, the hero light) read the mutable object inside their own
 * animation frame instead of subscribing — no React re-renders, no per-effect
 * listeners, no work done on a moved pixel that nobody will draw.
 */

export const pointer = {
  nx: 0,          // -1..1, viewport-normalised X
  ny: 0,          // -1..1, viewport-normalised Y (down positive)
  cx: 0,          // client px
  cy: 0,
  speed: 0,       // smoothed magnitude, normalised units per event
  lastMove: 0,    // performance.now() of last real movement
  engaged: false, // pointer has actually moved at least once
  fine: false,    // has a real mouse/trackpad
  interactive: false, // currently over a link/button
};

let started = false;

export function initPointer() {
  if (started || typeof window === 'undefined') return () => {};
  started = true;

  pointer.fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  pointer.cx = window.innerWidth / 2;
  pointer.cy = window.innerHeight / 2;

  let prevX = pointer.cx;
  let prevY = pointer.cy;

  const onMove = (e) => {
    const w = window.innerWidth || 1;
    const h = window.innerHeight || 1;

    pointer.cx = e.clientX;
    pointer.cy = e.clientY;
    pointer.nx = (e.clientX / w) * 2 - 1;
    pointer.ny = (e.clientY / h) * 2 - 1;

    // Smoothed speed — drives the "snap to attention" boost on the robot.
    const d = Math.hypot(e.clientX - prevX, e.clientY - prevY) / w;
    pointer.speed += (d - pointer.speed) * 0.35;
    prevX = e.clientX;
    prevY = e.clientY;

    pointer.lastMove = performance.now();
    pointer.engaged = true;

    document.documentElement.style.setProperty('--mx', `${e.clientX}px`);
    document.documentElement.style.setProperty('--my', `${e.clientY}px`);
  };

  const onOver = (e) => {
    const t = e.target;
    pointer.interactive = !!(
      t instanceof Element && t.closest('a, button, [data-cursor]')
    );
  };

  const onLeave = () => {
    pointer.engaged = false;
  };

  window.addEventListener('pointermove', onMove, { passive: true });
  window.addEventListener('pointerover', onOver, { passive: true });
  window.addEventListener('pointerdown', onMove, { passive: true });
  document.addEventListener('pointerleave', onLeave, { passive: true });

  return () => {
    window.removeEventListener('pointermove', onMove);
    window.removeEventListener('pointerover', onOver);
    window.removeEventListener('pointerdown', onMove);
    document.removeEventListener('pointerleave', onLeave);
    started = false;
  };
}
