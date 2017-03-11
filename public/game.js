let width = 1400,
    height = 600,
    // alienPink,
    // alienYellow,
    // circle0,
    // circle1,
    currentTempo = 120,
    meteorPressed = false;

var game = new Phaser.Game(width, height, Phaser.AUTO, 'station', { preload: preload, create: create, update: update });

var synth = new Tone.MembraneSynth().toMaster();
var pluck = new Tone.PluckSynth().toMaster();
var chord = new Tone.PolySynth(6, Tone.Synth).toMaster();
//set the attributes using the set interface
chord.set("detune", -1200);
//play a chord

var rock = new Tone.DuoSynth({
    "vibratoAmount" : 0,
    "vibratoRate" : 5,
    "portamento" : 0.1,
    "harmonicity" : 1.005,
    "volume" : -10,
    "voice0" : {
      "volume" : -12,
      "oscillator" : {
        "type" : "sawtooth"
      },
      "filter" : {
        "Q" : 1,
        "type" : "lowshelf",
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
      "volume" : -25,
      "oscillator" : {
        "type" : "sawtooth"
      },
      "filter" : {
        "Q" : 2,
        "type" : "peaking",
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
// var station = new Tone.Loop(function(time){
//   synth.triggerAttackRelease("F5", "8t", time)
// }, "4:4");

// station.start();

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
    kick.triggerAttackRelease("C2", "16n", time);
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
  game.load.image('meteor', 'images/meteor.png');
  game.load.image('play', 'images/play.png');
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

  play = game.add.sprite(game.world.centerX, 540, 'play');
  play.anchor.x = 0.5;
  play.scale.setTo(0.5, 0.5);
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
  meteor.events.onInputDown.add(startMeteor, this);
  meteor.events.onInputUp.add(stopMeteor, this);

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
                  "C3", "D3", "E3", "G3",
                  "A3", "B3", "C4", "D4",
                  "E4", "G4", "A4", "B4",
                  "C5"];
var lastSynthNote = synthNotes[0];

function startMeteor () {
  meteorPressed = true;
}

function stopMeteor() {
  meteorPressed = false;
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

function update() {
  if (meteorPressed == true) {
    let x = game.input.mousePointer.x,
        y = game.input.mousePointer.y,
        l = synthNotes.length,
        band = width/l,
        stripe = height/7,
        val = 0;

    if (x < band) {
      rock.setNote(synthNotes[0]);
      lastSynthNote = synthNotes[0];
      //rock.triggerAttack(lastSynthNote);
    }
    if (x > band && x < 2 * band) {
      rock.setNote(synthNotes[1]);
      lastSynthNote = synthNotes[1];
      //rock.triggerAttack(lastSynthNote);
    }
    if (x > 2 * band && x < 3 * band) {
      rock.setNote(synthNotes[2]);
      lastSynthNote = synthNotes[2];
    }

    if (x > 3 * band && x < 4 * band) {
      rock.setNote(synthNotes[3]);
      lastSynthNote = synthNotes[3];
    }

    if (x > 4 * band && x < 5 * band) {
      rock.setNote(synthNotes[4]);
      lastSynthNote = synthNotes[4];
    }

    if (x > 5 * band && x < 6 * band) {
      rock.setNote(synthNotes[5]);
      lastSynthNote = synthNotes[5];
    }

    if (x > 6 * band && x < 7 * band) {
      rock.setNote(synthNotes[6]);
      lastSynthNote = synthNotes[6];
    }

    if (x > 7 * band && x < 8 * band) {
      rock.setNote(synthNotes[7]);
      lastSynthNote = synthNotes[7];
    }

    if (x > 8 * band && x < 9 * band) {
      rock.setNote(synthNotes[8]);
      lastSynthNote = synthNotes[8];
    }

    if (x > 9 * band && x < 10 * band) {
      rock.setNote(synthNotes[9]);
      lastSynthNote = synthNotes[9];
    }

    if (x > 10 * band && x < 11 * band) {
      rock.setNote(synthNotes[10]);
      lastSynthNote = synthNotes[10];
    }

    if (x > 11 * band && x < 12 * band) {
      rock.setNote(synthNotes[11]);
      lastSynthNote = synthNotes[11];
    }

    if (x > 12 * band && x < 13 * band) {
      rock.setNote(synthNotes[12]);
      lastSynthNote = synthNotes[12];
    }

    if (x > 13 * band && x < 14 * band) {
      rock.setNote(synthNotes[13]);
      lastSynthNote = synthNotes[13];
    }

    if (x > 14 * band && x < 15 * band) {
      rock.setNote(synthNotes[14]);
      lastSynthNote = synthNotes[14];
    }

    if (x > 15 * band && x < 16 * band) {
      rock.setNote(synthNotes[15]);
      lastSynthNote = synthNotes[15];
    }

    if (x > 16 * band) {
      rock.setNote(synthNotes[16]);
      lastSynthNote = synthNotes[16];
    }

    if (y < stripe) {
      rock.vibratoAmount.value = val;
    }

    if (y > stripe && y < 2 * stripe) {
      rock.vibratoAmount.value = val + 1;
    }

    if (y > 2 * stripe && y < 3 * stripe) {
      rock.vibratoAmount.value = val + 2;
    }

    if (y > 3 * stripe && y < 4 * stripe) {
      rock.vibratoAmount.value = val + 3;
    }

    if (y > 4 * stripe && y < 5 * stripe) {
      rock.vibratoAmount.value = val + 4;
    }

    if (y > 5 * stripe && y < 6 * stripe) {
      rock.vibratoAmount.value = val + 5;
    }

    if (y > 6 * stripe && y < 7 * stripe) {
      rock.vibratoAmount.value = val + 6;
    }

    if (y > 7 * stripe) {
      rock.vibratoAmount.value = val + 7;
    }

    rock.triggerAttack(lastSynthNote);
  }
}
