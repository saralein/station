/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// webpack-livereload-plugin
/******/ 	(function() {
/******/ 	  if (typeof window === "undefined") { return };
/******/ 	  var id = "webpack-livereload-plugin-script";
/******/ 	  if (document.getElementById(id)) { return; }
/******/ 	  var el = document.createElement("script");
/******/ 	  el.id = id;
/******/ 	  el.async = true;
/******/ 	  el.src = "http://localhost:35729/livereload.js";
/******/ 	  document.getElementsByTagName("head")[0].appendChild(el);
/******/ 	}());
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 7);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var C_chord = ['C4', 'E4', 'G4', 'B4'];
var D_chord = ['D4', 'F4', 'A4', 'C5'];
var G_chord = ['B3', 'D4', 'E4', 'A4'];

var melody0 = [['0:1:1', C_chord], ['0:1:2', D_chord], ['0:1:4', G_chord], ['0:2:2', C_chord]];

var beigeSynth = new Tone.PolySynth({
  "volume": -20
}).toMaster();
var voice0 = new Tone.Part(function (time, note) {
  beigeSynth.triggerAttackRelease(note, '16n', time);
}, melody0);

voice0.loop = true;

var melody1 = [['0:1:2', C_chord], ['0:2:2', C_chord], ['0:3:0', C_chord], ['0:3:2', G_chord], ['0:3:3', D_chord], ['0:4:2', D_chord]];

var voice1 = new Tone.Part(function (time, note) {
  beigeSynth.triggerAttackRelease(note, '16n', time);
}, melody1);

voice1.loop = true;

var melody2 = [['0:1:2', C_chord], ['0:2:2', D_chord], ['0:3:0', G_chord], ['0:3:2', D_chord], ['0:3:4', C_chord]];

var voice2 = new Tone.Part(function (time, note) {
  beigeSynth.triggerAttackRelease(note, '16n', time);
}, melody2);

voice2.loop = true;

var melody3 = [['0:1:2', C_chord], ['0:2:2', C_chord], ['0:3:1', D_chord]];

var voice3 = new Tone.Part(function (time, note) {
  beigeSynth.triggerAttackRelease(note, '16n', time);
}, melody3);

voice3.loop = true;

var beigeVoice = {
  circle0: voice0,
  circle1: voice1,
  circle2: voice2,
  circle3: voice3
};

exports.default = beigeVoice;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var snare3 = new Tone.NoiseSynth({
  "volume": -25,
  "envelope": {
    "attack": 0.5,
    "decay": 0.1,
    "sustain": 0
  },
  "filterEnvelope": {
    "attack": 0.5,
    "decay": 0.1,
    "sustain": 0
  }
}).toMaster();

var voice3 = new Tone.Pattern(function (time) {
  snare3.triggerAttack(time);
});

var snare2 = new Tone.NoiseSynth({
  "volume": -20,
  "envelope": {
    "attack": 0.001,
    "decay": 0.5,
    "sustain": 0
  },
  "filterEnvelope": {
    "attack": 0.001,
    "decay": 0.5,
    "sustain": 0
  }
}).toMaster();

var voice2 = new Tone.Pattern(function (time) {
  snare2.triggerAttack(time);
});

var snare1 = new Tone.NoiseSynth({
  "volume": -10,
  "envelope": {
    "attack": 0.001,
    "decay": 0.2,
    "sustain": 0
  },
  "filterEnvelope": {
    "attack": 0.001,
    "decay": 0.2,
    "sustain": 0
  }
}).toMaster();

var voice1 = new Tone.Pattern(function (time) {
  snare1.triggerAttack(time);
});

var snare0 = new Tone.NoiseSynth({
  "volume": -5,
  "envelope": {
    "attack": 0.001,
    "decay": 0.1,
    "sustain": 0
  },
  "filterEnvelope": {
    "attack": 0.001,
    "decay": 0.1,
    "sustain": 0
  }
}).toMaster();

var voice0 = new Tone.Pattern(function (time) {
  snare0.triggerAttack(time);
});

var blueVoice = {
  circle0: voice0,
  circle1: voice1,
  circle2: voice2,
  circle3: voice3
};

exports.default = blueVoice;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var greenSynth = new Tone.PluckSynth().toMaster();

var melody0 = [['0:1:4', 'C7'], ['0:2:2', 'G8'], ['0:3:2', 'C4']];

var voice0 = new Tone.Part(function (time, note) {
  greenSynth.triggerAttackRelease(note, '4n', time);
}, melody0);

voice0.loop = true;

var melody1 = [['0:1:2', 'C4'], ['0:2:2', 'C6'], ['0:3:1', 'C8']];

var voice1 = new Tone.Part(function (time, note) {
  greenSynth.triggerAttackRelease(note, '4n', time);
}, melody1);

voice1.loop = true;

var melody2 = [['0:1:2', 'C2'], ['0:3:1', 'C4'], ['0:3:2', 'C8']];

var voice2 = new Tone.Part(function (time, note) {
  greenSynth.triggerAttackRelease(note, '4n', time);
}, melody2);

voice2.loop = true;

var melody3 = [['0:1:2', 'D4'],
//['0:3:1', 'C4'],
['0:3:2', 'G2']];

var voice3 = new Tone.Part(function (time, note) {
  greenSynth.triggerAttackRelease(note, '4n', time);
}, melody3);

voice3.loop = true;

var greenVoice = {
  circle0: voice0,
  circle1: voice1,
  circle2: voice2,
  circle3: voice3
};

exports.default = greenVoice;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var rock = new Tone.DuoSynth({
  "vibratoAmount": 0,
  "vibratoRate": 5,
  "portamento": 0.1,
  "harmonicity": 1.005,
  "volume": -10,
  "voice0": {
    "volume": -12,
    "oscillator": {
      "type": "sawtooth"
    },
    "filter": {
      "Q": 1,
      "type": "lowshelf",
      "rolloff": -24
    },
    "envelope": {
      "attack": 0.01,
      "decay": 0.25,
      "sustain": 0.4,
      "release": 1.2
    },
    "filterEnvelope": {
      "attack": 0.001,
      "decay": 0.05,
      "sustain": 0.3,
      "release": 2,
      "baseFrequency": 100,
      "octaves": 4
    }
  },
  "voice1": {
    "volume": -25,
    "oscillator": {
      "type": "square"
    },
    "filter": {
      "Q": 2,
      "type": "peaking",
      "rolloff": -12
    },
    "envelope": {
      "attack": 0.25,
      "decay": 4,
      "sustain": 0.1,
      "release": 0.8
    },
    "filterEnvelope": {
      "attack": 0.05,
      "decay": 0.05,
      "sustain": 0.7,
      "release": 2,
      "baseFrequency": 5000,
      "octaves": -1.5
    }
  }
}).toMaster();

exports.default = rock;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var kick = new Tone.MembraneSynth({
  "envelope": {
    "sustain": 0,
    "attack": 0.02,
    "decay": 0.8
  },
  "octaves": 10
}).toMaster();

var melody0 = [['0:1:4', 'C2'], ['0:2:4', 'C2']];

var voice0 = new Tone.Part(function (time, note) {
  kick.triggerAttackRelease(note, "32n", time);
}, melody0);

voice0.loop = true;
voice0.volume = 30;

var melody1 = [['0:1:4', 'C2'], ['0:2:2', 'C2']];

var voice1 = new Tone.Part(function (time, note) {
  kick.triggerAttackRelease(note, "16n", time);
}, melody1);

voice1.loop = true;
voice1.volume = 30;

var melody2 = [['0:1:2', 'C2'], ['0:3:2', 'C2']];

var voice2 = new Tone.Part(function (time, note) {
  kick.triggerAttackRelease(note, "32n", time);
}, melody2);

voice2.loop = true;
voice2.volume = 30;

var melody3 = [['0:1:4', 'C2']];

var voice3 = new Tone.Part(function (time, note) {
  kick.triggerAttackRelease(note, "32", time);
}, melody3);

voice3.loop = true;
voice3.volume = 30;

var pinkVoice = {
  circle0: voice0,
  circle1: voice1,
  circle2: voice2,
  circle3: voice3
};

exports.default = pinkVoice;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var stationSynth = new Tone.MembraneSynth().toMaster();

var stationVoice = new Tone.Loop(function (time) {
  stationSynth.triggerAttackRelease("F5", "8t", time);
}, "2:1:4");

exports.default = stationVoice;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var synth = new Tone.MembraneSynth({
  "volume": -10
}).toMaster();

var voice0 = new Tone.Event(function (time, pitch) {
  synth.triggerAttackRelease(440, "32n", time);
}, [["1:2:2", "F6"]]);

voice0.set({
  "loop": true
});

// var synth1 = new Tone.MembraneSynth({
//   "pitchDecay": 10
// }).toMaster();

// let voice1 = new Tone.Part(function(time, pitch) {
//   synth1.triggerAttackRelease(440, "32n", time);
// }, melody1)

// let melody1 = [
//   ["1:2:2", "F6"],
// ]

// voice1.loop = true;

var yellowVoice = {
  circle0: voice0,
  circle1: voice0,
  circle2: voice0,
  circle3: voice0
};

exports.default = yellowVoice;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _meteorVocals = __webpack_require__(3);

var _meteorVocals2 = _interopRequireDefault(_meteorVocals);

var _stationVocals = __webpack_require__(5);

var _stationVocals2 = _interopRequireDefault(_stationVocals);

var _pinkVocals = __webpack_require__(4);

var _pinkVocals2 = _interopRequireDefault(_pinkVocals);

var _yellowVocals = __webpack_require__(6);

var _yellowVocals2 = _interopRequireDefault(_yellowVocals);

var _greenVocals = __webpack_require__(2);

var _greenVocals2 = _interopRequireDefault(_greenVocals);

var _beigeVocals = __webpack_require__(0);

var _beigeVocals2 = _interopRequireDefault(_beigeVocals);

var _blueVocals = __webpack_require__(1);

var _blueVocals2 = _interopRequireDefault(_blueVocals);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var width = 1400,
    height = 600,
    currentTempo = 120,
    meteorPressed = false,
    synthNotes = ['C2', 'E2', 'G2', 'A2', 'C3', 'D3', 'E3', 'G3', 'A3', 'B3', 'C4', 'D4', 'E4', 'G4', 'A4', 'B4', 'C5'],
    lastSynthNote = synthNotes[0],
    signalActive = false,
    hyperdrive = void 0,
    docking = void 0,
    circle0 = void 0,
    circle1 = void 0,
    circle2 = void 0,
    circle3 = void 0,
    meteor = void 0,
    station = void 0,
    alienPink = void 0,
    alienYellow = void 0,
    alienGreen = void 0,
    alienBlue = void 0,
    alienBeige = void 0,
    xCoord = void 0,
    yCoord = void 0,
    pink = {
  voices: _pinkVocals2.default,
  current: _pinkVocals2.default.circle2
},
    yellow = {
  voices: _yellowVocals2.default,
  current: _yellowVocals2.default.circle3
},
    green = {
  voices: _greenVocals2.default,
  current: _greenVocals2.default.circle1
},
    blue = {
  voices: _blueVocals2.default,
  current: _blueVocals2.default.circle2
},
    beige = {
  voices: _beigeVocals2.default,
  current: _beigeVocals2.default.circle3
};

var game = new Phaser.Game(width, height, Phaser.AUTO, 'station', { preload: preload, create: create, update: update });

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
  circle0.inputEnabled = true;

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
  station.events.onInputDown.add(signal, this);

  var increase = game.add.sprite(game.world.centerX + 100, 560, 'increase');
  increase.anchor.setTo(0.5, 0.5);
  increase.scale.setTo(0.35, 0.35);
  increase.inputEnabled = true;
  increase.input.useHandCursor = true;
  increase.events.onInputDown.add(function () {
    return tempo('increase');
  }, this);

  var style = { font: "18px 'VT323'", fill: '#ffffff' };

  hyperdrive = game.add.text(game.world.centerX + 170, 563, 'hyperdrive', style);
  hyperdrive.anchor.set(0.5, 0.5);
  hyperdrive.visible = false;

  docking = game.add.text(game.world.centerX - 170, 563, 'docking', style);
  docking.anchor.set(0.5, 0.5);
  docking.visible = false;

  var decrease = game.add.sprite(game.world.centerX - 100, 560, 'decrease');
  decrease.anchor.setTo(0.5, 0.5);
  decrease.scale.setTo(0.35, 0.35);
  decrease.inputEnabled = true;
  decrease.input.useHandCursor = true;
  decrease.events.onInputDown.add(function () {
    return tempo('decrease');
  }, this);

  meteor = game.add.sprite(145, 450, 'meteor');
  meteor.scale.setTo(0.5, 0.5);

  var alienPinkPort = game.add.sprite(1225, game.world.centerY - 150, 'alienPinkLogo');
  alienPinkPort.anchor.setTo(0.5, 0.5);

  var alienYellowPort = game.add.sprite(1224, game.world.centerY - 75, 'alienYellowLogo');
  alienYellowPort.anchor.setTo(0.5, 0.5);

  var alienGreenPort = game.add.sprite(1225, game.world.centerY, 'alienGreenLogo');
  alienGreenPort.anchor.setTo(0.5, 0.5);

  var alienBluePort = game.add.sprite(1225, game.world.centerY + 75, 'alienBlueLogo');
  alienBluePort.anchor.setTo(0.5, 0.5);

  var alienBeigePort = game.add.sprite(1225, game.world.centerY + 150, 'alienBeigeLogo');
  alienBeigePort.anchor.setTo(0.5, 0.5);

  //aliens in space
  alienPink = game.add.sprite(920, 75, 'alienPink');
  alienPink.visible = false;
  alienPink.anchor.setTo(0.5, 0.5);
  alienPink.inputEnabled = true;
  alienPink.input.enableDrag(true);
  alienPink.events.onInputUp.add(function () {
    return setCurrentAlien(_pinkVocals2.default, pink);
  });

  alienYellow = game.add.sprite(150, 215, 'alienYellow');
  alienYellow.visible = false;
  alienYellow.inputEnabled = true;
  alienYellow.input.enableDrag(true);
  alienYellow.events.onInputUp.add(function () {
    return setCurrentAlien(_yellowVocals2.default, yellow);
  });

  alienGreen = game.add.sprite(790, 340, 'alienGreen');
  alienGreen.visible = false;
  alienGreen.inputEnabled = true;
  alienGreen.input.enableDrag(true);
  alienGreen.events.onInputUp.add(function () {
    return setCurrentAlien(_greenVocals2.default, green);
  });

  alienBlue = game.add.sprite(400, 90, 'alienBlue');
  alienBlue.visible = false;
  alienBlue.inputEnabled = true;
  alienBlue.input.enableDrag(true);
  alienBlue.events.onInputUp.add(function () {
    return setCurrentAlien(_blueVocals2.default, blue);
  });

  alienBeige = game.add.sprite(1075, 475, 'alienBeige');
  alienBeige.visible = false;
  alienBeige.inputEnabled = true;
  alienBeige.input.enableDrag(true);
  alienBeige.events.onInputUp.add(function () {
    return setCurrentAlien(_beigeVocals2.default, beige);
  });

  //aliens at port
  alienPinkPort.inputEnabled = true;
  alienPinkPort.input.useHandCursor = true;
  alienPinkPort.events.onInputDown.add(function () {
    return generateSprite(alienPink, pink);
  }, this);

  alienYellowPort.inputEnabled = true;
  alienYellowPort.input.useHandCursor = true;
  alienYellowPort.events.onInputDown.add(function () {
    return generateSprite(alienYellow, yellow);
  }, this);

  alienGreenPort.inputEnabled = true;
  alienGreenPort.input.useHandCursor = true;
  alienGreenPort.events.onInputDown.add(function () {
    return generateSprite(alienGreen, green);
  }, this);

  alienBluePort.inputEnabled = true;
  alienBluePort.input.useHandCursor = true;
  alienBluePort.events.onInputDown.add(function () {
    return generateSprite(alienBlue, blue);
  }, this);

  alienBeigePort.inputEnabled = true;
  alienBeigePort.input.useHandCursor = true;
  alienBeigePort.events.onInputDown.add(function () {
    return generateSprite(alienBeige, beige);
  }, this);

  //alien dragging
  meteor.inputEnabled = true;
  meteor.input.enableDrag(true);
  meteor.events.onInputDown.add(startMeteor, this);
  meteor.events.onInputUp.add(stopMeteor, this);

  Tone.Transport.start('+0.1');
  Tone.Transport.bpm.rampTo(currentTempo, 0);

  meteor.bringToTop();
}

function setCurrentAlien(voice, obj) {
  obj.current.stop();
  mouseCords();
  collisionHandler(voice, obj, xCoord, yCoord);
}

function collisionHandler(voice, obj, xCoord, yCoord) {

  if (circle0.getBounds().contains(xCoord, yCoord)) {
    obj.current = voice.circle0;
    obj.current.start('@1m');
  } else if (circle1.getBounds().contains(xCoord, yCoord)) {
    obj.current = voice.circle1;
    obj.current.start('@1m');
  } else if (circle2.getBounds().contains(xCoord, yCoord)) {
    obj.current = voice.circle2;
    obj.current.start('@1m');
  } else if (circle3.getBounds().contains(xCoord, yCoord)) {
    obj.current = voice.circle3;
    obj.current.start('@1m');
  }
}

function mouseCords() {
  var _ref = [game.input.mousePointer.x, game.input.mousePointer.y];
  xCoord = _ref[0];
  yCoord = _ref[1];
}

function tempo(action) {
  if (action === 'increase' && currentTempo < 240) {
    currentTempo += 30;
    docking.visible = false;
  } else if (action === 'decrease' && currentTempo > 60) {
    currentTempo -= 30;
    hyperdrive.visible = false;
  }
  if (currentTempo === 240) {
    hyperdrive.visible = true;
  }
  if (currentTempo === 60) {
    docking.visible = true;
  }
  Tone.Transport.bpm.rampTo(currentTempo, 4);
}

function signal() {
  if (!signalActive) {
    _stationVocals2.default.start();
    redrawCircles(0x888888);
  } else if (signalActive) {
    _stationVocals2.default.stop();
    redrawCircles(0x333333);
  }

  signalActive = !signalActive;
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

function startMeteor() {
  meteorPressed = true;
}

function stopMeteor() {
  meteorPressed = false;
  _meteorVocals2.default.triggerRelease();
}

function generateSprite(sprite, obj) {
  sprite.visible = !sprite.visible;
  if (sprite.visible) {
    obj.current.start("(@1m)");
  } else {
    obj.current.stop();
  }
}

function update() {
  if (meteorPressed === true) {
    var x = game.input.mousePointer.x,
        y = game.input.mousePointer.y,
        l = synthNotes.length,
        band = width / l,
        stripe = height / 7,
        val = 0;

    if (x < band) {
      _meteorVocals2.default.setNote(synthNotes[0]);
      lastSynthNote = synthNotes[0];
      //rock.triggerAttack(lastSynthNote);
    }
    if (x > band && x < 2 * band) {
      _meteorVocals2.default.setNote(synthNotes[1]);
      lastSynthNote = synthNotes[1];
      //rock.triggerAttack(lastSynthNote);
    }
    if (x > 2 * band && x < 3 * band) {
      _meteorVocals2.default.setNote(synthNotes[2]);
      lastSynthNote = synthNotes[2];
    }

    if (x > 3 * band && x < 4 * band) {
      _meteorVocals2.default.setNote(synthNotes[3]);
      lastSynthNote = synthNotes[3];
    }

    if (x > 4 * band && x < 5 * band) {
      _meteorVocals2.default.setNote(synthNotes[4]);
      lastSynthNote = synthNotes[4];
    }

    if (x > 5 * band && x < 6 * band) {
      _meteorVocals2.default.setNote(synthNotes[5]);
      lastSynthNote = synthNotes[5];
    }

    if (x > 6 * band && x < 7 * band) {
      _meteorVocals2.default.setNote(synthNotes[6]);
      lastSynthNote = synthNotes[6];
    }

    if (x > 7 * band && x < 8 * band) {
      _meteorVocals2.default.setNote(synthNotes[7]);
      lastSynthNote = synthNotes[7];
    }

    if (x > 8 * band && x < 9 * band) {
      _meteorVocals2.default.setNote(synthNotes[8]);
      lastSynthNote = synthNotes[8];
    }

    if (x > 9 * band && x < 10 * band) {
      _meteorVocals2.default.setNote(synthNotes[9]);
      lastSynthNote = synthNotes[9];
    }

    if (x > 10 * band && x < 11 * band) {
      _meteorVocals2.default.setNote(synthNotes[10]);
      lastSynthNote = synthNotes[10];
    }

    if (x > 11 * band && x < 12 * band) {
      _meteorVocals2.default.setNote(synthNotes[11]);
      lastSynthNote = synthNotes[11];
    }

    if (x > 12 * band && x < 13 * band) {
      _meteorVocals2.default.setNote(synthNotes[12]);
      lastSynthNote = synthNotes[12];
    }

    if (x > 13 * band && x < 14 * band) {
      _meteorVocals2.default.setNote(synthNotes[13]);
      lastSynthNote = synthNotes[13];
    }

    if (x > 14 * band && x < 15 * band) {
      _meteorVocals2.default.setNote(synthNotes[14]);
      lastSynthNote = synthNotes[14];
    }

    if (x > 15 * band && x < 16 * band) {
      _meteorVocals2.default.setNote(synthNotes[15]);
      lastSynthNote = synthNotes[15];
    }

    if (x > 16 * band) {
      _meteorVocals2.default.setNote(synthNotes[16]);
      lastSynthNote = synthNotes[16];
    }

    if (y < stripe) {
      _meteorVocals2.default.vibratoAmount.value = val;
    }

    if (y > stripe && y < 2 * stripe) {
      _meteorVocals2.default.vibratoAmount.value = val + 1;
    }

    if (y > 2 * stripe && y < 3 * stripe) {
      _meteorVocals2.default.vibratoAmount.value = val + 2;
    }

    if (y > 3 * stripe && y < 4 * stripe) {
      _meteorVocals2.default.vibratoAmount.value = val + 3;
    }

    if (y > 4 * stripe && y < 5 * stripe) {
      _meteorVocals2.default.vibratoAmount.value = val + 4;
    }

    if (y > 5 * stripe && y < 6 * stripe) {
      _meteorVocals2.default.vibratoAmount.value = val + 5;
    }

    if (y > 6 * stripe && y < 7 * stripe) {
      _meteorVocals2.default.vibratoAmount.value = val + 6;
    }

    if (y > 7 * stripe) {
      _meteorVocals2.default.vibratoAmount.value = val + 7;
    }

    _meteorVocals2.default.triggerAttack(lastSynthNote);
  }
}

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map