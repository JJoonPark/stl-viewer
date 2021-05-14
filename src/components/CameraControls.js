import React, { useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const CameraControls = () => {
  // Get a reference to the Three.js Camera, and the canvas html element.
  // We need these to setup the OrbitControls class.
  // https://threejs.org/docs/#examples/en/controls/OrbitControls
  
  const {
    camera,
    gl: { domElement },
    scene,
  } = useThree();
  camera.position.z = 160;
  camera.position.y = -80;
  camera.position.x = 0;
  // Ref to the controls, so that we can update them on every frame using useFrame
  const controls = useRef();
  useFrame((state) => controls.current.update());

  
  const grid = new THREE.GridHelper(500,10,0x303030,0x303030)
  grid.geometry.rotateX(Math.PI / 2)
  scene.add(grid)
  useFrame(({gl, scene, camera}) => gl.render(scene, camera), 1)

  return (
    <orbitControls
      ref={controls}
      args={[camera, domElement]}
      enableZoom={true}
      // maxAzimuthAngle={Math.PI / 4}
      // maxPolarAngle={Math.PI}
      // minAzimuthAngle={-Math.PI / 4}
      // minPolarAngle={0}
    />
  );
};

export default CameraControls