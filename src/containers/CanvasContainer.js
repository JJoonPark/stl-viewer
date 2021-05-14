import React, { Suspense } from "react";
import { useSelector } from 'react-redux'
import { Canvas, extend } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import "./CanvasContainer.css";

import CameraControls from '../components/CameraControls'
import ObjectLoader from '../components/ObjectLoader'
import LoadingView from '../components/LoadingView'

extend({ OrbitControls })

export default function CanvasContainer() {
  const Test = useSelector(state=>state.CameraControls.conf_setting) 
  console.log(Test)
  return (
    <Canvas style={{ background: "#171717" }}>
      <CameraControls/>
      <directionalLight intensity={0.5} position={[10,-10,10]}/>
      <axesHelper/>
      <Suspense fallback={<LoadingView />}>
        <ObjectLoader />
      </Suspense>
    </Canvas>
  );
}