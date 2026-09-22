import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/** Deterministic scatter — same field every mount, no re-render surprises. */
function rand(seed) {
  let s = seed;
  return () => {
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Faint depth field — dust in the light, nothing more. */
export function Particles({ count = 320 }) {
  const ref = useRef();

  const positions = useMemo(() => {
    const p = new Float32Array(count * 3);
    const r = rand(0x51ed27);
    for (let i = 0; i < count; i++) {
      p[i * 3] = (r() - 0.5) * 18;
      p[i * 3 + 1] = (r() - 0.5) * 12;
      p[i * 3 + 2] = (r() - 0.5) * 10 - 2;
    }
    return p;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime();
    ref.current.rotation.y = t * 0.028;
    ref.current.rotation.x = t * 0.012;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.022}
        color="#B9AF9C"
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}
