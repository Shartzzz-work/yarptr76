import './style.scss'

import "./js/getOrder";

import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
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
  const scene = new THREE.Scene();
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    premultipliedAlpha: false,
  });

  {
    const near = 1;
    const far = 900;
    const color = "rgba(52, 52, 145, 1)";
    scene.fog = new THREE.Fog(color, near, far);
  }
  // scene.background = new THREE.Color(color);

  const fov = 75;
  const aspect = 2; // the canvas default
  const near = 0.1;
  const far = 1000;
  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);

  camera.position.z = 300;

  // const controls = new OrbitControls(camera, canvas);
  // controls.target.set(0, 5, 0);
  // controls.update();

  {
    const intensity = 1;
    const light = new THREE.DirectionalLight(0xffffff, intensity);
    light.position.set(0, 100, 200);
    scene.add(light);
  }

  {
    const skyColor = 0xb1e1ff; // light blue
    const groundColor = 0xb97a20; // brownish orange
    const intensity = 1;
    const light = new THREE.HemisphereLight(skyColor, groundColor, intensity);
    scene.add(light);
  }

  {
    const color = 0xffffff;
    const intensity = 1;
    const light = new THREE.DirectionalLight(color, intensity);
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

  const gltfLoader = new GLTFLoader();
  const url = "../model/diving_helmet3/scene.gltf";

  gltfLoader.load(url, (gltf) => {
    const root = gltf.scene;
    helmet = root.children[0];
    helmet.position.y = -140;
    helmet.rotateZ(4.7);

    scene.add(helmet);
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
      helmet.rotation.y += 0.06 * (targetX - helmet.rotation.y);
      helmet.rotation.x += 0.06 * (targetY - (helmet.rotation.x + 1.57));
      helmet.rotation.z += 0.05 * (targetX - helmet.rotation.y);
    }

    const canvas = renderer.domElement;
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();

    renderer.render(scene, camera);

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

if (canvas) {
  init();
}

const root = document.querySelector(".works_articles");
const target = document.querySelectorAll(".work");
const timeline = document.querySelectorAll("[data-timeline]");

const io_options = {
  root: root,
  rootMargin: "0px",
  threshold: 0.5,
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const timeline = document.querySelector(
          `[data-timeline='${entry.target.id}']`
        );
        timeline.classList.add("active");
      } else {
        const timeline = document.querySelector(
          `[data-timeline='${entry.target.id}']`
        );
        timeline.classList.remove("active");
      }
    });
  },
  {
    root: root,
    rootMargin: "0px",
    threshold: 0.5,
  }
);

target.forEach((i) => {
  observer.observe(i);
});

// function io_callback(entries) {
//   // if (entries[0].isIntersecting) {
//   //   root.addEventListener("scroll", () => {
//   //     const timeline = document.querySelector(
//   //       `[data-timeline='${entries[0].target.id}']`
//   //     );
//   //     timeline.classList.add("active");
//   //   });
//   // } else {
//   //   root.removeEventListener("scroll", scrollingEvents);
//   //   const timeline = document.querySelector(
//   //     `[data-timeline='${entries[0].target.id}']`
//   //   );
//   //   timeline.classList.remove("active");
//   //   // output.innerText = 0;
//   // }
//   const ratio = entries[0].intersectionRatio;
//   const boundingRect = entries[0].boundingClientRect;
//   const intersectionRect = entries[0].intersectionRect;

//   if (ratio === 1) {
//     console.log(ratio);
//     const timeline = document.querySelector(
//       `[data-timeline='${entries[0].target.id}']`
//     );
//     timeline.classList.add("active");
//   } else if (ratio > 0) {
//     if ((boundingRect.top > 200)) {
//       console.log("on the top");
//       console.log(boundingRect.top, intersectionRect.top, ratio);
//       const timeline = document.querySelector(
//         `[data-timeline='${entries[0].target.id}']`
//       );
//       timeline.classList.remove("active");
//     }
//   }

//   if (ratio === 0) {
//     console.log("outside");
//     console.log(boundingRect.top, intersectionRect.top, ratio);
//     const timeline = document.querySelector(
//       `[data-timeline='${entries[0].target.id}']`
//     );
//     timeline.classList.remove("active");
//   } else if (ratio < 1) {
// if (boundingRect.top < intersectionRect.top) {
//   console.log("on the top");
//   console.log(boundingRect.top, intersectionRect.top, ratio);
//   const timeline = document.querySelector(
//     `[data-timeline='${entries[0].target.id}']`
//   );
//   timeline.classList.add("active");
// } else if (boundingRect.top > intersectionRect.top) {
//       console.log("on the bottom");
//       console.log(boundingRect.top, intersectionRect.top / 2, ratio);
//       const timeline = document.querySelector(
//         `[data-timeline='${entries[0].target.id}']`
//       );
//       timeline.classList.add("active");
//     }
//   } else {
//     console.log("inside");
//     // console.log(entries[0].target);
//   }
// }
