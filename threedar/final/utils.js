import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import * as THREE from "three";

THREE.Cache.enabled = true;

export function createText(font, text) {
  const materials = [
    new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true }), // front
    new THREE.MeshPhongMaterial({ color: 0xffffff }), // side
  ];
  const height = 1,
    size = 1,
    hover = 1;

  let textGeo = new TextGeometry(text, {
    font: font,
    size: size,
    height: height,
  });

 
  let textMesh = new THREE.Mesh(textGeo, materials);

  textMesh.position.y = hover;

  textMesh.rotateX(-Math.PI / 2);
  return textMesh;
}


