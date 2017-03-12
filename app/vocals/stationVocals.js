var stationSynth = new Tone.MembraneSynth().toMaster();

var stationVoice = new Tone.Loop(function(time){
  stationSynth.triggerAttackRelease("F5", "8t", time)
}, "2:1:4");

export default stationVoice;
