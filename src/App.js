import React, {useState, useEffect, useCallback} from "react";
import "./App.css";
import * as dat from 'dat.gui'

import CanvasContainer from './containers/CanvasContainer'
import ControlButtons from './components/ControlButtons'

var Control_Gui = [undefined, undefined, undefined, undefined, undefined]
var x_position = undefined
var y_position = undefined
var x_rotation = undefined
var y_rotation = undefined
var z_rotation = undefined
var x_scale = undefined
var y_scale = undefined
var z_scale = undefined
export default function App() { 
  const [activeGui, setActiveGui] = useState(-1)

  const toggleSetup = (value) => {
    if(Control_Gui[value]!==undefined) {
      Control_Gui[value].show()
    }
    if(Control_Gui[activeGui]!==undefined && activeGui !== -1) {
      Control_Gui[activeGui].hide()
    }
    setActiveGui(value)
  }
  const [objectProperty, setObjectProperty] = useState({
    color:0x00ff00,
    wireframe:false,
    opacity: 1,
    x:0,
    y:0,
    rotate_x:0,
    rotate_y:0,
    rotate_z:0,
    scale_x:0,
    scale_y:0,
    scale_z:0
  })
  const setColor = useCallback((newValue) => {
    setObjectProperty((prev) => ({ ...prev, color: newValue }))
  }, [])
  const setOpacity = useCallback((newValue) => {
    setObjectProperty((prev) => ({ ...prev, opacity: newValue }))
  }, [])
  const setWireFrame = useCallback((newValue) => {
    setObjectProperty((prev) => ({ ...prev, wireframe: newValue }))
  }, [])
  const setPositionX = useCallback((newValue) => {
    setObjectProperty((prev) => ({ ...prev, x: newValue }))
  }, [])
  const setPositionY = useCallback((newValue) => {
    setObjectProperty((prev) => ({ ...prev, y: newValue }))
  }, [])
  const callbackSetPositionX = useCallback((newValue) => {
    x_position.setValue(newValue)
  }, [])
  const callbackSetPositionY = useCallback((newValue) => {
    y_position.setValue(newValue)
  }, [])
  const setRotationX = useCallback((newValue) => {
    setObjectProperty((prev) => ({ ...prev, rotate_x: newValue }))
  }, [])
  const setRotationY = useCallback((newValue) => {
    setObjectProperty((prev) => ({ ...prev, rotate_y: newValue }))
  }, [])
  const setRotationZ = useCallback((newValue) => {
    setObjectProperty((prev) => ({ ...prev, rotate_z: newValue }))
  }, [])
  const callbackSetRotationX = useCallback((newValue) => {
    x_rotation.setValue(newValue / (Math.PI / 180))
  }, [])
  const callbackSetRotationY = useCallback((newValue) => {    
    y_rotation.setValue(newValue / (Math.PI / 180))
  }, [])
  const callbackSetRotationZ = useCallback((newValue) => {
    z_rotation.setValue(newValue / (Math.PI / 180))
  }, [])
  const setScaleX = useCallback((newValue) => {
    setObjectProperty((prev) => ({ ...prev, scale_x: newValue }))
  }, [])
  const setScaleY = useCallback((newValue) => {
    setObjectProperty((prev) => ({ ...prev, scale_y: newValue }))
  }, [])
  const setScaleZ = useCallback((newValue) => {
    setObjectProperty((prev) => ({ ...prev, scale_z: newValue }))
  }, [])
  const callbackSetScaleX = useCallback((newValue) => {
    x_scale.setValue(newValue)
  }, [])
  const callbackSetScaleY = useCallback((newValue) => {
    y_scale.setValue(newValue)
  }, [])
  const callbackSetScaleZ = useCallback((newValue) => {
    z_scale.setValue(newValue)
  }, [])
  var object = {
    color: objectProperty.color,
    wireframe: objectProperty.wireframe,
    opacity: objectProperty.opacity,
    position_x: objectProperty.x,
    position_y: objectProperty.y,
    rotation_x: objectProperty.rotate_x,
    rotation_y: objectProperty.rotate_y,
    rotation_z: objectProperty.rotate_z,
    scale_x: objectProperty.scale_x,
    scale_y: objectProperty.scale_y,
    scale_z: objectProperty.scale_z
  }
  
  useEffect(()=>{
    Control_Gui[1] = new dat.GUI({width:window.innerWidth*0.2});
    Control_Gui[1].domElement.id = 'control-gui'
    const materialFolder = Control_Gui[1].addFolder("Material")
    materialFolder.addColor(object, "color").onChange(()=>{
      setColor(object.color)
    })
    materialFolder.add(object, "opacity", 0, 1, 0.1).onChange(()=>{
      setOpacity(object.opacity)
    })
    materialFolder.add(object, "wireframe").onChange(()=>{
      setWireFrame(object.wireframe)
    })
    materialFolder.open()

    Control_Gui[2] = new dat.GUI({width:window.innerWidth*0.2});
    Control_Gui[2].domElement.id = 'control-gui'
    const positionFolder = Control_Gui[2].addFolder("Position")
    x_position = positionFolder.add(object, "position_x", -150, 150, 1).onChange(()=>{
      setPositionX(object.position_x)
    })
    y_position = positionFolder.add(object, "position_y", -100, 100, 1).onChange(()=>{
      setPositionY(object.position_y)
    })
    positionFolder.open()

    Control_Gui[3] = new dat.GUI({width:window.innerWidth*0.2});
    Control_Gui[3].domElement.id = 'control-gui'
    const rotationFolder = Control_Gui[3].addFolder("Rotation")
    x_rotation = rotationFolder.add(object, "rotation_x", -180, 180, 1).onChange(()=>{
      setRotationX(object.rotation_x * (Math.PI / 180))
    })
    y_rotation = rotationFolder.add(object, "rotation_y", -180, 180, 1).onChange(()=>{
      setRotationY(object.rotation_y * (Math.PI / 180))
    })
    z_rotation = rotationFolder.add(object, "rotation_z", -180, 180, 1).onChange(()=>{
      setRotationZ(object.rotation_z * (Math.PI / 180))
    })
    rotationFolder.open()

    Control_Gui[4] = new dat.GUI({width:window.innerWidth*0.2})
    Control_Gui[4].domElement.id = 'control-gui'
    const scaleFolder = Control_Gui[4].addFolder("Scale")
    x_scale = scaleFolder.add(object, "scale_x", -3, 3, 0.1).onChange(()=>{
      setScaleX(object.scale_x)
    })
    y_scale = scaleFolder.add(object, "scale_y", -3, 3, 0.1).onChange(()=>{
      setScaleY(object.scale_y)
    })
    z_scale = scaleFolder.add(object, "scale_z", -3, 3, 0.1).onChange(()=>{
      setScaleZ(object.scale_z)
    })
    scaleFolder.open()

    Control_Gui[1].hide()
    Control_Gui[2].hide()
    Control_Gui[3].hide()
    Control_Gui[4].hide()
  }, [])
  // console.log(objectProperty)

  return (
    <>
      <ControlButtons toggleSetup={toggleSetup} />
      <CanvasContainer 
        objectProps={objectProperty} 
        control={activeGui} 
        posX={callbackSetPositionX} 
        posY={callbackSetPositionY}
        rotX={callbackSetRotationX}
        rotY={callbackSetRotationY}
        rotZ={callbackSetRotationZ}
        scaX={callbackSetScaleX}
        scaY={callbackSetScaleY}
        scaZ={callbackSetScaleZ}
      />
    </>
  );
}