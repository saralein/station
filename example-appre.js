console.clear();

// tonejs.org - tone js
// hammerjs.github.io - hammer js
// codepen.io/jakealbaugh/pen/NrdEYL - musical scale library
// codepen.io/jakealbaugh/pen/PzpzEO - arpeggio pattern library

const MS = new MusicalScale({ key: 'G', mode: 'locrian' });
const AP = new ArpeggioPatterns({ steps: 5 });
const synth = new Tone.PolySynth(1, Tone.AMSynth);

const mixer = { master: new Tone.Gain(1).toMaster() };

mixer.verb = new Tone.Freeverb(0.8, 1000).connect(mixer.master);
mixer._1 = new Tone.Gain(0.3).connect(mixer.verb);

mixer.verb.wet.value = 0.3;
synth.set('carrier.oscillator.type', 'pulse');
synth.connect(mixer._1);

let pattern = AP.patterns.looped[0];
let max_bpm = 180;
let min_bpm = 90;
let grain   = 0;
let step    = 0;
let min_oct = 2;
let max_oct = 5;
let tot_oct = max_oct - min_oct;
let octave  = min_oct;
let res     = '16n';
let notes   = MS.notes[0].triad.notes;
let thresh = 5000;
let max_x = thresh;
let max_y = thresh;
let cur_x = 0;
let cur_y = 0;
let hsl = null;
let hsl_lit = null;
let note_axis, oct_axis, bpm_axis;
let playing = false;

const btn = document.querySelector('#pause');
const spin = document.querySelector('#spin');
const cvs = document.querySelector('#canvas');
const bpm = document.querySelector('#bpm-meter');
const tri = document.querySelector('#triad');
const pat = document.querySelector('#pattern');
const pat_h = 100;
const pat_w = 100;
const trimtr = document.querySelector('#triad-meter');
const ctx = cvs.getContext('2d');
const cvs_w = window.innerWidth * 2;
const cvs_h = window.innerHeight * 2;
cvs.width = cvs_w;
cvs.height = cvs_h;

let updateBpm = (value) => {
  Tone.Transport.bpm.value = value;
  bpm.style.top = (1 - (value - min_bpm) / (max_bpm - min_bpm)) * 50 + '%';
  bpm.style.bottom = (1 - (value - min_bpm) / (max_bpm - min_bpm)) * 50 + '%';
};

let updatePattern = (ratio) => {
  if(ratio === Infinity) return;
  let idx = Math.floor(ratio * AP.patterns.looped.length);
  pattern = AP.patterns.looped[idx];
  let points = '';
  for(let p = 0; p < pattern.length; p++) {
    let x = p / pattern.length * pat_w;
    let y = pattern[p] / AP.steps * (pat_h / 2);
    points += `${x},${y} `;
  }
  // add first again
  points += `${pat_w},${pattern[0] / AP.steps * (pat_h / 2)} `;
  // and on second
  points += `${pat_w},${pattern[0] / AP.steps * (pat_h / 2) + (pat_h / 2)} `;
  for(let p = pattern.length - 1; p >= 0; p--) {
    let x = p / pattern.length * pat_w;
    let y = pattern[p] / AP.steps * (pat_h / 2) + (pat_h / 2);
    points += `${x},${y} `;
  }
  pat.setAttribute('points', points);
};

let updateNotes = (value, rat) => {
  let note = MS.notes[value];
  notes = note.triad.notes;
  trimtr.style.top = (1 - rat) * 50 + '%';
  trimtr.style.bottom = (1 - rat) * 50 + '%';
  triad.innerHTML = `${note.note}<em>${note.triad.type}</em>`;
};

let updateOctave = (value) => {
  octave = min_oct + value;
};

Tone.Transport.scheduleRepeat((time) => {
  // find the note to play's index
  let note_idx = pattern[step % pattern.length];
  // find the relative octave based on the index
  let rel_o = Math.floor(note_idx / notes.length);
  // find the note
  let note = notes[note_idx % notes.length];
  // build the note in string form
  let note_form = note.note + (note.rel_octave + rel_o + octave);
  // play the note
  synth.triggerAttackRelease(note_form, res, time);
  // update the master step
  step++;
}, res);

btn.addEventListener('click', () => {
  Tone.Transport.pause();
  playing = false;
  document.body.className = 'start';
});

let updateColor = (x_rat, y_rat) => {
  let h = Math.floor(330 * x_rat);
  let s = '100%';
  let l = Math.floor(y_rat * 40 + 10) + '%';
  hsl = 'hsl(' + [h,s,l].join(',') + ')';
  hsl_lit = 'hsla(' + [h,s,l].join(',') + ',0.9)';
  ctx.fillStyle = hsl;
  ctx.fillRect(0, 0, cvs_w, cvs_h);
}

let update = (x, y) => {
  let notes_rat = y * (MS.notes.length * tot_oct);
  let new_note_axis = Math.floor(notes_rat) % MS.notes.length;
  let new_oct_axis = Math.floor(y * tot_oct);
  let bpm_rat = x * (max_bpm - min_bpm);
  let new_bpm_axis = Math.floor(bpm_rat) + min_bpm;
  let diff_x = x;
  let diff_y = 1 - y;

  let transform = `rotateY(${diff_x * 360}deg) rotateX(${diff_y * 360}deg)`;
  spin.style.webkitTransform = transform;
  spin.style.transform = transform;

  if(new_oct_axis !== oct_axis) {
    oct_axis = new_oct_axis;
    updateOctave(oct_axis);
  }
  if(new_note_axis !== note_axis) {
    note_axis = new_note_axis;
    let rat_y = Math.floor(y * (MS.notes.length * tot_oct)) / (MS.notes.length * tot_oct);
    updateNotes(note_axis, rat_y);
    updateColor(x, y);
  }
  if(new_bpm_axis !== bpm_axis) {
    bpm_axis = new_bpm_axis;
    updateBpm(bpm_axis);
    updateColor(x, y);
  }

  spin.style.color = hsl_lit;
};

let handleDeltas = (x, y) => {
  cur_x += x;
  cur_y += y;
  update((Math.abs(cur_x) % max_x) / max_x, (Math.abs(cur_y) % max_y) / max_y);
};

let handleScroll = (e) => {
  if(!playing) {
    playing = true;
    Tone.Transport.start();
    document.body.className = 'start playing';
  }
  e.preventDefault();
  handleDeltas(e.deltaX, e.deltaY);
};

let handleKeydown = (e) => {
  // 37 38 39 40
  let x, y, skip;
  // left
  if(e.keyCode === 37) {
    x = -1; y = 0;
  // up
  } else if(e.keyCode === 38) {
    x = 0; y = -1;
  // right
  } else if(e.keyCode === 39) {
    x = 1; y = 0;
  // down
  } else if(e.keyCode === 40) {
    x = 0; y = 1;
  } else {
    skip = true;
  }
  if(!skip) {
    let x_amount = thresh * (1 / (max_bpm - min_bpm));
    let y_amount = thresh * (1 / (MS.notes.length * tot_oct));
    let processed_ev = {
      deltaX: x * x_amount,
      deltaY: y * y_amount,
      preventDefault: () => { }
    };
    handleScroll(processed_ev);
  }
};

let handlePan = (e) => {
  let processed_ev = {
    deltaX: e.deltaX * -1 / 2,
    deltaY: e.deltaY * -1 / 2,
    preventDefault: e.preventDefault
  };
  handleScroll(processed_ev);
};

let handleStart = (e) => {
  Tone.startMobile();
  document.body.className = 'start';
  updatePattern(0);
  hammer.on('pan', (ev) => { handlePan(ev); });
  document.querySelector('#clicker').addEventListener('click', (ev) => {
    // update the pattern based on the y axis
    updatePattern(ev.offsetY / ev.target.clientHeight);
  });
  document.body.addEventListener('wheel', (ev) => { handleScroll(ev); });
  document.body.addEventListener('keydown', (ev) => { handleKeydown(ev); });
  e.target.remove();
};

const hammer = new Hammer(document.body, {});
hammer.get('pan').set({ direction: Hammer.DIRECTION_ALL });

let start = document.querySelector('#start');
start.addEventListener('click', (e) => { handleStart(e); });
