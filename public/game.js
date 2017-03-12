let width = 1400,
    height = 600,
    currentTempo = 120,
    meteorPressed = false,
    synthNotes = ["C2", "E2", "G2", "A2",
                  "C3", "D3", "E3", "G3",
                  "A3", "B3", "C4", "D4",
                  "E4", "G4", "A4", "B4",
                  "C5"],
    lastSynthNote = synthNotes[0],
    signalActive = false,
    hyperdrive,
    docking,
    circle0,
    circle1,
    circle2,
    circle3,
    meteor,
    station,
    alienPink,
    alienYellow,
    alienGreen,
    alienBlue,
    alienBeige,
    timer;

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
        "type" : "square"
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

// var reverb = new Tone.Freeverb().toMaster();
// rock.connect(reverb);
//station beat
var stationVoice = new Tone.Loop(function(time){
  synth.triggerAttackRelease("F5", "8t", time)
}, "2:4");

//pink alien

var kick = new Tone.MembraneSynth({
  "envelope" : {
    "sustain" : 0,
    "attack" : 0.02,
    "decay" : 0.8
  },
  "octaves" : 10
}).toMaster();

// var pinkVoice = new Tone.Loop(function(time){
//   kick0.triggerAttackRelease("C2", "32n", time);
// }, "(@1m) + 4n");

// var pinkVoice = new Tone.Loop(function(time) {
//   kick.triggerAttackRelease("C2", "4n", time);
// }, "0:3:0");


// var pinkVoice = new Tone.Pattern(function(time, note){
//     kick.triggerAttackRelease(note, 0.75);
// }, [["C2"], ["C2"], ["C2"], ["C2"]]);


var pinkVoice = new Tone.Loop(function(time) {
  kick.triggerAttackRelease("C2", "32n", time);
}, "0:1:0");

var pinkVoice1 = new Tone.Loop(function(time) {
  kick.triggerAttackRelease("C2", "32n", time);
}, "0:2:0");

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
    }, "0:1:1");

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
  game.load.image('increase', 'images/increase.png');
  game.load.image('decrease', 'images/decrease.png');
}

function create() {

  game.renderer.clearBeforeRender = false;
  game.renderer.roundPixels = true;
  game.stage.backgroundColor = "#111111";

  circle0 = game.add.graphics(0, 0);
  circle0.lineStyle(2, 0x333333, 1);
  circle0.drawCircle(game.world.centerX, game.world.centerY, 175);

  circle1 = game.add.graphics(0, 0);
  circle1.lineStyle(2, 0x333333, 1);
  circle1.drawCircle(game.world.centerX, game.world.centerY, 450);

  circle2 = game.add.graphics(0, 0);
  circle2.lineStyle(2, 0x333333, 1);
  circle2.drawCircle(game.world.centerX, game.world.centerY, 800);

  circle3 = game.add.graphics(0, 0);
  circle3.lineStyle(2, 0x333333, 1);
  circle3.drawCircle(game.world.centerX, game.world.centerY, 1250);

  station = game.add.sprite(game.world.centerX, game.world.centerY, 'station');
  station.anchor.setTo(0.5, 0.5);
  station.inputEnabled = true;
  station.events.onInputDown.add(signal, this)

  let increase = game.add.sprite(game.world.centerX + 100, 560, 'increase');
      increase.anchor.setTo(0.5, 0.5);
      increase.scale.setTo(0.35, 0.35);
      increase.inputEnabled = true;
      increase.input.useHandCursor = true;
      increase.events.onInputDown.add(() => tempo('increase'), this);

  let style = {font: "18px 'VT323'", fill: "#ffffff"};

  hyperdrive = game.add.text(game.world.centerX + 170, 563, "hyperdrive", style);
  hyperdrive.anchor.set(0.5, 0.5);
  hyperdrive.visible = false;

  docking = game.add.text(game.world.centerX - 170, 563, "docking", style);
  docking.anchor.set(0.5, 0.5);
  docking.visible = false;

  let decrease = game.add.sprite(game.world.centerX - 100, 560, 'decrease');
      decrease.anchor.setTo(0.5, 0.5);
      decrease.scale.setTo(0.35, 0.35);
      decrease.inputEnabled = true;
      decrease.input.useHandCursor = true;
      decrease.events.onInputDown.add(() => tempo('decrease'), this);

  meteor = game.add.sprite(145, 450, 'meteor');
  meteor.scale.setTo(0.5, 0.5);

  let alienPinkPort = game.add.sprite(1225, game.world.centerY - 150, 'alienPinkLogo');
      alienPinkPort.anchor.setTo(0.5, 0.5);

  let alienYellowPort = game.add.sprite(1224, game.world.centerY - 75, 'alienYellowLogo');
      alienYellowPort.anchor.setTo(0.5, 0.5);

  let alienGreenPort = game.add.sprite(1225, game.world.centerY, 'alienGreenLogo');
      alienGreenPort.anchor.setTo(0.5, 0.5);

  let alienBluePort = game.add.sprite(1225, game.world.centerY + 75, 'alienBlueLogo');
      alienBluePort.anchor.setTo(0.5, 0.5);

  let alienBeigePort = game.add.sprite(1225, game.world.centerY + 150, 'alienBeigeLogo');
      alienBeigePort.anchor.setTo(0.5, 0.5);

  //aliens in space
  alienPink = game.add.sprite(920, 75, 'alienPink');
  alienPink.visible = false;
  alienPink.anchor.x = 0.5;
  alienPink.anchor.y = 0.5;
  alienPink.inputEnabled = true;
  alienPink.input.enableDrag(true);

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

  alienYellow.inputEnabled = true;
  alienYellow.input.enableDrag(true);
  //alienYellow.events.onInputUp.add(mouseCords, this);

  alienGreen.inputEnabled = true;
  alienGreen.input.enableDrag(true);

  alienBlue.inputEnabled = true;
  alienBlue.input.enableDrag(true);

  alienBeige.inputEnabled = true;
  alienBeige.input.enableDrag(true);

  Tone.Transport.start('+0.1');
  Tone.Transport.bpm.rampTo(currentTempo, 0);

  // timer = game.time.create();
  // timer.start();
}

function tempo(action) {
  if (action === 'increase' && currentTempo < 300) {
    currentTempo += 30;
    docking.visible = false;
  } else if (action === 'decrease' && currentTempo > 60) {
    currentTempo -= 30
    hyperdrive.visible = false;
  }
  if (currentTempo === 300) {
    hyperdrive.visible = true;
  }
  if (currentTempo === 60) {
    docking.visible = true;
  }
  Tone.Transport.bpm.rampTo(currentTempo, 4);
}

function signal() {
  if (!signalActive) {
    stationVoice.start();
    redrawCircles(0x888888);
  } else if (signalActive) {
    stationVoice.stop();
    redrawCircles(0x333333);
  }
  signalActive = !signalActive;
}

function activeCircles() {

  let time = this.game.time.totalElapsedSeconds() * 1000

  window.setInterval(function() {
    circle0 = game.add.graphics(0, 0);
    circle0.lineStyle(2, 0x888888, 1);
    circle0.drawCircle(game.world.centerX, game.world.centerY, 175);
    bringUp();
  }, 0);

  window.setInterval(function() {
    console.log('hi');
    circle1 = game.add.graphics(0, 0);
    circle1.lineStyle(2, 0x888888, 1);
    circle1.drawCircle(game.world.centerX, game.world.centerY, 450);
    bringUp();
  }, time + 1000);

  window.setInterval(function() {
    console.log('hi');
    circle2 = game.add.graphics(0, 0);
    circle2.lineStyle(2, 0x888888, 1);
    circle2.drawCircle(game.world.centerX, game.world.centerY, 800);
    bringUp();
  }, time + 2000);

  window.setInterval(function() {
    console.log('hi');
    circle3 = game.add.graphics(0, 0);
    circle3.lineStyle(2, 0x888888, 1);
    circle3.drawCircle(game.world.centerX, game.world.centerY, 1250);
    bringUp();
  }, time + 3000);

  window.setInterval(function() {
    redrawCircles(0x333333);
  }, time + 4000);

}

function redrawCircles(color) {

  circle0 = game.add.graphics(0, 0);
  circle0.lineStyle(2, color, 1);
  circle0.drawCircle(game.world.centerX, game.world.centerY, 175);

  circle1 = game.add.graphics(0, 0);
  circle1.lineStyle(2, color, 1);
  circle1.drawCircle(game.world.centerX, game.world.centerY, 450);

  circle2 = game.add.graphics(0, 0);
  circle2.lineStyle(2, color, 1);
  circle2.drawCircle(game.world.centerX, game.world.centerY, 800);

  circle3 = game.add.graphics(0, 0);
  circle3.lineStyle(2, color, 1);
  circle3.drawCircle(game.world.centerX, game.world.centerY, 1250);

  bringUp();

}

function bringUp() {
  game.world.bringToTop(station);
  game.world.bringToTop(alienPink);
  game.world.bringToTop(alienYellow);
  game.world.bringToTop(alienGreen);
  game.world.bringToTop(alienBlue);
  game.world.bringToTop(alienBeige);
  game.world.bringToTop(meteor);
}

function startMeteor () {
  meteorPressed = true;
}

function stopMeteor() {
  meteorPressed = false;
  rock.triggerRelease();
}

// function mouseCords() {
//   console.log(game.input.mousePointer.x, game.input.mousePointer.y);
// }

function generateSprite(sprite, voice) {
  sprite.visible = !sprite.visible;
  if (sprite.visible) {
    voice.start("(@1m)");
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
