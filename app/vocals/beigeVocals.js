let C_chord = ['C4', 'E4', 'G4', 'B4'];
let D_chord = ['D4', 'F4', 'A4', 'C5'];
let G_chord = ['B3', 'D4', 'E4', 'A4'];

let melody0 = [
  ['0:1:1', C_chord],
  ['0:1:2', D_chord],
  ['0:1:4', G_chord],
  ['0:2:2', C_chord]
];

let beigeSynth = new Tone.PolySynth(
    {
      "volume" : -20
    }).toMaster();
let voice0 = new Tone.Part(function(time, note) {
  beigeSynth.triggerAttackRelease(note, '16n', time);
}, melody0);

voice0.loop = true;

let melody1 = [
  ['0:1:2', C_chord],
  ['0:2:2', C_chord],
  ['0:3:0', C_chord],
  ['0:3:2', G_chord],
  ['0:3:3', D_chord],
  ['0:4:2', D_chord]
];

let voice1 = new Tone.Part(function(time, note) {
  beigeSynth.triggerAttackRelease(note, '16n', time);
}, melody1);

voice1.loop = true;

let melody2 = [
  ['0:1:2', C_chord],
  ['0:2:2', D_chord],
  ['0:3:0', G_chord],
  ['0:3:2', D_chord],
  ['0:3:4', C_chord],
];

let voice2 = new Tone.Part(function(time, note) {
  beigeSynth.triggerAttackRelease(note, '16n', time);
}, melody2);

voice2.loop = true;

let melody3 = [
  ['0:1:2', C_chord],
  ['0:2:2', C_chord],
  ['0:3:1', D_chord]
];

let voice3 = new Tone.Part(function(time, note) {
  beigeSynth.triggerAttackRelease(note, '16n', time);
}, melody3);

voice3.loop = true;

let beigeVoice = {
  circle0: voice0,
  circle1: voice1,
  circle2: voice2,
  circle3: voice3,
}

export default beigeVoice;
