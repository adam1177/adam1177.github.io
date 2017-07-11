// Imported Libraries
// addons/p5.sound.min.js
// addons/p5.dom.min.js
// p5.min.js

// Vars
var sounds = [];

//preload assets
function preload() {
  //load audio files
  sounds.push(loadSound('audio/MyLifeIsAMeme1.wav'));
  sounds.push(loadSound('audio/MyLifeIsAMeme2.wav'));
  sounds.push(loadSound('audio/MisoFatCock.wav'));
}

//setup code, runs once at start
function setup() {
  //Initalize canvas size
  createCanvas(300, 400);

  //Create buttons (using p5.dom)
  testButton = createButton('test');
  testButton.position(20, 20);
  testButton.mousePressed(playSound(0));
}

//loop function, called many times per second
function draw() {
  background(127);
}

function playSound(id) {
  sounds[id].play();
}

function mousePressed() {
  playSound(2);
}
