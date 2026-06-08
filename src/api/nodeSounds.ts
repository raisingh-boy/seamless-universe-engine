// Web Audio API oscillator sounds for node interactions
// Each domain has a different tone, like a musical instrument

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  return audioCtx;
}

// Domain frequencies (Hz) - like notes on a scale
const DOMAIN_NOTES: Record<string, number[]> = {
  body: [220, 277],       // A3, C#4
  science: [330, 392],    // E4, G4
  philosophy: [440, 523], // A4, C5
  movement: [262, 330],   // C4, E4
  cognition: [587, 659],  // D5, E5
  hybrid: [392, 466],     // G4, Bb4
};

// Play a short tone when interacting with a node
export function playNodeTone(domain: string, intensity: number = 0.3) {
  try {
    const ctx = getAudioContext();
    const notes = DOMAIN_NOTES[domain] || DOMAIN_NOTES.hybrid;
    const freq = notes[0] + Math.random() * (notes[1] - notes[0]);
    
    // Create oscillator
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.value = freq;
    
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(intensity, ctx.currentTime + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
    
    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.8);
  } catch (e) {
    // Audio not supported, silently ignore
  }
}

// Play a resonance chord (richer sound for "resonate" action)
export function playResonanceChord(domain: string) {
  try {
    const ctx = getAudioContext();
    const notes = DOMAIN_NOTES[domain] || DOMAIN_NOTES.hybrid;
    
    // Two oscillators for a chord
    [notes[0], notes[0] * 1.5, notes[1]].forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = i === 1 ? 'sine' : 'triangle';
      osc.frequency.value = freq;
      
      const startTime = ctx.currentTime + i * 0.08;
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.15, startTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 1.2);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(startTime);
      osc.stop(startTime + 1.2);
    });
  } catch (e) {
    // Silently fail
  }
}

// Ambient background drone (start/stop)
let droneOsc: OscillatorNode | null = null;
let droneGain: GainNode | null = null;
let droneInterval: NodeJS.Timeout | null = null;

export function startAmbientDrone() {
  try {
    const ctx = getAudioContext();
    
    // Low drone at 55Hz (A1) with subtle detune
    droneOsc = ctx.createOscillator();
    droneGain = ctx.createGain();
    
    droneOsc.type = 'sine';
    droneOsc.frequency.value = 55;
    droneOsc.detune.value = 5;
    
    droneGain.gain.setValueAtTime(0, ctx.currentTime);
    droneGain.gain.linearRampToValueAtTime(0.04, ctx.currentTime + 3);
    
    droneOsc.connect(droneGain);
    droneGain.connect(ctx.destination);
    
    droneOsc.start();
    
    // Slowly modulate
    let direction = 1;
    droneInterval = setInterval(() => {
      if (!droneGain) return;
      const val = droneGain.gain.value;
      if (val > 0.06) direction = -1;
      if (val < 0.01) direction = 1;
      droneGain.gain.linearRampToValueAtTime(
        val + direction * 0.003,
        ctx.currentTime + 0.5
      );
    }, 500);
  } catch (e) {
    // Silently fail
  }
}

export function stopAmbientDrone() {
  try {
    if (droneInterval) clearInterval(droneInterval);
    if (droneOsc && droneGain) {
      const ctx = getAudioContext();
      droneGain.gain.linearRampToValueAtTime(0, ctx.currentTime + 1);
      setTimeout(() => {
        droneOsc?.stop();
        droneOsc = null;
        droneGain = null;
      }, 1500);
    }
  } catch (e) {
    // Silently fail
  }
}
