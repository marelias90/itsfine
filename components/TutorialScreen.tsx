
import React, { useEffect, useState, useRef } from 'react';
import { ChevronDown } from 'lucide-react';

interface TutorialScreenProps {
  onComplete: () => void;
}

const TutorialScreen: React.FC<TutorialScreenProps> = ({ onComplete }) => {
  const [showIndicator, setShowIndicator] = useState(false);
  const touchStartY = useRef<number | null>(null);

  useEffect(() => {
    // Show indicator after delay
    const timer = setTimeout(() => {
      setShowIndicator(true);
    }, 1500);

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY > 20) {
        onComplete();
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!touchStartY.current) return;
      const touchEndY = e.touches[0].clientY;
      const diff = touchStartY.current - touchEndY;
      
      // Swipe up (scroll down)
      if (diff > 50) { 
        onComplete();
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowDown', ' ', 'PageDown', 'Enter'].includes(e.key)) {
        onComplete();
      }
    };

    window.addEventListener('wheel', handleWheel);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onComplete]);

  return (
    <div 
      className="min-h-screen flex flex-col items-center justify-center bg-paper px-6 text-center animate-fade-in cursor-default"
      onClick={onComplete} // Fallback for simple clicking anywhere
    >
      <div className="max-w-md w-full flex flex-col items-center gap-16">
        
        {/* Text */}
        <div className="space-y-6 select-none">
          <p className="font-serif text-2xl md:text-3xl text-stone-800 leading-relaxed">
            There is no rush here.
          </p>
          <p className="font-serif text-lg md:text-xl text-stone-600 leading-relaxed italic">
            Scroll gently whenever you are<br/>ready for the next thought.
          </p>
        </div>

        {/* Visual Animation: Scroll Prompt */}
        <div 
          className={`
            flex flex-col items-center gap-4 transition-all duration-1000 
            ${showIndicator ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}
        >
          {/* Animated Line */}
          <div className="relative h-24 w-[2px] bg-stone-200 rounded-full overflow-hidden">
            <div className="absolute top-0 left-0 w-full bg-stone-500 animate-[float_2.5s_ease-in-out_infinite] h-1/2 rounded-full opacity-80" />
          </div>

          {/* Icon & Label */}
          <div className="flex flex-col items-center gap-2 text-stone-500 animate-pulse-slow">
             <span className="font-sans text-xs tracking-[0.2em] uppercase font-medium">Scroll</span>
             <ChevronDown size={24} strokeWidth={1.5} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default TutorialScreen;
