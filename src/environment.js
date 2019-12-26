var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

var stats, scene, renderer, composer;
var camera, light, cameraControls, controls;

if (!init()) animate();


function onMouseDown( event ) 
{

	// calculate mouse position in normalized device coordinates
	// (-1 to +1) for both components

	mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
  mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
  
   // update the picking ray with the camera and mouse position
	raycaster.setFromCamera( mouse, camera );

  
	// calculate objects intersecting the picking ray
	var intersects = raycaster.intersectObjects( scene.children );

  if(intersects.length > 0)
  {

  }

	for ( var i = 0; i < intersects.length; i++ ) 
  {
    if(intersects[i].object.name === "map")
    {
      console.log(intersects[i].point);
      SpawnNow(intersects[i].point);
    }

  }


}



// init the scene
function init() {
  renderer = new THREE.WebGLRenderer({
    antialias: true // to get smoother output
  });
  renderer.setClearColor(0xbbbbbb);
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.getElementById("container").appendChild(renderer.domElement);

  // add Stats.js - https://github.com/mrdoob/stats.js
  stats = new Stats();
  stats.domElement.style.position = "absolute";
  stats.domElement.style.bottom = "0px";
  document.body.appendChild(stats.domElement);

  
  // create a scene
  scene = new THREE.Scene();
  // put a camera in the scene
  camera = new THREE.PerspectiveCamera(
    35,
    window.innerWidth / window.innerHeight,
    1,
    10000
  );
  camera.position.set(0, 20, 25);
  scene.add(camera);

  light = new THREE.AmbientLight(0xffffff);
  scene.add(light);
  // Objects

  var planeGeometry = new THREE.PlaneGeometry(20, 20, 1, 1);
  var texLoader = new THREE.TextureLoader();
  texLoader.crossOrigin = "";
  var texture = texLoader.load( '/assets/map2.png' );
  var planeMaterial = new THREE.MeshStandardMaterial( { map: texture, transparent: true } );

  var plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.name = "map"
  
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.set(0,0,0);

  scene.add(plane);


// Add Wireframe Grid

  var gridXZ = new THREE.GridHelper(100, 100);
  scene.add(gridXZ);

  controls = new THREE.OrbitControls (camera, renderer.domElement);
}


function animate() {
  requestAnimationFrame(animate);
  render();
  stats.update();
}


function render() {

  controls.update();                // update camera controls

  renderer.render(scene, camera);   // render the scene

}
render();


//window.addEventListener( 'mousemove', onMouseMove, false );
window.addEventListener( 'mousedown', onMouseDown, false );
window.requestAnimationFrame(render);