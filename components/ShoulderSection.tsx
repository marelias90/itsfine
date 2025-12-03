import React from 'react';
import SinkingFade from './SinkingFade';

const ShoulderSection: React.FC = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center snap-center shrink-0">
      {/* 
         Using SinkingFade to create the physical sensation of weight settling down. 
         This matches the "Drop" prompt perfectly.
      */}
      <SinkingFade>
        <div className="flex flex-col items-center justify-center gap-16">
           
           {/* Abstract Shoulder Visual */}
           {/* Two distinct shoulders with center anchor representing neck/head */}
           <div className="relative w-72 h-40 flex items-center justify-center">
             
             {/* Center Anchor (Neck/Head) - Prominent reference point */}
             <div className="absolute top-4 w-3 h-3 bg-stone-400 rounded-full z-10" />
             
             {/* Left Shoulder */}
             <div 
               className="absolute left-8 top-12 w-20 h-3 bg-stone-600 rounded-full animate-shoulder-drop origin-right opacity-80" 
               style={{ transformOrigin: 'center right' }}
             />
             
             {/* Right Shoulder */}
             <div 
               className="absolute right-8 top-12 w-20 h-3 bg-stone-600 rounded-full animate-shoulder-drop origin-left opacity-80"
               style={{ transformOrigin: 'center left' }}
             />
             
             {/* Tension Lines - appear when shoulders are raised */}
             <div className="absolute left-16 top-8 w-[2px] h-6 bg-stone-300/40 rounded-full animate-shoulder-drop" />
             <div className="absolute right-16 top-8 w-[2px] h-6 bg-stone-300/40 rounded-full animate-shoulder-drop" />
           </div>

          <p className="font-serif text-3xl md:text-5xl text-stone-600 italic text-center select-none pointer-events-none">
            Drop your shoulders
          </p>
        </div>
      </SinkingFade>
    </div>
  );
};

export default ShoulderSection;