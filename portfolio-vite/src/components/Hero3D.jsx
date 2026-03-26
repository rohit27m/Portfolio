import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import RobotScene from '../three/RobotScene';
import { OrbitControls } from '@react-three/drei';

const Hero3D = () => {
  return (
    <section className="h-screen flex justify-center items-center bg-gray-900">
      <Canvas>
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <RobotScene />
          <OrbitControls enableZoom={false} />
        </Suspense>
      </Canvas>
    </section>
  );
};

export default Hero3D;
