import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useThree, useLoader, useFrame } from '@react-three/fiber'
import GridMaker from './GridMaker'
import { OrbitControls, TransformControls } from '@react-three/drei'
import { DragControls } from 'three/examples/jsm/controls/DragControls'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'

var boundings = []
var drag = undefined
var go = false
var isStart = false
var euler = new THREE.Euler(0,0,0,'XYZ')

var globals = {
  'dragstart':undefined,
  'dragend':undefined,
  'draggingchanged':undefined,
};

const CameraControls = ({props, activeControl, posX, posY, rotX, rotY, rotZ, scaX, scaY, scaZ}) => {
  const geom = useLoader(STLLoader, "./Bunny.stl");
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
    go = true
    isStart = false
  }, [])
  
  useEffect(() => {
    //orbit.current.enabled = false;
    transform.current.enabled = false;
    console.log(globals)
    if(globals.dragstart=="exist"){
      drag.removeEventListener('dragstart', function(e){
        console.log('drag start')
        globals.dragstart = "exist"
        orbit.current.enabled=false
        go=false;
      })
      globals.dragstart=undefined
    }
    if(globals.dragend=="exist"){
      drag.removeEventListener("dragend", function(e){
        console.log('drag end')
        globals.dragend = "exist"
        posX(mesh.current.position.x)
        posY(mesh.current.position.y)
        console.log(mesh.current.position)
        console.log(boundings)
        orbit.current.enabled=true
        go = true
      })
      globals.dragend=undefined
    }
    if(globals.draggingchanged==="exist"){
      transform.current.removeEventListener("dragging-changed")
      globals.draggingchanged=undefined
    }
    if(drag!==undefined) {
      drag.enabled=false
    }
    if(activeControl===2){
      go=true;
      drag = new DragControls([mesh.current], camera, gl.domElement)
      globals.dragstart = drag.addEventListener('dragstart', function(e){
        console.log('drag start')
        globals.dragstart = "exist"
        orbit.current.enabled=false
        go=false;
      })
      globals.dragend = drag.addEventListener('dragend', function(e){
        console.log('drag end')
        globals.dragend = "exist"
        posX(mesh.current.position.x)
        posY(mesh.current.position.y)
        console.log(mesh.current.position)
        console.log(boundings)
        orbit.current.enabled=true
        go = true
      })
      scene.add(drag)
      console.log(mesh.current)
      mesh.current.geometry.computeBoundingBox()
      console.log(mesh.current.geometry.boundingBox)
      var helper = new THREE.BoxHelper(mesh.current, 0x000000)
      helper.geometry.computeBoundingBox()
      var helper_values = helper.geometry.boundingBox
      console.log(mesh.current.position)
      console.log(helper_values)
      boundings = [
        Math.abs(helper_values.max.x-mesh.current.position.x), 
        Math.abs(mesh.current.position.x-helper_values.min.x), 
        Math.abs(helper_values.max.y-mesh.current.position.y),
        Math.abs(mesh.current.position.y-helper_values.min.y)]
        console.log(boundings)
    }
    else if (activeControl === 3){
      transform.current.enabled=true;
      transform.current.setMode('rotate')
      transform.current.setSize(1)
      transform.current.setSpace("local")
      transform.current.position.x = mesh.current.position.x
      transform.current.position.y = mesh.current.position.y
      transform.current.position.z = mesh.current.position.z
      console.log(transform.current.position)

      transform.current.addEventListener('dragging-changed', function(e){
        globals.draggingchanged = "exist"
        isStart=!isStart
        if(isStart) {
          orbit.current.enabled = false;
          go=false
          console.log("dragging-start", transform.current.axis)
        } else {
          console.log("dragging-end", isStart)
          euler = transform.current.object.rotation
          rotX(transform.current.object.rotation.x)
          rotY(transform.current.object.rotation.y)
          rotZ(transform.current.object.rotation.z)
          orbit.current.enabled = true;
          go = true
        }
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
    else if(activeControl==3&&go){
      transform.current.object.rotation.x = props.rotate_x
      transform.current.object.rotation.y = props.rotate_y
      transform.current.object.rotation.z = props.rotate_z
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
    <TransformControls ref={transform} space={"local"}>
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
