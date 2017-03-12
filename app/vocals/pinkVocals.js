var kick = new Tone.MembraneSynth({
  "envelope" : {
    "sustain" : 0,
    "attack" : 0.02,
    "decay" : 0.8
  },
  "octaves" : 10
}).toMaster();

let melody0 = [
  ['0:1:4', 'C2'],
  ['0:2:4', 'C2'],
];

var voice0 = new Tone.Part(function(time, note) {
  kick.triggerAttackRelease(note, "32n", time);
}, melody0);

voice0.loop = true;
voice0.volume = 30;

let melody1 = [
  ['0:1:4', 'C2'],
  ['0:2:2', 'C2']
];

var voice1 = new Tone.Part(function(time, note) {
  kick.triggerAttackRelease(note, "16n", time);
}, melody1);

voice1.loop = true;
voice1.volume = 30;

let melody2 = [
  ['0:1:2', 'C2'],
  ['0:3:2', 'C2']
];

var voice2 = new Tone.Part(function(time, note) {
  kick.triggerAttackRelease(note, "32n", time);
}, melody2);

voice2.loop = true;
voice2.volume = 30;

let melody3 = [
  ['0:1:4', 'C2']
];

var voice3 = new Tone.Part(function(time, note) {
  kick.triggerAttackRelease(note, "32", time);
}, melody3);

voice3.loop = true;
voice3.volume = 30;

let pinkVoice = {
  circle0: voice0,
  circle1: voice1,
  circle2: voice2,
  circle3: voice3,
}

export default pinkVoice;
