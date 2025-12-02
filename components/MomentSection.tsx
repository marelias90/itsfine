import React, { useRef, useEffect, useState } from 'react';
import FadeSection from './FadeSection';

const MomentSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const textRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Trigger once and stick
        }
      },
      { threshold: 0.5 }
    );

    if (textRef.current) {
      observer.observe(textRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="h-screen w-full flex items-center justify-center snap-center shrink-0">
      <FadeSection>
        <p className="font-serif text-3xl md:text-5xl text-stone-600 text-center flex flex-col md:flex-row items-center gap-3">
           <span>Take a</span>
           {/* 
             Only apply the animation class when isVisible is true.
             This ensures the "Inhale" starts exactly when the user looks at it.
           */}
           <span 
             ref={textRef}
             className={`italic text-stone-500 origin-center inline-block will-change-transform ${isVisible ? 'animate-text-breath' : 'opacity-0'}`}
           >
             moment.
           </span>
        </p>
      </FadeSection>
    </div>
  );
};

export default MomentSection;