import React, { useRef } from 'react'
import { useThree, useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import GridMaker from './GridMaker'

const CameraControls = () => {
  // Get a reference to the Three.js Camera, and the canvas html element.
  // We need these to setup the OrbitControls class.
  // https://threejs.org/docs/#examples/en/controls/OrbitControls
  
  const {
    camera,
    gl: { domElement },
    scene,
  } = useThree();
  camera.position.z = 200;
  camera.position.y = -30;
  camera.position.x = 0;
  // Ref to the controls, so that we can update them on every frame using useFrame
  const controls = useRef();
  useFrame((state) => controls.current.update());
  domElement.outputEncoding = THREE.sRGBEncoding;
  
  // const material = new THREE.LineBasicMaterial({ color: 0xffffff })
  // const points = [];
  // points.push( new THREE.Vector2(-100,0))
  // points.push( new THREE.Vector2(100,0))
  // points.push( new THREE.Vector2(0,-100))
  // points.push( new THREE.Vector2(0,100))
  // const geometry = new THREE.BufferGeometry().setF( points )
  // const line = new THREE.Line( geometry, material )
  // const grid = new THREE.GridHelper(300,60,0xffffff,0xffffff)
  // grid.geometry.rotateX(Math.PI / 2)
  const grid = GridMaker()
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