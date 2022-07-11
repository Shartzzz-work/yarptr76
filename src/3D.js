import {
  Scene,
  WebGLRenderer,
  Fog,
  PerspectiveCamera,
  DirectionalLight,
  HemisphereLight,
} from "three";

// import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
// import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader.js";
// import * as draco from "three/examples/js/libs/draco/";
// import { GUI } from "three/examples/jsm/libs/lil-gui.module.min.js";

const canvas = document.querySelector("canvas");
let helmet;
let mouseX = 0;
let mouseY = 0;

let targetX = 0;
let targetY = 0;

const windowHalfX = window.innerWidth / 2;
const windowHalfY = window.innerHeight / 2;

function init() {
  const scene = new Scene();
  const renderer = new WebGLRenderer({
    canvas,
    alpha: true,
    premultipliedAlpha: false,
    antialias: true,
  });

  {
    const near = 1;
    const far = 900;
    const color = "rgba(52, 52, 145, 1)";
    scene.fog = new Fog(color, near, far);
  }
  // scene.background = new THREE.Color(color);

  const fov = 75;
  const aspect = 2; // the canvas default
  const near = 0.1;
  const far = 1000;
  const camera = new PerspectiveCamera(fov, aspect, near, far);

  camera.position.z = 310;

  // const controls = new OrbitControls(camera, canvas);
  // controls.target.set(0, 5, 0);
  // controls.update();

  {
    const intensity = 1;
    const light = new DirectionalLight(0xffffff, intensity);
    light.position.set(0, 100, 200);
    scene.add(light);
  }

  {
    const skyColor = 0xb1e1ff; // light blue
    const groundColor = 0xb97a20; // brownish orange
    const intensity = 1;
    const light = new HemisphereLight(skyColor, groundColor, intensity);
    scene.add(light);
  }

  {
    const color = 0xffffff;
    const intensity = 1;
    const light = new DirectionalLight(color, intensity);
    light.position.set(5, 10, 2);
    scene.add(light);
    scene.add(light.target);
  }

  // {
  //   const color = 0xb1e1ff;
  //   const intensity = 1;
  //   const light = new THREE.AmbientLight(color, intensity);
  //   scene.add(light);
  // }

  // const axesHelper = new THREE.AxesHelper(1000);
  // scene.add(axesHelper);

  // const gltfLoader = new GLTFLoader();
  const url = "/model/diving_helmet3/scene.gltf";

  // const dracoLoader = new DRACOLoader();
  // dracoLoader.setDecoderPath("three/examples/js/libs/draco/");
  // dracoLoader.setDecoderConfig({ type: "js" });

  const loader = new GLTFLoader();
  // loader.setDRACOLoader(dracoLoader);

  loader.load(url, (gltf) => {
    const root = gltf.scene;
    helmet = root.children[0];
    // let box3 = new THREE.Box3().setFromObject(helmet);
    // let center = new THREE.Vector3();
    // box3.getCenter(center);
    // helmet.position.sub(center);
    helmet.position.y = -130;
    helmet.rotateZ(4.7);

    scene.add(helmet);

    // let model = gltf.scene;
    // let box3 = new THREE.Box3().setFromObject(model);
    // let center = new THREE.Vector3();
    // box3.getCenter(center);
    // model.position.sub(center);
    // scene.add(model);
    // console.log(model);
  });

  document.addEventListener("mousemove", onDocumentMouseMove);

  function render() {
    if (resizeRendererToDisplaySize(renderer)) {
      const canvas = renderer.domElement;
      camera.aspect = canvas.clientWidth / canvas.clientHeight;
      camera.updateProjectionMatrix();
    }

    targetX = mouseX * 0.0005;
    targetY = mouseY * 0.0005;

    if (helmet) {
      helmet.rotation.y += 0.5 * (targetX - helmet.rotation.y);
      helmet.rotation.x += 0.5 * (targetY - (helmet.rotation.x + 1.57));
      helmet.rotation.z += 0.5 * (targetX - helmet.rotation.y);
    }

    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();

    renderer.render(scene, camera);

    renderer.setPixelRatio(window.devicePixelRatio * 0.6);

    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

function onDocumentMouseMove(event) {
  mouseX = event.clientX - windowHalfX;
  mouseY = event.clientY - windowHalfY;
}

function resizeRendererToDisplaySize(renderer) {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  const needResize = canvas.width !== width || canvas.height !== height;
  if (needResize) {
    renderer.setSize(width, height, false);
  }
  return needResize;
}

if (canvas && window.innerWidth > 1000) {
  init();
}

// window.addEventListener("resize", function (e) {
//   // console.log(e.target.innerWidth);

//   if (e.target.innerWidth > 1000) {
//     init();
//   }
// });