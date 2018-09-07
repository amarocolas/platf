var SoundManager = () => {
    var context = new AudioContext();
    var timeToEnd = 5;

    this.playNote = (frequency, waveform) => {
        let o = context.createOscillator();
        let g = context.createGain();
        let wf = waveform || "sine";

        o.type = wf; // "square" "triangle" "sawtooth"
        o.frequency.value = frequency;
        o.connect(g);

        g.connect(context.destination);
        o.start(0);
        g.gain.exponentialRampToValueAtTime(
        0.00001, context.currentTime + timeToEnd
        );
    }

    return this;
}

module.exports = SoundManager;