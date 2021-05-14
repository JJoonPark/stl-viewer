import * as THREE from 'three'

export default function GridMaker(opts) {
  var config = opts || {
    height: 150,
    width: 100,
    step: 5,
    linewidth: 1,
    color: 0xFFFFFF

  };

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

  var material = new THREE.LineBasicMaterial({
    color: config.color,
    opacity: 1,
    linewidth: config.linewidth
  });

  var gridLine = new THREE.Line()

  //width
  for (var i = -config.width; i <= config.width; i += config.step) {
    var points = []
    points.push(new THREE.Vector2(-config.height, i));
    points.push(new THREE.Vector2(config.height, i));
    var geometry = new THREE.BufferGeometry().setFromPoints(points)
    var line = new THREE.Line( geometry, material)
    gridLine.add(line)
  }
  //height
  for (var i = -config.height; i <= config.height; i += config.step) {
    var points2 = []
    points2.push(new THREE.Vector2(i, -config.width));
    points2.push(new THREE.Vector2(i, config.width));
    var geometry2 = new THREE.BufferGeometry().setFromPoints(points2)
    var line2 = new THREE.Line( geometry2, material)
    gridLine.add(line2)
  }

  return gridLine;
}