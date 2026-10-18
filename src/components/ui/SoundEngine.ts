'use client';

class CustomSoundEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;

  private initCtx() {
    if (typeof window === 'undefined') return;
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleSound(): boolean {
    this.enabled = !this.enabled;
    return this.enabled;
  }

  public playTap() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.06);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.06);
    } catch {
      // Audio autoplay policy
    }
  }

  public playPageFlip() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const duration = 0.2;
      const bufferSize = Math.floor(this.ctx.sampleRate * duration);
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }
      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1200, now);
      filter.frequency.exponentialRampToValueAtTime(500, now + duration);
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.18, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.001, now + duration);
      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);
      noise.start(now);
      noise.stop(now + duration);
    } catch {
      // Audio autoplay policy
    }
  }

  public playBookOpen() {
    this.playPageFlip();
  }

  public playBookClose() {
    this.playTap();
  }

  public playPop() {
    this.playTap();
  }

  // Meditation Tibetan Bowl Sound Synthesis (432Hz + 528Hz Harmonics)
  private meditationOsc1: OscillatorNode | null = null;
  private meditationOsc2: OscillatorNode | null = null;
  private meditationGain: GainNode | null = null;

  public startMeditationTone() {
    try {
      this.initCtx();
      if (!this.ctx) return;
      this.stopMeditationTone();

      const now = this.ctx.currentTime;
      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.08, now + 1.5);

      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      osc1.type = 'sine';
      osc2.type = 'sine';

      // 432Hz root + 528Hz harmonic
      osc1.frequency.setValueAtTime(432, now);
      osc2.frequency.setValueAtTime(528, now);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start(now);
      osc2.start(now);

      this.meditationOsc1 = osc1;
      this.meditationOsc2 = osc2;
      this.meditationGain = gain;
    } catch {
      // Audio autoplay policy
    }
  }

  public stopMeditationTone() {
    try {
      if (this.ctx && this.meditationGain) {
        const now = this.ctx.currentTime;
        this.meditationGain.gain.linearRampToValueAtTime(0.001, now + 1.0);
        setTimeout(() => {
          try {
            this.meditationOsc1?.stop();
            this.meditationOsc2?.stop();
            this.meditationOsc1?.disconnect();
            this.meditationOsc2?.disconnect();
            this.meditationGain?.disconnect();
          } catch {}
          this.meditationOsc1 = null;
          this.meditationOsc2 = null;
          this.meditationGain = null;
        }, 1100);
      }
    } catch {
      // Audio context cleanup
    }
  }
}

export const soundEngine = new CustomSoundEngine();
export const SoundEngine = soundEngine;
