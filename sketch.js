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
  numberOfElements = getRandomInt(4, 30);

  a = getRandomInt(0.5, 2);
  b = getRandomInt(0.5, 2);
  c = getRandomInt(0.5, 2);

  rot = getRandomInt(0, 0.01);

  var alpha = (Math.PI * 2) / numberOfElements;

  for (var i = 0; i < numberOfElements; i++) {
    elements.push(new Element(i, diameter * cos(i * alpha), diameter * sin(i * alpha)));
  }

  var socket_ = new WebSocket('ws://duel.uncontext.com:80');
  socket_.onmessage = function(data){
    // console.log(data);
    if (data) {
      ucData = data;
    }
  };

}

function draw() {
  var fcOffset = 30;

  background(128, 0, 90);

  if (frameCount % 50 === 0) {
    if (ucData && ucData.a) {
      fcOffset = ucData.a[getRandomInt(0, ucData.a.length)];
    } else {
      fcOffset = getRandomInt(0, 500);
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