var greenSynth = new Tone.PluckSynth().toMaster();


let melody0 = [
  ['0:4:1', 'G5']
];

var voice0 = new Tone.Part(function(time, note) {
  greenSynth.triggerAttackRelease(note, '4n', time);
}, melody0);

voice0.loop = true;

let greenVoice = {
  circle0: voice0,
  circle1: voice0,
  circle2: voice0,
  circle3: voice0,
}

export default greenVoice;
