import * as THREE from "three";
import { OBJLoader } from "three/examples/jsm/loaders/OBJLoader.js";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

//create scene camera and renderer
// Create a scene, camera and rendere
let root;
const scene = new THREE.Scene();

// const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// Camera
let screenWidth = window.innerWidth,
  screenHeight = window.innerHeight,
  viewAngle = 45,
  nearDistance = 0.1,
  farDistance = 1000;
const camera = new THREE.PerspectiveCamera(
  viewAngle,
  screenWidth / screenHeight,
  nearDistance,
  farDistance
);
//to set x y z position of camera
camera.position.set(0, 0, 35);
camera.lookAt(scene.position);

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputEncoding = THREE.sRGBEncoding;
document.getElementById("canvas-container").appendChild(renderer.domElement);

// Add a light to the scene
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0, 0, 10);
scene.add(light);

//direction Light
const directionalLight = new THREE.DirectionalLight(0xf1f1f1, 1);
directionalLight.position.set(0, 0, 10);
scene.add(directionalLight);
//direction Light
const directional2Light = new THREE.DirectionalLight(0x000000, 1);
directionalLight.position.set(-1, 0, 10);
scene.add(directional2Light);

// Load the OBJ model using the OBJLoader
const position = new THREE.Vector3(0, -1, 0);
let object;
const loader = new GLTFLoader();
// loader.setPath('model/');
loader.load(
  "ghost_raven.glb",
  function (gltf) {
    object = gltf.scene;

    // Set the position and scale of the loaded object
    if(window.innerWidth < 768){
       object.position.set(2, 9, 0);
      object.scale.set(.55, .55, .55);
    }
    else{
     object.position.set(14, 0, 0);
     object.scale.set(1, 1, 1);
    }
   
    //object.rotation.set(2, 2, 0);

    // Add the model to the scene
    scene.add(object);

    console.log(object);
  },
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },
  function (error) {
    console.log("An error happened");
    console.log(error);
  }
);

// Load the HDR environment map using the RGBELoader
const rgbeLoader = new RGBELoader();
rgbeLoader.load("/textures/venice_sunset_1k.hdr", function (texture) {
  texture.mapping = THREE.EquirectangularReflectionMapping;

  // Set the environment map of the scene
  scene.environment = texture;
});
const state = { clock: new THREE.Clock() };

function rotateModel() {
  if (object) {
    const t = state.clock.getElapsedTime();
    object.rotation.y = 3.14 + Math.sin(t) * 0.5; // rotate left and right
  }
}

function animate() {
  requestAnimationFrame(animate);
  rotateModel();
  renderer.render(scene, camera);
  // if (root) modelMovement();
}
animate();
