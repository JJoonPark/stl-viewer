import React, { useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { useThree, useLoader, useFrame } from '@react-three/fiber'
import GridMaker from './GridMaker'
// import { OrbitControls, TransformControls } from '@react-three/drei'
import { DragControls } from 'three/examples/jsm/controls/DragControls'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { TransformControls } from 'three/examples/jsm/controls/TransformControls'
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader'

var boundings = []
var drag = undefined
var orbit = undefined
var transform = undefined
var go = false
var isStart = false
var euler = new THREE.Euler(0,0,0,'XYZ')

const CameraControls = ({props, activeControl, posX, posY, rotX, rotY, rotZ, scaX, scaY, scaZ}) => {
  const geom = useLoader(STLLoader, "./Bunny.stl");
  const mesh = useRef()
  const {
    camera,
    gl,
    scene,
  } = useThree();
  const dragstart_event = () => {
    console.log('drag start')
    orbit.enabled=false
    go=false;
  }
  const dragend_event = () => {
    console.log('drag end')
    posX(mesh.current.position.x)
    posY(mesh.current.position.y)
    orbit.enabled=true
    go = true
  }
  const transform_event = () => {
    isStart=!isStart
    if(transform.mode==='rotate'){
      if(isStart) {
        console.log("dragging-start")
        orbit.enabled = false
        go=false
      } else {
        console.log("dragging-end")
        euler = transform.object.rotation
        rotX(transform.object.rotation.x)
        rotY(transform.object.rotation.y)
        rotZ(transform.object.rotation.z)
        orbit.enabled = true
        go = true
      }
    }
    else {
      console.log(transform.enabled)
      if(isStart) {
        console.log("dragging-start")
        orbit.enabled = false
        go = false
      } else {
        console.log("dragging-end")
        scaX(transform.object.scale.x)
        scaY(transform.object.scale.y)
        scaZ(transform.object.scale.z)
        orbit.enabled = true
        go = true
      }
    }
  }
  useEffect(()=>{
    camera.position.x = 0;
    camera.position.y = -400;
    camera.position.z = 640;
    GridMaker(300, 200, 200, 0x000000, 0x999999, scene)
    orbit = new OrbitControls(camera, gl.domElement)
    scene.add(orbit)
    transform = new TransformControls(camera, gl.domElement)
    scene.add(transform)
    transform.attach(mesh.current)
    transform.setSize(1)
    transform.setSpace("local")
    transform.addEventListener('dragging-changed', transform_event )
    go = true
    isStart = false
  }, [])
  
  useEffect(() => {
    transform.enabled=false
    transform.showX = false
    transform.showY = false
    transform.showZ = false
    if(drag!==undefined) {
      drag.deactivate()
      drag.enabled=false
    }
    if(activeControl===2){
      go=true;
      drag = new DragControls([mesh.current], camera, gl.domElement)
      drag.addEventListener('dragstart', dragstart_event )
      drag.addEventListener('dragend', dragend_event)
      scene.add(drag)
      mesh.current.geometry.computeBoundingBox()
      var helper = new THREE.BoxHelper(mesh.current, 0x000000)
      helper.geometry.computeBoundingBox()
      var helper_values = helper.geometry.boundingBox
      boundings = [
        Math.abs(helper_values.max.x-mesh.current.position.x), 
        Math.abs(mesh.current.position.x-helper_values.min.x), 
        Math.abs(helper_values.max.y-mesh.current.position.y),
        Math.abs(mesh.current.position.y-helper_values.min.y)]
    }
    else if (activeControl === 3){
      transform.setMode('rotate')
      transform.enabled = true
      transform.showX = true
      transform.showY = true
      transform.showZ = true
    }
    else if (activeControl === 4) {
      transform.setMode('scale')
      transform.enabled = true
      transform.showX = true
      transform.showY = true
      transform.showZ = true
    }
    else{
      transform.enabled=false;
      orbit.enabled = true;
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
    else if(activeControl===3&&go){
      transform.object.rotation.x = props.rotate_x
      transform.object.rotation.y = props.rotate_y
      transform.object.rotation.z = props.rotate_z
    }
    else if(activeControl===4&&go){
      mesh.current.scale.x = props.scale_x
      mesh.current.scale.y = props.scale_y
      mesh.current.scale.z = props.scale_z
    }
    else{
      mesh.current.position.x = props.x
      mesh.current.position.y = props.y
      mesh.current.position.z = 0
    }
    gl.render(scene, camera)
  }, 1)
  
  return (
    <>
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
    </>
  );
};

export default CameraControls
