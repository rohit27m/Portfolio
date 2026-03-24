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
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <RobotScene />
      </Canvas>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center text-white">
        <h1 className="text-5xl font-bold">Rohit Munamarthi</h1>
        <p className="text-xl mt-2">Software Developer | Java Specialist | Full-Stack Engineer</p>
      </div>
    </div>
  );
};

export default Hero3D;
