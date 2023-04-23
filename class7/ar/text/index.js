
import { createText } from "./utils.js";

var scene, camera, renderer, clock, deltaTime, totalTime;

var arToolkitSource, arToolkitContext;
import { FontLoader } from "../js/FontLoader.js";
import * as THREE from "../js/three.js";

var markerRoot1, markerRoot2;

let text = "Hala",
  font = undefined,
  fontName = "optimer", // helvetiker, optimer, gentilis, droid sans, droid serif
  fontWeight = "bold"; // normal bold

initialize();
animate();

export function loadFont() {
  const loader = new FontLoader();
  loader.load(
    "../../text/fonts/" + fontName + "_" + fontWeight + ".typeface.json",
    function (response) {
      font = response;
      let newMesh = createText(font, text);
      scene.add(newMesh)
      render();
    }
  );
}

loadFont();

function initialize() {
  scene = new THREE.Scene();

  let ambientLight = new THREE.AmbientLight(0xcccccc, 0.5);
  scene.add(ambientLight);

  camera = new THREE.Camera();
  scene.add(camera);

  renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  });
  renderer.setClearColor(new THREE.Color("lightgrey"), 0);
  renderer.setSize(640, 480);
  renderer.domElement.style.position = "absolute";
  renderer.domElement.style.top = "0px";
  renderer.domElement.style.left = "0px";
  document.body.appendChild(renderer.domElement);

  clock = new THREE.Clock();
  deltaTime = 0;
  totalTime = 0;

  ////////////////////////////////////////////////////////////
  // setup arToolkitSource
  ////////////////////////////////////////////////////////////

  arToolkitSource = new THREEx.ArToolkitSource({
    sourceType: "webcam",
  });

  function onResize() {
    arToolkitSource.onResize();
    arToolkitSource.copySizeTo(renderer.domElement);
    if (arToolkitContext.arController !== null) {
      arToolkitSource.copySizeTo(arToolkitContext.arController.canvas);
    }
  }

  arToolkitSource.init(function onReady() {
    onResize();
  });

  // handle resize event
  window.addEventListener("resize", function () {
    onResize();
  });

  ////////////////////////////////////////////////////////////
  // setup arToolkitContext
  ////////////////////////////////////////////////////////////

  // create atToolkitContext
  arToolkitContext = new THREEx.ArToolkitContext({
    cameraParametersUrl: "data/camera_para.dat",
    detectionMode: "mono",
  });

  // copy projection matrix to camera when initialization complete
  arToolkitContext.init(function onCompleted() {
    camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());
  });

  ////////////////////////////////////////////////////////////
  // setup markerRoots
  ////////////////////////////////////////////////////////////

  // build markerControls
  markerRoot1 = new THREE.Group();
  scene.add(markerRoot1);
  let markerControls1 = new THREEx.ArMarkerControls(
    arToolkitContext,
    markerRoot1,
    {
      type: "pattern",
      patternUrl: "data/hiro.patt",
    }
  );

  markerRoot1.add(createText(font, text));
}

function update() {
  // update artoolkit on every frame
  if (arToolkitSource.ready !== false)
    arToolkitContext.update(arToolkitSource.domElement);
}

function render() {
  renderer.render(scene, camera);
}

function animate() {
  requestAnimationFrame(animate);
  deltaTime = clock.getDelta();
  totalTime += deltaTime;
  update();
  render();
}
