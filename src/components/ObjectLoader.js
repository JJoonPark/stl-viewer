import React from 'react'
import { useLoader } from '@react-three/fiber'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'

export default function ObjectLoader() {
  const geom = useLoader(STLLoader, "./Bunny.stl");
  return (
    <group>
      <mesh visible geometry={geom} >
        <meshStandardMaterial
          attach="material"
          color="orange"
          roughness={0.3}
          metalness={0.3}
        />
      </mesh>
    </group>
  );
}
