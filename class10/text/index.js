import * as THREE from "three";

import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { createText } from "./utils.js";


THREE.Cache.enabled = true;

let container;
let camera, cameraTarget, scene, renderer;
let group, textMesh1, textGeo;

let text = "three.js",
  font = undefined,
  fontName = "optimer", // helvetiker, optimer, gentilis, droid sans, droid serif
  fontWeight = "bold"; // normal bold

function init() {
  container = document.createElement("div");
  document.body.appendChild(container);

  // CAMERA

  camera = new THREE.PerspectiveCamera(
    30,
    window.innerWidth / window.innerHeight,
    1,
    1500
  );
  camera.position.set(0, 400, 700);
  cameraTarget = new THREE.Vector3(0, 150, 0);

  // SCENE

  scene = new THREE.Scene();

  // LIGHTS

  const pointLight = new THREE.PointLight(0xffffff, 1.5);
  pointLight.color.setHSL(Math.random(), 1, 0.5);
  pointLight.position.set(0, 100, 90);
  scene.add(pointLight);

  group = new THREE.Group();
  group.position.y = 100;

  scene.add(group);

  loadFont();

  // RENDERER

  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  // EVENTS

  container.style.touchAction = "none";
  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function loadFont() {
  const loader = new FontLoader();
  loader.load(
    "fonts/" + fontName + "_" + fontWeight + ".typeface.json",
    function (response) {
      font = response;
      refreshText();
      render();
    }
  );
}

function refreshText() {
  group.remove(textMesh1);
  if (!text) return;
  createText(textGeo, textMesh1, group, font, text);
}

function render() {
  camera.lookAt(cameraTarget);
  renderer.clear();
  renderer.render(scene, camera);
}

init();
