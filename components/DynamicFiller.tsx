
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
      const timer = setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      // Small delay before showing the final message so "do nothing" sinks in
      const timer = setTimeout(() => {
        setIsDone(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [hasStarted, index]);

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center gap-8 min-h-[160px]">
      <p className="font-serif text-2xl md:text-3xl text-stone-700 text-center">
        If you can{' '}
        <span className="inline-block relative">
           <span className="italic border-b border-stone-300 pb-1 transition-all duration-300">
             {FILLERS[index]}
           </span>
        </span>
        .
      </p>
      
      <p 
        className={`font-serif text-xl md:text-2xl text-stone-500 text-center transition-all duration-1000 ease-out transform ${
          isDone ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        If you can do nothing, then that is ok as well.
      </p>
    </div>
  );
};

export default DynamicFiller;
