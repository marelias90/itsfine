import React, { useState, useEffect, useRef } from 'react';

const FILLERS = [
  "go to the gym",
  "go for a walk",
  "listen to a song you love",
  "talk to someone that energizes you",
  "take a deep deep breath",
  "sit with the feeling",
  "do nothing"
];

const DynamicFiller: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [isDone, setIsDone] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [fadeOpacity, setFadeOpacity] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!hasStarted) return;

    if (index < FILLERS.length - 1) {
      const interval = setInterval(() => {
        // Start fade out
        setFadeOpacity(0);
        
        setTimeout(() => {
          setIndex((prev) => prev + 1);
          // Start fade in
          setFadeOpacity(1);
        }, 500); // Wait for half the transition time

      }, 2000); // Total time per word (slower for readability)
      
      return () => clearInterval(interval);
    } else {
      // End state sequence
      const timer = setTimeout(() => {
        setIsDone(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [hasStarted, index]);

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center gap-16 min-h-[50vh] py-20">
      <p className="font-serif text-3xl md:text-5xl text-stone-800 text-center leading-tight">
        If you can{' '}
        <span className="inline-grid place-items-center">
             {/* Using a grid to stack allows smoother layout but for now we just fade text */}
             <span 
               className="italic border-b border-stone-200 pb-2 transition-all duration-700 ease-in-out block text-stone-600"
               style={{ 
                 opacity: fadeOpacity, 
                 transform: fadeOpacity === 0 ? 'translateY(10px)' : 'translateY(0)',
                 filter: fadeOpacity === 0 ? 'blur(4px)' : 'blur(0)'
               }}
             >
               {FILLERS[index]}
             </span>
        </span>
        .
      </p>
      
      <div className="h-24 flex items-center justify-center">
        <p 
          className={`font-serif text-2xl md:text-4xl text-stone-500 text-center transition-all duration-[2500ms] ease-[cubic-bezier(0.2,0.8,0.2,1)] transform ${
            isDone ? 'opacity-100 translate-y-0 blur-0' : 'opacity-0 translate-y-8 blur-sm'
          }`}
        >
          If you can do nothing,<br/> then that is ok as well.
        </p>
      </div>
    </div>
  );
};

export default DynamicFiller;