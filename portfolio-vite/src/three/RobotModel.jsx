import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function RobotModel() {
  const groupRef = useRef();
  
  // Materials
  const metalMaterial = new THREE.MeshStandardMaterial({
    color: '#0f172a', // deep slate
    roughness: 0.2,
    metalness: 0.8,
  });

  const secondaryMetal = new THREE.MeshStandardMaterial({
    color: '#1e293b',
    roughness: 0.4,
    metalness: 0.6,
  });

  const glowMaterial = new THREE.MeshBasicMaterial({
    color: '#38bdf8', // accent blue
  });

  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Idle float animation
    const time = state.clock.getElapsedTime();
    groupRef.current.position.y = Math.sin(time) * 0.1;
    
    // Follow mouse
    const targetX = (state.pointer.x * Math.PI) / 4;
    const targetY = (state.pointer.y * Math.PI) / 4;
    
    // Smooth interpolation (lerp)
    groupRef.current.rotation.y += 0.05 * (targetX - groupRef.current.rotation.y);
    groupRef.current.rotation.x += 0.05 * (-targetY - groupRef.current.rotation.x);
  });

  return (
    <group ref={groupRef} dispose={null} scale={[1.2, 1.2, 1.2]}>
      {/* Cranium - Top Head */}
      <mesh position={[0, 0.4, 0]} material={metalMaterial}>
        <sphereGeometry args={[1, 32, 32, 0, Math.PI * 2, 0, Math.PI / 1.7]} />
      </mesh>

      {/* Jawline & Lower Face */}
      <mesh position={[0, -0.2, 0.2]} material={secondaryMetal}>
        <cylinderGeometry args={[0.9, 0.6, 1, 32]} />
      </mesh>

      {/* Cheeks/Structure */}
      <mesh position={[0.8, -0.1, 0]} rotation={[0, 0, -0.2]} material={metalMaterial}>
        <boxGeometry args={[0.2, 1, 1.5]} />
      </mesh>
      <mesh position={[-0.8, -0.1, 0]} rotation={[0, 0, 0.2]} material={metalMaterial}>
        <boxGeometry args={[0.2, 1, 1.5]} />
      </mesh>

      {/* Ear Modules */}
      <mesh position={[1.1, 0.2, 0]} rotation={[0, 0, Math.PI / 2]} material={secondaryMetal}>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 32]} />
      </mesh>
      <mesh position={[-1.1, 0.2, 0]} rotation={[0, 0, Math.PI / 2]} material={secondaryMetal}>
        <cylinderGeometry args={[0.3, 0.3, 0.2, 32]} />
      </mesh>
      
      {/* Glowing Inner Ear Ring */}
      <mesh position={[1.15, 0.2, 0]} rotation={[0, Math.PI / 2, 0]} material={glowMaterial}>
        <torusGeometry args={[0.15, 0.02, 16, 32]} />
      </mesh>
      <mesh position={[-1.15, 0.2, 0]} rotation={[0, Math.PI / 2, 0]} material={glowMaterial}>
        <torusGeometry args={[0.15, 0.02, 16, 32]} />
      </mesh>

      {/* Visor Area Background */}
      <mesh position={[0, 0.2, 0.85]} material={new THREE.MeshStandardMaterial({ color: '#020617', roughness: 0.1, metalness: 0.9 })}>
        <boxGeometry args={[1.4, 0.4, 0.2]} />
      </mesh>

      {/* Cybernetic Eyes / Glowing Visor Slots */}
      <mesh position={[0.3, 0.2, 0.96]} material={glowMaterial}>
        <capsuleGeometry args={[0.05, 0.4, 4, 8]} />
        <group rotation={[0, 0, Math.PI / 2]}>
           <mesh material={glowMaterial}>
               <capsuleGeometry args={[0.05, 0.4, 4, 8]} />
           </mesh>
        </group>
      </mesh>
      <mesh position={[-0.3, 0.2, 0.96]} material={glowMaterial}>
        <capsuleGeometry args={[0.05, 0.4, 4, 8]} />
        <group rotation={[0, 0, Math.PI / 2]}>
           <mesh material={glowMaterial}>
               <capsuleGeometry args={[0.05, 0.4, 4, 8]} />
           </mesh>
        </group>
      </mesh>

      {/* Mouth/Breath Grill */}
      <group position={[0, -0.4, 0.9]}>
        {[...Array(5)].map((_, i) => (
          <mesh key={i} position={[0, i * 0.05, 0]} material={glowMaterial}>
            <boxGeometry args={[0.4, 0.01, 0.05]} />
          </mesh>
        ))}
      </group>

      {/* Antenna */}
      <mesh position={[0, 1.2, -0.5]} material={secondaryMetal}>
        <cylinderGeometry args={[0.02, 0.05, 0.6, 16]} />
      </mesh>
      <mesh position={[0, 1.5, -0.5]} material={glowMaterial}>
        <sphereGeometry args={[0.05, 16, 16]} />
      </mesh>
    </group>
  );
}
