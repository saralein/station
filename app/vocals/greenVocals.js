var pluck = new Tone.PluckSynth().toMaster();

var greenVoice = new Tone.Event(function(time, pitch) {
  pluck.triggerAttackRelease(440, "32n", time);
}, "G2");

greenVoice.set({
    "loop" : true,
});

export default greenVoice;
