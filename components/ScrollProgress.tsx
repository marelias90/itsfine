import React, { useEffect, useState } from 'react';

interface ScrollProgressProps {
  containerRef: React.RefObject<HTMLDivElement | null>;
}

const ScrollProgress: React.FC<ScrollProgressProps> = ({ containerRef }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const totalScroll = container.scrollTop;
      const windowHeight = container.scrollHeight - container.clientHeight;
      if (windowHeight === 0) return;
      const scroll = totalScroll / windowHeight;
      setProgress(Number(scroll));
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [containerRef]);

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 h-32 md:h-48 w-[2px] bg-stone-200 rounded-full overflow-hidden z-50 hidden md:block">
      <div 
        className="w-full bg-stone-400 transition-all duration-300 ease-out rounded-full"
        style={{ 
          height: `${progress * 100}%`,
          opacity: Math.max(0.2, progress) 
        }}
      />
    </div>
  );
};

export default ScrollProgress;