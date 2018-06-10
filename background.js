var color = [0x000, 0x000, 0x9E1707];

function banane() {
  return color[Math.floor(Math.random() * color.length)]
}
var camera, scene, renderer;
var geometry, group;
var mouseX = 0,
  mouseY = 0;
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;
document.addEventListener('mousemove', onDocumentMouseMove, false);
init();
animate();

function init() {
  container = document.createElement('div');
  document.body.appendChild(container);
  container.classList.add('oula');
  camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, 1, 10000);
  camera.position.z = 2000;
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0xFAFAFA);
  scene.fog = new THREE.Fog(0xFCC342, 1, 10000);
  var geometry = new THREE.BoxGeometry(100, 20, 20);
  var material = new THREE.MeshNormalMaterial();
  group = new THREE.Group();
  for (var i = 0; i < 15; i++) {
    var material = new THREE.MeshBasicMaterial({
      color: banane()
    });
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = Math.random() * 1250 - 750;
    mesh.position.y = Math.random() * 600 - 200;
    mesh.position.z = Math.random() * 500 - 500;
    mesh.rotation.x = Math.random() * 2 * Math.PI;
    mesh.matrixAutoUpdate = false;
    mesh.updateMatrix();
    group.add(mesh);
  }
  scene.add(group);
  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);
  //
  window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
  windowHalfX = window.innerWidth / 1.5;
  windowHalfY = window.innerHeight / 1.5;
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentMouseMove(event) {
  mouseX = (event.clientX - windowHalfX) * .8;
  mouseY = (event.clientY - windowHalfY) * 1.8;
}

function animate() {
  requestAnimationFrame(animate);
  render();
}

function render() {
    var time = Date.now() * 0.001;
  camera.position.x += (mouseX - camera.position.x) * .2;
  camera.position.y += (-mouseY - camera.position.y) * .2;
  camera.lookAt(scene.position);
  renderer.render(scene, camera);
}
