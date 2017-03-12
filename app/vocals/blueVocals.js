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

var voice0 = new Tone.Pattern(function(time){
      snare.triggerAttack(time);
    }, melody0);


let melody0 = [
  ['0:1:1'],
  ['0:1:2'],
  ['0:1:3']

];

var voice1 = new Tone.Pattern(function(time){
      snare.triggerAttack(time);
    }, ["0:1:4"]);

let blueVoice = {
  circle0: voice0,
  circle1: voice1,
  circle2: voice0,
  circle3: voice0,
}

export default blueVoice;
