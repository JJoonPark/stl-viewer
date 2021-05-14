import React, { Suspense } from "react";
import { Canvas, extend } from "@react-three/fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import "./App.css";

import CameraControls from './components/CameraControls'
import ObjectLoader from './components/ObjectLoader'
import LoadingView from './components/LoadingView'

extend({ OrbitControls })

export default function App() {  
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