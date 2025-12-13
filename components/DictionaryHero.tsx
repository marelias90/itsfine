import React, { useState, useEffect } from 'react';
import FadeSection from './FadeSection';
import ScrollIndicator from './ScrollIndicator';

const DictionaryHero: React.FC = () => {
  const [isMe, setIsMe] = useState(false);
  const [showDefinition, setShowDefinition] = useState(false);

  useEffect(() => {
    // Wait a bit, then change "You" to "I"
    const t1 = setTimeout(() => {
      setIsMe(true);
    }, 1500);

    // Wait a bit more, then show the definition
    const t2 = setTimeout(() => {
      setShowDefinition(true);
    }, 3000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  return (
    <section className="h-screen w-full flex flex-col items-center justify-center relative px-6 snap-center shrink-0">
      <div className="max-w-3xl w-full flex flex-col items-start">
        {/* Main Phrase */}
        <FadeSection>
          <h1 className="font-serif text-5xl md:text-8xl text-stone-800 mb-6 leading-tight flex flex-wrap items-baseline gap-x-[0.2em]">
            
            {/* Animated Word Switcher Container */}
            <div className="flex items-baseline overflow-hidden">
               {/* 'You' - collapses width when !isMe */}
               <span
                 className={`
                   transition-[max-width,opacity,transform] duration-[1000ms] ease-soft whitespace-nowrap overflow-hidden
                   ${isMe ? 'max-w-0 opacity-0 -translate-y-2' : 'max-w-[2em] opacity-100 translate-y-0'}
                 `}
               >
                 You
               </span>

               {/* 'I' - expands width when isMe */}
               <span
                 className={`
                   transition-[max-width,opacity,transform] duration-[1000ms] ease-soft whitespace-nowrap overflow-hidden
                   ${isMe ? 'max-w-[0.8em] opacity-100 translate-y-0' : 'max-w-0 opacity-0 translate-y-4'}
                 `}
               >
                 I
               </span>
            </div>

            <span>will be fine.</span>
          </h1>
        </FadeSection>

        {/* Dictionary Metadata & Definition */}
        <div 
          className={`
            transition-all duration-1000 ease-out pl-6 border-l-2 border-stone-200 ml-2
            ${showDefinition ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}
        >
          <div className="flex items-center gap-3 text-stone-400 font-sans text-sm md:text-base italic mb-4 tracking-wide">
            <span>/aɪ wɪl bi faɪn/</span>
            <span className="w-1 h-1 rounded-full bg-stone-300"></span>
            <span>phrase</span>
          </div>

          <p className="font-serif text-xl md:text-3xl text-stone-600 leading-relaxed max-w-xl">
            The feeling of grounding and realization, that you will be fine in the long-run no matter what happens.
          </p>
        </div>
      </div>

      <ScrollIndicator delay={3500} />
    </section>
  );
};

export default DictionaryHero;