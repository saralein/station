var greenSynth = new Tone.PluckSynth().toMaster();

let melody0 = [
  ['0:1:4', 'C7'],
  ['0:2:2', 'G8'],
  ['0:3:2', 'C4'],
];

var voice0 = new Tone.Part(function(time, note) {
  greenSynth.triggerAttackRelease(note, '4n', time);
}, melody0);

voice0.loop = true;

let melody1 = [
  ['0:1:2', 'C4'],
  ['0:2:2', 'C6'],
  ['0:3:1', 'C8'],
];

var voice1 = new Tone.Part(function(time, note) {
  greenSynth.triggerAttackRelease(note, '4n', time);
}, melody1);

voice1.loop = true;

let melody2 = [
  ['0:1:2', 'C2'],
  ['0:3:1', 'C4'],
  ['0:3:2', 'C8'],
];

var voice2 = new Tone.Part(function(time, note) {
  greenSynth.triggerAttackRelease(note, '4n', time);
}, melody2);

voice2.loop = true;

let melody3 = [
  ['0:1:2', 'D4'],
  //['0:3:1', 'C4'],
  ['0:3:2', 'G2'],
];

var voice3 = new Tone.Part(function(time, note) {
  greenSynth.triggerAttackRelease(note, '4n', time);
}, melody3);

voice3.loop = true;

let greenVoice = {
  circle0: voice0,
  circle1: voice1,
  circle2: voice2,
  circle3: voice3,
}

export default greenVoice;
