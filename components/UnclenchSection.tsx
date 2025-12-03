import React, { useRef, useEffect, useState } from 'react';
import FadeSection from './FadeSection';

const UnclenchSection: React.FC = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center snap-center shrink-0">
      <FadeSection>
        <div className="flex flex-col items-center justify-center gap-16">
           
           {/* Jaw Animation Visual */}
           <div className="relative flex flex-col items-center justify-center opacity-80 p-8">
             {/* Upper Jaw - Static */}
             <div className="w-24 h-2 bg-stone-800 rounded-full" />
             
             {/* Lower Jaw - Animates Down */}
             <div className="w-24 h-2 bg-stone-800 rounded-full animate-jaw-drop mt-1 origin-top" />
           </div>

          <p className="font-serif text-3xl md:text-5xl text-stone-600 italic text-center select-none pointer-events-none">
            Unclench your jaw
          </p>
        </div>
      </FadeSection>
    </div>
  );
};

export default UnclenchSection;