
import React, { useEffect, useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface ScrollIndicatorProps {
  delay?: number; // Time in ms before appearing
  className?: string;
}

const ScrollIndicator: React.FC<ScrollIndicatorProps> = ({ delay = 3000, className = '' }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div 
      className={`
        absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 
        transition-all duration-1000 ease-in-out
        pointer-events-none select-none will-change-[opacity,transform]
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'} 
        ${className}
      `}
    >
      <div className="flex flex-col items-center gap-3 animate-float">
        <span className="font-serif text-xs italic tracking-[0.2em] text-stone-400 uppercase">
          Scroll
        </span>
        <ChevronDown 
          size={20} 
          className="text-stone-500 opacity-80" 
          strokeWidth={1.5}
        />
      </div>
    </div>
  );
};

export default ScrollIndicator;
