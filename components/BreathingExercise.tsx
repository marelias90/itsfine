import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Play, Square, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { BreathingPhase } from '../types';

const BreathingExercise: React.FC = () => {
  const [isActive, setIsActive] = useState(false);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [count, setCount] = useState(5);
  const [phase, setPhase] = useState<BreathingPhase>(BreathingPhase.Idle);
  const [isMuted, setIsMuted] = useState(false);
  
  // Audio Refs
  const audioContextRef = useRef<AudioContext | null>(null);
  const oscRef = useRef<OscillatorNode | null>(null);

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

  const playTone = useCallback((freq: number, type: 'sine' | 'triangle', volume: number, duration: number = 4) => {
    if (isMuted || !audioContextRef.current) return;
    cleanupAudio();

    const ctx = audioContextRef.current;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    
    // Very soft attack and long release for organic feel
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(volume, ctx.currentTime + 1);
    gain.gain.linearRampToValueAtTime(0, ctx.currentTime + duration - 0.2); 

    osc.connect(gain);
    gain.connect(ctx.destination);
    
    osc.start();
    oscRef.current = osc;
  }, [cleanupAudio, isMuted]);

  // Countdown Logic
  useEffect(() => {
    let timer: any;
    if (isCountingDown && count > 0) {
      timer = setTimeout(() => setCount(c => c - 1), 1000);
    } else if (isCountingDown && count === 0) {
      setIsCountingDown(false);
      setIsActive(true);
      setPhase(BreathingPhase.Inhale); // Start immediately
    }
    return () => clearTimeout(timer);
  }, [isCountingDown, count]);

  // Breathing Cycle Logic
  useEffect(() => {
    let timer: any;

    if (isActive) {
      const runPhase = () => {
        // Durations are all 4000ms
        switch (phase) {
          case BreathingPhase.Inhale:
            playTone(160, 'sine', 0.2); 
            timer = setTimeout(() => setPhase(BreathingPhase.HoldFull), 4000);
            break;
          case BreathingPhase.HoldFull:
            // Silence during hold
            // playTone(180, 'sine', 0.1); // Removed as requested
            timer = setTimeout(() => setPhase(BreathingPhase.Exhale), 4000);
            break;
          case BreathingPhase.Exhale:
            playTone(140, 'sine', 0.2);
            timer = setTimeout(() => setPhase(BreathingPhase.HoldEmpty), 4000);
            break;
          case BreathingPhase.HoldEmpty:
            // Silence during hold
            timer = setTimeout(() => setPhase(BreathingPhase.Inhale), 4000);
            break;
        }
      };
      runPhase();
    } else {
      setPhase(BreathingPhase.Idle);
      cleanupAudio();
    }

    return () => clearTimeout(timer);
  }, [isActive, phase, playTone, cleanupAudio]);

  const handleStart = () => {
    initAudio();
    setCount(5);
    setIsCountingDown(true);
  };

  const handleStop = () => {
    setIsActive(false);
    setIsCountingDown(false);
    setCount(5);
    cleanupAudio();
  };

  const getInstruction = () => {
    if (isCountingDown) return "Relax...";
    if (!isActive) return "Breathe";
    switch (phase) {
      case BreathingPhase.Inhale: return "Breathe In";
      case BreathingPhase.HoldFull: return "Hold";
      case BreathingPhase.Exhale: return "Breathe Out";
      case BreathingPhase.HoldEmpty: return "Hold";
      default: return "Breathe";
    }
  };

  // Animation Variants
  const lungVariants = {
    [BreathingPhase.Idle]: { scale: 1, opacity: 0.8 },
    [BreathingPhase.Inhale]: { 
      scale: 1.5, 
      opacity: 1,
      transition: { duration: 4, ease: "easeInOut" } 
    },
    [BreathingPhase.HoldFull]: { 
      scale: 1.55, 
      opacity: 0.9,
      transition: { duration: 2, repeat: Infinity, repeatType: "mirror" as const, ease: "easeInOut" } 
    },
    [BreathingPhase.Exhale]: { 
      scale: 1, 
      opacity: 0.8,
      transition: { duration: 4, ease: "easeInOut" } 
    },
    [BreathingPhase.HoldEmpty]: { 
      scale: 1, 
      opacity: 0.6,
      transition: { duration: 4, ease: "linear" } 
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-12 relative w-full">
      
      {/* Top Label */}
      <h4 className="font-sans text-[10px] md:text-xs font-medium tracking-[0.25em] text-stone-500/50 mb-16 uppercase select-none">
        Box Breathing
      </h4>

      {/* Main Graphic Area */}
      <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center mb-12">
        
        {/* Countdown Overlay */}
        <AnimatePresence>
          {isCountingDown && (
            <motion.div 
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.5 }}
              key="countdown"
              className="absolute z-20 font-serif text-8xl text-stone-700/80"
            >
              {count}
            </motion.div>
          )}
        </AnimatePresence>

        {/* The "Lungs" - Organic Shapes */}
        <div className="absolute inset-0 flex items-center justify-center">
            {/* Left Lobe */}
            <motion.div
              variants={lungVariants}
              animate={isActive ? phase : BreathingPhase.Idle}
              className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-clay-400/30 blur-2xl absolute -translate-x-6 mix-blend-multiply"
            />
            {/* Right Lobe */}
            <motion.div
              variants={lungVariants}
              animate={isActive ? phase : BreathingPhase.Idle}
              className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-clay-500/30 blur-2xl absolute translate-x-6 mix-blend-multiply"
            />
            {/* Core Gradient Sphere for solidity */}
            <motion.div
               variants={lungVariants}
               animate={isActive ? phase : BreathingPhase.Idle}
               className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-gradient-to-tr from-clay-400 to-clay-300 opacity-80 blur-lg z-10"
            />
        </div>

        {/* Instruction Text - Only shows when active (not counting down) */}
        <motion.div 
          animate={{ opacity: isActive && !isCountingDown ? 1 : 0.5 }}
          className="relative z-10 font-serif text-3xl md:text-4xl text-stone-600 tracking-wide pointer-events-none"
        >
          {!isCountingDown && getInstruction()}
        </motion.div>
      </div>

      {/* Controls Container */}
      <div className="flex flex-col items-center gap-8 z-20">
        
        <div className="flex items-center gap-4">
           {/* Primary Button */}
           <AnimatePresence mode="wait">
             {!isActive && !isCountingDown ? (
               <motion.button
                 key="start"
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -10 }}
                 onClick={handleStart}
                 className="flex items-center gap-3 px-8 py-3 bg-clay-500 hover:bg-clay-600 text-white rounded-full shadow-sm hover:shadow-md transition-all duration-300 font-sans text-sm font-medium tracking-wide"
               >
                 <Play size={14} fill="currentColor" />
                 Start Exercise
               </motion.button>
             ) : (
               <motion.button
                 key="stop"
                 initial={{ opacity: 0, y: 10 }}
                 animate={{ opacity: 1, y: 0 }}
                 exit={{ opacity: 0, y: -10 }}
                 onClick={handleStop}
                 className="flex items-center gap-3 px-8 py-3 bg-stone-200 hover:bg-stone-300 text-stone-600 rounded-full transition-all duration-300 font-sans text-sm font-medium tracking-wide"
               >
                 <Square size={14} fill="currentColor" />
                 Stop
               </motion.button>
             )}
           </AnimatePresence>

           {/* Mute Toggle */}
           <button
             onClick={() => setIsMuted(!isMuted)}
             className={`p-3 rounded-full transition-all duration-300 ${isMuted ? 'text-stone-300 hover:text-stone-500' : 'text-clay-500 hover:text-clay-600 bg-clay-50'}`}
             title={isMuted ? "Unmute" : "Mute"}
           >
             {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
           </button>
        </div>

        {/* Footer Info */}
        <div className="text-[10px] md:text-xs font-sans tracking-[0.2em] text-stone-400 uppercase">
          4s In • 4s Hold • 4s Out • 4s Hold
        </div>
      </div>

    </div>
  );
};

export default BreathingExercise;