import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import * as THREE from 'three';
import { pointer } from '../lib/pointer';

/**
 * SENTINEL — a machined observer.
 *
 * A precision-cut head unit whose eyes actually watch you. Tracking is done
 * against the head's *projected screen position*, not the raw pointer, so the
 * gaze stays believable even though the head sits off-centre in the layout.
 *
 * Behaviour, in order of how much it sells the illusion:
 *   eyes  — lead the head, clamped inside the visor, ellipse-bounded
 *   head  — yaw/pitch/roll follow behind with a softer spring
 *   snap  — lerp rate scales with pointer speed (sudden moves get attention)
 *   blink — randomised, occasionally doubled
 *   focus — eyes narrow and brighten while you hover something clickable
 *   idle  — after ~2s of stillness it settles to rest, then drifts and saccades
 */

const clamp = (v, a, b) => (v < a ? a : v > b ? b : v);
/** Frame-rate independent exponential smoothing. */
const approach = (cur, tgt, rate, dt) => cur + (tgt - cur) * (1 - Math.exp(-rate * dt));

const EYE_X = 0.088; // travel limits inside the visor — pupils never clip out
const EYE_Y = 0.052;

/** Scratch vector for the per-frame projection. One head, one allocation. */
const scratch = new THREE.Vector3();

export function RobotModel({ compact = false }) {
  const group = useRef();
  const head = useRef();
  const eyes = useRef();
  const lidL = useRef();
  const lidR = useRef();
  const irisL = useRef();
  const irisR = useRef();
  const antenna = useRef();
  const orbit = useRef();
  const halo = useRef();
  const vents = useRef([]);

  const st = useRef({
    yaw: 0, pitch: 0, roll: 0,
    ex: 0, ey: 0,
    lid: 1,
    blinkIn: 1.4,
    blinkT: -1,
    doubles: 0,
    sacX: 0, sacY: 0,
    sacIn: 1.5,
  });

  const ndc = scratch;

  const mat = useMemo(() => {
    const shell = new THREE.MeshStandardMaterial({
      color: '#15151A', roughness: 0.34, metalness: 0.72,
    });
    const plate = new THREE.MeshStandardMaterial({
      color: '#2A2A31', roughness: 0.26, metalness: 0.88,
    });
    const bezel = new THREE.MeshStandardMaterial({
      color: '#8E8578', roughness: 0.2, metalness: 1,
    });
    const glass = new THREE.MeshStandardMaterial({
      color: '#05050A', roughness: 0.08, metalness: 0.4,
    });
    const signal = new THREE.MeshStandardMaterial({
      color: '#FF4A17', emissive: '#FF4A17', emissiveIntensity: 2.6,
      toneMapped: false, roughness: 1, metalness: 0,
    });
    const iris = new THREE.MeshStandardMaterial({
      color: '#FFF3EA', emissive: '#FFEDDF', emissiveIntensity: 2.2,
      toneMapped: false, roughness: 1, metalness: 0,
    });
    const pupil = new THREE.MeshBasicMaterial({ color: '#08080A' });
    // The antenna tip gets its own copy: pulsing the shared signal material
    // would strobe the brow bar and vents along with it.
    const pulse = signal.clone();
    const wire = new THREE.MeshBasicMaterial({
      color: '#B9AF9C', wireframe: true, transparent: true, opacity: 0.085,
    });
    const ring = new THREE.MeshBasicMaterial({
      color: '#B9AF9C', transparent: true, opacity: 0.32,
    });
    return { shell, plate, bezel, glass, signal, pulse, iris, pupil, wire, ring };
  }, []);

  // Outer lattice vertices, reused as faint network nodes.
  const nodes = useMemo(() => {
    const geo = new THREE.IcosahedronGeometry(3.15, 1);
    const p = geo.attributes.position;
    const seen = new Map();
    for (let i = 0; i < p.count; i++) {
      const k = `${p.getX(i).toFixed(2)},${p.getY(i).toFixed(2)},${p.getZ(i).toFixed(2)}`;
      if (!seen.has(k)) seen.set(k, [p.getX(i), p.getY(i), p.getZ(i)]);
    }
    geo.dispose();
    return new Float32Array([...seen.values()].flat());
  }, []);

  useFrame((state, rawDelta) => {
    const dt = Math.min(rawDelta, 1 / 30); // guard against tab-switch spikes
    const t = state.clock.getElapsedTime();
    const s = st.current;
    if (!group.current) return;

    // --- Where is the face on screen right now? -----------------------------
    group.current.getWorldPosition(ndc);
    ndc.y += 0.35; // eye line, not the origin
    ndc.project(state.camera);

    const still = !pointer.engaged || performance.now() - pointer.lastMove > 1900;
    const idle = still || !pointer.fine;

    // --- Desired look direction --------------------------------------------
    let lx;
    let ly;
    if (idle) {
      // Rest, then breathe a little curiosity into it: slow drift plus the
      // occasional saccade so it never reads as switched off.
      s.sacIn -= dt;
      if (s.sacIn <= 0) {
        s.sacX = (Math.random() - 0.5) * 0.75;
        s.sacY = (Math.random() - 0.5) * 0.4;
        s.sacIn = 1.6 + Math.random() * 2.4;
      }
      lx = Math.sin(t * 0.28) * 0.22 + s.sacX;
      ly = Math.sin(t * 0.19 + 1.3) * 0.12 + s.sacY;
    } else {
      lx = clamp(pointer.nx - ndc.x, -1.7, 1.7);
      ly = clamp(-pointer.ny - ndc.y, -1.2, 1.2);
    }

    // Sudden pointer moves earn a faster response — the "it noticed" beat.
    // Decayed by *time since the last event* rather than by mutating the shared
    // pointer object: the frameloop pauses when the hero scrolls away, and a
    // latched boost would still be sitting there when it resumes.
    const vel = pointer.speed * Math.exp(-((performance.now() - pointer.lastMove) / 1000) * 5);
    const snap = clamp(vel * 110, 0, 9);

    // --- Eyes lead --------------------------------------------------------
    let tex = clamp(lx, -1, 1) * EYE_X;
    let tey = clamp(ly, -1, 1) * EYE_Y;
    // Keep the pair inside an elliptical socket bound.
    const r = Math.hypot(tex / EYE_X, tey / EYE_Y);
    if (r > 1) { tex /= r; tey /= r; }

    s.ex = approach(s.ex, tex, (idle ? 3.4 : 11) + snap, dt);
    s.ey = approach(s.ey, tey, (idle ? 3.4 : 11) + snap, dt);
    if (eyes.current) eyes.current.position.set(s.ex, s.ey, 0);

    // --- Head follows ------------------------------------------------------
    s.yaw = approach(s.yaw, clamp(lx * 0.42, -0.58, 0.58), (idle ? 1.5 : 3.6) + snap * 0.4, dt);
    s.pitch = approach(s.pitch, clamp(-ly * 0.3, -0.3, 0.3), (idle ? 1.5 : 3.4) + snap * 0.4, dt);
    s.roll = approach(s.roll, clamp(-lx * 0.055, -0.07, 0.07), 2.4, dt);
    if (head.current) head.current.rotation.set(s.pitch, s.yaw, s.roll);

    // --- Blink -------------------------------------------------------------
    s.blinkIn -= dt;
    if (s.blinkT < 0 && s.blinkIn <= 0) {
      s.blinkT = 0;
      if (s.doubles <= 0 && Math.random() < 0.28) s.doubles = 1;
    }
    if (s.blinkT >= 0) {
      s.blinkT += dt;
      const D = 0.13;
      s.lid = s.blinkT < D / 2
        ? 1 - (s.blinkT / (D / 2)) * 0.94
        : 0.06 + ((s.blinkT - D / 2) / (D / 2)) * 0.94;
      if (s.blinkT >= D) {
        s.blinkT = -1;
        s.lid = 1;
        if (s.doubles > 0) { s.doubles -= 1; s.blinkIn = 0.11; }
        else s.blinkIn = 2.4 + Math.random() * 3.8;
      }
    }

    // Narrow + brighten while hovering something clickable: focused, not blank.
    const focus = pointer.interactive && !idle ? 0.74 : 1;
    const lid = s.lid * focus;
    if (lidL.current) lidL.current.scale.y = lid;
    if (lidR.current) lidR.current.scale.y = lid;
    const glow = 2.1 + (pointer.interactive && !idle ? 1.5 : 0) + Math.sin(t * 2.4) * 0.12;
    if (irisL.current) irisL.current.material.emissiveIntensity = glow;
    if (irisR.current) irisR.current.material.emissiveIntensity = glow;

    // --- Ambient life ------------------------------------------------------
    group.current.position.y = Math.sin(t * 0.55) * 0.085;
    if (antenna.current) {
      antenna.current.material.emissiveIntensity = 1.4 + Math.abs(Math.sin(t * 1.7)) * 3.2;
    }
    if (orbit.current) {
      orbit.current.rotation.z = t * 0.16;
      orbit.current.rotation.x = 1.32 + Math.sin(t * 0.3) * 0.1;
    }
    if (halo.current) {
      halo.current.rotation.y = t * 0.045;
      halo.current.rotation.x = Math.sin(t * 0.12) * 0.2;
    }
    // Vocoder bar — reacts to how much the head is actually moving.
    const activity = Math.min(1, Math.abs(s.yaw) * 1.6 + vel * 26);
    vents.current.forEach((m, i) => {
      if (!m) return;
      const w = 0.22 + Math.abs(Math.sin(t * (2.1 + i * 0.6) + i)) * (0.35 + activity * 0.9);
      m.scale.y = w;
    });
  });

  const scale = compact ? 0.78 : 1;

  return (
    <group ref={group} scale={scale} dispose={null}>
      {/* ---- HEAD ---------------------------------------------------------- */}
      <group ref={head}>
        <RoundedBox args={[2.02, 1.94, 1.6]} radius={0.3} smoothness={5} material={mat.shell} />

        {/* Bezel plate, then the recessed dark visor it frames */}
        <RoundedBox
          args={[1.78, 1.0, 0.1]}
          radius={0.1}
          smoothness={4}
          position={[0, 0.24, 0.76]}
          material={mat.bezel}
        />
        <RoundedBox
          args={[1.66, 0.88, 0.12]}
          radius={0.08}
          smoothness={4}
          position={[0, 0.24, 0.8]}
          material={mat.glass}
        />

        {/* Brow signal bar */}
        <mesh position={[0, 0.79, 0.78]} material={mat.signal}>
          <boxGeometry args={[1.42, 0.045, 0.06]} />
        </mesh>

        {/* ---- EYES — the tracked group ---------------------------------- */}
        <group ref={eyes} position={[0, 0, 0]}>
          {[-0.36, 0.36].map((x, i) => (
            <group key={x} position={[x, 0.24, 0.88]}>
              {/* socket ring */}
              <mesh material={mat.plate}>
                <torusGeometry args={[0.2, 0.026, 8, 34]} />
              </mesh>
              {/* lid-scaled iris stack */}
              <group ref={i === 0 ? lidL : lidR}>
                <mesh ref={i === 0 ? irisL : irisR} position={[0, 0, 0.01]} material={mat.iris}>
                  <circleGeometry args={[0.148, 26]} />
                </mesh>
                <mesh position={[0, 0, 0.02]} material={mat.pupil}>
                  <circleGeometry args={[0.058, 18]} />
                </mesh>
                <mesh position={[-0.052, 0.055, 0.03]}>
                  <circleGeometry args={[0.028, 12]} />
                  <meshBasicMaterial color="#FFFFFF" transparent opacity={0.85} />
                </mesh>
              </group>
            </group>
          ))}
        </group>

        {/* Vocoder vent — five bars under the visor */}
        {[-0.28, -0.14, 0, 0.14, 0.28].map((x, i) => (
          <mesh
            key={x}
            ref={(m) => { vents.current[i] = m; }}
            position={[x, -0.62, 0.79]}
            material={mat.signal}
          >
            <boxGeometry args={[0.055, 0.3, 0.05]} />
          </mesh>
        ))}

        {/* Cheek louvres */}
        {[-1, 1].map((side) =>
          [0, 1, 2].map((r) => (
            <mesh
              key={`${side}-${r}`}
              position={[side * 0.78, -0.42 - r * 0.14, 0.74]}
              material={mat.plate}
            >
              <boxGeometry args={[0.3, 0.045, 0.05]} />
            </mesh>
          ))
        )}

        {/* Ear pods */}
        {[-1, 1].map((side) => (
          <group key={side} position={[side * 1.03, 0.12, 0]}>
            <mesh rotation={[0, 0, Math.PI / 2]} material={mat.plate}>
              <cylinderGeometry args={[0.26, 0.26, 0.14, 20]} />
            </mesh>
            <mesh position={[side * 0.09, 0, 0]} rotation={[0, 0, Math.PI / 2]} material={mat.signal}>
              <torusGeometry args={[0.13, 0.014, 6, 22]} />
            </mesh>
          </group>
        ))}

        {/* Antenna */}
        <mesh position={[0.52, 1.24, 0]} material={mat.plate}>
          <cylinderGeometry args={[0.018, 0.022, 0.62, 8]} />
        </mesh>
        <mesh ref={antenna} position={[0.52, 1.57, 0]} material={mat.pulse}>
          <sphereGeometry args={[0.058, 14, 10]} />
        </mesh>

        {/* Crown seam */}
        <mesh position={[0, 0.98, 0]} material={mat.bezel}>
          <boxGeometry args={[1.5, 0.03, 1.16]} />
        </mesh>
      </group>

      {/* ---- NECK + COLLAR (static, so the head reads as turning) --------- */}
      <mesh position={[0, -1.18, 0]} material={mat.plate}>
        <cylinderGeometry args={[0.3, 0.4, 0.42, 18]} />
      </mesh>
      <RoundedBox
        args={[1.62, 0.24, 1.0]}
        radius={0.09}
        smoothness={4}
        position={[0, -1.48, 0]}
        material={mat.shell}
      />
      <mesh position={[0, -1.48, 0.51]} material={mat.signal}>
        <boxGeometry args={[0.34, 0.035, 0.04]} />
      </mesh>

      {/* ---- ENVIRONMENT: orbit ring, lattice halo, network nodes --------- */}
      <mesh ref={orbit} rotation={[1.32, 0, 0]} material={mat.ring}>
        <torusGeometry args={[2.62, 0.005, 6, 110]} />
      </mesh>

      <group ref={halo}>
        <mesh material={mat.wire}>
          <icosahedronGeometry args={[3.15, 1]} />
        </mesh>
        <points>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={nodes.length / 3}
              array={nodes}
              itemSize={3}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.045}
            color="#B9AF9C"
            transparent
            opacity={0.5}
            sizeAttenuation
            depthWrite={false}
            blending={THREE.AdditiveBlending}
          />
        </points>
      </group>
    </group>
  );
}
