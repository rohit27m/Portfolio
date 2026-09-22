import { Canvas, useThree } from '@react-three/fiber';
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { RobotModel } from './RobotModel';
import { Particles } from './Particles';

/** Keeps the head in the right-hand third on wide screens, centred on narrow. */
function Rig({ children }) {
  const viewport = useThree((s) => s.viewport);
  const size = useThree((s) => s.size);
  const wide = size.width >= 1024;
  return (
    <group position={[wide ? viewport.width * 0.235 : 0, wide ? 0.1 : 0.95, 0]}>
      {children}
    </group>
  );
}

export function RobotScene() {
  const host = useRef(null);
  const [live, setLive] = useState(true);
  const small = useMemo(
    () => typeof window !== 'undefined' && window.innerWidth < 768,
    []
  );

  // Stop rendering entirely once the hero scrolls away.
  useEffect(() => {
    const el = host.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const io = new IntersectionObserver(
      ([e]) => setLive(e.isIntersecting),
      { rootMargin: '120px' }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  /** Procedural IBL — real metal reflections without fetching a single HDRI. */
  const onCreated = useCallback(({ gl, scene }) => {
    const pmrem = new THREE.PMREMGenerator(gl);
    scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.06).texture;
    scene.environmentIntensity = 0.55;
    pmrem.dispose();
  }, []);

  return (
    <div ref={host} className="absolute inset-0 -z-10 bg-primary">
      <Canvas
        camera={{ position: [0, 0.2, 7.4], fov: 40 }}
        dpr={small ? [1, 1.5] : [1, 2]}
        frameloop={live ? 'always' : 'never'}
        onCreated={onCreated}
        gl={{ antialias: !small, alpha: false, powerPreference: 'high-performance' }}
      >
        <color attach="background" args={['#0A0A0C']} />
        <fog attach="fog" args={['#0A0A0C', 8, 17]} />

        {/* Hard key from upper-left, bone fill, and a signal rim from below-right */}
        <ambientLight intensity={0.4} />
        <directionalLight position={[-5, 6, 6]} intensity={2.1} color="#FFF6EC" />
        <directionalLight position={[6, -2, 3]} intensity={0.9} color="#FF4A17" />
        <pointLight position={[0, 1.4, 4.5]} intensity={7} distance={11} color="#EDE6D8" />

        <Suspense fallback={null}>
          <Rig>
            <RobotModel compact={small} />
          </Rig>
        </Suspense>

        <Particles count={small ? 140 : 320} />
      </Canvas>
    </div>
  );
}
