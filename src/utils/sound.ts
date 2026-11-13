let sharedAudioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  try {
    if (!sharedAudioCtx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return null;
      sharedAudioCtx = new AudioCtx();
    }
    if (sharedAudioCtx.state === 'suspended') {
      sharedAudioCtx.resume().catch(() => {});
    }
    return sharedAudioCtx;
  } catch {
    return null;
  }
}

function playTone(
  frequency: number,
  startOffset: number,
  duration: number,
  type: OscillatorType = 'sine',
  volume = 0.14
) {
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime + startOffset;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();

  osc.type = type;
  osc.frequency.setValueAtTime(frequency, now);

  gain.gain.setValueAtTime(0.001, now);
  gain.gain.exponentialRampToValueAtTime(volume, now + 0.02);
  gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + duration + 0.02);
}

export function playClickSound(enabled: boolean) {
  if (!enabled) return;
  playTone(540, 0, 0.06, 'triangle', 0.08);
}

export function playCorrectSound(enabled: boolean) {
  if (!enabled) return;
  playTone(523.25, 0, 0.12, 'triangle', 0.14); // C5
  playTone(659.25, 0.09, 0.12, 'triangle', 0.14); // E5
  playTone(783.99, 0.18, 0.22, 'sine', 0.16); // G5
}

export function playWrongSound(enabled: boolean) {
  if (!enabled) return;
  playTone(311.13, 0, 0.14, 'sine', 0.12); // Eb4
  playTone(246.94, 0.12, 0.22, 'sine', 0.12); // B3
}

export function playVictorySound(enabled: boolean) {
  if (!enabled) return;
  playTone(523.25, 0, 0.12, 'triangle', 0.14);
  playTone(659.25, 0.1, 0.12, 'triangle', 0.14);
  playTone(783.99, 0.2, 0.12, 'triangle', 0.14);
  playTone(1046.5, 0.32, 0.34, 'sine', 0.18);
}
