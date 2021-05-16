import React, {useState, useEffect, useCallback} from "react";
import "./App.css";
import * as dat from 'dat.gui'

import CanvasContainer from './containers/CanvasContainer'
import ControlButtons from './components/ControlButtons'

var Control_Gui = [undefined, undefined, undefined, undefined, undefined]
var x_control = undefined
var y_control = undefined
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
    y:0
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
    setObjectProperty((prev) => ({ ...prev, x: newValue }))
    x_control.setValue(newValue)
  }, [])
  const cabllbackSetPositionY = useCallback((newValue) => {
    setObjectProperty((prev) => ({ ...prev, y: newValue }))
    y_control.setValue(newValue)
  }, [])
  var object = {
    color: objectProperty.color,
    wireframe: objectProperty.wireframe,
    opacity: objectProperty.opacity,
    position_x: objectProperty.x,
    position_y: objectProperty.y
  }
  
  useEffect(()=>{
    Control_Gui[1] = new dat.GUI({width:250});
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

    Control_Gui[2] = new dat.GUI({width:250});
    Control_Gui[2].domElement.id = 'control-gui'
    const positionFolder = Control_Gui[2].addFolder("Position")
    x_control = positionFolder.add(object, "position_x", -150, 150, 1).onChange(()=>{
      setPositionX(object.position_x)
    })
    y_control = positionFolder.add(object, "position_y", -100, 100, 1).onChange(()=>{
      setPositionY(object.position_y)
    })
    positionFolder.open()
    Control_Gui[1].hide()
    Control_Gui[2].hide()
  }, [])
  // console.log(objectProperty)

  return (
    <>
      <ControlButtons toggleSetup={toggleSetup} />
      <CanvasContainer objectProps={objectProperty} control={activeGui} saveX={callbackSetPositionX} saveY={cabllbackSetPositionY}/>
    </>
  );
}