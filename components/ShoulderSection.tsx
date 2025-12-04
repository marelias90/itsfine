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
           
           {/* Shoulder Visual */}
           <div className="relative w-72 h-32 flex items-center justify-center">
             
             {/* Center Anchor (Head/Neck) */}
             <div className="absolute top-5 w-2.5 h-2.5 bg-stone-400 rounded-full z-10" />
             
             {/* Left Shoulder */}
             <div 
               className="absolute top-11 left-9 w-24 h-2.5 bg-stone-600 rounded-full animate-shoulder-expand-left opacity-80" 
             />
             
             {/* Right Shoulder */}
             <div 
               className="absolute top-11 right-9 w-24 h-2.5 bg-stone-600 rounded-full animate-shoulder-expand-right opacity-80"
             />
             
             {/* Left Tension Line */}
             <div className="absolute top-6 left-[76px] w-[1.5px] h-[18px] bg-stone-300/40 rounded-full animate-tension-fade" />
             
             {/* Right Tension Line */}
             <div className="absolute top-6 right-[76px] w-[1.5px] h-[18px] bg-stone-300/40 rounded-full animate-tension-fade" />
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