var scene, camera, renderer;

init();
animate();

function init(){
  scene = new THREE.Scene();
  var WIDTH = window.innerWidth,
      HEIGHT = window.innerHeight;

  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setSize(WIDTH, HEIGHT);
  document.body.appendChild(renderer.domElement);

  camera = new THREE.PerspectiveCamera(45, WIDTH /HEIGHT, 0.1, 2000);
  camera.position.set(0,6,0);
  scene.add(camera);

  window.addEventListener('resize', function() {
    var WIDTH = window.innerWidth,
        HEIGHT = window.innerHeight;
    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectionmatrix();
  });

  renderer.setClearColor(new THREE.Color(0x333F47, 1));

  var light = new THREE.PointLight (0xffffff);
  light.position.set(-100, 200, 100);
  scene.add(light);

  var loader = new THREE.JSONLoader();
  loader.load("./assets/models/character_test.json", function (geometry){
    var material = new THREE.MeshLambertMaterial({color: 0x55B663});
    mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);
  });

  controls = new THREE.OrbitControls(camera, renderer.domElement);
}

function animate(){
  requestAnimationFrame(animate);

  renderer.render(scene, camera);
  controls.update();
}
