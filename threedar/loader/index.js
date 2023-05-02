import * as THREE from "three";

import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { RGBELoader } from "three/addons/loaders/RGBELoader.js";

let camera, scene, renderer;

init();
render();

const tDobjectList = [
  {
    format: "gltf",
    path: "gltf/DamagedHelmet/glTF/",
    fileName: "DamagedHelmet.gltf",
    scene: null,
  },
  {
    format: "gltf",
    path: "gltf/Flower/",
    fileName: "Flower.glb",
    scene: null,
  },
  {
    format: "gltf",
    path: "gltf/",
    fileName: "Soldier.glb",
    scene: null,
  },
];

for (let i = 0; i < tDobjectList.length; i++) {
  const { format, path, fileName } = tDobjectList[i];
  const loader = getLoader(format, path);
  loader.load(fileName, function (gltf) {
    tDobjectList[i].scene = gltf.scene;
  });
}

let pointer = 0;
function getLoader(format, path) {
  const pathPrefix = "../assets/models/";
  if (format === "gltf") {
    return new GLTFLoader().setPath(pathPrefix + path);
  }
  return null;
}

document.addEventListener("keydown", (event) => {
  console.log("ev", event.code);
  if (event.code === "ArrowRight") {
    const oldScene = tDobjectList[pointer].scene;
    pointer = (pointer + 1) % tDobjectList.length;
    setTimeout(() => {
      scene.remove(oldScene);
      const sceneo = tDobjectList[pointer].scene;
      if (tDobjectList[pointer].scale)
        sceneo.scale.set(tDobjectList[pointer].scale);
      scene.add(sceneo);
      render();
    }, 100);
  }
});

function init() {
  const container = document.createElement("div");
  document.body.appendChild(container);

  camera = new THREE.PerspectiveCamera(
    45,
    window.innerWidth / window.innerHeight,
    0.25,
    20
  );
  camera.position.set(-1.8, 0.6, 2.7);

  scene = new THREE.Scene();

  new RGBELoader()
    .setPath("../assets/textures/equirectangular/")
    .load("royal_esplanade_1k.hdr", function (texture) {
      texture.mapping = THREE.EquirectangularReflectionMapping;

      scene.background = texture;
      scene.environment = texture;
      setTimeout(() => {
        scene.add(tDobjectList[pointer].scene);
        console.log("tDobjectList[pointer].scene", tDobjectList[pointer]);
      }, 1000);
      render();
    });
  const canvas = document.querySelector("#three");

  renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.outputEncoding = THREE.sRGBEncoding;
  container.appendChild(renderer.domElement);

  const controls = new OrbitControls(camera, renderer.domElement);
  controls.addEventListener("change", render); // use if there is no animation loop
  controls.minDistance = 2;
  controls.maxDistance = 10;
  controls.target.set(0, 0, 0);
  controls.update();

  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  render();
}

function render() {
  renderer.render(scene, camera);
}
