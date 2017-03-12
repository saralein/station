let rock = new Tone.DuoSynth({
    "vibratoAmount" : 0,
    "vibratoRate" : 5,
    "portamento" : 0.1,
    "harmonicity" : 1.005,
    "volume" : -10,
    "voice0" : {
      "volume" : -12,
      "oscillator" : {
        "type" : "sawtooth"
      },
      "filter" : {
        "Q" : 1,
        "type" : "lowshelf",
        "rolloff" : -24
      },
      "envelope" : {
        "attack" : 0.01,
        "decay" : 0.25,
        "sustain" : 0.4,
        "release" : 1.2
      },
      "filterEnvelope" : {
        "attack" : 0.001,
        "decay" : 0.05,
        "sustain" : 0.3,
        "release" : 2,
        "baseFrequency" : 100,
        "octaves" : 4
      }
    },
    "voice1" : {
      "volume" : -25,
      "oscillator" : {
        "type" : "square"
      },
      "filter" : {
        "Q" : 2,
        "type" : "peaking",
        "rolloff" : -12
      },
      "envelope" : {
        "attack" : 0.25,
        "decay" : 4,
        "sustain" : 0.1,
        "release" : 0.8
      },
      "filterEnvelope" : {
        "attack" : 0.05,
        "decay" : 0.05,
        "sustain" : 0.7,
        "release" : 2,
        "baseFrequency" : 5000,
        "octaves" : -1.5
      }
    }
  }).toMaster();

export default rock;
