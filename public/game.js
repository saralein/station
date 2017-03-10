var game = new Phaser.Game(1400, 600, Phaser.AUTO, 'station', { preload: preload, create: create, update: update });

var synth = new Tone.MembraneSynth().toMaster();
var pluck = new Tone.PluckSynth().toMaster();

//station beat
var station = new Tone.Loop(function(time){
  synth.triggerAttackRelease("C1", "4n", time)
}, "4n");

station.start();

//pink alien voice
var pinkVoice = new Tone.Part(function(time, note){
    synth.triggerAttackRelease(note, "32n", time);
}, [["0:2", "C2"]]);

pinkVoice.set({
    "loop" : true,
});

//yellow alien voice
var yellowVoice = new Tone.Event(function(time, pitch) {
  synth.triggerAttackRelease(440, "32n", time);
}, "F6");

yellowVoice.set({
    "loop" : true,
});

//green alien voice
var greenVoice = new Tone.Event(function(time, pitch) {
  pluck.triggerAttackRelease(440, "32n", time);
}, "G2");

greenVoice.set({
    "loop" : true,
});

let alienPink, graphics;


function preload() {
  game.load.image('alienGreen', 'images/aliens/alienGreen_float.png');
  game.load.image('alienPink', 'images/aliens/alienPink_float.png');
  game.load.image('alienBeige', 'images/aliens/alienBeige_float.png');
  game.load.image('alienYellow', 'images/aliens/alienYellow_float.png');
  game.load.image('alienBlue', 'images/aliens/alienBlue_float.png');
  game.load.image('alienGreenLogo', 'images/aliens/alienGreen_port.png');
  game.load.image('alienPinkLogo', 'images/aliens/alienPink_port.png');
  game.load.image('alienBeigeLogo', 'images/aliens/alienBeige_port.png');
  game.load.image('alienYellowLogo', 'images/aliens/alienYellow_port.png');
  game.load.image('alienBlueLogo', 'images/aliens/alienBlue_port.png');
  game.load.image('station', 'images/station.png');
}

function create() {
  fromEdge = 1200;
  game.renderer.clearBeforeRender = false;
  game.renderer.roundPixels = true;

  var circle0 = game.add.graphics(0, 0);

  circle0.lineStyle(2, 0x333333, 1);
  circle0.drawCircle(game.world.centerX, game.world.centerY, 175);

  var circle1 = game.add.graphics(0, 0);

  circle1.lineStyle(2, 0x333333, 1);
  circle1.drawCircle(game.world.centerX, game.world.centerY, 450);

  var circle2 = game.add.graphics(0, 0);

  circle2.lineStyle(2, 0x333333, 1);
  circle2.drawCircle(game.world.centerX, game.world.centerY, 800);

  var circle3 = game.add.graphics(0, 0);

  circle3.lineStyle(2, 0x333333, 1);
  circle3.drawCircle(game.world.centerX, game.world.centerY, 1250);

  station = game.add.sprite(game.world.centerX - 62, game.world.centerY - 175, 'station');

  alienPinkPort = game.add.sprite(fromEdge, game.world.centerY - 173.5, 'alienPinkLogo');
  alienYellowPort = game.add.sprite(fromEdge, game.world.centerY - 98.5, 'alienYellowLogo');
  alienGreenPort = game.add.sprite(fromEdge, game.world.centerY - 23.5, 'alienGreenLogo');
  alienBluePort = game.add.sprite(fromEdge, game.world.centerY + 51.5, 'alienBlueLogo');
  alienBeigePort = game.add.sprite(fromEdge, game.world.centerY + 126.5, 'alienBeigeLogo');
  game.stage.backgroundColor = "#111111";
  //game.physics.enable(alienGreen, Phaser.Physics.ARCADE);

  //aliens in space
  alienPink = game.add.sprite(100, 100, 'alienPink');
  alienPink.visible = false;
  alienPink.anchor.x = 0.5;
  alienPink.anchor.y = 0.5;

  alienYellow = game.add.sprite(100, 100, 'alienYellow');
  alienYellow.visible = false;

  alienGreen = game.add.sprite(100, 100, 'alienGreen');
  alienGreen.visible = false;

  alienBlue = game.add.sprite(100, 100, 'alienBlue');
  alienBlue.visible = false;

  alienBeige = game.add.sprite(100, 100, 'alienBeige');
  alienBeige.visible = false;

  //aliens at port
  alienPinkPort.inputEnabled = true;
  alienPinkPort.input.useHandCursor = true;
  alienPinkPort.events.onInputDown.add(() => generateSprite(alienPink, pinkVoice), this);

  alienYellowPort.inputEnabled = true;
  alienYellowPort.input.useHandCursor = true;
  alienYellowPort.events.onInputDown.add(() => generateSprite(alienYellow, yellowVoice), this);

  alienGreenPort.inputEnabled = true;
  alienGreenPort.input.useHandCursor = true;
  alienGreenPort.events.onInputDown.add(() => generateSprite(alienGreen, greenVoice), this);

  alienBluePort.inputEnabled = true;
  alienBluePort.input.useHandCursor = true;
  alienBluePort.events.onInputDown.add(() => generateSprite(alienBlue, yellowVoice), this);

  alienBeigePort.inputEnabled = true;
  alienBeigePort.input.useHandCursor = true;
  alienBeigePort.events.onInputDown.add(() => generateSprite(alienBeige, yellowVoice), this);

  //alien dragging
  alienPink.inputEnabled = true;
  alienPink.input.enableDrag(true);

  alienYellow.inputEnabled = true;
  alienYellow.input.enableDrag(true);

  alienGreen.inputEnabled = true;
  alienGreen.input.enableDrag(true);

  alienBlue.inputEnabled = true;
  alienBlue.input.enableDrag(true);

  alienBeige.inputEnabled = true;
  alienBeige.input.enableDrag(true);

  // var graphics = game.add.graphics(game.world.centerX, game.world.centerY);

  //   // set a fill and line style
  //   graphics.beginFill(0xFF3300);
  //   graphics.lineStyle(2, 0xFFFFFF, 1);

  //   // draw a shape
  //   //graphics.moveTo(game.world.centerX, game.world.centerY);
  //   graphics.lineTo(alienPink.x - game.world.centerX, alienPink.y - game.world.centerY);
  //   graphics.endFill();

  //   station.bringToTop();
  //   alienPink.bringToTop();

  Tone.Transport.start('+0.1')
}

function generateSprite(sprite, voice) {
  sprite.visible = !sprite.visible;
  if (sprite.visible) {
    voice.start();
  } else {
    voice.stop();
  }
}

function update() {

  if (alienPink.visible) {
  graphics = game.add.graphics(game.world.centerX, game.world.centerY);

    // set a fill and line style
    graphics.beginFill(0xFF3300);
    graphics.lineStyle(2, 0xFFFFFF, 1);

    // draw a shape
    //graphics.moveTo(game.world.centerX, game.world.centerY);
    graphics.lineTo(alienPink.x - game.world.centerX, alienPink.y - game.world.centerY);
    graphics.endFill();

    station.bringToTop();
    alienPink.bringToTop();
  }

}
