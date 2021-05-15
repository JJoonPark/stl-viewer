import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useThree, useFrame } from '@react-three/fiber'
import GridMaker from './GridMaker'
import { OrbitControls } from '@react-three/drei'
import { DragControls } from 'three/examples/jsm/controls/DragControls'

const CameraControls = (props) => {
  const {
    camera,
    gl,
    scene,
  } = useThree();
  const orbit = useRef()
  const drag = useRef()
  useEffect(() => {
    camera.position.x = 0;
    camera.position.y = -400;
    camera.position.z = 640;
    GridMaker(300, 200, 200, 0x000000, 0x999999, scene)
  }, [])

  
  useFrame(({gl, scene, camera}) => {
    gl.render(scene, camera)
  }, 1)
  
  // useEffect(()=>{
  //   const controls = orbit.current
    
  //   controls.addEventListener("end", function(e){
  //     // controls.saveState()
      
  //   })
  //   return () => controls.removeEventListener("end", false)
  // })
  
  return (
    // <PerspectiveCamera makeDefault={!ortho} /
    <>
    <OrbitControls
      // ref={controls}
      ref={orbit}
      args={[camera, gl.domElement]}
      enableZoom={true}
      maxAzimuthAngle={Math.PI / 2}
      maxPolarAngle={Math.PI}
      minAzimuthAngle={-Math.PI / 2}
      minPolarAngle={0}
    />
    {/* <DragControls ref={drag}/> */}
    </>
  );
};

export default CameraControls

// function Camera(props) {
//   const ref = useRef()
//   const { setDefaultCamera } = useThree()
//   // Make the camera known to the system
//   useEffect(() => void setDefaultCamera(ref.current), [])
//   // Update it every frame
//   useFrame(() => ref.current.updateMatrixWorld())
//   return <perspectiveCamera ref={ref} {...props} />
// }

// <Canvas>
//   <Camera position={[0, 0, 10]} />
