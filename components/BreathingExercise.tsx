import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Square, Volume2, VolumeX } from 'lucide-react';
import { BreathingPhase } from '../types';
import { BREATHING_DURATION_MS } from '../constants';

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
              playTone(180, 'sine', 0.15); // Inhale tone (warm low)
              return BreathingPhase.Inhale;
            case BreathingPhase.Inhale:
              playTone(220, 'sine', 0.1); // Hold tone (steady)
              return BreathingPhase.HoldFull;
            case BreathingPhase.HoldFull:
              playTone(160, 'sine', 0.15); // Exhale tone (relaxing drop)
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
  }, [isActive, cleanupAudio, playTone, phase]); // Added phase to deps to allow correct tone triggering on change

  const toggleExercise = () => {
    if (!isActive) {
      initAudio();
    }
    setIsActive(!isActive);
  };

  // Visual Styling based on Phase
  const getCircleStyles = () => {
    const base = "w-48 h-48 rounded-full border-2 border-stone-400 transition-all duration-[4000ms] ease-in-out flex items-center justify-center relative";
    switch (phase) {
      case BreathingPhase.Inhale:
        return `${base} scale-125 bg-stone-200/50 border-stone-600`;
      case BreathingPhase.HoldFull:
        return `${base} scale-125 bg-stone-300/50 border-stone-800`;
      case BreathingPhase.Exhale:
        return `${base} scale-100 bg-transparent border-stone-400`;
      case BreathingPhase.HoldEmpty:
        return `${base} scale-100 bg-transparent border-stone-300`;
      default:
        return `${base} scale-100 bg-transparent border-stone-300`;
    }
  };

  const getInstruction = () => {
    switch (phase) {
      case BreathingPhase.Inhale: return "Breathe In";
      case BreathingPhase.HoldFull: return "Hold";
      case BreathingPhase.Exhale: return "Breathe Out";
      case BreathingPhase.HoldEmpty: return "Rest";
      default: return "Ready?";
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-16 space-y-8">
      <div className="relative">
         {/* Visual Circle */}
         <div className={getCircleStyles()}>
            <span className="text-stone-600 font-serif text-xl tracking-widest">
              {isActive ? getInstruction() : "Breathe"}
            </span>
         </div>
      </div>

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
        4s In • 4s Hold • 4s Out • 4s Rest
      </p>
    </div>
  );
};

export default BreathingExercise;
