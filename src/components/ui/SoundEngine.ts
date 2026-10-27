'use client';

const SOUND_STORAGE_KEY = 'hungthai_sound_enabled';
const ALT_SOUND_STORAGE_KEY = 'portfolio-sound-enabled';

class CustomSoundEngine {
  private ctx: AudioContext | null = null;
  public enabled: boolean = true;
  private listeners: Set<(enabled: boolean) => void> = new Set();

  constructor() {
    // In-memory state only, no local cache persistence
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.removeItem(SOUND_STORAGE_KEY);
        window.localStorage.removeItem(ALT_SOUND_STORAGE_KEY);
      } catch {
        // Ignore storage errors
      }
    }
  }

  public loadPersistedState(): boolean {
    return this.enabled;
  }

  public subscribe(listener: (enabled: boolean) => void): () => void {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notifyListeners() {
    this.listeners.forEach((listener) => {
      try {
        listener(this.enabled);
      } catch {
        // Ignore listener errors
      }
    });
  }

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

  public setEnabled(nextEnabled: boolean, playFeedback: boolean = true): boolean {
    this.enabled = nextEnabled;
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.removeItem(SOUND_STORAGE_KEY);
        window.localStorage.removeItem(ALT_SOUND_STORAGE_KEY);
      } catch {
        // Ignore storage write errors
      }
    }
    if (!this.enabled) {
      this.stopMeditationTone();
    } else if (playFeedback) {
      this.playTap();
    }
    this.notifyListeners();
    return this.enabled;
  }

  public toggleSound(): boolean {
    return this.setEnabled(!this.enabled, true);
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

  /**
   * Hiệu Ứng Âm Thanh Kính Trong Khi Lật Thẻ (Crystal Glass Flip Sound FX)
   */
  public playCardFlip() {
    if (!this.enabled) return;
    try {
      this.playPageFlip();
      this.playGlassChime(0.08);
    } catch {
      // Audio autoplay policy
    }
  }

  /**
   * Hiệu Ứng Âm Thanh Kính Nhẹ Khi Bật / Đóng Thanh Dock (Crystal Panel Sound Effect)
   */
  public playGlassChime(volume: number = 0.15) {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1400, now);
      osc.frequency.exponentialRampToValueAtTime(2200, now + 0.08);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(volume, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.22);
    } catch {
      // Audio autoplay policy
    }
  }

  public playPop() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(480, now);
      osc.frequency.exponentialRampToValueAtTime(950, now + 0.035);
      osc.frequency.exponentialRampToValueAtTime(420, now + 0.075);
      gain.gain.setValueAtTime(0.14, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.075);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.075);
    } catch {
      // Audio autoplay policy
    }
  }

  // Âm thanh tích tắc kim đồng hồ cơ cao cấp (Swiss Mechanical Clock Tick)
  public playClockTick() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      filter.type = 'highpass';
      filter.frequency.setValueAtTime(1800, now);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(2400, now);
      osc.frequency.exponentialRampToValueAtTime(1200, now + 0.012);

      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.0005, now + 0.012);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.012);
    } catch {
      // Audio autoplay policy
    }
  }

  // Tiếng giọt mưa tí tách siêu nhỏ (Crystal Raindrop Pop)
  public playRainDrop() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1650, now);
      osc.frequency.exponentialRampToValueAtTime(750, now + 0.035);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.035);
    } catch {
      // Audio autoplay policy
    }
  }

  // Âm thanh tia nắng lóe sáng pha lê (Sunlight Chime)
  public playSunChime() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(987.77, now); // B5 note
      osc.frequency.exponentialRampToValueAtTime(1318.51, now + 0.08); // E6 note

      gain.gain.setValueAtTime(0.07, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.08);
    } catch {
      // Audio autoplay policy
    }
  }

  // Âm thanh tia chớp lách tách neon (Neon Lightning Spark)
  public playElectricSpark() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(3200, now);
      osc.frequency.exponentialRampToValueAtTime(400, now + 0.04);

      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.04);
    } catch {
      // Audio autoplay policy
    }
  }

  // Phản hồi âm thanh thông minh theo điều kiện thời tiết
  public playWeatherFeedback(condition: string) {
    const c = condition.toLowerCase();
    if (c.includes('rain') || c.includes('mưa')) {
      this.playRainDrop();
    } else if (c.includes('thunder') || c.includes('lightning') || c.includes('sét')) {
      this.playElectricSpark();
    } else if (c.includes('sun') || c.includes('nắng')) {
      this.playSunChime();
    } else {
      this.playPop();
    }
  }

  // Meditation Tibetan Bowl Sound Synthesis (432Hz + 528Hz Harmonics)
  private meditationOsc1: OscillatorNode | null = null;
  private meditationOsc2: OscillatorNode | null = null;
  private meditationGain: GainNode | null = null;

  public startMeditationTone() {
    if (!this.enabled) return;
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

  // Âm thanh lật thẻ giấy / xào bài cổ điển chân thực (Realistic Paper Deck Shuffle SFX)
  public playPaperDeckShuffle() {
    if (!this.enabled) return;
    try {
      this.initCtx();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;

      // Pha 1: Tiếng gió lướt qua mép giấy bài vút lên (0 - 240ms)
      const swooshDuration = 0.24;
      const swooshBufferSize = Math.floor(this.ctx.sampleRate * swooshDuration);
      const swooshBuffer = this.ctx.createBuffer(1, swooshBufferSize, this.ctx.sampleRate);
      const swooshData = swooshBuffer.getChannelData(0);
      for (let i = 0; i < swooshBufferSize; i++) {
        swooshData[i] = (Math.random() * 2 - 1) * Math.sin((i / swooshBufferSize) * Math.PI);
      }
      const swooshSource = this.ctx.createBufferSource();
      swooshSource.buffer = swooshBuffer;

      const swooshFilter = this.ctx.createBiquadFilter();
      swooshFilter.type = 'bandpass';
      swooshFilter.Q.setValueAtTime(3.2, now);
      swooshFilter.frequency.setValueAtTime(850, now);
      swooshFilter.frequency.exponentialRampToValueAtTime(1750, now + 0.12);
      swooshFilter.frequency.exponentialRampToValueAtTime(650, now + swooshDuration);

      const swooshGain = this.ctx.createGain();
      swooshGain.gain.setValueAtTime(0.001, now);
      swooshGain.gain.exponentialRampToValueAtTime(0.14, now + 0.08);
      swooshGain.gain.exponentialRampToValueAtTime(0.001, now + swooshDuration);

      swooshSource.connect(swooshFilter);
      swooshFilter.connect(swooshGain);
      swooshGain.connect(this.ctx.destination);
      swooshSource.start(now);
      swooshSource.stop(now + swooshDuration);

      // Pha 2: Tiếng giấy đáp nhẹ vào đáy xấp bài (sau 320ms)
      const dropDelay = 0.32;
      const dropDuration = 0.16;
      const dropBufferSize = Math.floor(this.ctx.sampleRate * dropDuration);
      const dropBuffer = this.ctx.createBuffer(1, dropBufferSize, this.ctx.sampleRate);
      const dropData = dropBuffer.getChannelData(0);
      for (let i = 0; i < dropBufferSize; i++) {
        dropData[i] = (Math.random() * 2 - 1) * Math.exp(-6 * (i / dropBufferSize));
      }
      const dropSource = this.ctx.createBufferSource();
      dropSource.buffer = dropBuffer;

      const dropFilter = this.ctx.createBiquadFilter();
      dropFilter.type = 'lowpass';
      dropFilter.frequency.setValueAtTime(800, now + dropDelay);
      dropFilter.frequency.exponentialRampToValueAtTime(260, now + dropDelay + dropDuration);

      const dropGain = this.ctx.createGain();
      dropGain.gain.setValueAtTime(0.001, now + dropDelay);
      dropGain.gain.exponentialRampToValueAtTime(0.16, now + dropDelay + 0.02);
      dropGain.gain.exponentialRampToValueAtTime(0.001, now + dropDelay + dropDuration);

      dropSource.connect(dropFilter);
      dropFilter.connect(dropGain);
      dropGain.connect(this.ctx.destination);
      dropSource.start(now + dropDelay);
      dropSource.stop(now + dropDelay + dropDuration);
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
