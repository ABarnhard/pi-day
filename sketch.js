var numberOfElements,
    diameter = 100,
    center,
    fc,
    rotate,
    a,
    b,
    c,
    elements = [];

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  frameRate(100);
  smooth(8);
  ellipseMode(CENTER);
  colorMode(HSB,360,100,100);
  stroke(0);
  strokeWeight(1);

  center = createVector(width/2, height/2);
  // numberOfElements = getRandomInt(4, 30);
  numberOfElements = 4;
/*
  a = getRandomInt(0.5, 2);
  b = getRandomInt(0.5, 2);
  c = getRandomInt(0.5, 2);
  rotate = getRandomInt(0, 0.01);
*/

  a = 1;
  b = 1;
  c = 1;

  var alpha = (Math.PI * 2) / numberOfElements;

  for (var i = 0; i < numberOfElements; i++) {
    elements.push(new Element(i, diameter * cos(i * alpha), diameter * sin(i * alpha)));
  }


}

function draw() {
  background(128, 0, 90);

  fc = frameCount / (30 + mouseX / 5);

  for (var i = 0; i < numberOfElements; i++) {
    fill(lerp(0, 360, (i + 1) / numberOfElements), 80, 80, 10);
    elements[i].display();
  }

}

// Constructor
function Element(index, x, y){
  this.index = index;
  this.x = x;
  this.y = y;
}

Element.prototype.display = function() {
  var dx, dy;

  push();

  dx = Math.abs(4 * diameter * sin(fc) * sin(fc*a));
  dy = Math.abs(4 * diameter * sin(fc*b) * sin(fc*c));
  translate(center.x,center.y);
  //rotate(rot*frameCount);
  ellipse(this.x, this.y, dx, dy);
  ellipse(this.x, this.y, dy, dx);
  //ellipse(x,y,abs(4*dia*sin(fc*a)*sin(fc*c)),abs(4*dia*sin(fc)*sin(fc*b)));

  pop();
};

// HELPER FUNCTIONS

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}