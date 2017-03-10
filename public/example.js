var feedbackDelay = new Tone.PingPongDelay({
  "delayTime" : "4t",
  "feedback" : 0.4,
  "wet" : 0.25
});

var pingPongVolume = new Tone.Volume(-10);
feedbackDelay.chain(pingPongVolume, Tone.Master);

//pass in some initial values for the filter and filter envelope
var synth = new Tone.MonoSynth({
  "oscillator":{
    type:"square"
  },
  filter:{
    Q:0,
    frequency: 1,
    type:"lowpass",
    rolloff:-96
  },
  envelope:{
    attack:0.5,
    decay:1,
    sustain:0.9,
    release:1
  },
  filterEnvelope:{
    attack: 0,
    decay:0.1,
    sustain:0,
    release: 0
  }
}).toMaster();

var synth2 = new Tone.MonoSynth({
  "oscillator":{
    type:"sine"
  },
  filter:{
    Q:0,
    frequency: 60,
    type:"lowpass",
    rolloff:-96
  },
  envelope:{
    attack:5,
    decay:1,
    sustain:0.9,
    release:5
  },
  filterEnvelope:{
    attack: 0.05,
    decay:0.1,
    sustain:0,
    release: 0
  }
}).connect(feedbackDelay);

var synth2Volume = new Tone.Volume(-15);
synth2.chain(synth2Volume, Tone.Master);

//a polysynth composed of 6 Voices of Synth
var synth3 = new Tone.PolySynth(4, Tone.Synth).toMaster();
//set the attributes using the set interface
synth3.set("detune", -1200);

var synth4 = new Tone.MonoSynth({
  "oscillator":{
    type:"sine"
  },
  filter:{
    Q:0,
    frequency: 200,
    type:"lowpass",
    rolloff:-48
  },
  envelope:{
    attack:2,
    decay:0.1,
    sustain:0.9,
    release:2
  },
  filterEnvelope:{
    attack: 0.1,
    decay:0.1,
    sustain:0,
    release: 0
  }
}).toMaster();

var kick = new Tone.MembraneSynth({
  "pitchDecay" : 0,
  "octaves" : 2,
  "envelope" : {
    "attack" : 0.01,
    "decay" : 0.5,
    "sustain" : 0
  },
  filter:{
    Q:0.5,
    frequency: 20,
    type:"lowpass",
    rolloff:-96
  },
  filterEnvelope:{
    attack: 0.3,
    decay:0.1,
    sustain:0,
    release: 0
  }
});

var kickVolume = new Tone.Volume(10);
kick.chain(kickVolume, Tone.Master);

Tone.Transport.bpm.value = 120

var loops = {};

loops.subass = new Tone.Loop(function(time){
    synth.triggerAttackRelease("D2", "1m", time);
}, "2m");

loops.arp = new Tone.Loop(function(time){
    synth2.triggerAttackRelease("A5", "8n", time);
}, "8n");

loops.chords = new Tone.Loop(function(time){
    synth3.triggerAttackRelease(["D4", "F4", "A4"], "1m", time)
}, "2m");

loops.sequence = new Tone.Sequence(function(time, note){
  console.log(time);
  synth4.triggerAttackRelease(note, '16n', time);
//straight quater notes
}, ["D3", "G3", "A3", "F3"], "16n");

loops.kick = new Tone.Sequence(function(time, pitch){
  kick.triggerAttack(pitch, time);
}, ["C2"], "4n");

document.querySelector('#transport').addEventListener('click', function(e){
  var play_action = this.getAttribute('data-playing');
  if(play_action == "pause"){
    Tone.Transport.stop();
    this.setAttribute('data-playing', 'play');
  }
  else{
    Tone.Transport.start();
    this.setAttribute('data-playing', 'pause');
  }
});

var measure = 1,
    beat = 0;

Tone.Transport.scheduleRepeat(function(time){
  beat++;
  if(beat == 5){
    measure++;
    beat = 1;
    document.querySelector('#measure').innerHTML = measure;
  }
  document.querySelector('#beat').innerHTML = beat
}, "4n");

var buttons = document.querySelectorAll('.toggle');

Array.prototype.forEach.call(buttons, function(el, i){
  el.addEventListener('click', function(e){
    var synth = this.getAttribute('data-synth');
    var play_action = this.getAttribute('data-playing');
    if (play_action == "stop"){
      loops[synth].stop();
      this.setAttribute('data-playing', 'play');
    }
    else{
      loops[synth].start('@1m');
      this.setAttribute('data-playing', 'stop');
    }
  });
});
