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
        // Fade out
        setFadeOpacity(0);
        
        setTimeout(() => {
          setIndex((prev) => prev + 1);
          // Fade in
          setFadeOpacity(1);
        }, 300); // Wait for fade out to finish before switching text

      }, 1500); // Total time per word
      
      return () => clearInterval(interval);
    } else {
      // End state
      const timer = setTimeout(() => {
        setIsDone(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [hasStarted, index]);

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center gap-12 min-h-[40vh] py-20">
      <p className="font-serif text-3xl md:text-5xl text-stone-800 text-center leading-tight">
        If you can{' '}
        <span className="inline-block relative min-w-[200px] text-stone-600">
           <span 
             className="italic border-b-2 border-stone-200 pb-2 transition-opacity duration-300 block"
             style={{ opacity: fadeOpacity }}
           >
             {FILLERS[index]}
           </span>
        </span>
        .
      </p>
      
      <p 
        className={`font-serif text-2xl md:text-4xl text-stone-500 text-center transition-all duration-[2000ms] ease-out transform ${
          isDone ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
      >
        If you can do nothing,<br/> then that is ok as well.
      </p>
    </div>
  );
};

export default DynamicFiller;