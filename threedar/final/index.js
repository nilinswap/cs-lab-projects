import * as THREE from "three";
import { createText } from "./utils.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";

let camera, cameraTarget, renderer, scene;

function init() {
  // create canvas and renderer
  const canvas = document.querySelector("#three");
  renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);

  // create camera
  const fov = 30;
  const aspect = window.innerWidth / window.innerHeight; // the canvas default
  const near = 1;
  const far = 1500;
  camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 400, 700);
  cameraTarget = new THREE.Vector3(0, 150, 0);

  // create scene, add light
  scene = new THREE.Scene();
  addLight(scene);

  //create mesh, add to scene
  let group = new THREE.Group();
  group.position.y = 100;
  scene.add(group);
  loadFont(group);

  window.addEventListener("resize", onWindowResize);

}

function render() {
  camera.lookAt(cameraTarget);
  renderer.clear();
  renderer.render(scene, camera);
}

function addLight(scene) {
  const color = 0xffffff;
  const intensity = 1.5;
  const light = new THREE.PointLight(color, intensity);
  light.color.setHSL(Math.random(), 1, 0.5);
  light.position.set(0, 100, 90);
  scene.add(light);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}

function loadFont(group) {
  let fontName = "optimer", // helvetiker, optimer, gentilis, droid sans, droid serif
    fontWeight = "bold";
  const loader = new FontLoader();
  loader.load(
    "fonts/" + fontName + "_" + fontWeight + ".typeface.json",
    function (response) {
      let font = response;
      group.add(createText(font, "Swapnil"));
      render();
    }
  );
}

init();
render();
