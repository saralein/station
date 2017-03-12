var synth = new Tone.MembraneSynth().toMaster();

var yellowVoice = new Tone.Event(function(time, pitch) {
  synth.triggerAttackRelease(440, "32n", time);
}, [["2:2", "F6"]]);

yellowVoice.set({
    "loop" : true,
});

export default yellowVoice;
