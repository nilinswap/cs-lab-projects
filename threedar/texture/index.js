import * as THREE from "three";

const canvas = document.querySelector("#three");
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });

const fov = 100;
const aspect = 2; // the canvas default
const near = 0.1;
const far = 5;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
camera.position.z = 2;

const scene = new THREE.Scene();

{
  const color = 0xffffff;
  const intensity = 1;
  const light = new THREE.PointLight(color, intensity);
  light.position.set(-1, 2, 4);
  scene.add(light);
}

const boxWidth = 1;
const boxHeight = 1;
const boxDepth = 1;
const geometry = new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
const texture = new THREE.TextureLoader().load("../assets/textures/crate.gif");

const material = new THREE.MeshBasicMaterial({ map: texture });

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

function render(time) {
  time *= 0.001; // convert time to seconds

  cube.rotation.x = time;
  cube.rotation.y = time;
  cube.rotation.z = time;

  renderer.render(scene, camera);

  requestAnimationFrame(render);
}
requestAnimationFrame(render);