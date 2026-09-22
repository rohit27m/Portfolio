/**
 * Seamless kinetic strip. Content is duplicated once and the track shifts -50%,
 * so the loop is exact regardless of item widths. Pure CSS animation on a
 * single transform — no JS in the frame path.
 *
 * The visible track is hidden from assistive tech (it reads every item twice);
 * a plain sentence carries the same content instead.
 */
export function Ticker({
  items,
  reverse = false,
  className = '',
  itemClassName = '',
  separator = '/',
}) {
  const run = [...items, ...items];

  return (
    <div className={`marquee-host relative overflow-hidden ${className}`}>
      <span className="sr-only">{items.join(', ')}</span>
      <div className={`marquee ${reverse ? 'marquee-run-rev' : 'marquee-run'}`} aria-hidden>
        {run.map((item, i) => (
          <span key={`${item}-${i}`} className={`flex items-center shrink-0 ${itemClassName}`}>
            <span>{item}</span>
            <span className="mx-6 md:mx-9 text-accent">{separator}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
