/**
 * Project visuals are drawn, not photographed. Each one diagrams the actual
 * idea behind the build, so the panel carries information instead of filling
 * space — and there's no image payload to download. `--sig` is set by the
 * parent row, so each project's signal hue drives its own graphic.
 */

const FRAME = 'w-full h-full block';

/** 01 — hint-first LLM: the answer stays redacted, the nudge is lit. */
export function HintStack() {
  const bars = [86, 74, 92, 64, 80, 58, 88, 70, 46];
  return (
    <svg viewBox="0 0 400 500" className={FRAME} aria-hidden>
      <g stroke="#1D1D22" strokeWidth="1">
        {Array.from({ length: 10 }, (_, i) => (
          <line key={i} x1="0" y1={i * 50} x2="400" y2={i * 50} />
        ))}
      </g>
      <g>
        {bars.map((w, i) => {
          const lit = i === 4;
          return (
            <rect
              key={i}
              x="46"
              y={92 + i * 32}
              width={(w / 100) * 268}
              height="9"
              fill={lit ? 'var(--sig)' : '#26262E'}
              className={
                lit
                  ? 'transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-3'
                  : 'transition-opacity duration-700 group-hover:opacity-40'
              }
            />
          );
        })}
      </g>
      {/* prompt caret */}
      <rect
        x="34"
        y="86"
        width="3"
        height="21"
        fill="var(--sig)"
        className="transition-transform duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-[128px]"
      />
      <text x="46" y="60" fill="#56524A" fontFamily="JetBrains Mono, monospace" fontSize="11" letterSpacing="2.4">
        HINT ↑ &nbsp;ANSWER ✕
      </text>
      <g stroke="var(--sig)" strokeWidth="1.5" fill="none">
        <path d="M46 430h0M46 424v12M46 430h268" strokeOpacity="0.35" />
      </g>
      <text x="46" y="458" fill="#56524A" fontFamily="JetBrains Mono, monospace" fontSize="10" letterSpacing="2">
        PHI-3 · LOCAL · NO EGRESS
      </text>
    </svg>
  );
}

/** 02 — multi-tenant SaaS: one deployment, isolated columns. */
export function TenantGrid() {
  const cols = 6;
  const rows = 9;
  return (
    <svg viewBox="0 0 400 500" className={FRAME} aria-hidden>
      <g>
        {Array.from({ length: rows }, (_, r) =>
          Array.from({ length: cols }, (_, c) => {
            const lit = c === 3;
            return (
              <rect
                key={`${r}-${c}`}
                x={40 + c * 54}
                y={68 + r * 38}
                width="44"
                height="28"
                fill={lit ? 'var(--sig)' : 'transparent'}
                fillOpacity={lit ? 0.9 : 0}
                stroke={lit ? 'var(--sig)' : '#26262E'}
                strokeWidth="1"
                className="transition-all duration-500"
                style={{ transitionDelay: `${(r + c) * 22}ms` }}
              />
            );
          })
        )}
      </g>
      {/* isolation boundary that snaps closed on hover */}
      <rect
        x="196"
        y="56"
        width="88"
        height="392"
        fill="none"
        stroke="var(--sig)"
        strokeWidth="1"
        strokeDasharray="5 6"
        className="opacity-0 transition-opacity duration-500 group-hover:opacity-80"
      />
      <text x="40" y="40" fill="#56524A" fontFamily="JetBrains Mono, monospace" fontSize="11" letterSpacing="2.4">
        TENANTS &nbsp;01 → 06
      </text>
      <text x="40" y="480" fill="#56524A" fontFamily="JetBrains Mono, monospace" fontSize="10" letterSpacing="2">
        ONE DEPLOY · SCOPED DATA
      </text>
    </svg>
  );
}

/** 03 — emotion-aware CV: reticle, landmarks, consent scan. */
export function ScanReticle() {
  const marks = [
    [148, 196], [252, 196], [200, 236], [162, 292], [200, 302], [238, 292],
    [130, 150], [270, 150], [200, 140], [166, 342], [234, 342], [200, 356],
  ];
  return (
    <svg viewBox="0 0 400 500" className={FRAME} aria-hidden>
      <g stroke="#1D1D22" strokeWidth="1" fill="none">
        <circle cx="200" cy="250" r="150" />
        <circle cx="200" cy="250" r="104" />
        <circle cx="200" cy="250" r="58" />
        <line x1="200" y1="70" x2="200" y2="430" />
        <line x1="34" y1="250" x2="366" y2="250" />
      </g>

      {/* corner brackets */}
      <g stroke="var(--sig)" strokeWidth="2" fill="none">
        <path d="M52 116V82h34M348 116V82h-34M52 384v34h34M348 384v34h-34" />
      </g>

      {/* landmarks */}
      <g fill="var(--sig)">
        {marks.map(([x, y], i) => (
          <rect
            key={i}
            x={x - 3}
            y={y - 3}
            width="6"
            height="6"
            className="transition-opacity duration-500"
            style={{ transitionDelay: `${i * 40}ms` }}
          />
        ))}
      </g>
      <g stroke="var(--sig)" strokeWidth="1" strokeOpacity="0.45">
        <path d="M130 150 148 196 200 236 252 196 270 150M162 292 200 302 238 292M166 342 200 356 234 342" fill="none" />
      </g>

      {/* scan sweep */}
      <rect
        x="34"
        y="96"
        width="332"
        height="2"
        fill="var(--sig)"
        className="transition-transform duration-[1100ms] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-y-[300px]"
      />
      <text x="34" y="58" fill="#56524A" fontFamily="JetBrains Mono, monospace" fontSize="11" letterSpacing="2.4">
        CONSENT REQUIRED · DEEPFACE
      </text>
      <text x="34" y="470" fill="#56524A" fontFamily="JetBrains Mono, monospace" fontSize="10" letterSpacing="2">
        VALENCE → RESPONSE TONE
      </text>
    </svg>
  );
}
