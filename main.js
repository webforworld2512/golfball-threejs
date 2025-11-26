import './style.css';
import * as THREE from 'three';
import * as dat from 'dat.gui';

//Debug
const gui = new dat.GUI();

// Canvas 
const canvas = document.querySelector('canvas.webgl');

// scene
const scene = new THREE.Scene();

//Object
// const geometry = new THREE.TorusGeometry(0.7, 0.2, 16, 100);
// texture
const TextureLoader = new THREE.TextureLoader().load('assets/unnamed.png');
const geometry = new THREE.SphereGeometry(0.5, 64, 64);
const material = new THREE.MeshStandardMaterial({ color: 0x292929, metalness: 0.9, roughness: 0.15, normalMap: TextureLoader });
// material.color = new THREE.Color(0xff0000);
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Lights
const pointLight = new THREE.PointLight(0xffffff, 0.1);
// pointLight.position.set( 2, 3, 4 );
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

// pointLight2
const pointLight2 = new THREE.PointLight(0xff0000, 2);
pointLight2.position.set(-1.86, 1.13, -0.48);
pointLight2.intensity = 3.45;
scene.add(pointLight2);

//gui for pointLight2
const light1 = gui.addFolder('Light 1');

light1.add(pointLight2.position, 'x').min(-3).max(3).step(0.01);
light1.add(pointLight2.position, 'y').min(-6).max(6).step(0.01);
light1.add(pointLight2.position, 'z').min(-3).max(3).step(0.01);
light1.add(pointLight2, 'intensity').min(0).max(10).step(0.01);

//PointLight2 helper
// const pointLight2Helper = new THREE.PointLightHelper(pointLight2, 1);
// scene.add(pointLight2Helper);

// **********************************************************
// pointLight3
const pointLight3 = new THREE.PointLight(0xe1ff, 2);
pointLight3.position.set(1.73, -1.45, -1.38);
pointLight3.intensity = 3.5;
scene.add(pointLight3);

//gui for pointLight3
const light2 = gui.addFolder('Light 2');

light2.add(pointLight3.position, 'x').min(-3).max(3).step(0.01);
light2.add(pointLight3.position, 'y').min(-6).max(6).step(0.01);
light2.add(pointLight3.position, 'z').min(-3).max(3).step(0.01);
light2.add(pointLight3, 'intensity').min(0).max(10).step(0.01);

// color controller in gui
const light2Color = { color: 0xe1ff }
light2.addColor(light2Color, 'color').onChange(() => {
  pointLight3.color.set(light2Color.color)
});

//PointLight3 helper
// const pointLight3Helper = new THREE.PointLightHelper(pointLight3, 1);
// scene.add(pointLight3Helper);

// Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
};

window.addEventListener('resize', () => {
  // Update sizes
  sizes.width = window.innerWidth,
    sizes.height = window.innerHeight

  //Update Camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix()

  //Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
});

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

//Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true // make background transparent
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

// Adding interactivity
document.addEventListener('mousemove', onDocumentMouseMove);

let mouseX = 0;
let mouseY = 0;
let targetX = 0;
let targetY = 0;

const windowX = window.innerWidth / 2;
const windowY = window.innerHeight / 2;

function onDocumentMouseMove(event) {
  mouseX = (event.clientX - windowX);
  mouseY = (event.clientY - windowY);
}

// Parallax scroll
const updateSphereOnScroll = () => {
  sphere.position.y = window.scrollY * 0.001;
}
document.addEventListener('scroll', updateSphereOnScroll);

//Animate
const clock = new THREE.Clock();
const tick = () => {
  targetX = mouseX * 0.001;
  targetY = mouseY * 0.001;

  const elapsedTime = clock.getElapsedTime();

  // Update Objects
  sphere.rotation.y = 0.5 * elapsedTime;

  sphere.rotation.y += 0.5 * (targetX - sphere.rotation.y);
  sphere.rotation.x += 0.05 * (targetY - sphere.rotation.x);
  sphere.position.z += -0.05 * (targetY - sphere.rotation.x);

  //Update orbital controls
  //controls.update()

  //Render
  renderer.render(scene, camera);

  // recursion
  requestAnimationFrame(tick);
}
tick(); 