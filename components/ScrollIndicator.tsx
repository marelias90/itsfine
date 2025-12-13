
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

  const handleClick = () => {
    // Scroll down by one viewport height
    window.scrollBy({
      top: window.innerHeight,
      behavior: 'smooth'
    });
  };

  return (
    <button
      onClick={handleClick}
      className={`
        absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2
        transition-all duration-1000 ease-in-out
        cursor-pointer select-none will-change-[opacity,transform]
        hover:scale-110 active:scale-95
        focus:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 focus-visible:ring-offset-2
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}
        ${className}
      `}
      aria-label="Scroll to next section"
    >
      <div className="flex flex-col items-center gap-3 animate-float">
        <span className="font-serif text-xs italic tracking-[0.2em] text-stone-500 uppercase font-medium">
          Scroll
        </span>
        <ChevronDown
          size={24}
          className="text-stone-600 group-hover:text-stone-800 transition-colors"
          strokeWidth={2}
        />
      </div>
    </button>
  );
};

export default ScrollIndicator;
