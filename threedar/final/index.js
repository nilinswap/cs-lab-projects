import * as THREE from "three";
import { createText } from "./utils.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";

let camera, renderer, scene;
var markerRoot1;
var arToolkitSource, arToolkitContext;

function init(font) {
  // create canvas and renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setClearColor(new THREE.Color("lightgrey"), 0);
  renderer.setSize(640, 480);
  renderer.domElement.style.position = "absolute";
  renderer.domElement.style.top = "0px";
  renderer.domElement.style.left = "0px";
  document.body.appendChild(renderer.domElement);

  

  // create scene, add light
  scene = new THREE.Scene();
  addLight(scene);

  camera = new THREE.Camera();
  scene.add(camera);



  

  arToolkitSource = new THREEx.ArToolkitSource({
    sourceType: "webcam",
  });

  // create atToolkitContext
  arToolkitContext = new THREEx.ArToolkitContext({
    cameraParametersUrl: "./data/camera_para.dat",
    detectionMode: "mono",
  });

  // copy projection matrix to camera when initialization complete
  arToolkitContext.init(function onCompleted() {
    camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
  });

  // build markerControls
  markerRoot1 = new THREE.Group();
  let mesh = createText(font, "Swapnil");
  console.log("mesh", mesh);
  markerRoot1.add(mesh);
  scene.add(markerRoot1);
  let markerControls1 = new THREEx.ArMarkerControls(
    arToolkitContext,
    markerRoot1,
    {
      type: "pattern",
      patternUrl: "./data/hiro.patt",
    }
  );

  //resize
  function onResize() {
    arToolkitSource.onResizeElement();
    arToolkitSource.copyElementSizeTo(renderer.domElement);
    if (arToolkitContext.arController !== null) {
      arToolkitSource.copyElementSizeTo(arToolkitContext.arController.canvas);
    }
  }
  arToolkitSource.init(function onReady() {
    onResize();
  });
  window.addEventListener("resize", function () {
    onResize();
  });
}

function render() {
  renderer.render(scene, camera);
}

function addLight(scene) {
  const color = 0xffffff;
  const intensity = 1.5;
  const light = new THREE.PointLight(color, intensity);
  light.color.setHSL(Math.random(), 1, 0.5);
  light.position.set(0, 1, 9);
  scene.add(light);

  let ambientLight = new THREE.AmbientLight(0xcccccc, 0.5);
  scene.add(ambientLight);
}


function loadFont() {
  let fontName = "optimer", // helvetiker, optimer, gentilis, droid sans, droid serif
    fontWeight = "bold";
  const loader = new FontLoader();
  loader.load(
    "fonts/" + fontName + "_" + fontWeight + ".typeface.json",
    function (response) {
      let font = response;
      init(font);
      animate();
    }
  );
}

function update() {
  if (arToolkitSource.ready !== false)
    arToolkitContext.update(arToolkitSource.domElement);
}

function animate() {
  requestAnimationFrame(animate);
  update();
  render();
}

loadFont();



