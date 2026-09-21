'use client';

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import type { ReactNode } from 'react';

/** Small serialisable object pages hand to the player. */
export interface PlayerTrack {
  id: string;
  title: string;
  artistName: string;
  coverArt: string;
  previewSrc: string;
  href: string;
}

export interface PlayerState {
  current: PlayerTrack | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  /** Start this track (restarts if it is already current and ended). */
  play: (track: PlayerTrack) => void;
  /** Toggle play/pause; with a track, switches to it if it is not current. */
  toggle: (track?: PlayerTrack) => void;
  pause: () => void;
  seek: (seconds: number) => void;
  isCurrent: (id: string) => boolean;
  /** true only when this id is current AND audibly playing */
  isPlayingId: (id: string) => boolean;
}

// Fade timings (ms). Volume ramps only, driven by requestAnimationFrame, one ramp in flight at a time.
const FADE_IN_MS = 600;
const FADE_PAUSE_MS = 300;
const FADE_SWITCH_MS = 200;
const FADE_RESTORE_MS = 150;
/** Start fading out when this many seconds remain in the clip. */
const END_FADE_S = 1.5;

type FadeKind = 'in' | 'pause' | 'switch' | 'end' | 'restore';

const clamp01 = (v: number) => Math.min(1, Math.max(0, v));

const PlayerContext = createContext<PlayerState | null>(null);

export function usePlayer(): PlayerState {
  const ctx = useContext(PlayerContext);
  if (!ctx) throw new Error('usePlayer must be used inside <PlayerProvider>');
  return ctx;
}

export function PlayerProvider({ children }: { children: ReactNode }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [current, setCurrent] = useState<PlayerTrack | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const pendingPlay = useRef(false);
  const rampId = useRef<number | null>(null);
  const fadeKind = useRef<FadeKind | null>(null);

  const cancelRamp = useCallback(() => {
    if (rampId.current !== null) cancelAnimationFrame(rampId.current);
    rampId.current = null;
  }, []);

  /** Ramp audio.volume from where it is now to `to` (ease-out). Cancels any ramp already running; `done` only runs if this ramp completes. */
  const ramp = useCallback((to: number, ms: number, kind: FadeKind, done?: () => void) => {
    cancelRamp();
    const a = audioRef.current;
    if (!a) return;
    const target = clamp01(to);
    const from = clamp01(a.volume);
    fadeKind.current = kind;
    if (from === target || ms <= 0) {
      a.volume = target;
      if (kind !== 'end') fadeKind.current = null;
      done?.();
      return;
    }
    const start = performance.now();
    const step = () => {
      const el = audioRef.current;
      if (!el) { rampId.current = null; return; }
      const t = Math.min(1, (performance.now() - start) / ms);
      const eased = 1 - Math.pow(1 - t, 3);
      el.volume = clamp01(from + (target - from) * eased);
      if (t < 1) {
        rampId.current = requestAnimationFrame(step);
      } else {
        rampId.current = null;
        if (fadeKind.current !== 'end') fadeKind.current = null;
        done?.();
      }
    };
    rampId.current = requestAnimationFrame(step);
  }, [cancelRamp]);

  // Never leave a ramp running after unmount.
  useEffect(() => cancelRamp, [cancelRamp]);

  /** Start (or resume) playback of the loaded element with a fade in from silence, or from wherever a fade-out had reached. */
  const startWithFadeIn = useCallback((a: HTMLAudioElement) => {
    if (a.paused) {
      cancelRamp();
      fadeKind.current = null;
      a.volume = 0;
      a.play().catch((err) => {
        // A superseded play() (track switch, pause, load) rejects with AbortError, possibly after the next
        // play() has started: ignore it (onPause keeps state consistent). Only genuine failures reset.
        if (err?.name === 'AbortError') return;
        cancelRamp();
        fadeKind.current = null;
        a.volume = 1;
        setIsPlaying(false);
      });
    }
    ramp(1, FADE_IN_MS, 'in');
  }, [cancelRamp, ramp]);

  // When the track changes, load and start it.
  useEffect(() => {
    const a = audioRef.current;
    if (!a || !current) return;
    a.src = current.previewSrc;
    a.load();
    if (pendingPlay.current) {
      pendingPlay.current = false;
      startWithFadeIn(a);
    } else {
      cancelRamp();
      fadeKind.current = null;
      a.volume = 1;
    }
  }, [current, startWithFadeIn, cancelRamp]);

  const play = useCallback((track: PlayerTrack) => {
    const a = audioRef.current;
    if (current?.id === track.id && a) {
      // Also covers a track that is mid fade-out (pause, switch or end): ramp back up from the current volume.
      if (a.ended) a.currentTime = 0;
      startWithFadeIn(a);
      return;
    }
    const swap = () => {
      pendingPlay.current = true;
      setCurrentTime(0);
      setDuration(0);
      setCurrent(track);
    };
    if (a && !a.paused && current) {
      // Fade the outgoing track fast, then load and fade in the new one. A later call cancels this ramp, so the last request wins.
      pendingPlay.current = false;
      ramp(0, FADE_SWITCH_MS, 'switch', () => { a.pause(); swap(); });
    } else {
      swap();
    }
  }, [current, ramp, startWithFadeIn]);

  const pause = useCallback(() => {
    const a = audioRef.current;
    if (!a || a.paused) return;
    if (fadeKind.current === 'pause') return;
    ramp(0, FADE_PAUSE_MS, 'pause', () => { a.pause(); a.volume = 1; });
  }, [ramp]);

  const toggle = useCallback((track?: PlayerTrack) => {
    if (track && track.id !== current?.id) return play(track);
    const a = audioRef.current;
    if (!a || !current) return;
    // A pause that is still fading out counts as "playing": a second click resumes.
    if (a.paused || fadeKind.current === 'pause') play(current);
    else pause();
  }, [current, play, pause]);

  const seek = useCallback((s: number) => {
    const a = audioRef.current;
    if (a) a.currentTime = s;
  }, []);

  const onTimeUpdate = useCallback((a: HTMLAudioElement) => {
    setCurrentTime(a.currentTime);
    if (a.paused || !Number.isFinite(a.duration) || a.duration <= 0) return;
    const remaining = a.duration - a.currentTime;
    const kind = fadeKind.current;
    if (remaining < END_FADE_S) {
      if (kind !== 'end' && kind !== 'pause' && kind !== 'switch') {
        ramp(0, Math.max(remaining * 1000 - 50, 100), 'end');
      }
    } else if (kind === 'end') {
      // Sought back out of the end zone: full volume again.
      ramp(1, FADE_RESTORE_MS, 'restore');
    }
  }, [ramp]);

  const onEnded = useCallback((a: HTMLAudioElement) => {
    cancelRamp();
    fadeKind.current = null;
    a.volume = 1;
    setIsPlaying(false);
  }, [cancelRamp]);

  const value = useMemo<PlayerState>(() => ({
    current, isPlaying, currentTime, duration, play, toggle, pause, seek,
    isCurrent: (id) => current?.id === id,
    isPlayingId: (id) => current?.id === id && isPlaying,
  }), [current, isPlaying, currentTime, duration, play, toggle, pause, seek]);

  return (
    <PlayerContext.Provider value={value}>
      {children}
      <audio
        ref={audioRef}
        preload="none"
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={(e) => onEnded(e.currentTarget)}
        onTimeUpdate={(e) => onTimeUpdate(e.currentTarget)}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onDurationChange={(e) => setDuration(e.currentTarget.duration)}
      />
    </PlayerContext.Provider>
  );
}
