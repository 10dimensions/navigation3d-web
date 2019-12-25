var gui = new dat.GUI();

//var first = gui.addFolder("Indicator");
var pos1 = gui.add(parameters, 'pin').name('Drop Pin').listen().onChange(function(){setChecked("pin")});
var neg1 = gui.add(parameters, 'bot').name('Bot').listen().onChange(function(){setChecked("bot")});
var neu1 = gui.add(parameters, 'cube').name('Generic Cube').listen().onChange(function(){setChecked("cube")});

function setChecked( prop ){
  for (let param in parameters){
    parameters[param] = false;
  }
  parameters[prop] = true;
}

setChecked("pin");