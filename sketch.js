var headCount = 1000; // number of heads
var heads = []; // array containing head objects

var headAcclMin = 0.5;
var headAcclMax = 2;

var c = 0; // bg color var, keeps track of the current bg color
var cAdd = true; // is the color currently increasing or decreasing from 0-255 hue

// setup code - run once at startup
function setup() {
  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  colorMode(HSB);

  // first run setup, initalize array of heads & their inital properties
  for (i = 0; i < headCount; i++) {
    heads[i] = new head();
    heads[i].img = loadImage('head.png');
    heads[i].x = random(width);
    heads[i].y = random(-heads[i].img.width, -height);
    heads[i].accl = random(headAcclMin, headAcclMax);
    heads[i].angleMod = random([-0.05, 0.05]);
    heads[i].isGhost = random() >= 0.001;
  }
}

// window resize event - run this code everytime the window is resized
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// draw loop - called many times per second
function draw() {
  background(c, 255, 255);
  if (cAdd) {
    c++;
    if (c >= 255)
      cAdd = false;
  } else {
    c--;
    if (c <= 0)
      cAdd = true;
  }

  // loop through all heads in the 'heads' array
  for (i = 0; i < headCount; i++) {
    //draw head images
    push(); // push and pop go together, basically they isolate all translations made between them to only apply to code between them
    translate(heads[i].x + (heads[i].img.width / 2), heads[i].y + (heads[i].img.height / 2)); // transforms canvas before drawing
    rotate(heads[i].angle); // rotates canvas before drawing
    scale(map(heads[i].accl, headAcclMin, headAcclMax, 0.2 , 1));
    if (heads[i].isGhost)
      image(heads[i].img, 0, 0); // draw the image
    else
      blend(heads[i].img, 0, 0, heads[i].img.width, heads[i].img.height, 0 - heads[i].img.width/2, 0 - heads[i].img.height/2, heads[i].img.width, heads[i].img.height, DARKEST); // draw the blur copy of the image to be used as a border effect
    pop();

    //calculate new head location
    if (heads[i].y > height) { // check if head is off the bottom of the screen
      heads[i].y = -heads[i].img.height; // if the head moves below the screen move it to the top again
      heads[i].x = random(width); // randomize the x position of the head
      heads[i].accl = random(headAcclMin, headAcclMax); // randomize new accelleration value for head
      heads[i].isGhost = random() >= 0.001; // ghost miso random chance
    }

    heads[i].y += 2 * heads[i].accl; // move head down an amount every loop based on the head accl value
    heads[i].angle += heads[i].angleMod * heads[i].accl; // rotate the head angle by 0.01 per frame


  }
}

// Head object
function head() {
  this.x = 0;
  this.y = 0;
  this.angle = 0;
  this.accl = 0;
  this.angleMod = 0;
  this.isGhost = false;
  this.img;
}
