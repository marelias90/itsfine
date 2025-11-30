import React from 'react';
import FadeSection from './FadeSection';

const UnclenchSection: React.FC = () => {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <FadeSection>
        <div className="flex flex-col items-center justify-center gap-12">
           {/* Visual Abstract Jaw */}
           <div className="relative flex flex-col items-center justify-center opacity-40 hover:opacity-60 transition-opacity duration-1000">
              {/* Upper Jaw - Static */}
              <div className="w-20 h-1.5 bg-stone-800 rounded-full" />
              
              {/* Lower Jaw - Animates Down */}
              <div className="w-20 h-1.5 bg-stone-800 rounded-full animate-jaw-release mt-1.5 origin-top" />
           </div>

          <p className="font-serif text-3xl md:text-5xl text-stone-600 italic text-center">
            Unclench your jaw.
          </p>
        </div>
      </FadeSection>
    </div>
  );
};

export default UnclenchSection;