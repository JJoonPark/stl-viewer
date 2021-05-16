import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useThree, useLoader, useFrame } from '@react-three/fiber'
import GridMaker from './GridMaker'
import { OrbitControls, TransformControls } from '@react-three/drei'
import { DragControls } from 'three/examples/jsm/controls/DragControls'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'

var boundings = []

const CameraControls = ({props, activeControl, posX, posY, rotX, rotY, rotZ}) => {
  const geom = useLoader(STLLoader, "./Bunny.stl");
  const [go, setGo] = useState(false)
  const mesh = useRef()
  const {
    camera,
    gl,
    scene,
  } = useThree();
  const orbit = useRef()
  const transform = useRef()
  
  useEffect(()=>{
    camera.position.x = 0;
    camera.position.y = -400;
    camera.position.z = 640;
    GridMaker(300, 200, 200, 0x000000, 0x999999, scene)
    setGo(false)
  }, [])
  
  useEffect(() => {
    orbit.current.enabled = false;
    transform.current.enabled = false;
    
    if(activeControl===2){
      const drag = new DragControls([mesh.current], camera, gl.domElement)
      drag.addEventListener('dragstart', function(e){
        console.log('drag start')
        setGo(false)
      })
      // drag.addEventListener('drag', function(e){
      //   console.log('drag')
      // })
      drag.addEventListener('dragend', function(e){
        posX(mesh.current.position.x)
        posY(mesh.current.position.y)
        console.log('drag end')
        setGo(true)
      })
      scene.add(drag)
      var helper = new THREE.BoxHelper(mesh.current, 0x000000)
      helper.geometry.computeBoundingBox()
      var helper_values = helper.geometry.boundingBox
      boundings = [
        helper_values.max.x-mesh.current.position.x, 
        mesh.current.position.x-helper_values.min.x, 
        helper_values.max.y-mesh.current.position.y,
        mesh.current.position.y-helper_values.min.y]
      
      
      console.log(props.x, props.y)
      console.log(boundings)

    }
    else if (activeControl === 3){
      orbit.current.enabled = false;
      transform.current.enabled=true;
      transform.current.setMode('rotate')
      transform.current.setSize(1)

      transform.current.addEventListener('dragging-changed', function(e){
        console.log('dragging-changed')
      })

      transform.current.addEventListener('mouseUp', function(e){
        console.log("enter this", mesh.current.rotation)
        console.log(mesh.current)
        console.log(transform)
        rotX(mesh.current.rotation.x)
        rotY(mesh.current.rotation.y)
        rotZ(mesh.current.rotation.z)
      })
    }
    else if (activeControl === 4) {
      orbit.current.enabled = false;
      transform.current.enabled=true;
      transform.current.setMode('scale')
      transform.current.setSize(1)
    }
    else{
      transform.current.enabled=false;
      orbit.current.enabled = true;
    }
  }, [activeControl])

  
  useFrame(({gl, scene, camera}) => {
    if(activeControl===2&&go){
      mesh.current.position.x = props.x
      mesh.current.position.y = props.y
      mesh.current.position.z = 0
      if(mesh.current.position.x >= 150-boundings[0]) {
        mesh.current.position.x = 150-boundings[0]
      }
      if(mesh.current.position.x <= -150+boundings[1]) {
        mesh.current.position.x = -150+boundings[1]
      }
      if(mesh.current.position.y >= 100-boundings[2]) {
        mesh.current.position.y = 100-boundings[2]
      }
      if(mesh.current.position.y <= -100+boundings[3]) {
        mesh.current.position.y = -100+boundings[3]
      }
    }
    else if(activeControl===2){
      // console.log("Faster?")
      mesh.current.position.z = 0
      if(mesh.current.position.x >= 150-boundings[0]) {
        mesh.current.position.x = 150-boundings[0]
      }
      if(mesh.current.position.x <= -150+boundings[1]) {
        mesh.current.position.x = -150+boundings[1]
      }
      if(mesh.current.position.y >= 100-boundings[2]) {
        mesh.current.position.y = 100-boundings[2]
      }
      if(mesh.current.position.y <= -100+boundings[3]) {
        mesh.current.position.y = -100+boundings[3]
      }
    }
    else if(activeControl==3){
      mesh.current.rotation.x = props.rotate_x
      mesh.current.rotation.y = props.rotate_y
      mesh.current.rotation.z = props.rotate_z
    }
    else{
      mesh.current.position.x = props.x
      mesh.current.position.y = props.y
      mesh.current.position.z = 0
    }
    // console.log(mesh.current.position)
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
    <TransformControls ref={transform}>
      <group>
        <mesh ref={mesh} frustumCulled={false} visible geometry={geom} userData>
          <meshStandardMaterial
            attach="material"
            color={new THREE.Color(props.color)}
            roughness={0.3}
            metalness={0.3}
            wireframe={props.wireframe}
            transparent={true}
            opacity={props.opacity}
          />
        </mesh>
      </group>
    </TransformControls>
    <OrbitControls
      // ref={controls}
      ref={orbit}
      args={[camera, gl.domElement]}
      enableZoom={true}
      maxAzimuthAngle={Math.PI / 2}
      maxPolarAngle={Math.PI}
      minAzimuthAngle={-Math.PI / 2}
      minPolarAngle={0}
      enableDamping={false}
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
