import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import * as THREE from "three";

export function createText(font, text) {
  const materials = [
    new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true }), // front
    new THREE.MeshPhongMaterial({ color: 0xffffff }), // side
  ];
  const height = 20,
    size = 70,
    hover = 30;

  let textGeo = new TextGeometry(text, {
    font: font,
    size: size,
    height: height,
  });

  textGeo.computeBoundingBox();

  const centerOffset =
    -0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x);

  let textMesh = new THREE.Mesh(textGeo, materials);

  textMesh.position.x = centerOffset;
  textMesh.position.y = hover;
  textMesh.position.z = 0;

  textMesh.rotation.x = 0;
  textMesh.rotation.y = Math.PI * 2;
  return textMesh;
}
