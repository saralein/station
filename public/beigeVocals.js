let C_chord = ['C4', 'E4', 'G4', 'B4'];
let D_chord = ['D4', 'F4', 'A4', 'C5'];
let G_chord = ['B3', 'D4', 'E4', 'A4'];

let chordMelody = [
  ['0:0:2', C_chord],
  ['0:1:0', C_chord],
  ['0:1:3', D_chord],
  ['0:2:2', C_chord],
  ['0:3:0', C_chord],
  ['0:3:2', G_chord]
];

let beigeSynth = new Tone.PolySynth().toMaster();
let beigeVoice = new Tone.Part(function(time, note) {
  beigeSynth.triggerAttackRelease(note, '16n', time);
}, chordMelody);

beigeVoice.loop = true;

export default beigeVoice;
