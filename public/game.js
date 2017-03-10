var game = new Phaser.Game(1400, 600, Phaser.AUTO, 'station', { preload: preload, create: create, update: update });

var synth = new Tone.MembraneSynth().toMaster();
var pluck = new Tone.PluckSynth().toMaster();
var chord = new Tone.PolySynth(6, Tone.Synth).toMaster();
//set the attributes using the set interface
chord.set("detune", -1200);
//play a chord

var rock = new Tone.DuoSynth({
    "vibratoAmount" : 0.5,
    "vibratoRate" : 5,
    "portamento" : 0.1,
    "harmonicity" : 1.005,
    "volume" : 5,
    "voice0" : {
      "volume" : -2,
      "oscillator" : {
        "type" : "sawtooth"
      },
      "filter" : {
        "Q" : 1,
        "type" : "lowpass",
        "rolloff" : -24
      },
      "envelope" : {
        "attack" : 0.01,
        "decay" : 0.25,
        "sustain" : 0.4,
        "release" : 1.2
      },
      "filterEnvelope" : {
        "attack" : 0.001,
        "decay" : 0.05,
        "sustain" : 0.3,
        "release" : 2,
        "baseFrequency" : 100,
        "octaves" : 4
      }
    },
    "voice1" : {
      "volume" : -10,
      "oscillator" : {
        "type" : "sawtooth"
      },
      "filter" : {
        "Q" : 2,
        "type" : "bandpass",
        "rolloff" : -12
      },
      "envelope" : {
        "attack" : 0.25,
        "decay" : 4,
        "sustain" : 0.1,
        "release" : 0.8
      },
      "filterEnvelope" : {
        "attack" : 0.05,
        "decay" : 0.05,
        "sustain" : 0.7,
        "release" : 2,
        "baseFrequency" : 5000,
        "octaves" : -1.5
      }
    }
  }).toMaster();

//station beat
var station = new Tone.Loop(function(time){
  synth.triggerAttackRelease("F5", "8t", time)
}, "4:4");

station.start();

//pink alien

  var kick = new Tone.MembraneSynth({
    "envelope" : {
      "sustain" : 0,
      "attack" : 0.02,
      "decay" : 0.8
    },
    "octaves" : 10
  }).toMaster();

  var pinkVoice = new Tone.Loop(function(time){
    kick.triggerAttackRelease("C2", "8n", time);
  }, "2n");

//yellow alien voice
var yellowVoice = new Tone.Event(function(time, pitch) {
  synth.triggerAttackRelease(440, "32n", time);
}, [["2:2", "F6"]]);

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

    var snare = new Tone.NoiseSynth({
      "volume" : -5,
      "envelope" : {
        "attack" : 0.001,
        "decay" : 0.2,
        "sustain" : 0
      },
      "filterEnvelope" : {
        "attack" : 0.001,
        "decay" : 0.1,
        "sustain" : 0
      }
    }).toMaster();
    var blueVoice = new Tone.Loop(function(time){
      snare.triggerAttack(time);
    }, "2n");

// var blueVoice = new Tone.Loop(function(){
//   chord.triggerAttackRelease(["C4", "E4", "A4"], "32n + 4t");
// });

// var beigeVoice = new Tone.Pattern(function(time, note){
//     synth.triggerAttackRelease(note, time);
// }, [["C4", "4n"], ["E4", "8n"], ["G4", "4n"], ["A4", "4n"]]);

//var beigeVoice = new MusicalScale({ key: 'G', mode: 'locrian' });

var beigeVoice = new Tone.Pattern(function(time, note){
    synth.triggerAttackRelease(note, 0.25);
}, ["C4", "E4", "G4", "A4"]);

let alienPink, alienYellow, circle0, circle1, currentTempo = 300;

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
  game.load.image('meteor', 'images/meteor.png')
}

function create() {
  fromEdge = 1200;
  game.renderer.clearBeforeRender = false;
  game.renderer.roundPixels = true;

  circle0 = game.add.graphics(0, 0);

  circle0.lineStyle(2, 0x333333, 1);
  circle0.drawCircle(game.world.centerX, game.world.centerY, 175);

  circle1 = game.add.graphics(0, 0);

  circle1.lineStyle(2, 0x333333, 1);
  circle1.drawCircle(game.world.centerX, game.world.centerY, 450);

  var circle2 = game.add.graphics(0, 0);

  circle2.lineStyle(2, 0x333333, 1);
  circle2.drawCircle(game.world.centerX, game.world.centerY, 800);

  var circle3 = game.add.graphics(0, 0);

  circle3.lineStyle(2, 0x333333, 1);
  circle3.drawCircle(game.world.centerX, game.world.centerY, 1250);

  station = game.add.sprite(game.world.centerX - 62, game.world.centerY - 175, 'station');

  meteor = game.add.sprite(145, 450, 'meteor');
  meteor.scale.setTo(0.5, 0.5);
  alienPinkPort = game.add.sprite(fromEdge, game.world.centerY - 173.5, 'alienPinkLogo');
  alienYellowPort = game.add.sprite(fromEdge, game.world.centerY - 98.5, 'alienYellowLogo');
  alienGreenPort = game.add.sprite(fromEdge, game.world.centerY - 23.5, 'alienGreenLogo');
  alienBluePort = game.add.sprite(fromEdge, game.world.centerY + 51.5, 'alienBlueLogo');
  alienBeigePort = game.add.sprite(fromEdge, game.world.centerY + 126.5, 'alienBeigeLogo');
  game.stage.backgroundColor = "#111111";
  //game.physics.enable(alienGreen, Phaser.Physics.ARCADE);

  //aliens in space
  alienPink = game.add.sprite(920, 75, 'alienPink');
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
  alienBluePort.events.onInputDown.add(() => generateSprite(alienBlue, blueVoice), this);

  alienBeigePort.inputEnabled = true;
  alienBeigePort.input.useHandCursor = true;
  alienBeigePort.events.onInputDown.add(() => generateSprite(alienBeige, beigeVoice), this);

  //alien dragging
  meteor.inputEnabled = true;
  meteor.input.enableDrag(true);
  meteor.events.onInputDown.add(waver, this);
  meteor.events.onInputUp.add(stopper, this);

  alienPink.inputEnabled = true;
  alienPink.input.enableDrag(true);

  alienYellow.inputEnabled = true;
  alienYellow.input.enableDrag(true);
  alienYellow.events.onInputUp.add(mouseCords, this);

  alienGreen.inputEnabled = true;
  alienGreen.input.enableDrag(true);

  alienBlue.inputEnabled = true;
  alienBlue.input.enableDrag(true);

  alienBeige.inputEnabled = true;
  alienBeige.input.enableDrag(true);

  Tone.Transport.start('+0.1');
  Tone.Transport.bpm.rampTo(currentTempo, 4);
}

var synthNotes = ["C2", "E2", "G2", "A2",
            "C3", "D3", "E3", "G3", "A3", "B3",
            "C4", "D4", "E4", "G4", "A4", "B4", "C5"];
var lastSynthNote = synthNotes[0];

function waver () {
  let pos = game.input.mousePointer.x;

  if (pos < 83) {
    lastSynthNote = synthNotes[0];
  }
  if (pos > 83) {
    lastSynthNote = synthNotes[1];
  }

  rock.triggerAttack(lastSynthNote);
}

function stopper() {
  rock.triggerRelease();
}

function mouseCords() {
  console.log(game.input.mousePointer.x, game.input.mousePointer.y);
}

function generateSprite(sprite, voice) {
  sprite.visible = !sprite.visible;
  if (sprite.visible) {
    voice.start("+1m");
    //voice.bpm.rampTo(currentTempo, 4)
  } else {
    voice.stop();
  }
}

function update() {}
