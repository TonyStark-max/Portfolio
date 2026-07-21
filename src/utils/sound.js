// Web Audio API Synthesizer for rich UI feedback sounds
class SoundEffects {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
  }

  toggleSound(enable) {
    this.enabled = enable;
    if (enable && !this.ctx) {
      this.init();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playTone(freq = 440, duration = 0.04, type = 'sine', gainVal = 0.05, endFreq = null) {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(Math.max(20, endFreq || freq * 0.4), this.ctx.currentTime + duration);

      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      // silence
    }
  }

  // Crisp mechanical tactile click
  playClick() {
    this.playTone(850, 0.025, 'triangle', 0.06, 300);
  }

  // Subtle soft hover tick
  playHover() {
    this.playTone(400, 0.015, 'sine', 0.02, 200);
  }

  // Tab switch tone
  playTab() {
    this.playTone(720, 0.035, 'sine', 0.05, 520);
  }

  // Smooth warm sweep tone for theme switches
  playTheme() {
    this.playTone(320, 0.08, 'sine', 0.04, 640);
  }

  // Celebratory 4-note ascending chord
  playSuccess() {
    if (!this.enabled) return;
    try {
      this.init();
      if (!this.ctx) return;
      if (this.ctx.state === 'suspended') this.ctx.resume();

      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5 E5 G5 C6
      notes.forEach((freq, idx) => {
        setTimeout(() => {
          this.playTone(freq, 0.12, 'triangle', 0.06);
        }, idx * 55);
      });
    } catch (e) {
      // silence
    }
  }
}

export const soundFx = new SoundEffects();
