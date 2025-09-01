let context = null;
let AudioContext = window.AudioContext || window.webkitAudioContext;
let isFirefox = typeof InstallTrigger !== 'undefined'; // This is because firefox has a bug with exponentialRampToValueAtTime

let play = (frequency, duration, trail, initialVolume, type) => {
    if (!context) {
        context = new AudioContext();
    }
    let _trail = trail || 0.1;
    let _duration = isFirefox ? _trail * 1000 : (duration || _trail * 1000);
    let _frequency = frequency || 440.0;

    let volume = context.createGain();
    let oscillator = context.createOscillator();
    oscillator.connect(volume);
    volume.connect(context.destination);
    volume.gain.value = initialVolume || 0.3;

    if (isFirefox) {
        volume.gain.setValueCurveAtTime([volume.gain.value, volume.gain.value / 2, volume.gain.value / 4, volume.gain.value / 8, 0.00001, 0], context.currentTime, _trail);
    } else {
        volume.gain.exponentialRampToValueAtTime(0.00001, context.currentTime + _trail);
    }
    oscillator.type = type || 'triangle';
    oscillator.frequency.value = _frequency;
    oscillator.start();
    if (_duration) {
        setTimeout(() => {
            oscillator.stop();
        }, _duration);
    }
};

let noteFrequencies = {
    'c': 16.35,
    'f#': 23.12,
    'b': 30.87,
};

export class Note {
    constructor(frequency, trail, duration) {
        this.f = frequency;
        this.t = trail;
        this.d = duration;
    }

    play(volume, type) {
        play(this.f, this.d, this.t, volume, type);
    }

    static new = (note, octave, trail, duration) => {
        return new Note(noteFrequencies[note] * Math.pow(2, octave), trail, duration);
    };
}