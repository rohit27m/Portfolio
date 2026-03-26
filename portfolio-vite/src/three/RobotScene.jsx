import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, ContactShadows } from '@react-three/drei';
import { Suspense } from 'react';
import { RobotModel } from './RobotModel';
import { Particles } from './Particles';

export function RobotScene() {
  return (
    <div className="w-full h-full absolute inset-0 -z-10 bg-primary">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        {/* Environment and Lighting */}
        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[5, 10, 5]} 
          intensity={2} 
          color="#ffffff"
        />
        <directionalLight 
          position={[-5, -5, -5]} 
          intensity={1} 
          color="#38bdf8"
        />
        
        {/* Soft studio lighting to make metal pop */}
        <Environment preset="city" />

        {/* Scene Objects */}
        <Suspense fallback={null}>
          <RobotModel />
        </Suspense>
        
        <Particles count={700} />

        {/* Soft shadow below the robot */}
        <ContactShadows 
          position={[0, -2, 0]} 
          opacity={0.6} 
          scale={10} 
          blur={2.5} 
          far={4} 
          color="#000000" 
        />

        {/* Camera Controls */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          minPolarAngle={Math.PI / 2 - 0.2} 
          maxPolarAngle={Math.PI / 2 + 0.2} 
          minAzimuthAngle={-0.3}
          maxAzimuthAngle={0.3}
        />
      </Canvas>
    </div>
  );
}
