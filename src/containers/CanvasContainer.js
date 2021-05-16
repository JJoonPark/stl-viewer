import React, { useState, useEffect, Suspense } from "react";
import { Canvas, extend } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Stats } from 'three/examples/jsm/libs/stats.module'
import "./CanvasContainer.css";

import * as THREE from 'three'
import CameraControls from '../components/CameraControls'
import LoadingView from '../components/LoadingView'

extend({ OrbitControls })

export default function CanvasContainer({objectProps, control, posX, posY, rotX, rotY, rotZ}) {
  const [ ortho, setOrth ] = useState(true)
  const [ aspect, setAspect ] = useState(1)

  useEffect(()=> {
    setAspect(window.innerWidht / window.innerHeight)
  }, [])
  
  return (
    <Canvas 
      style={{ background: "#ffffff", zIndex:0 }} 
      camera={ortho?new THREE.OrthographicCamera(-200*1,200*1,200,-200,0.1,100000):new THREE.PerspectiveCamera(35, 1, 5, 100000 )}
      resize={true}
    > 
      <directionalLight intensity={0.5} position={[10,-10,10]}/>
      <axesHelper/>
      <Suspense fallback={<LoadingView />}>
        <CameraControls props={objectProps} activeControl={control} posX={posX} posY={posY} rotX={rotX} rotY={rotY} rotZ={rotZ}/>  
      </Suspense>
    </Canvas>
  );
}