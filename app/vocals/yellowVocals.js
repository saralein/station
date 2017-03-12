var synth = new Tone.MembraneSynth().toMaster();

var voice0 = new Tone.Event(function(time, pitch) {
  synth.triggerAttackRelease(440, "32n", time);
}, [["1:2:2", "F6"]]);

voice0.set({
    "loop" : true,
});

let voice1 = new Tone.Part(function(time, note) {
  synth.triggerAttackRelease(note, "32n", time);
}, melody1)

let melody1 = [
  ['0:2:1', 'E4'],
  ['0:3:2', 'E6']
]

melody1.loop = true;

let yellowVoice = {
  circle0: voice0,
  circle1: voice1,
  circle2: voice0,
  circle3: voice0,
};

export default yellowVoice;
