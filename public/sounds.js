

var C_chord = ['C4', 'E4', 'G4', 'B4'];
var D_chord = ['D 4', 'F 4', 'A 4', 'C 5'];
var G_chord = ['B 3', 'D 4', 'E 4', 'A 4'];

var chordMelody = [
  ['0: 0: 2', C_chord],
  ['0: 1: 0', C_chord],
  ['0: 1: 3', D_chord],
  ['0: 2: 2', C_chord],
  ['0: 3: 0', C_chord],
  ['0: 3: 2', G_chord]
];

var synth = new Tone.PolySynth().toMaster();
var melody = new Tone.Part(setPlay, chordMelody).start();

// btn.addEventListener('click', function() {
//   synth = new Tone.PolySynth().toMaster();
//   var melody = new Tone.Part(setPlay, chordMelody).start();

//   //melody.loop = 2;
// })

function setPlay(time, note) {
  synth.triggerAttackRelease(note, '16n', time);
}


var melody1 = new Tone.Loop(function(time, note) {
  synth.triggerAttackRelease(note, '16n', time);
}, chordMelody)

melody1.start();

Tone.Transport.bpm.value = 70;
Tone.Transport.start();


