// We are in the Branch

// note :: get Alone pad working.  get temple_NEWweb.jpg workingp5.Vector

var recorder, soundOut, soundFile;
var img;
var state = 0; // mousePress will increment from Record, to Stop, to
var dt = new Date();
var balls = [];

var roomSoundTemple;

// sounds
var alones = [];
var alone;``
var arps = [];
var arp;
var brassbowls = [];
var brassbowl;
var chimes = [];
var chime;
var choirs = [];
var choir;
var choirLows = [];
var choirLow;
var cpPongs = [];
var cpPong;
var crotales = [];
var crotale;
var crotaleHighs = [];
var crotaleHigh;
var chords = [];
var chord;
var granulators = [];
var granulator;
var harps = [];
var harp;
var jungles = [];
var jungle;
var jups = [];
var jup;
var mks = [];
var mk;
var muteds = [];
var muted;
var pianos = [];
var piano;
var p5pianoGs = [];
var p5pianoG;

var touchStart;
var touchEnd;
var currentBall;

function preload() {
  // Sound assets preload

  roomSoundTemple = loadSound("https://raw.githubusercontent.com/scottreitherman/ambient_MET/master/www/img/mp3/temple_roomsound.mp3");


 for (var i = 0; i < 4; i++) {
   var crotale = loadSound("https://raw.githubusercontent.com/scottreitherman/ambient_MET/master/www/img/mp3/crotale" + i + ".mp3");
   crotales.push(crotale);
  }

 for (var i = 0; i < 4; i++) {
   var crotaleHigh = loadSound("https://raw.githubusercontent.com/scottreitherman/ambient_MET/master/www/img/mp3/crotale_high" + i + ".mp3");
   crotaleHighs.push(crotaleHigh);
  }

  for (var i = 0; i < 1; i++) {
    var alone = loadSound("https://raw.githubusercontent.com/scottreitherman/ambient_MET/master/www/img/mp3/alone" + i + ".mp3");
    alones.push(alone);
  }

  for (var i = 0; i < 2; i++) {
    var choir = loadSound("https://raw.githubusercontent.com/scottreitherman/ambient_MET/master/www/img/mp3/choir" + i + ".mp3");
    choirs.push(choir);
  }

  for (var i = 0; i < 5; i++) {
    var chime = loadSound("https://raw.githubusercontent.com/scottreitherman/ambient_MET/master/www/img/mp3/chime" + i + ".mp3");
    chimes.push(chime);
  }

  for (var i = 0; i < 5; i++) {
    var jungle = loadSound("https://raw.githubusercontent.com/scottreitherman/ambient_MET/master/www/img/mp3/jungle" + i + ".mp3");
    jungles.push(jungle);
  }

 img = loadImage("https://raw.githubusercontent.com/scottreitherman/ambient_MET/master/www/img/temple_NEWweb.jpg");
}

function setup() {
  //  createCanvas(1000, 650);
  createCanvas(windowWidth, windowHeight);
  noCursor();
  image(img, 0, 0, width, height);

  // var dt = new Date();
  //       currentHours = dt.getHours();
  //       currentHours = ("0" + currentHours).slice(-2);
  //       currentMinutes = dt.getMinutes();
  //       currentMinutes = ("0" + currentMinutes).slice(-2);
  //       currentSeconds = dt.getSeconds();
  //       currentSeconds = ("0" + currentSeconds).slice(-2);
  //       var time = currentHours+":"+currentMinutes+":"+currentSeconds;
  //       var formData = $(this).serialize() + '&time=' + time;
  //
  // console.log(time);

  roomSoundTemple.loop();
  roomSoundTemple.setVolume(0.3);

  // FOR loop to push each ball object.
  for (var i = 0; i < 6; i++) {
    // constructor Fn: ball  - create vector (starting x,                      starting y), ball diameter,       rect - (start x,                                start y),    rect width,              rect height,               i, balls start frozen)
    balls.push(new Ball(createVector((width / 10) + i * (width / 6.33), (width / 7.69)), (width / 20.2), createVector((width / 20) + (width / 6.33) * i, (height / 13)), (width / 13.33), (height / 2.16) + i * (height / 13), i, false));
  }
}

function draw() {
//    image(img, 0, 0, width, height);
    textSize(32);
    fill("BLACK");
    textFont("HelveticaNeue-Bold");
    text("Egyptian Temple", ((width / 25)), (height - (height / 12)));

  // Forces on ball
  var gravity = createVector(0, 0.000001);
  // var wind = createVector(0, 0.001);


  for (var i = 0; i < balls.length; i++) {
    // balls[i].btnDisplay();
    balls[i].applyForce(gravity);
    // balls[i].applyForce(wind
    balls[i].displayRect();
    balls[i].display();
    balls[i].checkEdges();
    // IF statement about the true/false button pressed for un/freeze ball motion
    if (balls[i].move) {
      balls[i].update();
    }
      // balls[i].displayRect();
      // balls[i].display();
      // balls[i].checkEdges();
    // } else balls[i].displayRect();
    balls[i].displayRect();
    balls[i].display();
  }
}

function touchStarted() {
  println("touchstarteeeeeed");
  // go through each ball object
  for (var i = 0; i < balls.length; i++) {
    var d = dist(touchX, touchY, balls[i].position.x, balls[i].position.y);
    // to see if the mouse is within the ball or not
    if (d < 20.2) {
      // balls[i].move = !balls[i].move;
      balls[i].move = false;
      touchStart = createVector(touchX, touchY);
      currentBall = balls[i];
    }
  }
}


function touchEnded() {
  if (currentBall != null) {
  var touchEnd = createVector(touchX, touchY);
  touchEnd.sub(touchStart);
  touchEnd.div(100);
  currentBall.velocity = touchEnd;
  currentBall.move = true;
  println("made it to touch eneddd");
  currentBall = null;
}
  return false;
}

function touchMoved()  {
  if (currentBall != null) {
  currentBall.position = createVector(touchX, touchY);
  println("touch has moved")
}
    return false;
}

function display() {
  //	this.balls[i].applyForce(wind);
  this.balls[i].applyForce(gravity);
  this.balls[i].update();
  this.balls[i].display();
  this.balls[i].checkEdges(edges);
}

// added btnPosition to represent the position of the button, and boolean variable move.
function Ball(position, mass, recPosition, recWidth, recHeight, sound, move) {
  this.position = position;
//  this.btnPosition = btnPosition;
  // speedX = some number between -1 and 1
  // speedY = some number between -1 and 0
  this.velocity = createVector(random(-.5, 1), random(-1, 0));
  this.acceleration = createVector(0, 0.05);
  this.mass = mass; // totally made up, do whatever here
  this.recPosition = recPosition;
  this.recHeight = recHeight;
  this.recWidth = recWidth;
  this.sound = sound;
  //  this.alpha = 255;
  this.move = move;
}

Ball.prototype.update = function() {
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
};

Ball.prototype.display = function() {
  noStroke();
  //colorMode(HSB);
  fill(180, 180, 180);
  ellipse(this.position.x, this.position.y, this.mass, this.mass);
};

Ball.prototype.displayRect = function() {
  //noStroke();
  fill(200, 150, 100, 5);
  // noFill();
  strokeWeight(5);
  stroke(200, 150, 100);
  rect(this.recPosition.x, this.recPosition.y, this.recWidth, this.recHeight, 20);
}

Ball.prototype.checkEdges = function() {
  if (this.position.x > (this.recPosition.x + (this.recWidth - (width / 40 + 1)))) {
    this.position.x = (this.recPosition.x + (this.recWidth - (width / 40 + 1)));
    this.velocity.x *= -1;
  } else if (this.position.x < (this.recPosition.x + (width / 40))) {
    this.position.x = this.recPosition.x + (width / 40);
    this.velocity.x *= -1;
  }
  if (this.position.y > (this.recPosition.y + this.recHeight) - (width / 40 + (width / 200))) {
    if (this.sound === 0) {
      crotale = crotales[Math.floor(random(0, 4))];
      crotale.play();
      crotale.pan(-1.0);
      crotale.setVolume(0.3);

    } else if (this.sound === 1) {
      crotaleHigh = crotaleHighs[Math.floor(random(0, 4))];
      crotaleHigh.play();
      crotaleHigh.pan(1.0);
      crotaleHigh.setVolume(0.3);

    } else if (this.sound === 2) {
      choir = choirs[Math.floor(random(0, 2))];
      choir.play();
      choir.pan(0.8);
      choir.setVolume(0.1);

    } else if (this.sound === 3) {
      alone = alones[Math.floor(random(0, 1))];
      alone.play();
      alone.setVolume(0.2);

    } else if (this.sound === 4) {
      chime = chimes[Math.floor(random(0, 5))];
      chime.play();
      chime.setVolume(0.2);

    } else if (this.sound === 5) {
      jungle = jungles[Math.floor(random(0, 4))];
      jungle.play();
      jungle.setVolume(0.1);
    }

    this.velocity.y *= -1;
    this.position.y = ((this.recPosition.y + this.recHeight) - (width / 40 + (width / 200)));
  } else if (this.position.y < (this.recPosition.y)) {
    this.position.y = this.recPosition.y;
    this.velocity.y *= -1;
  }
};

Ball.prototype.applyForce = function(force) {
  var f = p5.Vector.div(force, this.mass);
  this.acceleration.add(f);
};
