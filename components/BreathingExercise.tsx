import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Square, Volume2, VolumeX } from 'lucide-react';
import { BreathingPhase } from '../types';

const BreathingExercise: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [phase, setPhase] = useState<BreathingPhase>(BreathingPhase.Idle);
  const [timeLeft, setTimeLeft] = useState(4);
  const [isMuted, setIsMuted] = useState(false);
  
  // Audio Context Refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);
  const gainRef = useRef<GainNode | null>(null);

  const cleanupAudio = useCallback(() => {
    if (oscRef.current) {
      try {
        oscRef.current.stop();
        oscRef.current.disconnect();
      } catch (e) { /* ignore */ }
      oscRef.current = null;
    }
  }, []);

  const initAudio = useCallback(() => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
  }, []);

  const playTone = useCallback((freq: number, type: 'sine' | 'triangle', volume: number) => {
    if (isMuted || !audioContextRef.current) return;

    // Stop previous
    cleanupAudio();

    const ctx = audioContextRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    
    // Smooth attack and release
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 1);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 3.8); // Fade out just before end

    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    oscRef.current = osc;
    gainRef.current = gain;
  }, [cleanupAudio, isMuted]);

  useEffect(() => {
    let interval: any;
    
    if (isActive) {
      // Logic to cycle through phases
      const runCycle = () => {
        setPhase(p => {
          switch (p) {
            case BreathingPhase.Idle:
              playTone(180, 'sine', 0.15); // Inhale tone (rising feeling could be nice, keeping warm low)
              return BreathingPhase.Inhale;
            case BreathingPhase.Inhale:
              playTone(220, 'sine', 0.1); // Hold tone
              return BreathingPhase.HoldFull;
            case BreathingPhase.HoldFull:
              playTone(160, 'sine', 0.15); // Exhale tone
              return BreathingPhase.Exhale;
            case BreathingPhase.Exhale:
              // Silence for empty hold, or very faint rumble
              return BreathingPhase.HoldEmpty;
            case BreathingPhase.HoldEmpty:
              playTone(180, 'sine', 0.15); // Loop back to inhale
              return BreathingPhase.Inhale;
            default:
              return BreathingPhase.Idle;
          }
        });
        setTimeLeft(4);
      };

      // Initial start
      if (phase === BreathingPhase.Idle) {
        runCycle();
      }

      interval = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
             runCycle();
             return 4;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setPhase(BreathingPhase.Idle);
      setTimeLeft(4);
      cleanupAudio();
    }

    return () => clearInterval(interval);
  }, [isActive, cleanupAudio, playTone, phase]);

  const toggleExercise = () => {
    if (!isActive) {
      initAudio();
    }
    setIsActive(!isActive);
  };

  const getInstruction = () => {
    switch (phase) {
      case BreathingPhase.Inhale: return "Breathe In";
      case BreathingPhase.HoldFull: return "Hold";
      case BreathingPhase.Exhale: return "Breathe Out";
      case BreathingPhase.HoldEmpty: return "Hold";
      default: return "Ready?";
    }
  };

  // Box Animation Helpers
  // Box is w-64 (256px). Dot is w-4 (16px). Max travel 240px.
  // Origin (0,0) is Top-Left visually, but we want path: Bottom-Left -> Top-Left -> Top-Right -> Bottom-Right -> Bottom-Left
  
  const getDotTransform = () => {
    // BL: x=0, y=240
    // TL: x=0, y=0
    // TR: x=240, y=0
    // BR: x=240, y=240

    switch (phase) {
      case BreathingPhase.Idle: return 'translate-x-0 translate-y-[240px]'; // Start at bottom left
      case BreathingPhase.Inhale: return 'translate-x-0 translate-y-0'; // Move Up
      case BreathingPhase.HoldFull: return 'translate-x-[240px] translate-y-0'; // Move Right
      case BreathingPhase.Exhale: return 'translate-x-[240px] translate-y-[240px]'; // Move Down
      case BreathingPhase.HoldEmpty: return 'translate-x-0 translate-y-[240px]'; // Move Left
      default: return 'translate-x-0 translate-y-[240px]';
    }
  };

  const getInnerCircleStyle = () => {
    // Expands on Inhale, Stays on HoldFull, Shrinks on Exhale, Stays on HoldEmpty
    const base = "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full transition-all duration-[4000ms] linear bg-stone-200/50";
    
    switch (phase) {
      case BreathingPhase.Inhale:
      case BreathingPhase.HoldFull:
        return `${base} w-48 h-48 opacity-100`;
      case BreathingPhase.Exhale:
      case BreathingPhase.HoldEmpty:
        return `${base} w-12 h-12 opacity-60`;
      default:
        return `${base} w-12 h-12 opacity-50`;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-12">
      
      {/* Visual Box Container */}
      <div className="relative w-64 h-64">
        {/* Track Outline */}
        <div className="absolute inset-0 border-2 border-stone-200 rounded-2xl" />

        {/* Inner Expanding Breath */}
        <div className={getInnerCircleStyle()} />

        {/* Text Center */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <span className="text-stone-600 font-serif text-xl tracking-widest bg-paper/50 px-2 py-1 rounded backdrop-blur-[2px]">
            {isActive ? getInstruction() : "Breathe"}
          </span>
        </div>

        {/* Moving Dot */}
        {/* We use a container for the dot to handle the transform positioning absolute to the box */}
        <div 
          className={`absolute top-0 left-0 w-4 h-4 bg-stone-600 rounded-full shadow-sm z-20 transition-transform ${isActive ? 'duration-[4000ms] linear' : 'duration-500 ease-out'}`}
          style={{ transform: getDotTransform() }}
        />
      </div>

      {/* Controls */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleExercise}
          className="flex items-center gap-2 px-6 py-2 bg-stone-800 text-stone-50 rounded-full hover:bg-stone-700 transition-colors font-sans text-sm tracking-wide"
        >
          {isActive ? <Square size={14} /> : <Play size={14} />}
          {isActive ? "Stop" : "Start Exercise"}
        </button>

        <button
          onClick={() => setIsMuted(!isMuted)}
          className="p-2 text-stone-500 hover:text-stone-800 transition-colors"
          title={isMuted ? "Unmute" : "Mute"}
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>
      </div>

      <p className="text-stone-400 text-xs tracking-widest uppercase">
        4s In • 4s Hold • 4s Out • 4s Hold
      </p>
    </div>
  );
};

export default BreathingExercise;