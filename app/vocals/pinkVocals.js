var kick = new Tone.MembraneSynth({
  "envelope" : {
    "sustain" : 0,
    "attack" : 0.02,
    "decay" : 0.8
  },
  "octaves" : 10
}).toMaster();

// var pinkVoice = new Tone.Loop(function(time){
//   kick0.triggerAttackRelease("C2", "32n", time);
// }, "(@1m) + 4n");

// var pinkVoice = new Tone.Loop(function(time) {
//   kick.triggerAttackRelease("C2", "4n", time);
// }, "0:3:0");


// var pinkVoice = new Tone.Pattern(function(time, note){
//     kick.triggerAttackRelease(note, 0.75);
// }, [["C2"], ["C2"], ["C2"], ["C2"]]);


var pinkVoice = new Tone.Loop(function(time) {
  kick.triggerAttackRelease("C2", "32n", time);
}, "0:1:0");

var pinkVoice1 = new Tone.Loop(function(time) {
  kick.triggerAttackRelease("C2", "32n", time);
}, "0:2:0");

export default pinkVoice;
