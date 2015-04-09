var numberOfElements,
    diameter = 100,
    center,
    fc,
    rot,
    a,
    b,
    c,
    elements = [],
    ucData;

function setup() {
  createCanvas(window.innerWidth, window.innerHeight);
  frameRate(100);
  smooth(8);
  ellipseMode(CENTER);
  colorMode(HSB,360,100,100);
  stroke(0);
  strokeWeight(1);

  center = createVector(width/2, height/2);
  numberOfElements = getRandomInt(8, 20);

  a = Math.random();
  b = Math.random();
  c = Math.random();

  //rot = getRandomInt(0, 5);
  rot = Math.random();

  var alpha = (Math.PI * 2) / numberOfElements;

  for (var i = 0; i < numberOfElements; i++) {
    elements.push(new Element(i, diameter * cos(i * alpha), diameter * sin(i * alpha)));
  }

  var socket_ = new WebSocket('ws://duel.uncontext.com:80');
  socket_.onmessage = function(data){
    if (data) {
      ucData = JSON.parse(data.data);
    }
  };

}

function draw() {
  var fcOffset = 30;

  background(128, 0, 90);

  if (frameCount % 150 === 0) {
    if (ucData) {
      rot = ucData.d * ucData.e;
      fcOffset = getRandomInt(5, 30);
    }
  }

  fc = frameCount / (30 + fcOffset / 5);

  for (var i = 0; i < numberOfElements; i++) {
    fill(lerp(0, 360, (i + 1) / numberOfElements), 80, 80, 10);
    elements[i].display();
  }

}

// Constructor
function Element(index, x, y){
  this.index = index;
  this.x     = x;
  this.y     = y;
}

Element.prototype.display = function() {
  var dx, dy;

  push();

  dx = Math.abs(4 * diameter * sin(fc) * sin(fc*a));
  dy = Math.abs(4 * diameter * sin(fc*b) * sin(fc*c));

  translate(center.x, center.y);

  rotate(rot * frameCount);

  ellipse(this.x, this.y, dx, dy);
  ellipse(this.x, this.y, dy, dx);

  pop();
};

// HELPER FUNCTIONS

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}