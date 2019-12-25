var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

var stats, scene, renderer, composer;
var camera, cameraControls, controls;

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

	for ( var i = 0; i < intersects.length; i++ ) 
  {
    if(intersects[i].object.name === "map")
    {
      console.log("map found");
    }
		//intersects[ i ].object.material.color.set( 0xff0000 );

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

  // Objects

  var planeGeometry = new THREE.PlaneGeometry(20, 20, 1, 1);
  var texture = new THREE.TextureLoader().load( './assets/map2.png' );
  var planeMaterial = new THREE.MeshLambertMaterial( { map: texture, transparent: true } );

  var plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.name = "map"
  // rotate and position the plane
  plane.rotation.x = -0.5 * Math.PI;
  plane.position.set(0,0,0);
  // add the plane to the scene
  scene.add(plane);



  var gridXZ = new THREE.GridHelper(100, 100);
  scene.add(gridXZ);

  controls = new THREE.OrbitControls (camera, renderer.domElement);
}


// animation loop
function animate() {
  requestAnimationFrame(animate);
  // do the render
  render();
  // update stats
  stats.update();
}


// render the scene
function render() {

  // update camera controls
  controls.update();

 
  // actually render the scene
  renderer.render(scene, camera);
}
render();
//window.addEventListener( 'mousemove', onMouseMove, false );
window.addEventListener( 'mousedown', onMouseDown, false );
window.requestAnimationFrame(render);