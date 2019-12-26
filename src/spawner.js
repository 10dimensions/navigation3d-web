var loader = new THREE.STLLoader();

let SpawnNow = function(_spawnpos)
{
    if(parameters["bot"] === true)          SpawnBot(_spawnpos);
    else if(parameters["cube"] === true)    SpawnCube(_spawnpos);
    else if(parameters["pin"] === true)     SpawnPin(_spawnpos);
}

let SpawnCube = function(_pos)
{
    var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
    var cube = new THREE.Mesh( geometry, material );

    cube.position.set(_pos.x, 0.25, _pos.z);

    var _scal = parseFloat(scaleValues["cube"]);
    console.log(_scal);

    cube.scale.set(_scal, _scal, _scal);
    scene.add( cube );
}


let SpawnPin = function(_pos)
{
   
}


let SpawnBot = function(_pos)
{
    var botObject = new THREE.Object3D();
    loader.load("/assets/Grand_Lahdi_12.stl", function (geometry) {
        
    var mat = new THREE.MeshLambertMaterial({color: 0x7777ff});
    botObject = new THREE.Mesh(geometry, mat);

    botObject.position.set(_pos.x, 0, _pos.z);
    botObject.rotation.x = -0.5 * Math.PI;
    botObject.scale.set(0.01, 0.01, 0.01);
    
    scene.add(botObject);
    
});
}