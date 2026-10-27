'use client';

import { WallpaperOption } from '@/types';
import { SoundEngine } from '@/components/ui/SoundEngine';

export type AmbientTrackId = 'rain' | 'ocean' | 'forest' | 'cosmos';
export type AmbientSoundMode = 'auto' | AmbientTrackId;

export interface AmbientTrackMeta {
  id: AmbientTrackId;
  name: string;
  subtitle: string;
  badge: string;
  icon: string;
}

export const AMBIENT_TRACKS: AmbientTrackMeta[] = [
  {
    id: 'rain',
    name: 'Mưa Rơi Trên Kính',
    subtitle: 'Tiếng mưa đêm dịu nhẹ & giọt nước tí tách',
    badge: 'Rain on Glass',
    icon: 'cloud-rain',
  },
  {
    id: 'ocean',
    name: 'Sóng Biển Đại Dương',
    subtitle: 'Nhịp sóng vỗ bờ chu kỳ sâu thư giãn',
    badge: 'Ocean Waves',
    icon: 'globe',
  },
  {
    id: 'forest',
    name: 'Gió Rừng Nhiệt Đới',
    subtitle: 'Gió thổi qua tán lá & âm hưởng thiên nhiên',
    badge: 'Forest Wind',
    icon: 'sparkles',
  },
  {
    id: 'cosmos',
    name: 'Tần Số Lo-Fi Vũ Trụ',
    subtitle: 'Hòa âm Ambient Pad 432Hz & 528Hz tĩnh tâm',
    badge: '432Hz Cosmos',
    icon: 'moon',
  },
];

// Automatically pick the most fitting ambient track from active weather & wallpaper
export function resolveAutoAmbientTrack(
  wallpaper?: WallpaperOption,
  weatherCondition?: string,
  weatherSyncEnabled?: boolean
): AmbientTrackId {
  const weatherNorm = (weatherCondition || '').toLowerCase();

  if (weatherSyncEnabled) {
    if (
      weatherNorm.includes('rain') ||
      weatherNorm.includes('thunder') ||
      weatherNorm.includes('lightning')
    ) {
      return 'rain';
    }
    if (weatherNorm.includes('cloud') || weatherNorm.includes('overcast')) {
      return 'cosmos';
    }
  }

  if (wallpaper) {
    const combined = `${wallpaper.id} ${wallpaper.name} ${wallpaper.value}`.toLowerCase();
    if (
      combined.includes('rain') ||
      combined.includes('mưa') ||
      combined.includes('storm')
    ) {
      return 'rain';
    }
    if (
      combined.includes('ocean') ||
      combined.includes('sea') ||
      combined.includes('beach') ||
      combined.includes('biển') ||
      combined.includes('đại dương') ||
      combined.includes('water')
    ) {
      return 'ocean';
    }
    if (
      combined.includes('forest') ||
      combined.includes('rừng') ||
      combined.includes('emerald') ||
      combined.includes('nature') ||
      combined.includes('autumn') ||
      combined.includes('thu') ||
      combined.includes('leaf')
    ) {
      return 'forest';
    }
    if (
      combined.includes('space') ||
      combined.includes('aurora') ||
      combined.includes('cosmic') ||
      combined.includes('cyber') ||
      combined.includes('night') ||
      combined.includes('vũ trụ') ||
      combined.includes('cực quang')
    ) {
      return 'cosmos';
    }
  }

  if (weatherNorm.includes('rain') || weatherNorm.includes('thunder')) {
    return 'rain';
  }

  return 'cosmos';
}

class ProceduralAmbientSoundEngine {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private activeNodes: AudioNode[] = [];
  private activeTimers: number[] = [];
  private currentTrack: AmbientTrackId | null = null;
  private isPlaying: boolean = false;
  private volume: number = 0.45; // 0.0 to 1.0

  constructor() {
    if (typeof window !== 'undefined') {
      // Sync with global Header Mute/Unmute toggle
      SoundEngine.subscribe((globalEnabled) => {
        if (!this.masterGain || !this.ctx) return;
        const now = this.ctx.currentTime;
        const targetGain = globalEnabled && this.isPlaying ? this.volume * 0.35 : 0.0001;
        try {
          this.masterGain.gain.setTargetAtTime(targetGain, now, 0.25);
        } catch {
          // ignore
        }
      });
    }
  }

  private ensureContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
        this.masterGain = this.ctx.createGain();
        this.masterGain.gain.value = 0.0001;
        this.masterGain.connect(this.ctx.destination);
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  private createPinkNoiseBuffer(ctx: AudioContext, seconds = 5): AudioBuffer {
    const bufferSize = ctx.sampleRate * seconds;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);
    let b0 = 0,
      b1 = 0,
      b2 = 0,
      b3 = 0,
      b4 = 0,
      b5 = 0,
      b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.045;
      b6 = white * 0.115926;
    }
    return buffer;
  }

  private createBrownNoiseBuffer(ctx: AudioContext, seconds = 6): AudioBuffer {
    const bufferSize = ctx.sampleRate * seconds;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = buffer.getChannelData(0);
    let lastOut = 0.0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      output[i] = (lastOut + 0.02 * white) / 1.02;
      lastOut = output[i];
      output[i] *= 0.18;
    }
    return buffer;
  }

  private clearActiveNodes() {
    for (const timer of this.activeTimers) {
      window.clearInterval(timer);
    }
    this.activeTimers = [];

    for (const node of this.activeNodes) {
      try {
        if ('stop' in node && typeof (node as AudioScheduledSourceNode).stop === 'function') {
          (node as AudioScheduledSourceNode).stop();
        }
      } catch {
        // ignore
      }
      try {
        node.disconnect();
      } catch {
        // ignore
      }
    }
    this.activeNodes = [];
  }

  public setVolume(volumePercent: number) {
    this.volume = Math.max(0, Math.min(100, volumePercent)) / 100;
    if (this.ctx && this.masterGain && this.isPlaying) {
      const effectiveGain = SoundEngine.enabled ? Math.max(0.0001, this.volume * 0.35) : 0.0001;
      try {
        this.masterGain.gain.setTargetAtTime(effectiveGain, this.ctx.currentTime, 0.18);
      } catch {
        // ignore
      }
    }
  }

  public startTrack(track: AmbientTrackId, volumePercent?: number) {
    if (typeof volumePercent === 'number') {
      this.volume = Math.max(0, Math.min(100, volumePercent)) / 100;
    }

    const ctx = this.ensureContext();
    if (!ctx || !this.masterGain) return;

    if (this.isPlaying && this.currentTrack === track) {
      this.setVolume(this.volume * 100);
      return;
    }

    this.clearActiveNodes();
    this.currentTrack = track;
    this.isPlaying = true;

    const now = ctx.currentTime;
    const targetGain = SoundEngine.enabled ? Math.max(0.0001, this.volume * 0.35) : 0.0001;
    this.masterGain.gain.setTargetAtTime(targetGain, now, 0.5);

    if (track === 'rain') {
      this.buildRainGraph(ctx, this.masterGain);
    } else if (track === 'ocean') {
      this.buildOceanGraph(ctx, this.masterGain);
    } else if (track === 'forest') {
      this.buildForestGraph(ctx, this.masterGain);
    } else {
      this.buildCosmosGraph(ctx, this.masterGain);
    }
  }

  public stop() {
    this.isPlaying = false;
    this.currentTrack = null;
    if (this.ctx && this.masterGain) {
      try {
        this.masterGain.gain.setTargetAtTime(0.0001, this.ctx.currentTime, 0.3);
      } catch {
        // ignore
      }
    }
    setTimeout(() => {
      if (!this.isPlaying) {
        this.clearActiveNodes();
      }
    }, 350);
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  public getTrack(): AmbientTrackId | null {
    return this.currentTrack;
  }

  // 1. Rain on Glass: Soft steady rain wash + gentle glass droplet pings
  private buildRainGraph(ctx: AudioContext, dest: AudioNode) {
    const pinkBuffer = this.createPinkNoiseBuffer(ctx, 5);
    const rainSource = ctx.createBufferSource();
    rainSource.buffer = pinkBuffer;
    rainSource.loop = true;

    const bandpass = ctx.createBiquadFilter();
    bandpass.type = 'bandpass';
    bandpass.frequency.value = 1150;
    bandpass.Q.value = 0.65;

    const lowpass = ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.value = 2600;

    rainSource.connect(bandpass);
    bandpass.connect(lowpass);
    lowpass.connect(dest);
    rainSource.start();

    this.activeNodes.push(rainSource, bandpass, lowpass);

    // Subtle glass droplet resonance every ~1.4s
    const dropletTimer = window.setInterval(() => {
      if (!this.isPlaying || this.currentTrack !== 'rain' || !SoundEngine.enabled) return;
      try {
        const t = ctx.currentTime;
        const osc = ctx.createOscillator();
        const dropGain = ctx.createGain();
        osc.type = 'sine';
        const baseFreq = 900 + Math.random() * 950;
        osc.frequency.setValueAtTime(baseFreq, t);
        osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.35, t + 0.065);

        dropGain.gain.setValueAtTime(0.0001, t);
        dropGain.gain.linearRampToValueAtTime(0.035, t + 0.01);
        dropGain.gain.exponentialRampToValueAtTime(0.0001, t + 0.08);

        osc.connect(dropGain);
        dropGain.connect(dest);
        osc.start(t);
        osc.stop(t + 0.085);
      } catch {
        // ignore
      }
    }, 1100);

    this.activeTimers.push(dropletTimer);
  }

  // 2. Ocean Waves: Brown noise with slow LFO wave surf cycle + deep warm sub-drone
  private buildOceanGraph(ctx: AudioContext, dest: AudioNode) {
    const brownBuffer = this.createBrownNoiseBuffer(ctx, 6);
    const waveSource = ctx.createBufferSource();
    waveSource.buffer = brownBuffer;
    waveSource.loop = true;

    const waveFilter = ctx.createBiquadFilter();
    waveFilter.type = 'lowpass';
    waveFilter.frequency.value = 380;

    // LFO to sweep filter cutoff between 160Hz and 680Hz every ~8 seconds
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 0.125; // 8s wave cycle

    const lfoDepth = ctx.createGain();
    lfoDepth.gain.value = 260;

    lfo.connect(lfoDepth);
    lfoDepth.connect(waveFilter.frequency);

    waveSource.connect(waveFilter);
    waveFilter.connect(dest);

    waveSource.start();
    lfo.start();

    this.activeNodes.push(waveSource, waveFilter, lfo, lfoDepth);
  }

  // 3. Tropical Forest Wind: Dual LFO breeze filter + soft nature harmonic chimes
  private buildForestGraph(ctx: AudioContext, dest: AudioNode) {
    const pinkBuffer = this.createPinkNoiseBuffer(ctx, 5);
    const windSource = ctx.createBufferSource();
    windSource.buffer = pinkBuffer;
    windSource.loop = true;

    const windFilter = ctx.createBiquadFilter();
    windFilter.type = 'bandpass';
    windFilter.frequency.value = 520;
    windFilter.Q.value = 2.2;

    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 0.16;

    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 240;

    lfo.connect(lfoGain);
    lfoGain.connect(windFilter.frequency);

    windSource.connect(windFilter);
    windFilter.connect(dest);

    windSource.start();
    lfo.start();

    this.activeNodes.push(windSource, windFilter, lfo, lfoGain);

    // Gentle pentatonic wind-chime / bird harmonic notes
    const pentatonic = [528, 594, 660, 792, 880, 1056];
    const chimeTimer = window.setInterval(() => {
      if (!this.isPlaying || this.currentTrack !== 'forest' || !SoundEngine.enabled) return;
      if (Math.random() > 0.65) return;
      try {
        const t = ctx.currentTime;
        const osc = ctx.createOscillator();
        const noteGain = ctx.createGain();
        osc.type = 'sine';
        const freq = pentatonic[Math.floor(Math.random() * pentatonic.length)];
        osc.frequency.setValueAtTime(freq, t);

        noteGain.gain.setValueAtTime(0.0001, t);
        noteGain.gain.linearRampToValueAtTime(0.04, t + 0.08);
        noteGain.gain.exponentialRampToValueAtTime(0.0001, t + 1.4);

        osc.connect(noteGain);
        noteGain.connect(dest);
        osc.start(t);
        osc.stop(t + 1.45);
      } catch {
        // ignore
      }
    }, 2200);

    this.activeTimers.push(chimeTimer);
  }

  // 4. Cosmic Lo-Fi 432Hz Pad: Warm harmonic chord pad (216Hz, 432Hz, 528Hz, 648Hz)
  private buildCosmosGraph(ctx: AudioContext, dest: AudioNode) {
    const freqs = [216, 432, 528, 648];
    const padFilter = ctx.createBiquadFilter();
    padFilter.type = 'lowpass';
    padFilter.frequency.value = 900;

    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 0.09;

    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 320;

    lfo.connect(lfoGain);
    lfoGain.connect(padFilter.frequency);
    padFilter.connect(dest);
    lfo.start();

    this.activeNodes.push(padFilter, lfo, lfoGain);

    freqs.forEach((f, idx) => {
      const osc = ctx.createOscillator();
      const oscGain = ctx.createGain();
      osc.type = idx === 0 ? 'triangle' : 'sine';
      osc.frequency.value = f;
      osc.detune.value = (idx - 1.5) * 4; // warm chorus detune
      oscGain.gain.value = idx === 0 ? 0.16 : 0.11;

      osc.connect(oscGain);
      oscGain.connect(padFilter);
      osc.start();
      this.activeNodes.push(osc, oscGain);
    });
  }
}

export const AmbientSoundEngine = new ProceduralAmbientSoundEngine();
