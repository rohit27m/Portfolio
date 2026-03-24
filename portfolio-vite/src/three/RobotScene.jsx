import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box } from '@react-three/drei';

const RobotScene = () => {
  const groupRef = useRef();

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Head */}
      <Box position={[0, 1.5, 0]} args={[1, 1, 1]}>
        <meshStandardMaterial color="royalblue" />
      </Box>
      {/* Body */}
      <Box position={[0, 0, 0]} args={[1.5, 2, 1]}>
        <meshStandardMaterial color="gray" />
      </Box>
      {/* Arms */}
      <Box position={[-1.25, 0, 0]} args={[0.5, 1.5, 0.5]}>
        <meshStandardMaterial color="royalblue" />
      </Box>
      <Box position={[1.25, 0, 0]} args={[0.5, 1.5, 0.5]}>
        <meshStandardMaterial color="royalblue" />
      </Box>
      {/* Legs */}
      <Box position={[-0.5, -1.75, 0]} args={[0.5, 1.5, 0.5]}>
        <meshStandardMaterial color="royalblue" />
      </Box>
      <Box position={[0.5, -1.75, 0]} args={[0.5, 1.5, 0.5]}>
        <meshStandardMaterial color="royalblue" />
      </Box>
    </group>
  );
};

export default RobotScene;
      robotRef.current.rotation.y += 0.005;
      robotRef.current.position.y = -1.5 + Math.sin(state.clock.getElapsedTime()) * 0.15;
    }
  });

  useEffect(() => {
    if (gltf) {
      gltf.scene.scale.set(1.5, 1.5, 1.5);
      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [gltf]);

  return <primitive ref={robotRef} object={gltf.scene} />;
};

export default RobotScene;
