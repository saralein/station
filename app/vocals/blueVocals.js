var snare3 = new Tone.NoiseSynth({
  "volume" : -50,
  "envelope" : {
    "attack" : 0.5,
    "decay" : 0.1,
    "sustain" : 0
  },
  "filterEnvelope" : {
    "attack" : 0.5,
    "decay" : 0.1,
    "sustain" : 0
  }
}).toMaster();

var voice3 = new Tone.Pattern(function(time){
      snare3.triggerAttack(time);
    });

var snare2 = new Tone.NoiseSynth({
  "volume" : -20,
  "envelope" : {
    "attack" : 0.001,
    "decay" : 0.5,
    "sustain" : 0
  },
  "filterEnvelope" : {
    "attack" : 0.001,
    "decay" : 0.5,
    "sustain" : 0
  }
}).toMaster();

var voice2 = new Tone.Pattern(function(time){
      snare2.triggerAttack(time);
    });

var snare1 = new Tone.NoiseSynth({
  "volume" : -10,
  "envelope" : {
    "attack" : 0.001,
    "decay" : 0.2,
    "sustain" : 0
  },
  "filterEnvelope" : {
    "attack" : 0.001,
    "decay" : 0.2,
    "sustain" : 0
  }
}).toMaster();

var voice1 = new Tone.Pattern(function(time){
      snare1.triggerAttack(time);
    });

var snare0 = new Tone.NoiseSynth({
  "volume" : -5,
  "envelope" : {
    "attack" : 0.001,
    "decay" : 0.1,
    "sustain" : 0
  },
  "filterEnvelope" : {
    "attack" : 0.001,
    "decay" : 0.1,
    "sustain" : 0
  }
}).toMaster();

var voice0 = new Tone.Pattern(function(time){
      snare0.triggerAttack(time);
    });

let blueVoice = {
  circle0: voice0,
  circle1: voice1,
  circle2: voice2,
  circle3: voice3,
}

export default blueVoice;
