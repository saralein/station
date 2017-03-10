var game;
var pointsArray = [];
var pointColors = ["0x00ff00", "0x008800", "0x880000", "0xff0000"];
var bezierGraphics;
var movingSprite;

window.onload = function() {
  game = new Phaser.Game(800, 500);
  game.state.add("PlayGame", playGame)
  game.state.start("PlayGame");
}

var playGame = function(game){}
playGame.prototype = {
  preload: function(){
          game.load.image("point", "point.png");
  },
  create: function(){
          for(var i = 0; i < 4; i++){
               var draggablePoint = game.add.sprite(game.rnd.between(100, game.width - 100), game.rnd.between(100, game.height - 100), "point");
               draggablePoint.inputEnabled = true;
               draggablePoint.tint = pointColors[i];
               draggablePoint.input.enableDrag();
               draggablePoint.anchor.set(0.5);
               draggablePoint.events.onDragStart.add(startDrag);
               draggablePoint.events.onDragStop.add(stopDrag);
               draggablePoint.events.onDragUpdate.add(updateDrag);
               pointsArray[i] = draggablePoint;
          }
          bezierGraphics = this.game.add.graphics(0, 0);
          updateDrag();
          stopDrag();
  }
}

function startDrag(){
     movingSprite.destroy();
}

function stopDrag(){
     movingSprite = game.add.sprite(pointsArray[0].x, pointsArray[0].y, "point");
     movingSprite.scale.set(0.5);
     movingSprite.anchor.set(0.5);
     var tween = game.add.tween(movingSprite).to({
          x: [pointsArray[0].x, pointsArray[1].x, pointsArray[2].x, pointsArray[3].x],
          y: [pointsArray[0].y, pointsArray[1].y, pointsArray[2].y, pointsArray[3].y],
     }, 5000,Phaser.Easing.Quadratic.InOut, true, 0, -1).interpolation(function(v, k){
          return Phaser.Math.bezierInterpolation(v, k);
     });
}

function updateDrag(){
     bezierGraphics.clear();
     bezierGraphics.lineStyle(2, 0x008800, 1);
     bezierGraphics.moveTo(pointsArray[1].x, pointsArray[1].y);
     bezierGraphics.lineTo(pointsArray[0].x, pointsArray[0].y);
     bezierGraphics.lineStyle(2, 0x880000, 1)
     bezierGraphics.moveTo(pointsArray[3].x, pointsArray[3].y);
     bezierGraphics.lineTo(pointsArray[2].x, pointsArray[2].y);
     bezierGraphics.lineStyle(4, 0xffff00, 1);
     bezierGraphics.moveTo(pointsArray[0].x, pointsArray[0].y);
     for (var i=0; i<1; i+=0.01){
          var p = bezierPoint(pointsArray[0], pointsArray[1], pointsArray[2], pointsArray[3], i);
          bezierGraphics.lineTo(p.x, p.y);
     }
}

function bezierPoint(p0, p1, p2, p3, t){
     var cX = 3 * (p1.x - p0.x);
     var bX = 3 * (p2.x - p1.x) - cX;
     var aX = p3.x - p0.x - cX - bX;
     var cY = 3 * (p1.y - p0.y);
     var bY = 3 * (p2.y - p1.y) - cY;
     var aY = p3.y - p0.y - cY - bY;
     var x = (aX * Math.pow(t, 3)) + (bX * Math.pow(t, 2)) + (cX * t) + p0.x;
     var y = (aY * Math.pow(t, 3)) + (bY * Math.pow(t, 2)) + (cY * t) + p0.y;
     return {x: x, y: y};
}


// Prepare music

// Bassline
var bassline = new Tone.SimpleSynth();
var basslineVolume = new Tone.Volume(-10);
var basslineDistortion = new Tone.Distortion(50);
bassline.chain(basslineDistortion, basslineVolume);
bassline.chain(basslineVolume, Tone.Master);

// Sampler
var sampler = new Tone.PolySynth(4, Tone.Sampler, {
  "c1":"https://s3-us-west-2.amazonaws.com/s.cdpn.io/152714/Kick_11.wav",
  "c#1":"https://s3-us-west-2.amazonaws.com/s.cdpn.io/152714/clap_2.wav",
  "d1":"https://s3-us-west-2.amazonaws.com/s.cdpn.io/152714/46.wav"
});
var samplerVolume = new Tone.Volume(-7);
var samplerDistortion = new Tone.Distortion(2.5);
sampler.chain(samplerDistortion, samplerVolume);
sampler.chain(samplerVolume, Tone.Master);

// Score
var score = [
  {
    "basslineNotes":["c2","c1","c6","c5","c2","c1","c2","c1"],
    "samplerNotes":[["c1"],null,["d1"],null,["c1", "c#1"],null,["d1", "c#1"],["c#1"]]
  }
];
var basslineNotesPosition = 0;
var samplerNotesPosition = 0;

// Start the sequence
var stepNumber = 0;
var numberOfSteps = 32;
var scoreId = -1;

Tone.Transport.bpm.value = 115;

Tone.Transport.setInterval(function(time){

  // Let's start the video every X beats
  if(stepNumber == 0) {
    scoreId++;
    // Score to play
    // XXX: Should depend on the video tags
    // XXX: Now just a modulo on the current sequence ID
    scoreId = scoreId % score.length;
  }

  // Playing the bassline
  if (score[scoreId].basslineNotes) {
    var basslineNote =
      score[scoreId].basslineNotes[basslineNotesPosition++];
    basslineNotesPosition =
      basslineNotesPosition % score[scoreId].basslineNotes.length;
    if (basslineNote != null) {
      bassline.triggerAttackRelease(basslineNote,
                                    "32n",
                                    time);
    }
  }

  // Playing the sampler
  if (score[scoreId].samplerNotes) {
    var samplerNote =
      score[scoreId].samplerNotes[samplerNotesPosition++];
    samplerNotesPosition =
      samplerNotesPosition % score[scoreId].samplerNotes.length;
    if (samplerNote != null) {
      sampler.triggerAttackRelease(samplerNote,
                                    "32n",
                                    time);
    }
  }

  stepNumber++;
  stepNumber = stepNumber % numberOfSteps;

}, "16n");

var playing = false;
var playPauseButton = document.getElementById("play-pause");

Tone.Buffer.onload = function(){
  // Start the music
  Tone.Transport.start();
  //Tone.Transport.loopEnd = "1m";
  //Tone.Transport.loop = true;
  playPauseButton.innerHTML = "Pause";
  playing = true;
};

playPauseButton.addEventListener("click", function() {
  if (playing) {
    Tone.Transport.pause();
    playPauseButton.innerHTML = "Play";
    playing = false;
  } else {
    // Start the music
    Tone.Transport.start();
    //Tone.Transport.loopEnd = "1m";
    //Tone.Transport.loop = true;
    playPauseButton.innerHTML = "Pause";
    playing = true;
  }
});

/**************************************************
 * Utilities functions
 **************************************************/

// Returns a random integer between min (included) and max (included)
// Using Math.round() will give you a non-uniform distribution!
function getRandomIntInclusive(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
