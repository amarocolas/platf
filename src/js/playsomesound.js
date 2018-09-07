var context = new AudioContext();
var timeToEnd = 5;

var playNote = (frequency, waveform, decayTime) => {
    let o = context.createOscillator();
    let g = context.createGain();

    let wf = waveform || "sine";
    let dec = decayTime || 5;

    o.type = wf; // "square" "triangle" "sawtooth"
    o.frequency.value = frequency;
    o.connect(g);

    g.connect(context.destination);
    o.start(0);
    g.gain.exponentialRampToValueAtTime(
    0.00001, context.currentTime + dec
    );
}

var a = [[16.35,17.32,18.35,19.45,20.60,21.83,23.12,24.50,25.96,27.50,29.14,30.87]
,[32.70,34.65,36.71,38.89,41.20,43.65,46.25,49.00,51.91,55.00,58.27,61.74]
,[65.41,69.30,73.42,77.78,82.41,87.31,92.50,98.00,103.8,110.0,116.5,123.5]
,[130.8,138.6,146.8,155.6,164.8,174.6,185.0,196.0,207.7,220.0,233.1,246.9]
,[261.6,277.2,293.7,311.1,329.6,349.2,370.0,392.0,415.3,440.0,466.2,493.9]
,[523.3,554.4,587.3,622.3,659.3,698.5,740.0,784.0,830.6,880.0,932.3,987.8]
,[1047,1109,1175,1245,1319,1397,1480,1568,1661,1760,1865,1976]
,[2093,2217,2349,2489,2637,2794,2960,3136,3322,3520,3729,3951]
,[4186,4435,4699,4978,5274,5588,5920,6272,6645,7040,7459,7902]],
b = ["C","C#","D","Eb","E","F","F#","G","G#","A","Bb","B"];
c = {};

b.forEach(note => {
    c[note] = [];
});

var acc = 0;

a.forEach(freqs =>{
    freqs.forEach( (freq, freqInd) => {
        c[b[freqInd]].push(freq);
        acc++;
        setTimeout(() => {playNote(freq);}, acc * 40);
    });
});

acc = 0;

a.forEach(freqs =>{
    freqs.forEach( (freq, freqInd) => {
        acc++;
        setTimeout(() => {playNote(freq, 'triangle');}, acc * 40);
    });
});

setInterval( () => {

    setTimeout(() => {
            playNote(261.6);
        }, 0
    );
    setTimeout(() => {
            playNote(207.7);
        }, 500
    );
    setTimeout(() => {
            playNote(261.6);
        }, 1000
    );
    setTimeout(() => {
            playNote(207.7);
        }, 1500
    );
    setTimeout(() => {
            playNote(207.7);
        }, 2000
    );
    setTimeout(() => {
            playNote(261.6);
        }, 2500
    );
    setTimeout(() => {
            playNote(207.7);
        }, 3000
    );
    setTimeout(() => {
            playNote(174.6);
        }, 3500
    );
    setTimeout(() => {
            playNote(207.7);
        }, 4000
    );
    setTimeout(() => {
            playNote(174.6);
        }, 4000
    );
    setTimeout(() => {
            playNote(174.6);
        }, 4500
    );
    setTimeout(() => {
            playNote(207.7);
        }, 5000
    );
    setTimeout(() => {
            playNote(261.6);
        }, 5500
    );
    setTimeout(() => {
            playNote(311.1)
        }, 6000
    );
    setTimeout(() => {
            playNote(261.6);
        }, 7000
    );
}, 8000);


// Laser
var a = [65.41,69.30,73.42,77.78,82.41,87.31,92.50,98.00,103.8,110.0,116.5,123.5];
a.forEach((val, ind) => {
    setTimeout(() => {
        playNote(val, 'square', .5);
    }, .3 * ind);
});

// Exclamation
var a = [329.6,349.2,370.0,392.0,415.3,440.0,466.2,493.9];
a.forEach((val, ind) => {
    setTimeout(() => {
        playNote(val, 'square', .5);
    }, .3 * ind);
});

// Explosion
var a = [65.41,69.30,73.42,77.78,82.41,87.31,92.50,98.00,103.8,110.0,116.5,123.5];
a.forEach((val, ind) => {
    setTimeout(() => {
        playNote(val, 'square', 2);
    }, .5 * ind);
});


(() => {
    setTimeout(() => {
        playNote(207, 'sine', .5);
    }, 0);
    setTimeout(() => {
        playNote(440.0, 'sine', 2);
    }, 1);
})();

(() => {
    setTimeout(() => {
        playNote(207, 'square', .5);
    }, 0);
    setTimeout(() => {
        playNote(300, 'sine', .5);
    }, 50);
	setTimeout(() => {
        playNote(440.0, 'square', 1);
    }, 100);
})();


//chicken 

(() => {
	playNote(277.2, 'sawtooth', .5);
setTimeout(() => {
	playNote(377, 'sawtooth', 1)
}, 100);
setTimeout(() => {
	playNote(427, 'sawtooth', 2)
}, 125)
setTimeout(() => {
	playNote(377, 'sawtooth', 3)
}, 150)
})();