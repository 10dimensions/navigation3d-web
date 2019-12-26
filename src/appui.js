var gui = new dat.GUI();

var spawnIndicator = gui.addFolder("GUI Panel");
var _pin = spawnIndicator.add(parameters, 'pin').name('Drop Pin').listen().onChange(function(){setChecked("pin")});
var _bot = spawnIndicator.add(parameters, 'bot').name('Bot').listen().onChange(function(){setChecked("bot")});
var _cube = spawnIndicator.add(parameters, 'cube').name('Generic Cube').listen().onChange(function(){setChecked("cube")});

function setChecked( prop ){
  for (let param in parameters){
    parameters[param] = false;
  }
  parameters[prop] = true;
}

var _cubeScal = spawnIndicator.add(scaleValues, 'cube').name('Cube Scale').min(0).max(1).step(0.2);


setChecked("pin");