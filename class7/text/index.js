import * as THREE from "three";

import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";

THREE.Cache.enabled = true;

let container;

let camera, cameraTarget, scene, renderer;

let group, textMesh1, textGeo, materials;

let text = "three.js",
  font = undefined,
  fontName = "optimer", // helvetiker, optimer, gentilis, droid sans, droid serif
  fontWeight = "bold"; // normal bold

const height = 20,
  size = 70,
  hover = 30;


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

  materials = [
    new THREE.MeshPhongMaterial({ color: 0xffffff, flatShading: true }), // front
    new THREE.MeshPhongMaterial({ color: 0xffffff }), // side
  ];

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

function createText() {
  textGeo = new TextGeometry(text, {
    font: font,

    size: size,
    height: height,
  });

  textGeo.computeBoundingBox();

  const centerOffset =
    -0.5 * (textGeo.boundingBox.max.x - textGeo.boundingBox.min.x);

  textMesh1 = new THREE.Mesh(textGeo, materials);

  textMesh1.position.x = centerOffset;
  textMesh1.position.y = hover;
  textMesh1.position.z = 0;

  textMesh1.rotation.x = 0;
  textMesh1.rotation.y = Math.PI * 2;

  group.add(textMesh1);
}

function refreshText() {
  group.remove(textMesh1);

  if (!text) return;

  createText();
}

function render() {
  camera.lookAt(cameraTarget);

  renderer.clear();
  renderer.render(scene, camera);
}

init();
