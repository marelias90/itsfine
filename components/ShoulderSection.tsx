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
           {/* Minimalist arch representing the shoulders rising and falling relative to a center point */}
           <div className="relative w-64 h-32 flex items-center justify-center">
             
             {/* Center Anchor (Spine/Neck) - Static */}
             <div className="absolute w-1.5 h-1.5 bg-stone-300 rounded-full" />
             
             {/* Shoulders Arch - Animates Up/Down */}
             {/* We use negative margin to position the arch above the center dot visually */}
             <div className="w-48 h-24 border-t-[3px] border-stone-600 rounded-[50%] animate-shoulder-drop -mt-8 opacity-80" />

           </div>

          <p className="font-serif text-3xl md:text-5xl text-stone-600 italic text-center select-none pointer-events-none">
            Drop your shoulders.
          </p>
        </div>
      </SinkingFade>
    </div>
  );
};

export default ShoulderSection;